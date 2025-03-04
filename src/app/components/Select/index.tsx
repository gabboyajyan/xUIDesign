'use client'

import { ReactElement, useState, useRef, useEffect } from "react";
import { OptionProps, SelectProps } from "@/app/types/select";
import { Option } from "./Option";
import { ArrowIcon, ClearIcon, LoadingIcon } from "../icons";
import './style.css';

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
    const selectRef = useRef<HTMLDivElement>(null);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        const handleMouseEnter = () => !disabled && setIsHover(true);
        const handleMouseLeave = () => !disabled && setIsHover(false);

        if (selectRef.current) {
            selectRef.current.addEventListener("mouseenter", handleMouseEnter);
            selectRef.current.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (selectRef.current) {
                selectRef.current.removeEventListener("mouseenter", handleMouseEnter);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                selectRef.current.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [disabled]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsHover(false);
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch?.(e.target.value);
    };

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
            setIsHover(false);
            onSelect?.(optionValue, option);
        }

        if (autoClearSearchValue) {
            setSearchQuery('');
        }
    };

    const handleClear = () => {
        setSelected(hasMode ? [] : "");
        onChange?.(hasMode ? [] : "");
        onClear?.();

        if (autoClearSearchValue) {
            setSearchQuery('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        const updatedSelected = (selected as string[]).filter((item) => item !== tag);

        setSelected(updatedSelected);
        onChange?.(updatedSelected);
    };

    const filteredOptions = options.filter((option: OptionType) => {
        if (filterOption === false) {
            return true;
        }

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
                    defaultValue={hasMode ? '' : searchQuery || selectValue}
                    placeholder={hasMode && (selected as string[]).length ? '' : placeholder}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onChange={handleSearch}
                    disabled={disabled}
                    readOnly={!hasMode}
                />

                {/* Clear Icon */}
                {isHover && !loading ?
                    <>
                        {allowClear && selected ? (
                            <button className={`${prefixCls}-clear-btn`} onClick={handleClear}>
                                <ClearIcon />
                            </button>
                        ) : <span className={`${prefixCls}-arrow`}><ArrowIcon isOpen={isOpen} /></span>}
                    </>
                    :
                    <>
                        {/* Arrow Icon */}
                        {!loading && <span className={`${prefixCls}-arrow`}><ArrowIcon isOpen={isOpen} /></span>}

                        {/* Loading Icon */}
                        {loading && <span className={`${prefixCls}-loading`}><LoadingIcon /></span>}
                    </>
                }
            </div>

            {/* Display selected tags (for multiple or tags mode) */}
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
            {!loading && isOpen && (
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
                            {extractedOptions.map(({ children, className = '', ...props }) => (
                                <Option
                                    key={props.value}
                                    {...props}
                                    className={`${className} ${(hasMode ? selected.includes(props.value) : props.value === selected) ? 'focused' : ''}`}
                                    onClick={() => {
                                        if (!props.disabled) {
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-expect-error
                                            handleSelect(props.value as string, { children, className, ...props })
                                        }
                                    }}
                                    data-value={props.value}
                                >
                                    {children || props.value}
                                    {menuItemSelectedIcon && (selected as string[]).includes(props.value as string) && (
                                        <span className={`${prefixCls}-selected-icon`}>{menuItemSelectedIcon}</span>
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
