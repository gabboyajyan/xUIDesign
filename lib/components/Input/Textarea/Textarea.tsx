'use client';

import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  RefObject,
  useEffect,
  useRef,
  useState
} from 'react';
import { clsx } from '@/helpers';
import { TextareaProps } from '@/types/input';
import { prefixClsTextArea } from '@/utils';
import './style.css';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      prefixCls = prefixClsTextArea,
      value,
      className = '',
      style,
      autoSize,
      onPressEnter,
      onResize,
      styles,
      bordered = true,
      size = 'large',
      status,
      rootClassName,
      variant = 'outlined',
      error,
      allowClear = false,
      ...props
    },
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const [inputValue, setInputValue] = useState(value?.toString() || '');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      const textarea =
        (ref as RefObject<HTMLTextAreaElement>)?.current || textareaRef.current;

      if (textarea && autoSize) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;

        if (onResize) {
          onResize({
            width: textarea.clientWidth,
            height: textarea.scrollHeight
          });
        }
      }
    }, [inputValue, autoSize, onResize, ref]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value);

      if (props.onChange) {
        props.onChange(e);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && onPressEnter) {
        onPressEnter(e);
      }
    };

    const handleClear = () => {
      setInputValue('');

      if (props.onChange) {
        props.onChange({
          target: { value: '' }
        } as ChangeEvent<HTMLTextAreaElement>);
      }
    };

    return (
      <div className={`${prefixCls}-wrapper ${rootClassName || ''}`}>
        <textarea
          {...props}
          ref={ref || textareaRef}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{ ...styles?.textarea, ...style }}
          className={clsx([
            `${prefixCls} ${prefixCls}-${size} ${prefixCls}-${variant} ${className}`,
            {
              [`${prefixCls}-bordered`]: bordered,
              [`${prefixCls}-success`]: status === 'success',
              [`${prefixCls}-error`]: status === 'error' || error
            }
          ])}
        />

        {allowClear && inputValue && (
          <button className={`${prefixCls}-clear`} onClick={handleClear}>
            &#x2715;
          </button>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
