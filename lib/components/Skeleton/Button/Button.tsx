import { FC, ReactElement } from 'react';
import { clsx } from '../../../helpers';
import { SkeletonButtonProps } from '../../../types/skeleton';
import { prefixClsSkeleton } from '../../../utils';
import './style.css';

const BUTTON_SKELETON_SIZE = {
  small: `${prefixClsSkeleton}-button-sm`,
  large: `${prefixClsSkeleton}-button-lg`,
  default: ''
};

const SkeletonButton: FC<SkeletonButtonProps> = ({
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

export default SkeletonButton
