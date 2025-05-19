'use client';

import { clsx } from '@/helpers';
import { RadioButtonProps } from '@/types/radio';
import { prefixClsRadio } from '@/utils';
import './style.css';
import Radio from '../Radio';

const RadioButton = ({
  prefixCls = prefixClsRadio,
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

export default RadioButton;
