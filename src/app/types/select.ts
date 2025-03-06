import { CSSProperties, FocusEventHandler, Key, MouseEventHandler, ReactElement, ReactNode } from "react";
import { RuleType } from "./form";

export interface SelectProps<OptionType extends OptionProps = OptionProps> {
  prefixCls?: string;
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
  direction?: 'ltr' | 'rtl';
  listHeight?: number;
  menuItemSelectedIcon?: ReactNode;
  mode?: 'default' | 'multiple' | 'tags';
  value?: string | string[];
  defaultValue?: string | string[];
  maxCount?: number;
  onChange?: (value: string | string[], option?: OptionType) => void;
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
  tagRender?: ((props: TagProps) => ReactElement) | undefined,
  maxTagCount?: number | "responsive" | undefined,
  maxTagPlaceholder?: ReactNode | ((omittedValues: DisplayValueType[]) => ReactNode)
  dropdownClassName?: string,
  showArrow?: boolean,
  onBlur?: FocusEventHandler<HTMLElement> | undefined,
  onDropdownVisibleChange?: ((open: boolean) => void) | undefined,
  showAction?: ("click" | "focus")[] | undefined,
  suffixIcon?: ReactNode,
  open?: boolean
  style?: CSSProperties
}

export interface OptionProps {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>
  render?: (label: string) => ReactNode
}

export interface TagProps {
  prefixCls?: string,
  values: string[],
  handleRemoveTag: (value: string) => void
}

export interface DisplayValueType {
  key?: Key;
  value?: RuleType;
  label?: ReactNode;
  title?: string | number;
  disabled?: boolean;
}