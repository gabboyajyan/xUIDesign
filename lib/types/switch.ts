import {
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactNode
} from 'react';
import { DefaultProps, TargetProps } from '.';

export type SwitchProps = DefaultProps & {
  disabled?: boolean;
  onChange?: (e: MouseEvent<HTMLInputElement> & TargetProps) => void;
  onClick?: MouseEventHandler<HTMLElement>;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  onKeyPress?: KeyboardEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  value?: boolean;
  tabIndex?: number;
  name?: string;
  children?: ReactNode;
  id?: string;
  autoFocus?: boolean;
  type?: string;
  skipGroup?: boolean;
  required?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
};
