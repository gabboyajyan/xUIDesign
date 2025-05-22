import {
  CSSProperties,
  InputHTMLAttributes,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  TextareaHTMLAttributes
} from 'react';
import { DefaultProps, SizeType, SyntheticBaseEvent } from '.';

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix'
> &
  DefaultProps & {
    addonBefore?: ReactNode;
    addonAfter?: ReactNode;
    size?: SizeType;
    prefix?: ReactNode;
    suffix?: ReactNode;
    disabled?: boolean;
    allowClear?: boolean;
    error?: boolean;
    bordered?: boolean;
    iconRender?: (visible: boolean) => ReactElement;
    onChange?: (event: SyntheticBaseEvent) => void;
    onClick?: MouseEventHandler<HTMLElement>;
    onMouseEnter?: MouseEventHandler<HTMLElement>;
    onMouseLeave?: MouseEventHandler<HTMLElement>;
    onKeyPress?: KeyboardEventHandler<HTMLElement>;
    onKeyDown?: KeyboardEventHandler<HTMLElement>;
    onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
    feedbackIcons?: boolean;
  };

export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onResize'
> &
  DefaultProps & {
    value?: string;
    className?: string;
    style?: CSSProperties;
    autoSize?:
      | boolean
      | {
          minRows?: number;
          maxRows?: number;
        };
    onPressEnter?: KeyboardEventHandler<HTMLTextAreaElement>;
    onResize?: (size: { width: number; height: number }) => void;
    styles?: {
      textarea?: CSSProperties;
      count?: CSSProperties;
    };
    bordered?: boolean;
    size?: SizeType;
    status?: 'success' | 'error';
    rootClassName?: string;
    variant?: 'outlined' | 'borderless' | 'filled' | 'underlined';
    error?: boolean;
    allowClear?: boolean;
  };
