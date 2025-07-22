import {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  Key,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  ReactEventHandler,
  ReactNode
} from 'react';
import { DefaultProps, RuleType, RuleTypes, TargetProps } from '.';

export type SelectProps = DefaultProps & {
  id?: string;
  searchValue?: string;
  onSearch?: (value: string) => void;
  autoClearSearchValue?: boolean;
  onSelect?: (value: RuleTypes, option?: OptionType) => void;
  onDeselect?: (value: string, option?: OptionType) => void;
  filterOption?: boolean | ((input: string, option: OptionType) => boolean);
  optionFilterProp?: string;
  options?: OptionType[];
  children?: ReactNode;
  defaultActiveFirstOption?: boolean;
  listHeight?: number;
  menuItemSelectedIcon?: ReactNode;
  mode?: 'default' | 'multiple' | 'tags';
  value?: RuleTypes;
  defaultValue?: RuleTypes;
  maxCount?: number;
  onChange?: (e: RuleTypes, option?: OptionType) => void;
  onClose?: () => void;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  filterable?: boolean;
  defaultOpen?: boolean;
  size?: 'small' | 'middle' | 'large';
  onClear?: () => void;
  error?: boolean;
  showSearch?: boolean;
  tagRender?: ((props: CustomTagProps) => ReactElement) | undefined;
  maxTagPlaceholder?:
    | ReactNode
    | ((omittedValues: DisplayValueType[]) => ReactNode);
  dropdownClassName?: string;
  showArrow?: boolean;
  onBlur?: FocusEventHandler<HTMLElement> | undefined;
  onDropdownVisibleChange?: ((open: boolean) => void) | undefined;
  showAction?: ('click' | 'focus')[] | undefined;
  suffixIcon?: ReactNode;
  searchIcon?: ReactNode;
  open?: boolean;
  notFoundContent?: ReactNode;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  dropdownRender?: (menu: ReactNode) => ReactNode;
  feedbackIcons?: boolean;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  removeIcon?: ReactNode;
};

export interface OptionType {
  value: RuleType;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  render?: (label: string) => ReactNode;
  prefixCls?: string;
  label?: RuleType;
}

export type CustomTagProps = DefaultProps & {
  label?: ReactNode;
  value: string;
  onClose: (e: MouseEvent<HTMLSpanElement> & TargetProps) => void;
  onMouseDown?: MouseEventHandler | undefined;
  onLoadCapture?: ReactEventHandler | undefined;
  closable?: boolean;
  isMaxTag?: boolean;
  color?: string;
  icon?: ReactNode;
};

export type TagProps = DefaultProps & {
  values?: string[];
  onClose: (e: MouseEvent<HTMLSpanElement> & TargetProps) => void;
  icon?: ReactNode;
  closable?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export interface DisplayValueType {
  key?: Key;
  value?: RuleType;
  label?: ReactNode;
  title?: string | number;
  disabled?: boolean;
}

export interface OptionProps {
  value: RuleType;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  render?: (label: string) => ReactNode;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  prefixCls?: string;
  selected?: boolean;
  title?: string;
}
