import { FocusEventHandler, MouseEventHandler, ReactNode } from "react";
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
  children?: React.ReactNode;
  defaultActiveFirstOption?: boolean;
  direction?: 'ltr' | 'rtl';
  listHeight?: number;
  menuItemSelectedIcon?: React.ReactNode;
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
  tagRender?: ((props: TagProps) => React.ReactElement) | undefined,
  maxTagCount?: number | "responsive" | undefined,
  maxTagPlaceholder?: ReactNode | ((omittedValues: DisplayValueType[]) => React.ReactNode)
  dropdownClassName?: string,
  showArrow?: boolean,
  onBlur?: FocusEventHandler<HTMLElement> | undefined,
  onDropdownVisibleChange?: ((open: boolean) => void) | undefined,
  showAction?: ("click" | "focus")[] | undefined,
  suffixIcon?: ReactNode,
  open?: boolean
}

export interface OptionProps {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>
  render?: (label: string) => React.ReactNode
}

export interface TagProps {
  prefixCls?: string,
  values: string[],
  handleRemoveTag: (value: string) => void
}

export interface DisplayValueType {
  key?: React.Key;
  value?: RuleType;
  label?: React.ReactNode;
  title?: string | number;
  disabled?: boolean;
}