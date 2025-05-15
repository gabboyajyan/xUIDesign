import { FC, ReactElement } from 'react';
import { clsx } from '@/xUiDesign/helpers';
import { SkeletonButtonProps } from '@/xUiDesign/types/skeleton';
import './style.css';
import { prefixClsSkeleton } from '@/xUiDesign/utils';

const BUTTON_SKELETON_SIZE = {
  small: `${prefixClsSkeleton}-button-sm`,
  large: `${prefixClsSkeleton}-button-lg`,
  default: ''
};

export const SkeletonButton: FC<SkeletonButtonProps> = ({
  prefixCls = prefixClsSkeleton,
  style = {},
  active,
  className,
  size = 'default',
  applyElementStyle = true
}): ReactElement => {
  return (
    <div
      className={clsx([
        `${prefixCls}`,
        {
          [`${prefixCls}-element`]: applyElementStyle,
          [`${prefixCls}-active`]: active
        },
        className
      ])}
    >
      <span
        className={clsx([
          `${prefixCls}-button `,
          BUTTON_SKELETON_SIZE[size],
          className
        ])}
        style={style}
      ></span>
    </div>
  );
};
