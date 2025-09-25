import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

export const ButtonTypes = [
  'default',
  'primary',
  'dashed',
  'link',
  'text',
  'ghost'
] as const;
export const ButtonShapes = ['default', 'circle', 'round'] as const;
export const ButtonVariantTypes = [
  'outlined',
  'dashed',
  'solid',
  'filled',
  'text',
  'link'
] as const;
export const ButtonColorTypes = [
  'default',
  'primary',
  'danger',
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold'
] as const;

export type ButtonType = (typeof ButtonTypes)[number];
export type ButtonShape = (typeof ButtonShapes)[number];
export type ButtonVariantType = (typeof ButtonVariantTypes)[number];
export type ButtonColorType = (typeof ButtonColorTypes)[number];
export type SizeType = 'small' | 'middle' | 'large' | undefined;
export type ButtonHTMLType = 'button' | 'submit' | 'reset';

export interface BaseButtonProps {
  type?: ButtonType;
  color?: ButtonColorType;
  variant?: ButtonVariantType;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  shape?: ButtonShape;
  size?: SizeType;
  disabled?: boolean;
  loading?:
    | boolean
    | {
        delay?: number;
        icon?: ReactNode;
      };
  prefixCls?: string;
  prefixClsV3?: string;
  className?: string;
  rootClassName?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: ReactNode;
  classNames?: {
    icon?: string;
  };
  styles?: {
    icon?: CSSProperties;
  };
  child?: ReactNode
}

export interface ButtonProps
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'type'> {
  href?: string;
  htmlType?: ButtonHTMLType;
}
