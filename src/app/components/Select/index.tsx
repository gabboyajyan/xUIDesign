'use client'

import { ReactElement, useState, useRef, useEffect, ChangeEvent, KeyboardEvent, MouseEvent, useCallback, useMemo } from "react";
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
    showArrow = true,
    notFoundContent = true,
    tagRender,
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

    const handleClearInputValue = useCallback(() => {
        if (!autoClearSearchValue) {
            return
        }

        setSearchQuery('');

        const input = selectRef.current?.querySelector('input');
        if (input) {
            input.value = ''
        }
    }, [autoClearSearchValue])

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleClickOutside = (event: any): void => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(open);

                if (hasMode) {
                    handleClearInputValue();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClearInputValue, open, hasMode]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch?.(e.target.value);

        if (!isOpen) {
            setIsOpen(!isOpen || open)
        }
    };

    const handleEnterAddNewTag = (e: KeyboardEvent<HTMLInputElement> & { target: { valueAnyType: string[] } }) => {
        if (asMultiple || (maxCount && selected.length >= maxCount && !selected.includes(searchQuery))) {
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
        handleClearInputValue();
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

        handleClearInputValue();
    };

    const handleClear = (e: MouseEvent<HTMLButtonElement> & { target: { value: string | string[] } }) => {
        const value = hasMode ? [] : "";

        setSelected(value);

        e.target.value = value
        onChange?.(e);
        onClear?.();

        handleClearInputValue();
    };

    const handleRemoveTag = (e: MouseEvent<HTMLSpanElement> & { target: { valueAnyType: string[] } }) => {
        const updatedSelected = (selected as string[]).filter((item) => item !== e.target.valueAnyType[0]);

        e.target.valueAnyType = updatedSelected;

        onChange?.(e);
        setSelected(updatedSelected);
    };

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement> & { target: { valueAnyType: string[] } }) => {
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

    const ArrowContainer = useMemo(() => {
        return showSearch && isOpen ? <SearchIcon /> : <span>
            {showArrow && <ArrowIcon isOpen={isOpen} />}
        </span>
    }, [showArrow, showSearch, isOpen])

    return (
        <div
            id={id}
            style={style}
            ref={selectRef}
            className={cc([{
                [size]: size,
                [prefixCls]: prefixCls,
                [`${prefixCls}-error`]: error
            }])}>
            <div
                className={`${prefixCls}-trigger`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >

                {hasMode ? <div
                    style={style}
                    className={`${prefixCls}-tag-container`}>
                    {(selected as string[]).map((tag, index) => (
                        tagRender
                            ? <div key={`${index}_${tag}`}>{tagRender?.({ label: tag, value: tag, onClose: handleRemoveTag, closable: true })}</div>
                            : <Tag
                                closable
                                value={tag}
                                label={tag}
                                onClose={handleRemoveTag}
                                key={`${index}_${tag}`}
                            />
                    ))}

                    <div
                        className={`${prefixCls}-tag`}
                        style={{
                            minWidth: '30px',
                            width: searchQuery.length ? `${searchQuery.length * 10}px` : !selected.length ? '100%' : '10px'
                        }}
                    >
                        <input
                            type="text"
                            disabled={disabled}
                            onChange={handleSearch}
                            onKeyDown={handleOnKeyDown}
                            className={`${prefixCls}-tag-input`}
                            placeholder={(selected as string[]).length ? '' : placeholder}
                            onClick={() => !disabled && setIsOpen?.(p => !p || !!open)}
                        />
                    </div>
                </div> : <input
                    readOnly
                    type="text"
                    value={selected}
                    disabled={disabled}
                    placeholder={placeholder || ''}
                    className={`${prefixCls}-input`}
                    style={{ opacity: isOpen ? '0.8' : '1' }}
                    onClick={() => !disabled && setIsOpen(!isOpen || open)}
                />}

                {isHover && !loading ?
                    (
                        <>{allowClear && selected ? (
                            <button className={`${prefixCls}-clear-btn`} onClick={handleClear}>
                                {suffixIcon || <ClearIcon />}
                            </button>
                        ) : <span className={`${prefixCls}-arrow`}>
                            {ArrowContainer}
                        </span>
                        }
                        </>
                    ) : (
                        <>
                            {!loading && <span className={`${prefixCls}-arrow`}>
                                {ArrowContainer}
                            </span>}

                            {loading && <span className={`${prefixCls}-loading`}><LoadingIcon /></span>}
                        </>
                    )
                }
            </div>

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
                                            console.log(props.value);

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
                            )) : !asTag ? notFoundContent || <EmptyContent /> : null}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

Select.Option = Option;

export { Select };
