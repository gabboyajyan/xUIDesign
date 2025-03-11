import {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  Key,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  SyntheticEvent
} from "react";
import { DefaultProps, RuleType, TargetProps } from ".";

export type SelectProps = DefaultProps & {
  id?: string;
  searchValue?: string;
  onSearch?: (value: string) => void;
  autoClearSearchValue?: boolean;
  onSelect?: (value: string, option?: OptionType) => void;
  onDeselect?: (value: string, option?: OptionType) => void;
  filterOption?: boolean;
  optionFilterProp?: string;
  options?: OptionType[];
  children?: ReactNode;
  defaultActiveFirstOption?: boolean;
  listHeight?: number;
  menuItemSelectedIcon?: ReactNode;
  mode?: 'default' | 'multiple' | 'tags';
  value?: string | string[];
  defaultValue?: string | string[];
  maxCount?: number;
  onChange?: (e: SyntheticEvent, option?: OptionType) => void;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  filterable?: boolean;
  defaultOpen?: boolean;
  size?: 'small' | 'middle' | 'large';
  onClear?: () => void,
  error?: string,
  showSearch?: boolean,
  tagRender?: ((props: CustomTagProps) => ReactElement) | undefined,
  maxTagPlaceholder?: ReactNode | ((omittedValues: DisplayValueType[]) => ReactNode)
  dropdownClassName?: string,
  showArrow?: boolean,
  onBlur?: FocusEventHandler<HTMLElement> | undefined,
  onDropdownVisibleChange?: ((open: boolean) => void) | undefined,
  showAction?: ("click" | "focus")[] | undefined,
  suffixIcon?: ReactNode,
  open?: boolean
  notFoundContent?: ReactNode;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
}

export interface OptionType {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>
  render?: (label: string) => ReactNode;
  prefixCls?: string;
}

export type CustomTagProps = DefaultProps & {
    label?: React.ReactNode;
    value: string;
    onClose: (e: MouseEvent<HTMLSpanElement> & TargetProps) => void,
    closable?: boolean;
    isMaxTag?: boolean;
    color?: string;
    icon?: ReactNode
}

export type TagProps = DefaultProps & {
  values?: string[],
  onClose: (e: MouseEvent<HTMLSpanElement> & TargetProps) => void,
  icon?: ReactNode;
  closable?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export interface DisplayValueType {
  key?: Key;
  value?: RuleType;
  label?: ReactNode;
  title?: string | number;
  disabled?: boolean;
}

export interface OptionProps {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  render?: (label: string) => ReactNode;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  prefixCls?: string;
}