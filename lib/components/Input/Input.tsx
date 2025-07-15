'use client';

import React, {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { clsx } from '../../helpers';
import { RuleType, SyntheticBaseEvent, TargetProps } from '../../types';
import { InputProps } from '../../types/input';
import { prefixClsInput } from '../../utils';
import Textarea from './Textarea/Textarea';
import { ErrorIcon } from '../Icons/Icons';
import { applyMask, MASK_CHAR, MASK_REGEX, stripMask } from '../../helpers/mask';
import './style.css';

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
      mask,
      maskChar = MASK_CHAR,
      maskRegex = MASK_REGEX,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      __injected,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      defaultValue,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      child,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const lastKeyPressed = useRef<string | null>(null);
    const [internalValue, setInternalValue] = useState(() =>
      mask
        ? applyMask(stripMask(`${value ?? ''}`, mask, maskChar), mask, maskChar)
        : value ?? ''
    );
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

    useEffect(() => {
      setInternalValue(mask ? applyMask(stripMask(`${value ?? ''}`, mask, maskChar), mask, maskChar) : `${value ?? ''}`);
    }, [value, mask, maskChar]);

    const handleChange = (e: SyntheticBaseEvent) => {
      const inputEl = inputRef.current;
      if (!inputEl) return;

      const rawInput = e.target.value as string;
      let nextCaret = inputEl.selectionStart ?? rawInput.length;

      const raw = mask ? rawInput.replace(maskRegex, '') : rawInput;
      const masked = mask ? applyMask(raw, mask, maskChar) : rawInput;

      setInternalValue(masked);

      if (mask) {
        requestAnimationFrame(() => {
          if (!inputEl) return;

          const isBackspace = lastKeyPressed.current === 'Backspace';
          const isDelete = lastKeyPressed.current === 'Delete';

          while (mask.includes(masked[nextCaret - 1])) {
            if (isBackspace || isDelete) {
              nextCaret--;
            } else {
              nextCaret++;
            }
          }

          inputEl.setSelectionRange(nextCaret, nextCaret);
        });
      }

      const eventWithMaskedValue = {
        ...e,
        target: {
          ...e.target,
          value: masked
        }
      };

      props.onChange?.(eventWithMaskedValue as RuleType);
    };

    const handleClear = (e: MouseEvent<HTMLSpanElement> & TargetProps) => {
      setInternalValue('');
      e.target.value = '';
      props.onChange?.(e);
    };

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      lastKeyPressed.current = e.key;

      if (e.key === 'Enter' && onPressEnter) {
        onPressEnter(e);
      }
    };

    return (
      <div
        className={clsx([
          `${prefixCls}-container`,
          {
            [`${prefixCls}-error`]: error,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-${size}`]: size,
            noStyle: noStyle
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
              ? { type: iconRenderVisible ? 'text' : 'password' }
              : {})}
            disabled={disabled}
            value={internalValue}
            onChange={handleChange}
            onKeyDown={handleOnKeyDown}
            className={clsx([prefixCls, className])}
          />

          <span className={`${prefixCls}-clear`} onClick={handleClear}>
            {allowClear && internalValue ? <ErrorIcon /> : null}
          </span>

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
              {error && feedbackIcons ? <ErrorIcon /> : null}
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

export default Input;
