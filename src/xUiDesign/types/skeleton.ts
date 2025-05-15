import { CSSProperties, ReactNode } from 'react';
import { DefaultProps } from '.';

declare type widthUnit = number | string;

export interface SkeletonElementProps {
  className?: string;
  style?: CSSProperties;
  size?: 'large' | 'small' | 'default' | number;
  shape?: 'circle' | 'square' | 'round';
  active?: boolean;
}

export type SkeletonProps = DefaultProps & {
  active?: boolean;
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  avatar?: SkeletonAvatarProps | boolean;
  title?: SkeletonTitleProps | boolean;
  paragraph?: SkeletonParagraphProps | boolean;
  round?: boolean;
  teamLogo?: boolean;
};

interface SkeletonTitleProps {
  className?: string;
  style?: CSSProperties;
  width?: number | string;
}

interface SkeletonParagraphProps {
  className?: string;
  style?: CSSProperties;
  width?: widthUnit | Array<widthUnit>;
  rows?: number;
}

export type SkeletonAvatarProps = Omit<SkeletonElementProps, 'shape'> &
  DefaultProps & {
    shape?: 'circle' | 'square';
    active?: boolean;
    applyElementStyle?: boolean;
    wrapperStyle?: CSSProperties;
  };

export type SkeletonImageProps = DefaultProps &
  Omit<SkeletonElementProps, 'size' | 'shape' | 'active'>;

export type SkeletonInputProps = Omit<SkeletonElementProps, 'size' | 'shape'> &
  DefaultProps & {
    size?: 'large' | 'small' | 'default';
    block?: boolean;
  };

export type SkeletonButtonProps = Omit<SkeletonElementProps, 'size'> &
  DefaultProps & {
    size?: 'large' | 'small' | 'default';
    block?: boolean;
    applyElementStyle?: boolean;
  };
