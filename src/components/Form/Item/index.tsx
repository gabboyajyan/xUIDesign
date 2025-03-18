import { cloneElement, FC, useContext, useEffect, useMemo } from 'react';
import { FormContext } from '..';
import { prefixClsFormItem } from '@/utils';
import { OptionProps } from '@/types/select';
import { SyntheticBaseEvent, RuleType } from '@/types';
import { FormItemProps } from '@/types/form';
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
        ...props,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        size: children.props.size || props.size,
        error: Boolean(getFieldError(name).length),
        value: getFieldValue(name) ?? children.props.value,
        onChange: (e: SyntheticBaseEvent, option?: OptionProps) => {
          const value: RuleType | SyntheticBaseEvent = e.target ? e.target.value : e;

          setFieldValue(name, value as RuleType)

          const childOnChange = (children.props as { onChange?: (e: SyntheticBaseEvent, option?: OptionProps) => void }).onChange;
          childOnChange?.(e, option);
        }
      })}

      {Boolean(getFieldError(name).length) ? (
        <span className={`${prefixCls}-error`}>{getFieldError(name)[0]}</span>
      ) : null}
    </div>
  );
};
