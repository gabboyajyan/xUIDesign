import { FC, ReactElement } from 'react';
import { clsx } from '../../../helpers';
import { SkeletonAvatarProps } from '../../../types/skeleton';
import { prefixClsSkeleton } from '../../../utils';
import './style.css';

export const AVATAR_DEFAULT_SIZE = 32;
export const AVATAR_GLOBAL_SIZE = 40;

export const GET_AVATAR_SKELETON_PROPS = (
  avatar: SkeletonAvatarProps | boolean
): SkeletonAvatarProps => {
  return typeof avatar !== 'boolean'
    ? {
        shape: avatar?.shape || 'circle',
        size: avatar?.size || AVATAR_GLOBAL_SIZE,
        style: avatar?.style || {},
        className: avatar?.className || ''
      }
    : {
        shape: 'circle',
        size: AVATAR_GLOBAL_SIZE
      };
};

const SkeletonAvatar: FC<SkeletonAvatarProps> = ({
  prefixCls = prefixClsSkeleton,
  className,
  shape = 'circle',
  style,
  wrapperStyle,
  size = AVATAR_DEFAULT_SIZE,
  active,
  applyElementStyle = true,
  ...props
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
      style={wrapperStyle}
      {...props}
    >
      <span
        className={clsx([`${prefixCls}-avatar ${prefixCls}-avatar-${shape}`])}
        style={{
          ...(size ? { width: size, height: size, lineHeight: size } : {}),
          ...(style || {})
        }}
      />
    </div>
  );
};

export default SkeletonAvatar