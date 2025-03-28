import { ForwardedRef, forwardRef, useEffect } from 'react';
import cc from 'classcat';
import { parseValue } from '@/xUiDesign/helpers';
import { SyntheticBaseEvent } from '@/xUiDesign/types';
import { RadioProps } from '@/xUiDesign/types/radio';
import { prefixClsRadio } from '@/xUiDesign/utils';
import { RadioButton } from './Button';
import { RadioGroup } from './Group';
import './style.css';

const RadioComponent = forwardRef<HTMLLabelElement, RadioProps>(
  (
    {
      prefixCls = prefixClsRadio,
      className = '',
      value,
      onChange,
      onClick,
      disabled,
      children,
      name,
      title,
      defaultChecked,
      checked,
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      error
    },
    ref: ForwardedRef<HTMLLabelElement>
  ) => {
    const handleChange = (e: SyntheticBaseEvent) => {
      if (!disabled) {
        onChange?.(parseValue(e.target.value));
      }
    };

    useEffect(() => {
      if (defaultChecked ?? checked) {
        onChange?.(parseValue(value));
      }
    }, [defaultChecked, checked, value, onChange]);

    return (
      <label
        ref={ref}
        title={title}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={cc([
          `${prefixCls}-label`,
          {
            disabled,
            [className]: className
          }
        ])}
      >
        <input
          name={name}
          type="radio"
          value={value}
          onClick={onClick}
          disabled={disabled}
          onChange={handleChange}
          onBlur={e => onBlur?.(e)}
          onFocus={e => onFocus?.(e)}
        />
        <span
          className={cc([
            `${prefixCls} ${prefixCls}-${disabled ? 'disabled' : 'enabled'}`,
            { [`${prefixCls}-error`]: error }
          ])}
        />
        <span className={`${prefixCls}-title`}>
          {children ?? title ?? value}
        </span>
      </label>
    );
  }
);

RadioComponent.displayName = 'Radio';
const Radio = Object.assign(RadioComponent, {
  Group: RadioGroup,
  Button: RadioButton
});

export { Radio };
