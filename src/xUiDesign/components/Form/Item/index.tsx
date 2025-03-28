import {
  Children,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { RuleType, RuleTypes, SizeType, SyntheticBaseEvent } from '@/xUiDesign/types';
import { FormItemProps } from '@/xUiDesign/types/form';
import { OptionProps } from '@/xUiDesign/types/select';
import { prefixClsFormItem } from '@/xUiDesign/utils';
import './style.css';
import { FormContext } from '..';

interface FormItemChildComponentProps {
  child: React.ReactElement;
  name: string;
  error: boolean;
  fieldValue: RuleTypes;
  value: RuleType;
  setFieldValue: (name: string, value: RuleType) => void;
  onChange?: (e: SyntheticBaseEvent, option?: OptionProps) => void;
  valuePropName?: string;
  size?: SizeType
}

export const FormItem = ({
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
  ...props
}: FormItemProps) => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    throw new Error('FormItem must be used within a Form');
  }

  const {
    registerField,
    getFieldError,
    getFieldValue,
    setFieldValue,
    getFieldInstance,
    subscribeToFields
  } = formContext;

  const childrenList = useMemo(
    () => (Array.isArray(children) ? children : [children]).filter(Boolean),
    [children]
  );

  const unsubscribe = subscribeToFields(dependencies, () => {});

  useEffect(() => {
    if (name && !getFieldInstance(name)) {
      registerField(name, rules);
    }
  }, [name, rules, getFieldInstance, registerField]);

  useEffect(() => {
    if (!dependencies.length) {
      unsubscribe();
    }
  }, [dependencies, unsubscribe]);

  const isRequired = useMemo(
    () => rules.some(rule => rule.required),
    [rules]
  );

  const errorMessage = getFieldError(valuePropName || name)?.[0];

  return (
    <div style={style} className={`${prefixCls} ${className} ${layout}`}>
      {(label || name) && (
        <label className={`${prefixCls}-label`} htmlFor={name}>
          {label || name}:
          {isRequired && <span className={`${prefixCls}-required`}>*</span>}
        </label>
      )}

      {Children.map(childrenList, (child) => {
        if (isValidElement(child)) {
          const { value, ...childProps } = child.props;
          const fieldValue = getFieldValue(valuePropName || name);

          return (
            <FormItemChildComponent
              {...childProps}
              child={child}
              name={name}
              value={value}
              size={(childProps.size || props.size)}
              error={Boolean(errorMessage)}
              fieldValue={fieldValue}
              setFieldValue={setFieldValue}
              valuePropName={valuePropName}
            />
          );
        }
        return child;
      })}

      {errorMessage && <span className={`${prefixCls}-error`}>{errorMessage}</span>}
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
  ...props
}: FormItemChildComponentProps) => {
  const handleChange = (e: SyntheticBaseEvent, option?: OptionProps) => {
    const value: RuleType | SyntheticBaseEvent = e?.target ? e.target.value : e;
    setFieldValue(valuePropName || name, value as RuleType);
    onChange?.(e, option);
  };

  return (
    <child.type
      {...props}
      name={name}
      error={error}
      value={fieldValue ?? props.value}
      onChange={handleChange}
    />
  );
};

FormItem.displayName = 'FormItem';
