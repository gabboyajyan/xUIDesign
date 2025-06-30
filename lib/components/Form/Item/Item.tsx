'use client';

import React, {
  Children,
  Fragment,
  isValidElement,
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
  FormItemChildComponentProps,
  FormItemProps
} from '../../../types/form';
import { OptionProps } from '../../../types/select';
import { prefixClsFormItem } from '../../../utils';
import { FormContext } from '../Form';
import './style.css';

const REF_CLIENT_HEIGHT = 24;

const FormItem = ({
  prefixCls = prefixClsFormItem,
  name,
  label,
  rules = [],
  children,
  className = '',
  layout = 'vertical',
  style = {},
  valuePropName,
  dependencies = [],
  initialValue,
  feedbackIcons,
  ...props
}: FormItemProps) => {
  const [_name] = useState(valuePropName || name);

  const formContext = useContext(FormContext);

  const errorRef = useRef<HTMLSpanElement>(null);

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
    subscribeToFields,
    validateFields
  } = formContext;

  const childrenList = useMemo(() => flattenChildren(children), [children]);

  useEffect(() => {
    if (_name && !getFieldInstance(_name)) {
      console.log({
        _name,
        rules
      });
      
      registerField(_name, rules);
    }
  }, [_name, rules]);

  useEffect(() => {
    if (initialValue) {
      setFieldValue(_name, initialValue);
    }
  }, []);

  useEffect(() => {
    if (_name && dependencies.length > 0) {
      const unsubscribe = subscribeToFields(dependencies, () => {
        validateFields([_name]);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [dependencies, _name]);

  useEffect(() => {
    if (
      errorRef.current &&
      errorRef.current?.clientHeight >= REF_CLIENT_HEIGHT
    ) {
      errorRef.current.style.position = 'relative';
      errorRef.current.style.marginTop = '-16px';
    }
  }, [errorRef.current]);

  const isRequired = useMemo(
    () => rules.some((rule: RuleType) => rule.required),
    [rules]
  );

  const errorMessage = getFieldError(_name)?.[0];

  return (
    <div
      style={style}
      className={clsx([
        `${prefixCls}`,
        {
          [layout]: layout,
          [className]: className,
          noStyle: props.noStyle
        }
      ])}
    >
      {!props.noStyle && (label || _name) && (
        <label className={`${prefixCls}-label`} htmlFor={_name}>
          {label || _name}:
          {isRequired && <span className={`${prefixCls}-required`}>*</span>}
          {/* @Todo need to add Tooltip like Ant design */}
        </label>
      )}

      {Children.map(childrenList, (child, key) => {
        if (isValidElement(child) && child.type !== Fragment) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          const { onChange, value, ...childProps } = child.props;
          const fieldValue =
            getFieldValue(_name) ?? initialValue;

          return (
            <FormItemChildComponent
              {...childProps}
              name={_name}
              child={child}
              value={value}
              fieldValue={fieldValue}
              noStyle={props.noStyle}
              normalize={props.normalize}
              key={`${key}_${isReseting}`}
              error={Boolean(errorMessage)}
              setFieldValue={setFieldValue}
              feedbackIcons={feedbackIcons}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              size={childProps.size || props.size}
              onChange={onChange}
              {...childProps}
            />
          );
        }

        return child;
      })}

      {!props.noStyle && errorMessage && (
        <span ref={errorRef} className={`${prefixCls}-error`}>
          {errorMessage}
        </span>
      )}
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
  ...props
}: FormItemChildComponentProps) => {
  const formContext = useContext(FormContext);

  const [wasNormalize, setWasNormalize] = useState(false);

  const { getFieldsValue } = formContext || {};

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

    setFieldValue(name, rawValue);
    onChange?.(e, option);
  };

  return (
    <child.type
      {...props}
      name={name}
      onChange={handleChange}
      {...(error ? { error } : {})}
      key={`${name}_${wasNormalize}`}
      value={fieldValue ?? props.value}
    />
  );
};

FormItem.displayName = 'FormItem';

export default FormItem;