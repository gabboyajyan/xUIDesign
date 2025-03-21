import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { RuleType, SyntheticBaseEvent } from '@/xUiDesign/types';
import { FieldInstancesRef, FormItemProps } from '@/xUiDesign/types/form';
import { OptionProps } from '@/xUiDesign/types/select';
import { prefixClsFormItem } from '@/xUiDesign/utils';
import { FormContext } from '..';
import './style.css';

export const FormItem: FC<FormItemProps> = ({
  prefixCls = prefixClsFormItem,
  name,
  label,
  rules = [],
  children,
  className = '',
  layout = 'vertical',
  style = {},
  valuePropName,
  ...props
}) => {
  const formContext = useContext(FormContext);
  const fieldRef = useRef<FieldInstancesRef>(null);

  if (!formContext) {
    throw new Error('FormItem must be used within a Form');
  }

  const { registerField, getFieldValue, setFieldValue, getFieldError } =
    formContext;

  useEffect(() => {
    if (fieldRef.current) {
      registerField(name, rules, fieldRef.current);
    }
  }, [name, registerField, rules]);

  const isRequired = useMemo(() => rules.some(rule => rule.required), [rules]);
  const childrenList = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  const mergeRefs = (elementRef: (el: FieldInstancesRef) => void) => {
    console.log(elementRef);

    return (el: FieldInstancesRef) => {
      fieldRef.current = el;

      if (typeof elementRef === 'function') {
        elementRef(el);
      } else if (elementRef && typeof elementRef === 'object') {
        elementRef.current = el;
      }
    };
  };

  return (
    <div style={style} className={`${prefixCls} ${className} ${layout}`}>
      {(label || name) && (
        <label className={`${prefixCls}-label`} htmlFor={name}>
          {label || name}:
          {isRequired && <span className={`${prefixCls}-required`}>*</span>}
        </label>
      )}

      {Children.map(childrenList, child => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            ref: mergeRefs(child.ref),
            name,
            ...props,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            size: child.props.size || props.size,
            error: Boolean(getFieldError(valuePropName || name).length),
            value: getFieldValue(valuePropName || name) ?? child.props.value,
            onChange: (e: SyntheticBaseEvent, option?: OptionProps) => {
              const value: RuleType | SyntheticBaseEvent = e.target
                ? e.target.value
                : e;

              setFieldValue(valuePropName || name, value as RuleType);

              const childOnChange = (
                child.props as {
                  onChange?: (
                    e: SyntheticBaseEvent,
                    option?: OptionProps
                  ) => void;
                }
              ).onChange;

              childOnChange?.(e, option);
            }
          });
        }
      })}

      {getFieldError(valuePropName || name).length ? (
        <span className={`${prefixCls}-error`}>{getFieldError(valuePropName || name)[0]}</span>
      ) : null}
    </div>
  );
};
