import { cloneElement, FC, ReactElement, useContext, useEffect, useMemo } from 'react';
import { FormContext } from '..';
import { RuleObject } from '@/app/types';
import './style.css';

type FormItemProps = {
  name: string;
  label: string;
  rules?: RuleObject[];
  children: ReactElement;
  className?: string;
};

export const FormItem: FC<FormItemProps> = ({
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
    <div className={`xUi-formItem ${className}`}>
      <label className="xUi-inputLabel" htmlFor={name}>
        {label} {isRequired && <span className="xUi-required">*</span>}
      </label>

      {cloneElement(children, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        size: props.size,
        value: getFieldValue(name),
        error: !!getFieldError(name).length,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setFieldValue(name, e.target.value)
      })}

      {getFieldError(name).length ? (
        <span className="xUi-error">{getFieldError(name)[0]}</span>
      ) : null}
    </div>
  );
};
