'use client';

import React, { useEffect } from 'react';
import { clsx, parseValue } from '../../helpers';
import { RadioProps } from '../../types/radio';
import { prefixClsRadio } from '../../utils';
import './style.css';

const Radio = ({
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
  noStyle,
  ref
}: RadioProps
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
        tabIndex={0}
        role="button"
        onClick={onClick}
        disabled={disabled}
        onChange={handleChange}
        onBlur={e => onBlur?.(e)}
        onFocus={e => onFocus?.(e)}
        checked={checked ?? defaultChecked}
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
};

Radio.displayName = 'Radio';

export default Radio;
