'use client';

import React from 'react';
import { clsx } from '../../../helpers';
import { RadioButtonProps } from '../../../types/radio';
import { prefixClsRadio, prefixClsRadioV3 } from '../../../utils';
import Radio from '../Radio';
import './style.css';

const RadioButton = ({
  prefixCls = prefixClsRadio,
  prefixClsV3 = prefixClsRadioV3,
  className = '',
  checked,
  disabled,
  children,
  size = 'large',
  ...props
}: RadioButtonProps) => {
  return (
    <Radio
      {...props}
      checked={checked}
      disabled={disabled}
      className={clsx([
        `${prefixCls}-button ${prefixClsV3}-button`,
        {
          disabled,
          [className]: className,
          [`${prefixCls}-button-${size} ${prefixClsV3}-button-${size}`]: size,
          [`${prefixCls}-button-checked ${prefixClsV3}-button-checked`]: checked
        }
      ])}
    >
      <span className={`${prefixCls}-button-content ${prefixClsV3}-button-content`}>
        {children ?? props.value}
      </span>
    </Radio>
  );
};

export default RadioButton;
