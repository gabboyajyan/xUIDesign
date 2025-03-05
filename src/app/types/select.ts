import { MouseEventHandler, SyntheticEvent } from "react";

export type TargetEventProps = { target: { value: string | string[] } };
export type SyntheticEventTargetProps = SyntheticEvent & { target: { value: string | string[] } }

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
  onChange?: (e: SyntheticEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  filterable?: boolean;
  defaultOpen?: boolean;
  size?: 'small' | 'middle' | 'large';
  onClear?: () => void,
  error?: string
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
  handleRemoveTag: (e: SyntheticEvent & SyntheticEventTargetProps) => void
}