import { ReactElement } from 'react';
import { clsx, createArray } from '@/xUiDesign/helpers';
import { SkeletonProps } from '@/xUiDesign/types/skeleton';
import { prefixClsSkeleton } from '@/xUiDesign/utils';
import { GET_AVATAR_SKELETON_PROPS, SkeletonAvatar } from './Avatar';
import { SkeletonButton } from './Button';
import { SkeletonImage } from './Image';
import { SkeletonInput } from './Input';
import './style.css';

const PARAGRAPH_AVATAR_ROWS = 2;
const PARAGRAPH_DEFAULT_ROWS = 3;

export const Skeleton = ({
  prefixCls = prefixClsSkeleton,
  active,
  className,
  style,
  avatar,
  paragraph,
  round,
  title,
  teamLogo = true
}: SkeletonProps): ReactElement => {
  const GET_TITLE_SKELETON_PROPS =
    typeof title !== 'boolean'
      ? {
          style: { width: title?.width, ...title?.style },
          className: title?.className || ''
        }
      : {};

  const PARAGRAPH_ROWS = avatar
    ? PARAGRAPH_AVATAR_ROWS
    : PARAGRAPH_DEFAULT_ROWS;

  const HAS_PHARAGRAPH =
    typeof paragraph === 'boolean' || !paragraph
      ? PARAGRAPH_ROWS
      : paragraph?.rows ?? PARAGRAPH_ROWS;

  return (
    <div
      className={clsx([
        prefixCls,
        {
          [`${prefixCls}__withAvatar`]: avatar,
          [`${prefixCls}-active`]: active,
          [`${prefixCls}-round`]: round
        },
        className
      ])}
      style={style}
    >
      {avatar && teamLogo && (
        <div className={`${prefixCls}__header`}>
          <SkeletonAvatar {...GET_AVATAR_SKELETON_PROPS(avatar)} />
        </div>
      )}

      <div className={`${prefixCls}-content`}>
        <h3
          className={clsx([
            `${prefixCls}-title ${GET_TITLE_SKELETON_PROPS.className}`,
            { [`${prefixCls}-title-avatar`]: avatar }
          ])}
          style={GET_TITLE_SKELETON_PROPS.style}
        />

        {paragraph !== false && (
          <ul
            className={`${prefixCls}-paragraph`}
            style={{
              ...(typeof paragraph !== 'boolean' && paragraph
                ? paragraph.style
                : {})
            }}
          >
            {createArray(HAS_PHARAGRAPH).map(key => (
              <li key={key}></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Skeleton.Image = SkeletonImage;
Skeleton.Input = SkeletonInput;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Button = SkeletonButton;
