'use client';

import React, {
  Children,
  isValidElement,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { clsx } from '../../../helpers';
import { RuleType, SyntheticBaseEvent } from '../../../types';
import { flattenChildren } from '../../../helpers/flatten';
import {
  FieldInstancesRef,
  FormItemChildComponentProps,
  FormItemProps
} from '../../../types/form';
import { OptionProps } from '../../../types/select';
import { prefixClsFormItem } from '../../../utils';
import { FormContext } from '../Form';
import './style.css';

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  debounced.flush = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
      func(...args);
    }
  };

  return debounced;
};

const FormItem = ({
  prefixCls = prefixClsFormItem,
  name,
  label,
  rules = [],
  children,
  className = '',
  layout = 'vertical',
  style = {},
  dependencies = [],
  initialValue,
  feedbackIcons,
  extra,
  hideLabel = false,
  removeErrorMessageHeight = false,
  ...props
}: FormItemProps) => {
  const formContext = useContext(FormContext);

  const errorRef = useRef<HTMLSpanElement>(null);
  const fieldRef = useRef<FieldInstancesRef | null>(null);

  if (!formContext) {
    throw new Error('FormItem must be used within a Form');
  }

  const {
    isReseting,
    registerField,
    getFieldError,
    getFieldValue,
    setFieldValue,
    getFieldInstance,
    setFieldInstance,
    subscribeToFields,
    validateFields
  } = formContext;

  const childrenList = useMemo(() => flattenChildren(children), [children]);

  useEffect(() => {
    if (name && !getFieldInstance(name)) {
      registerField(name, rules);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, rules]);

  useEffect(() => {
    setFieldInstance(name, fieldRef.current);
  }, [name, fieldRef.current])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => registerField(name, undefined, true), [name])

  useEffect(() => {
    if (initialValue) {
      setFieldValue(name, initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (name && dependencies.length > 0) {
      const unsubscribe = subscribeToFields(dependencies, () => {
        validateFields([name]);
      });

      return () => {
        unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies, name]);

  const isRequired = useMemo(
    () => rules.some((rule: RuleType) => rule.required),
    [rules]
  );

  const errorMessage = getFieldError(name)?.[0];

  return (
    <div
      style={style}
      data-instance={name}
      className={clsx([
        `${prefixCls}`,
        {
          [layout]: layout,
          [className]: className,
          noStyle: props.noStyle
        }
      ])}
    >
      {!props.noStyle && (label || name) && !hideLabel && (
        <label className={`${prefixCls}-label`} htmlFor={name}>
          {label || name}
          {isRequired && <span className={`${prefixCls}-required`}>*</span>}
          {/* @Todo need to add Tooltip like Ant design */}
        </label>
      )}

      {Children.map(childrenList, (child, key) => {
        if (isValidElement(child)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          const { onChange, value, ...childProps } = child.props;
          const fieldValue = value ?? getFieldValue(name) ?? initialValue;

          return (
            <div>
              <FormItemChildComponent
                {...props}
                key={`${key}_${isReseting}`}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                ref={fieldRef}
                name={name}
                child={child}
                value={value}
                error={!!errorMessage}
                fieldValue={fieldValue}
                setFieldValue={setFieldValue}
                feedbackIcons={feedbackIcons}
                onChange={onChange}
                noStyle={props.noStyle}
                normalize={props.normalize}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                size={childProps.size || props.size}
              />

              {extra
                ? <div className={`${prefixCls}-extra`}>
                  {extra || ''}
                </div>
                : null}

              {!props.noStyle && (
                <span
                  ref={errorRef}
                  className={clsx([
                    `${prefixCls}-error`,
                    { [`${prefixCls}-has-error`]: errorMessage?.length }
                  ])}
                  style={{
                    ...removeErrorMessageHeight ? { minHeight: 0 } : {},
                    ...extra ? { marginBottom: 0 } : {}
                  }}
                >
                  {errorMessage || ''}
                </span>
              )}
            </div>
          )
        }

        return child;
      })}
    </div>
  );
};

const FormItemChildComponent = ({
  child,
  name,
  error,
  fieldValue,
  setFieldValue,
  onChange,
  normalize,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  noStyle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  feedbackIcons,
  ref,
  ...props
}: FormItemChildComponentProps) => {
  const formContext = useContext(FormContext);

  const [wasNormalize, setWasNormalize] = useState(false);

  const { getFieldsValue } = formContext || {};

  const debouncedSetFieldValue = useRef(
    debounce((name: string, value: any) => {
      setFieldValue(name, value, undefined, undefined, true);
    }, 50)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSetFieldValue.cancel?.();
    };
  }, []);

  const handleBlur = () => {
    debouncedSetFieldValue.flush?.(name, fieldValue);
  };

  const handleChange = (e: SyntheticBaseEvent, option?: OptionProps) => {
    let rawValue: RuleType | SyntheticBaseEvent = e?.target
      ? e.target.value
      : e;

    if (normalize) {
      const prevValue = fieldValue ?? props.value;
      const allValues = getFieldsValue?.();

      rawValue = normalize(rawValue, prevValue, allValues);

      if (rawValue === prevValue) {
        e.target.value = rawValue;

        setWasNormalize(prev => !prev);

        const timeout = setTimeout(() => {
          (
            document.querySelector(`[name='${name}']`) as HTMLInputElement
          )?.focus();

          clearTimeout(timeout);
        }, 0);

        return;
      }
    }

    debouncedSetFieldValue(name, rawValue);
    onChange?.(e, option);
  };

  const injectPropsIntoFinalLeaf = (child: ReactElement): ReactElement => {
    if (!isValidElement(child)) {
      return child;
    }

    const childProps = child.props as ReactElement & {
      children: ReactElement[],
      __injected: boolean
    }

    const isWrapper =
      typeof child.type === 'string' &&
      !('dangerouslySetInnerHTML' in childProps) &&
      ['div', 'span', 'label'].includes(child.type);

    if (isWrapper) {
      return (
        <child.type {...childProps}>
          {Children.map(flattenChildren(childProps.children), injectPropsIntoFinalLeaf)}
        </child.type>
      )
    }

    if (childProps?.__injected) {
      return child;
    }

    return <child.type
      {...props}
      ref={ref}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      {...child.props}
      name={name}
      child={child}
      onChange={handleChange}
      onBlur={handleBlur}
      key={`${name}_${wasNormalize}`}
      value={fieldValue ?? props.value}
      {...('dangerouslySetInnerHTML' in childProps ? {} : {
        __injected: true,
        ...(error ? { error } : {}),
      })
      }
    />
  };

  return injectPropsIntoFinalLeaf(child)
};

FormItem.displayName = 'FormItem';

export default FormItem;