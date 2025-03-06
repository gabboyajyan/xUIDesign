'use client'

import { ReactElement, useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { OptionProps, SelectProps } from "@/app/types/select";
import { Option } from "./Option";
import { ArrowIcon, CheckIcon, ClearIcon, LoadingIcon, SearchIcon } from "../icons";
import { Tag } from "./Tag";
import cc from "classcat";
import { EmptyContent } from "../Empty";
import { prefixClsSelect } from "@/app/utils";
import './style.css';

const Select = <OptionType extends OptionProps = OptionProps>({
    prefixCls = prefixClsSelect,
    id,
    searchValue = '',
    autoClearSearchValue = true,
    filterOption = true,
    optionFilterProp = 'value',
    children,
    options = [],
    listHeight = 200,
    menuItemSelectedIcon,
    mode = 'default',
    value,
    defaultValue,
    maxCount,
    disabled = false,
    loading = false,
    placeholder = 'Select',
    allowClear = false,
    filterable = false,
    defaultOpen = false,
    size = 'middle',
    error = '',
    dropdownClassName = '',
    suffixIcon,
    style,
    onSearch,
    onSelect,
    onDeselect,
    onClear,
    onChange,
    showSearch = false,
    open = false,
    // maxTagCount,
    // maxTagPlaceholder,
    // showArrow,
    // showAction,
    // tagRender,
    // onBlur,
    // onDropdownVisibleChange
}: SelectProps<OptionType>): ReactElement => {
    const initialValue = value || defaultValue || '';

    const asTag = mode === 'tags';
    const asMultiple = mode === 'multiple'
    const hasMode = asTag || asMultiple;

    const [isHover, setIsHover] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(defaultOpen || open);
    const [searchQuery, setSearchQuery] = useState(searchValue || '');
    const [selected, setSelected] = useState((hasMode ? (!Array.isArray(initialValue) ? [initialValue] : initialValue).filter(e => e) : ""));

    const handleMouseEnter = () => !disabled && selected.length && setIsHover(true);
    const handleMouseLeave = () => !disabled && setIsHover(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(open);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    useEffect(() => {
        setSelected((hasMode ? (!Array.isArray(initialValue) ? [initialValue] : initialValue).filter(e => e) : ""))
    }, [hasMode, initialValue])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch?.(e.target.value);

        if (!isOpen) {
            setIsOpen(!isOpen || open)
        }
    };

    const handleEnterAddNewTag = () => {
        if (maxCount && (selected as string[]).length >= maxCount && !selected.includes(searchQuery)) {
            return;
        }

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

            const input = selectRef.current?.querySelector('input') as HTMLInputElement;
            if (input) {
                input.value = ''
            }

            return updatedSelected;
        });

        if (autoClearSearchValue) {
            setSearchQuery('');
        }
    };

    const handleSelect = (optionValue: string, option?: OptionType) => {
        if (hasMode) {
            if (maxCount && (selected as string[]).length >= maxCount && !selected.includes(optionValue)) {
                return;
            }

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
            setIsOpen(open);
            setSelected(optionValue);
            onChange?.(optionValue, option);
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

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement> & { target: { value: string } }) => {
        if (hasMode) {
            if (e.key === 'Enter' && searchQuery.trim() !== '') {
                handleEnterAddNewTag()
            }

            if (e.key === 'Backspace' && !searchQuery.trim().length) {
                handleRemoveTag(selected[selected.length - 1])
            }
        }
    }

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
        <div id={id} style={style} className={cc([
            {
                [size]: size,
                [prefixCls]: prefixCls,
                [`${prefixCls}-error`]: error
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
                    onClick={() => !disabled && setIsOpen(!isOpen || open)}
                    onChange={handleSearch}
                    disabled={disabled}
                    readOnly={!hasMode}
                    onKeyDown={handleOnKeyDown}
                />

                {isHover && !loading ?
                    (
                        <>{allowClear && selected ? (
                            <button className={`${prefixCls}-clear-btn`} onClick={handleClear}>
                                {suffixIcon || <ClearIcon />}
                            </button>
                        ) : <span className={`${prefixCls}-arrow`}>
                            {showSearch && isOpen ? <SearchIcon /> : <ArrowIcon isOpen={isOpen} />}
                        </span>}
                        </>
                    ) : (
                        <>
                            {!loading && <span className={`${prefixCls}-arrow`}>
                                {showSearch && isOpen ? <SearchIcon /> : <ArrowIcon isOpen={isOpen} />}
                            </span>}

                            {loading && <span className={`${prefixCls}-loading`}><LoadingIcon /></span>}
                        </>
                    )
                }
            </div>

            {hasMode && <Tag values={selected as string[]} handleRemoveTag={handleRemoveTag} prefixCls={prefixCls} />}

            {!loading && isOpen && (
                <div className={cc([`${prefixCls}-dropdown`, { [dropdownClassName]: dropdownClassName }])} style={{ maxHeight: listHeight }}>
                    {filterable && (
                        <input
                            type="text"
                            className={`${prefixCls}-search`}
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search..."
                        />
                    )}

                    {!loading && (
                        <div className={`${prefixCls}-options`} style={{ maxHeight: `${listHeight}px`, overflowY: 'auto' }}>
                            {asTag && !!searchQuery && <Option
                                value={searchQuery}
                                className={`${prefixCls}-focused`}
                                onClick={() => {
                                    handleSelect(searchQuery)
                                }}
                                data-value={searchQuery}
                            >
                                {searchQuery}
                            </Option>}

                            {filteredOptions.length ? filteredOptions.map(({ children, className = '', ...props }) => (
                                <Option
                                    key={props.value}
                                    {...props}
                                    className={cc([
                                        className,
                                        {
                                            [`${prefixCls}-focused`]: hasMode ? selected.includes(props.value) : props.value === selected,
                                            [`${prefixCls}-disabled`]: maxCount && hasMode && !selected.includes(props.value) ? selected.length >= maxCount : false
                                        }
                                    ])}
                                    onClick={() => {
                                        if (!props.disabled) {
                                            handleSelect(props.value as string, { children, className, ...props } as OptionType)
                                        }
                                    }}
                                    data-value={props.value}
                                >
                                    {children || props.value}

                                    {(selected as string[]).includes(props.value as string) && (
                                        <span className={`${prefixCls}-selected-icon`}>{
                                            menuItemSelectedIcon === true ? <CheckIcon /> : menuItemSelectedIcon}
                                        </span>
                                    )}
                                </Option>
                            )) : !asTag && <EmptyContent />}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

Select.Option = Option;

export { Select };
