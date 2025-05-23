'use client';

import {
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
import {
  FormItemChildComponentProps,
  FormItemProps
} from '../../../types/form';
import { OptionProps } from '../../../types/select';
import { prefixClsFormItem } from '../../../utils';
import './style.css';
import { FormContext } from '../Form';

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

  const childrenList = useMemo(
    () => (Array.isArray(children) ? children : [children]).filter(Boolean),
    [children]
  );

  useEffect(() => {
    if (name && !getFieldInstance(name)) {
      registerField(name, rules);
    }
  }, [name, rules]);

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

  const errorMessage = getFieldError(valuePropName || name)?.[0];

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
      {!props.noStyle && (label || name) && (
        <label className={`${prefixCls}-label`} htmlFor={name}>
          {label || name}:
          {isRequired && <span className={`${prefixCls}-required`}>*</span>}
          {/* @Todo need to add Tooltip like Ant design */}
        </label>
      )}

      {Children.map(childrenList, (child, key) => {
        if (isValidElement(child) && child.type !== Fragment) {
          const { value, ...childProps } = child.props;
          const fieldValue =
            getFieldValue(valuePropName || name) ?? initialValue;

          return (
            <FormItemChildComponent
              {...childProps}
              name={name}
              child={child}
              value={value}
              fieldValue={fieldValue}
              noStyle={props.noStyle}
              normalize={props.normalize}
              key={`${key}_${isReseting}`}
              error={Boolean(errorMessage)}
              setFieldValue={setFieldValue}
              valuePropName={valuePropName}
              feedbackIcons={feedbackIcons}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              size={childProps.size || props.size}
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
  valuePropName,
  normalize,
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

    setFieldValue(valuePropName || name, rawValue);
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