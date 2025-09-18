'use client';

import React, {
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

const InputComponent = ({
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
  ref,
  ...props
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastKeyPressed = useRef<string | null>(null);
  const internalValue = mask ? applyMask(stripMask(`${value ?? ''}`, mask, maskChar), mask, maskChar).masked : value ?? '';
  const [maskValue, setMaskValue] = useState(internalValue)
  const [iconRenderVisible, setIconRenderVisible] = useState(false);
  const animationRef = useRef<number | null>(null);

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
    setMaskValue(mask ? applyMask(stripMask(`${value ?? ''}`, mask, maskChar), mask, maskChar).masked : (value ?? ''));
  }, [value, mask, maskChar]);

  const handleChange = (e: SyntheticBaseEvent) => {
    if (!inputRef.current) return;

    let rawInput = e.target.value as string;
    const raw = mask ? rawInput.replace(maskRegex, '') : rawInput;

    if (mask) {
      if (!inputRef.current) return;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const { masked, rawIndex } = applyMask(raw, mask, maskChar);
      rawInput = masked;

      animationRef.current = requestAnimationFrame(() => {
        const isRemove = lastKeyPressed.current === 'Delete' || lastKeyPressed.current === 'Backspace';

        let nextCaret = !isRemove ? rawIndex : inputRef.current?.selectionStart ?? 0;

        while (isRemove ? mask.includes(rawInput[nextCaret - 1]) : maskChar !== rawInput[nextCaret]) {
          if (!isRemove && !rawInput[nextCaret]) {
            break;
          }

          if (isRemove) {
            nextCaret--;
          } else {
            nextCaret++;
          }
        }

        inputRef.current?.setSelectionRange(nextCaret, nextCaret);
      })
    };

    setMaskValue(rawInput);

    const eventWithMaskedValue = {
      ...e,
      target: {
        ...e.target,
        value: rawInput
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    animationRef.current = requestAnimationFrame(() => {
      props.onChange?.(eventWithMaskedValue as RuleType);
    })
  };

  const handleClear = (e: MouseEvent<HTMLSpanElement> & TargetProps) => {
    if (mask) {
      setMaskValue('')
    }

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
          value={maskValue}
          onChange={handleChange}
          onKeyDown={handleOnKeyDown}
          className={clsx([prefixCls, className])}
        />

        {allowClear && internalValue ?
          <span className={`${prefixCls}-clear`} onClick={handleClear}>
            <ErrorIcon />
          </span> : null
        }

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
};

InputComponent.displayName = 'Input';

const Input = InputComponent as typeof InputComponent & {
  TextArea: typeof Textarea;
};

Input.TextArea = Textarea;

export default Input;
