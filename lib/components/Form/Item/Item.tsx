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
  }, [name, rules]);

  useEffect(() => {
    setFieldInstance(name, fieldRef.current);
  }, [name, fieldRef.current])

  useEffect(() => () => registerField(name, undefined, true), [name])

  useEffect(() => {
    if (initialValue) {
      setFieldValue(name, initialValue);
    }
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
                key={`${key}_${name}_${isReseting}`}
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
  noStyle,
  feedbackIcons,
  ref,
  ...props
}: FormItemChildComponentProps) => {
  const formContext = useContext(FormContext);

  const [wasNormalize, setWasNormalize] = useState(false);

  const { getFieldsValue } = formContext || {};

  const handleChange = (e: SyntheticBaseEvent) => {
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

    setFieldValue(name, rawValue, undefined, undefined, true);
  };

  const injectPropsIntoFinalLeaf = (child: ReactElement): ReactElement => {
    if (!isValidElement(child)) {
      return child;
    }

    const childProps = child.props as ReactElement & {
      children: ReactElement[],
      __injected: boolean,
      onChange?: (e: SyntheticBaseEvent, option?: OptionProps) => void
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
      onChange={(e: SyntheticBaseEvent, option?: OptionProps) => {
        handleChange(e);

        childProps?.onChange?.(e, option)
      }}
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