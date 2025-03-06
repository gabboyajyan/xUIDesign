import { cloneElement, FC, ReactElement, useContext, useEffect, useMemo } from 'react';
import { FormContext } from '..';
import { RuleObject, RuleType } from '@/app/types/form';
import { prefixClsForm } from '@/app/utils';
import './style.css';

export type FormItemProps = {
  name: string;
  label: string;
  rules?: RuleObject[];
  children: ReactElement;
  className?: string;
  prefixCls?: string;
};

export const FormItem: FC<FormItemProps> = ({
  prefixCls = prefixClsForm,
  name,
  label,
  rules = [],
  children,
  className,
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
    <div className={`${prefixCls} ${className}`}>
      <label className={`${prefixCls}-label`} htmlFor={name}>
        {label} {isRequired && <span className={`${prefixCls}-required`}>*</span>}
      </label>

      {cloneElement(children, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        size: props.size,
        value: getFieldValue(name),
        error: !!getFieldError(name).length,
        onChange: (e: RuleType) => {
          setFieldValue(name, e)
        },
        ...props
      })}

      {getFieldError(name).length ? (
        <span className={`${prefixCls}-error`}>{getFieldError(name)[0]}</span>
      ) : null}
    </div>
  );
};
