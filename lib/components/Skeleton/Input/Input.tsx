import { FC, ReactElement } from 'react';
import { clsx } from '@/helpers';
import { SkeletonInputProps } from '@/types/skeleton';
import { prefixClsSkeleton } from '@/utils';
import './style.css';

const INPUT_SKELETON_SIZE = {
  small: `${prefixClsSkeleton}-input-sm`,
  large: `${prefixClsSkeleton}-input-lg`,
  default: ''
};

const SkeletonInput: FC<SkeletonInputProps> = ({
  prefixCls = prefixClsSkeleton,
  style,
  block,
  active,
  className,
  size = 'default'
}): ReactElement => {
  return (
    <div
      className={clsx([
        `${prefixCls}-element`,
        {
          [`${prefixCls}-active`]: active,
          [`${prefixCls}-block`]: block
        },
        className
      ])}
    >
      <span
        className={`${prefixCls}-input ${INPUT_SKELETON_SIZE[size]} ${
          className || ''
        }`}
        style={style}
      />
    </div>
  );
};

export default SkeletonInput