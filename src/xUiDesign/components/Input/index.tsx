'use client';

import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  useState
} from 'react';
import cc from 'classcat';
import { SyntheticBaseEvent, TargetProps } from '@/xUiDesign/types';
import { InputProps } from '@/xUiDesign/types/input';
import { prefixClsInput } from '@/xUiDesign/utils';
import './style.css';
import { Textarea } from './Textarea';

const InputComponent = forwardRef(
  (
    {
      size = 'large',
      error,
      suffix,
      prefix,
      addonAfter,
      addonBefore,
      onPressEnter,
      disabled = false,
      allowClear = false,
      prefixCls = prefixClsInput,
      className = '',
      value = undefined,
      iconRender,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [internalValue, setInternalValue] = useState(value ?? '');
    const [iconRenderVisible, setIconRenderVisible] = useState(false);

    const handleChange = (e: SyntheticBaseEvent) => {
      setInternalValue(e.target.value as string);

      props.onChange?.({
        target: e?.target,
        currentTarget: e.currentTarget
      });
    };

    const handleClear = (e: MouseEvent<HTMLSpanElement> & TargetProps) => {
      setInternalValue('');

      e.target.value = '';

      props.onChange?.({
        target: e?.target,
        currentTarget: e.currentTarget
      });
    };

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onPressEnter) {
        onPressEnter(e);
      }
    };

    return (
      <div
        className={cc([
          `${prefixCls}-container`,
          {
            [`${prefixCls}-error`]: error,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-${size}`]: size
          },
          className
        ])}
        style={props.style}
      >
        {addonBefore && (
          <span className={`${prefixCls}-addon ${prefixCls}-before`}>
            {addonBefore}
          </span>
        )}

        <div className={`${prefixCls}-wrapper`}>
          {prefix && <span className={`${prefixCls}-prefix`}>{prefix}</span>}

          <input
            ref={ref}
            {...props}
            {...(props.type === 'password' && iconRender ? {
              type: iconRenderVisible ? 'text' : 'password'
            } : {})}
            disabled={disabled}
            value={internalValue}
            onChange={handleChange}
            onKeyDown={handleOnKeyDown}
            className={cc([prefixCls, className])}
          />

          {allowClear && internalValue && (
            <span className={`${prefixCls}-clear`} onClick={handleClear}>
              &#x2715;
            </span>
          )}

          {suffix && <span className={`${prefixCls}-suffix`}>{suffix}</span>}
        </div>

        {(addonAfter || iconRender) ? (
          <span className={`${prefixCls}-addon ${prefixCls}-after`} onClick={() => iconRender && setIconRenderVisible(icon => !icon)}>
            {addonAfter || iconRender?.(iconRenderVisible)}
          </span>
        ) : null}
      </div>
    );
  }
);

InputComponent.displayName = 'Input';

const Input = InputComponent as typeof InputComponent & {
  TextArea: typeof Textarea;
};

Input.TextArea = Textarea;

export { Input };
