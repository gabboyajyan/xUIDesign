import { MouseEventHandler } from "react";

  export interface OptionProps {
    value: string; // The unique value of the option
    disabled?: boolean; // Whether the option is disabled
    children?: React.ReactNode; // The display content of the option
    className?: string; // Additional class names
    style?: React.CSSProperties; // Inline styles
    onClick?: MouseEventHandler<HTMLDivElement>
    render?: (label: string) => React.ReactNode
    onMouseEnter?: MouseEventHandler<HTMLDivElement>
}
  
  // Select Props
  export interface SelectProps<OptionType extends OptionProps = OptionProps> {
    prefixCls?: string;
    id?: string;
    searchValue?: string;
    onSearch?: (value: string) => void;
    autoClearSearchValue?: boolean;
    onSelect?: (value: string, option: OptionType) => void;
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
    onClear?: () => void
  }
  