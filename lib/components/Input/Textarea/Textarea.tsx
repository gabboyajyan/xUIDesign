'use client';

import React, {
  ChangeEvent,
  KeyboardEvent,
  RefObject,
  useEffect,
  useRef,
  useState
} from 'react';
import { clsx } from '../../../helpers';
import { TextareaProps } from '../../../types/input';
import { prefixClsTextArea } from '../../../utils';
import './style.css';

const Textarea = ({
  prefixCls = prefixClsTextArea,
  prefixClsV3 = prefixClsTextArea,
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
  ref,
  ...props
}: TextareaProps) => {
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
    <div className={`${prefixCls}-wrapper ${prefixClsV3}-wrapper ${rootClassName || ''}`}>
      <textarea
        {...props}
        ref={ref || textareaRef}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ ...styles?.textarea, ...style }}
        className={clsx([
          `${prefixCls} ${prefixClsV3} ${prefixCls}-${size} ${prefixClsV3}-${size} ${prefixClsV3}-${variant} ${prefixCls}-${variant} ${prefixClsV3}-${variant} ${className}`,
          {
            [`${prefixCls}-bordered ${prefixClsV3}-bordered`]: bordered,
            [`${prefixCls}-success ${prefixClsV3}-success`]: status === 'success',
            [`${prefixCls}-error ${prefixClsV3}-error`]: status === 'error' || error
          }
        ])}
      />

      {allowClear && inputValue && (
        <button className={`${prefixCls}-clear ${prefixClsV3}-clear`} onClick={handleClear}>
          &#x2715;
        </button>
      )}
    </div>
  );
};

Textarea.displayName = 'Textarea';

export default Textarea;
