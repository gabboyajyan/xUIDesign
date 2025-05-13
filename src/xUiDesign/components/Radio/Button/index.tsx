"use client"

import { ReactNode } from 'react';
import { SizeType } from '@/xUiDesign/types';
import { RadioProps } from '@/xUiDesign/types/radio';
import { prefixClsRadio } from '@/xUiDesign/utils';
import { Radio } from '..';
import './style.css';
import { clsx } from '@/xUiDesign/helpers';

interface RadioButtonProps extends RadioProps {
  children?: ReactNode;
  size?: SizeType;
}

const RadioButton = ({
  prefixCls = prefixClsRadio,
  className = '',
  checked,
  disabled,
  children,
  size = 'middle',
  ...props
}: RadioButtonProps) => {
  return (
    <Radio
      {...props}
      checked={checked}
      disabled={disabled}
      className={clsx([
        `${prefixCls}-button`,
        {
          disabled,
          [className]: className,
          [`${prefixCls}-button-${size}`]: size,
          [`${prefixCls}-button-checked`]: checked
        }
      ])}
    >
      <span className={`${prefixCls}-button-content`}>
        {children ?? props.value}
      </span>
    </Radio>
  );
};

export { RadioButton };
