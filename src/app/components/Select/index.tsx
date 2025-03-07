'use client'

import { ReactElement, useState, useRef, useEffect, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { MouseEventHandlerSelect, OptionProps, SelectProps } from "@/app/types/select";
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

    const checkModeInitialValue = (!Array.isArray(initialValue) ? [initialValue] : initialValue).filter(e => e)

    const [isHover, setIsHover] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(defaultOpen || open);
    const [searchQuery, setSearchQuery] = useState(searchValue || '');
    const [selected, setSelected] = useState((hasMode ? checkModeInitialValue : initialValue));

    const handleMouseEnter = () => !disabled && selected.length && setIsHover(true);
    const handleMouseLeave = () => !disabled && setIsHover(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleClickOutside = (event: any): void => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(open);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch?.(e.target.value);

        if (!isOpen) {
            setIsOpen(!isOpen || open)
        }
    };

    const handleEnterAddNewTag = (e: KeyboardEvent<HTMLInputElement> & { target: { valueAnyType: string[] } }) => {
        if (maxCount && selected.length >= maxCount && !selected.includes(searchQuery)) {
            return;
        }

        const newOptionValue = searchQuery.trim();

        if (!newOptionValue || !hasMode || (selected).includes(newOptionValue)) {
            return;
        }

        const updatedSelected = [...(selected), newOptionValue];

        e.target.valueAnyType = updatedSelected

        onChange?.(e);
        onSelect?.(newOptionValue);

        const input = selectRef.current?.querySelector('input');
        if (input) {
            input.value = ''
        }

        setSelected(updatedSelected);

        if (autoClearSearchValue) {
            setSearchQuery('');
        }
    };

    const handleSelect = (e: MouseEventHandlerSelect, optionValue: string, option?: OptionType) => {
        if (hasMode) {
            if (maxCount && selected.length >= maxCount && !selected.includes(optionValue)) {
                return;
            }

            const newSelection = selected.includes(optionValue)
                ? (selected as string[]).filter((item) => item !== optionValue)
                : [...selected, optionValue];

            setSelected(newSelection);

            e.target.value = newSelection
            onChange?.(e, option);

            if ((selected).includes(optionValue)) {
                onDeselect?.(optionValue, option);
            } else {
                onSelect?.(optionValue, option);
            }
        } else {
            setIsOpen(open);
            setSelected(optionValue);

            e.target.value = optionValue
            onChange?.(e, option);

            onSelect?.(optionValue, option);
        }

        if (autoClearSearchValue) {
            setSearchQuery('');
        }
    };

    const handleClear = (e: MouseEvent<HTMLButtonElement> & { target: { value: string | string[] } }) => {
        const value = hasMode ? [] : "";

        setSelected(value);

        e.target.value = value
        onChange?.(e);
        onClear?.();

        if (autoClearSearchValue) {
            setSearchQuery('');
        }
    };

    const handleRemoveTag = (e: MouseEvent<HTMLSpanElement> & { target: { valueAnyType: string[] } }) => {
        const updatedSelected = (selected as string[]).filter((item) => item !== e.target.valueAnyType[0]);

        e.target.valueAnyType = updatedSelected;

        onChange?.(e);
        setSelected(updatedSelected);
    };

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement> & { target: { valueAnyType: string[] } }) => {
        if (hasMode) {
            if (e.key === 'Enter' && searchQuery.trim() !== '') {
                handleEnterAddNewTag(e)
            }

            if (e.key === 'Backspace' && !searchQuery.trim().length) {
                const updatedSelected = (selected as string[]).filter((item) => item !== selected[selected.length - 1]);

                e.target.valueAnyType = updatedSelected;

                onChange?.(e);
                setSelected(updatedSelected);
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
                    placeholder={selected.length ? '' : placeholder}
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
                                onClick={(e) => {
                                    handleSelect(e as MouseEventHandlerSelect, searchQuery)
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
                                    onClick={(e) => {
                                        if (!props.disabled) {
                                            handleSelect(e as MouseEventHandlerSelect, props.value as string, { children, className, ...props } as OptionType)
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
