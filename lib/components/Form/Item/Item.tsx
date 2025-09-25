'use client';

import React, {
  Children,
  isValidElement,
  ReactElement,
  useCallback,
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
import { prefixClsFormItem, prefixClsFormItemV3 } from '../../../utils';
import { FormContext } from '../Form';
import { useWatchError } from '@/hooks/useWatchError';
import './style.css';

const FormItem = ({
  prefixCls = prefixClsFormItem,
  prefixClsV3 = prefixClsFormItemV3,
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

  const errors = useWatchError(formContext, name)?.[0];

  const {
    isReseting,
    registerField,
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

  return (
    <div
      style={style}
      data-instance={name}
      className={clsx([
        `${prefixCls} ${prefixClsV3}`,
        {
          [layout]: layout,
          [className]: className,
          noStyle: props.noStyle
        }
      ])}
    >
      {!props.noStyle && (label || name) && !hideLabel && (
        <label className={`${prefixCls}-label ${prefixClsV3}-label`} htmlFor={name}>
          {label || name}
          {isRequired && <span className={`${prefixCls}-required ${prefixClsV3}-required`}>*</span>}
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
                error={!!errors}
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
                ? <div className={`${prefixCls}-extra ${prefixClsV3}-extra`}>
                  {extra || ''}
                </div>
                : null}

              {!props.noStyle && (
                <span
                  ref={errorRef}
                  className={clsx([
                    `${prefixCls}-error ${prefixClsV3}-error`,
                    { [`${prefixCls}-has-error ${prefixClsV3}-has-error`]: errors?.length }
                  ])}
                  style={{
                    ...removeErrorMessageHeight ? { minHeight: 0 } : {},
                    ...extra ? { marginBottom: 0 } : {}
                  }}
                >
                  {errors || ''}
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

    const _onChange = useCallback((e: SyntheticBaseEvent, option?: OptionProps) => {
      handleChange(e);

      childProps?.onChange?.(e, option)
    }, [handleChange, childProps?.onChange])

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
      onChange={_onChange}
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