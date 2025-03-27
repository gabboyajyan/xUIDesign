import {
  Children,
  cloneElement,
  isValidElement,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { RuleType, SyntheticBaseEvent } from '@/xUiDesign/types';
import { FieldInstancesRef, FormItemProps } from '@/xUiDesign/types/form';
import { OptionProps } from '@/xUiDesign/types/select';
import { prefixClsFormItem } from '@/xUiDesign/utils';
import './style.css';
import { FormContext } from '..';

export const FormItem = memo(
  ({
    prefixCls = prefixClsFormItem,
    name,
    label,
    rules = [],
    children,
    className = '',
    layout = 'vertical',
    style = {},
    initialValue,
    valuePropName,
    ...props
  }: FormItemProps) => {
    const formContext = useContext(FormContext);
    const fieldRef = useRef<FieldInstancesRef>(null);

    if (!formContext) {
      throw new Error('FormItem must be used within a Form');
    }

    const {
      registerField,
      getFieldValue,
      setFieldValue,
      getFieldError,
      getFieldInstance
    } = formContext;

    useEffect(() => {
      if (!getFieldInstance(name)) {
        registerField(name, rules);
      }
    }, [name, rules]);

    const isRequired = useMemo(
      () => rules.some(rule => rule.required),
      [rules]
    );

    const childrenList = useMemo(
      () => (Array.isArray(children) ? children : [children]).filter(e => e),
      [children]
    );

    const mergeRefs = (elementRef: (el: FieldInstancesRef) => void) => {
      return (el: FieldInstancesRef) => {
        fieldRef.current = el;

        if (typeof elementRef === 'function') {
          elementRef(el);
        } else if (elementRef && typeof elementRef === 'object') {
          elementRef.current = el;
        }
      };
    };

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
          if (isValidElement(child)) {
            return cloneElement(child, {
              ref: mergeRefs(child.ref),
              name,
              error: Boolean(errorMessage),
              ...props,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              size: child.props.size || props.size,
              value:
                getFieldValue(valuePropName || name) ??
                initialValue ??
                child.props.value,
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

        {errorMessage ? (
          <span className={`${prefixCls}-error`}>{errorMessage}</span>
        ) : null}
      </div>
    );
  }
);

FormItem.displayName = 'FormItem';
