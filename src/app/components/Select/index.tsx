'use client'

import { ReactElement, useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { OptionProps, SelectProps } from "@/app/types/select";
import { Option } from "./Option";
import { ArrowIcon, CheckIcon, ClearIcon, LoadingIcon } from "../icons";
import './style.css';
import { Tag } from "./Tag";
import cc from "classcat";

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
    error = ''
}: SelectProps<OptionType>): ReactElement => {
    const hasMode = mode === 'multiple' || mode === 'tags';

    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [selected, setSelected] = useState(value || defaultValue || (hasMode ? [] : ""));
    const [searchQuery, setSearchQuery] = useState(searchValue || '');
    const selectRef = useRef<HTMLDivElement>(null);
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => !disabled && selected.length && setIsHover(true);
    const handleMouseLeave = () => !disabled && setIsHover(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch?.(e.target.value);
    };

    const handleEnterAddNewTag = () => {
        const newOptionValue = searchQuery.trim();

        if (!newOptionValue || !hasMode || (selected as string[]).includes(newOptionValue)) {
            return;
        }

        setSelected((prevSelected) => {
            const updatedSelected = hasMode
                ? [...(prevSelected as string[]), newOptionValue]
                : newOptionValue;

            onChange?.(updatedSelected);
            onSelect?.(newOptionValue);

            return updatedSelected;
        });

        if (autoClearSearchValue) {
            setSearchQuery('');
        }
    };


    const handleSelect = (optionValue: string, option?: OptionType) => {
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

    const extractedOptions = children
        ? (Array.isArray(children) ? children : [children]).map((child: { props: OptionType }) => child.props) : options;

    const filteredOptions = extractedOptions.filter((option: OptionType) => {
        if (filterOption === false) {
            return true;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const valueToCheck = option[optionFilterProp] || option.value;
        return valueToCheck.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const selectValue = hasMode ? '' : selected;

    return (
        <div id={id} className={cc([
            {
                [size]: Boolean(size),
                [prefixCls]: Boolean(prefixCls),
                [direction]: Boolean(direction),
                [`${prefixCls}-error`]: Boolean(error)
            }
        ])} ref={selectRef}>
            <div
                className={`${prefixCls}-trigger`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <input
                    type="text"
                    className={`${prefixCls}-input`}
                    defaultValue={hasMode ? '' : searchQuery || selectValue}
                    placeholder={hasMode && (selected as string[]).length ? '' : placeholder}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onChange={handleSearch}
                    disabled={disabled}
                    readOnly={!hasMode}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement> & { target: { value: string } }) => {
                        if (e.key === 'Enter' && searchQuery.trim() !== '') {
                            handleEnterAddNewTag()
                        }
                    }}
                />

                {isHover && !loading ?
                    (
                        <>{allowClear && selected ? (
                            <button className={`${prefixCls}-clear-btn`} onClick={handleClear}>
                                <ClearIcon />
                            </button>
                        ) : <span className={`${prefixCls}-arrow`}><ArrowIcon isOpen={isOpen} /></span>}
                        </>
                    ) : (
                        <>
                            {!loading && <span className={`${prefixCls}-arrow`}><ArrowIcon isOpen={isOpen} /></span>}
                            {loading && <span className={`${prefixCls}-loading`}><LoadingIcon /></span>}
                        </>
                    )
                }
            </div>

            {hasMode && <Tag values={selected as string[]} handleRemoveTag={handleRemoveTag} prefixCls={prefixCls} />}

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

                    {!loading && !!filteredOptions.length && (
                        <div className={`${prefixCls}-options`} style={{ maxHeight: `${listHeight}px`, overflowY: 'auto' }}>
                            {hasMode && !!searchQuery && <Option
                                value={searchQuery}
                                className={`focused`}
                                onClick={() => {
                                    handleSelect(searchQuery)
                                }}
                                data-value={searchQuery}
                            >
                                {searchQuery}
                            </Option>}

                            {filteredOptions.map(({ children, className = '', ...props }) => (
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

                                    {hasMode && (selected as string[]).includes(props.value as string) && (
                                        <span className={`${prefixCls}-selected-icon`}>{menuItemSelectedIcon || <CheckIcon />}</span>
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
