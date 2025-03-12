import { ChangeEvent, cloneElement, FC, useContext, useEffect, useMemo } from 'react';
import { FormContext } from '..';
import { prefixClsFormItem } from '@/app/utils';
import { OptionProps } from '@/app/types/select';
import { RuleTypes, TargetProps } from '@/app/types';
import { FormItemProps } from '@/app/types/form';
import './style.css';

export const FormItem: FC<FormItemProps> = ({
  prefixCls = prefixClsFormItem,
  name,
  label,
  rules = [],
  children,
  className = '',
  layout = 'horizontal',
  style = {},
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
    <div style={style} className={`${prefixCls} ${className} ${layout}`}>
      <label className={`${prefixCls}-label`} htmlFor={name}>
        {layout === 'horizontal' ? `${label}: ` : label} {isRequired && <span className={`${prefixCls}-required`}>*</span>}
      </label>

      {cloneElement(children, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        size: props.size,
        value: getFieldValue(name),
        error: !!getFieldError(name).length,
        onChange: (e: ChangeEvent & TargetProps, option?: OptionProps) => {
          const value = e.target.valueAnyType ?? e.target.value;
          console.log({ [name]: value });


          setFieldValue(name, value)

          const childOnChange = (children.props as { onChange?: (value: RuleTypes, option?: OptionProps) => void }).onChange;
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
