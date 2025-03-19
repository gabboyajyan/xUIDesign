import { ReactNode } from 'react';
import cc from 'classcat';
import { SizeType } from '@/xUiDesign/types';
import { RadioProps } from '@/xUiDesign/types/radio';
import { prefixClsRadio } from '@/xUiDesign/utils';
import './style.css';
import { Radio } from '..';

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
  size = 'large',
  ...props
}: RadioButtonProps) => {
  return (
    <Radio
      {...props}
      checked={checked}
      disabled={disabled}
      className={cc([
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
