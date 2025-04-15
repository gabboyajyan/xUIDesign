"use client"

import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import cc from 'classcat';
import { SyntheticBaseEvent, TargetProps } from '@/xUiDesign/types';
import { InputProps } from '@/xUiDesign/types/input';
import { prefixClsInput } from '@/xUiDesign/utils';
import { Textarea } from './Textarea';
import './style.css';
import { ErrorIcon } from '../icons';

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
      noStyle,
      feedbackIcons,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = useState(value ?? '');
    const [iconRenderVisible, setIconRenderVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      focus: inputRef.current?.focus,
      input: inputRef.current,
      blur: (inputRef.current as HTMLInputElement).blur,
      nativeElement: inputRef.current,
      setSelectionRange: (start: number, end: number) => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(start, end);
        }
      }
    }));

    const handleChange = (e: SyntheticBaseEvent) => {
      setInternalValue(e.target.value as string);

      props.onChange?.(e);
    };

    const handleClear = (e: MouseEvent<HTMLSpanElement> & TargetProps) => {
      setInternalValue('');

      e.target.value = '';

      props.onChange?.(e);
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
            [`${prefixCls}-${size}`]: size,
            'noStyle': noStyle
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
            {...props}
            ref={inputRef}
            {...(props.type === 'password' && iconRender
              ? {
                  type: iconRenderVisible ? 'text' : 'password'
                }
              : {})}
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

          {(suffix || iconRender) && (
            <span
              className={`${prefixCls}-suffix`}
              {...(iconRender !== undefined
                ? {
                    onClick: () => setIconRenderVisible(icon => !icon)
                  }
                : {})}
            >
              {suffix || iconRender?.(iconRenderVisible)}
              {feedbackIcons ? <ErrorIcon /> : null}
            </span>
          )}
        </div>

        {addonAfter ? (
          <span className={`${prefixCls}-addon ${prefixCls}-after`}>
            {addonAfter}
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
