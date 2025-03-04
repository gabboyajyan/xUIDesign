'use client'

import { ReactElement, useState, useRef, useEffect } from "react";
import { OptionProps, SelectProps } from "@/app/types/select";
import './style.css';
import { Option } from "./Option";

const Select = <OptionType extends OptionProps = OptionProps>({
    prefixCls = 'custom-select',
    id,
    searchValue = '',
    onSearch,
    autoClearSearchValue = true,
    onSelect,
    onDeselect,
    onClear,
    filterOption = true,
    optionFilterProp = 'value',
    children,
    options = [],
    defaultActiveFirstOption = true,
    direction = 'ltr',
    listHeight = 200,
    menuItemSelectedIcon,
    mode = 'default',
    value,
    defaultValue,
    maxCount,
    onChange,
    disabled = false,
    loading = false,
    placeholder = 'Select',
    allowClear = false,
    filterable = false,
    defaultOpen = false,
    size = 'middle',
}: SelectProps<OptionType>): ReactElement => {
    const hasMode = mode === 'multiple' || mode === 'tags';

    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [selected, setSelected] = useState(value || defaultValue || (hasMode ? [] : ""));
    const [searchQuery, setSearchQuery] = useState(searchValue || '');
    const [focusedIndex, setFocusedIndex] = useState<number | null>(defaultActiveFirstOption ? 0 : null);
    const selectRef = useRef<HTMLDivElement>(null);


    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle search query
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch?.(e.target.value);
    };

    // Handle selection
    const handleSelect = (optionValue: string, option: OptionType) => {
        if (hasMode) {
            if (maxCount && (selected as string[]).length >= maxCount) return;
            const newSelection = (selected as string[]).includes(optionValue)
                ? (selected as string[]).filter((item) => item !== optionValue)
                : [...(selected as string[]), optionValue];
            setSelected(newSelection);
            onChange?.(newSelection);
            if ((selected as string[]).includes(optionValue)) {
                onDeselect?.(optionValue, option);
            } else {
                onSelect?.(optionValue, option);
            }
        } else {
            setSelected(optionValue);
            onChange?.(optionValue, option);
            setIsOpen(false);
            onSelect?.(optionValue, option);
        }
        if (autoClearSearchValue) setSearchQuery('');
    };

    // Clear selection
    const handleClear = () => {
        setSelected(hasMode ? [] : "");
        onChange?.(hasMode ? [] : "");
        onClear?.();
        if (autoClearSearchValue) setSearchQuery('');
    };

    // Remove selected tag
    const handleRemoveTag = (tag: string) => {
        const updatedSelected = (selected as string[]).filter((item) => item !== tag);
        setSelected(updatedSelected);
        onChange?.(updatedSelected);
    };

    // Filter options based on search
    const filteredOptions = options.filter((option: OptionType) => {
        if (filterOption === false) return true;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const valueToCheck = option[optionFilterProp] || option.value;
        return valueToCheck.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const extractedOptions: OptionType[] = children
        ? (Array.isArray(children) ? children : [children]).map((child: { props: OptionType }) => child.props)
        : filteredOptions;

    const selectValue = hasMode ? '' : selected;

    return (
        <div id={id} className={`${prefixCls} ${size} ${direction === 'rtl' ? 'rtl' : ''}`} ref={selectRef}>
            <div className={`${prefixCls}-trigger`}>
                <input
                    type="text"
                    className={`${prefixCls}-input`}
                    value={searchQuery || selectValue}
                    placeholder={hasMode && (selected as string[]).length ? '' : placeholder}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onChange={handleSearch}
                    disabled={disabled}
                />
                {allowClear && selected && (
                    <button className={`${prefixCls}-clear-btn`} onClick={handleClear}>&#x2715;</button>
                )}
            </div>

            {/* Display selected tags */}
            {hasMode && (
                <div className={`${prefixCls}-tag-container`}>
                    {(selected as string[]).map((tag, index) => (
                        <div key={`${index}_${tag}`} className={`${prefixCls}-tag`}>
                            {tag}
                            <span className="close-icon" onClick={() => handleRemoveTag(tag)}>×</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Dropdown */}
            {isOpen && (
                <div className={`${prefixCls}-dropdown`} style={{ maxHeight: listHeight }}>
                    {filterable && (
                        <input
                            type="text"
                            className={`${prefixCls}-search`}
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search..."
                        />
                    )}
                    {loading ? (
                        <div className={`${prefixCls}-loading-spinner`}>Loading...</div>
                    ) : (
                        <div className={`${prefixCls}-options`} style={{ maxHeight: `${listHeight}px`, overflowY: 'auto' }}>
                            {extractedOptions.map(({ children, className, ...props }, index) => (
                                <Option
                                    key={props.value}
                                    {...props}
                                    className={`${className} ${focusedIndex === index ? 'focused' : ''}`}
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    onClick={() => !props.disabled && handleSelect(props.value as string, { children, className, ...props })}
                                    onMouseEnter={() => setFocusedIndex(index)}
                                    data-value={props.value}
                                >
                                    {children || props.value}
                                    {menuItemSelectedIcon && (selected as string[]).includes(props.value as string) && (
                                        <span className="selected-icon">{menuItemSelectedIcon}</span>
                                    )}
                                </Option>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

Select.Option = Option;

export default Select;
