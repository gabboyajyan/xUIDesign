'use client';

import { ForwardedRef, forwardRef, useEffect } from 'react';
import { clsx, parseValue } from '../../helpers';
import { RadioProps } from '../../types/radio';
import { prefixClsRadio } from '../../utils';
import RadioButton from './Button/Button';
import RadioGroup from './Group/Group';
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
      noStyle
    },
    ref: ForwardedRef<HTMLLabelElement>
  ) => {
    const handleChange = () => {
      if (!disabled) {
        onClick?.(parseValue(title ?? value));
        onChange?.(parseValue(title ?? value));
      }
    };

    useEffect(() => {
      if (defaultChecked ?? checked) {
        onChange?.(parseValue(value));
      }
    }, [defaultChecked, checked]);

    return (
      <label
        ref={ref}
        title={title}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={clsx([
          `${prefixCls}-label`,
          {
            disabled,
            noStyle: noStyle,
            [className]: className
          }
        ])}
      >
        <input
          name={name}
          type="radio"
          onClick={onClick}
          disabled={disabled}
          onChange={handleChange}
          onBlur={e => onBlur?.(e)}
          onFocus={e => onFocus?.(e)}
        />
        <span
          className={clsx([
            `${prefixCls} ${prefixCls}-${disabled ? 'disabled' : 'enabled'}`
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

export default Radio;
