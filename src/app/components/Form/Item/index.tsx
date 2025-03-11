import { ChangeEvent, cloneElement, FC, ReactElement, useContext, useEffect, useMemo } from 'react';
import { FormContext } from '..';
import { RuleObject, RuleType } from '@/src/app/types/form';
import { prefixClsFormItem } from '@/src/app/utils';
import { OptionProps } from '@/src/app/types/select';
import './style.css';

export type FormItemProps = {
  name: string;
  label: string;
  rules?: RuleObject[];
  children: ReactElement;
  className?: string;
  prefixCls?: string;
  layout?: 'horizontal' | 'vertical' | 'inline';
};

export const FormItem: FC<FormItemProps> = ({
  prefixCls = prefixClsFormItem,
  name,
  label,
  rules = [],
  children,
  className = '',
  layout = 'horizontal',
  ...props
}) => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    throw new Error('FormItem must be used within a Form');
  }

  const { registerField, getFieldValue, setFieldValue, getFieldError } =
    formContext;

  useEffect(() => {
    registerField(name, rules);
  }, [name, registerField, rules]);

  const isRequired = useMemo(() => rules.some(rule => rule.required), [rules]);

  return (
    <div className={`${prefixCls} ${className} ${layout}`}>
      <label className={`${prefixCls}-label`} htmlFor={name}>
        {label} {isRequired && <span className={`${prefixCls}-required`}>*</span>}
      </label>

      {cloneElement(children, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        size: props.size,
        value: getFieldValue(name),
        error: !!getFieldError(name).length,
        onChange: (e: ChangeEvent & { target: { value: RuleType, valueAnyType: RuleType } }, option?: OptionProps) => {
          const value = e.target.valueAnyType ?? e.target.value;

          setFieldValue(name, value)

          const childOnChange = (children.props as { onChange?: (value: RuleType, option?: OptionProps) => void }).onChange;
          childOnChange?.(value, option);
        },
        ...props
      })}

      {getFieldError(name).length ? (
        <span className={`${prefixCls}-error`}>{getFieldError(name)[0]}</span>
      ) : null}
    </div>
  );
};
