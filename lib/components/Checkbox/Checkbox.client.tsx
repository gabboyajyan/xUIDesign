'use client';

import React, { ForwardedRef, forwardRef, useState, useEffect } from 'react';
import CheckboxServer from './Checkbox';
import { CheckboxProps } from '../../types/checkbox';

const CheckboxClient = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      prefixCls,
      className,
      defaultChecked = false,
      checked,
      style,
      disabled = false,
      onChange,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onKeyPress,
      onKeyDown,
      tabIndex,
      name,
      children,
      id,
      autoFocus,
      type = 'checkbox',
      value = false,
      required = false,
      noStyle
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [internalChecked, setInternalChecked] = useState(
      checked !== undefined ? checked : defaultChecked || value
    );

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      const newChecked = !internalChecked;
      setInternalChecked(newChecked);

      if (onClick) {
        onClick(e);
      }

      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: newChecked,
            checked: newChecked
          }
        };
        onChange(syntheticEvent);
      }
    };

    useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    return (
      <CheckboxServer
        ref={ref}
        prefixCls={prefixCls}
        className={className}
        checked={internalChecked}
        style={style}
        disabled={disabled}
        onChange={handleClick}
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        name={name}
        id={id}
        autoFocus={autoFocus}
        type={type}
        value={value}
        required={required}
        noStyle={noStyle}
      >
        {children}
      </CheckboxServer>
    );
  }
);

CheckboxClient.displayName = 'CheckboxClient';

export default CheckboxClient;