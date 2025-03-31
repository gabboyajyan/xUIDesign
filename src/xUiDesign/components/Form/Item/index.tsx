import {
  Children,
  Fragment,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react';
import {
  RuleType,
  RuleTypes,
  SizeType,
  SyntheticBaseEvent
} from '@/xUiDesign/types';
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
  size?: SizeType;
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
  initialValue,
  ...props
}: FormItemProps) => {
  const formContext = useContext(FormContext);

  const errorRef = useRef<HTMLSpanElement>(null);

  if (!formContext) {
    throw new Error('FormItem must be used within a Form');
  }

  const {
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
    if (errorRef.current && errorRef.current?.clientHeight >= 24) {
      errorRef.current.style.position = 'relative';
      errorRef.current.style.marginTop = '-16px';
    }
  }, [errorRef.current]);

  const isRequired = useMemo(() => rules.some(rule => rule.required), [rules]);

  const errorMessage = getFieldError(valuePropName || name)?.[0];

  return (
    <div style={style} className={`${prefixCls} ${className} ${layout}`}>
      {(label || name) && (
        <label className={`${prefixCls}-label`} htmlFor={name}>
          {label || name}:
          {isRequired && <span className={`${prefixCls}-required`}>*</span>}
        </label>
      )}

      {Children.map(childrenList, child => {
        if (isValidElement(child) && child.type !== Fragment) {
          const { value, ...childProps } = child.props;
          const fieldValue =
            getFieldValue(valuePropName || name) ?? initialValue;

          return (
            <FormItemChildComponent
              {...childProps}
              child={child}
              name={name}
              value={value}
              size={childProps.size || props.size}
              error={Boolean(errorMessage)}
              fieldValue={fieldValue}
              setFieldValue={setFieldValue}
              valuePropName={valuePropName}
            />
          );
        }

        return child;
      })}

      {errorMessage && (
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
      {...(error ? { error } : {})}
      value={fieldValue ?? props.value}
      onChange={handleChange}
    />
  );
};

FormItem.displayName = 'FormItem';
