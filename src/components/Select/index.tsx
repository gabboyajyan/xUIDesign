'use client'

import {
    ReactElement,
    useState,
    useRef,
    useEffect,
    useCallback,
    useMemo,
    KeyboardEvent
} from "react";
import {
    OptionType,
    SelectProps
} from "@/types/select";
import cc from "classcat";
import { prefixClsSelect } from "@/utils";
import { EmptyContent } from "@/components/Empty";
import { MouseEventHandlerSelect, SyntheticBaseEvent } from "@/types";
import { ArrowIcon, CheckIcon, ClearIcon, LoadingIcon, SearchIcon } from "@/components/icons";
import { createPortal } from "react-dom";
import { Option } from "./Option";
import { Tag } from "./Tag";

import './style.css';

const Select = ({
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
    getPopupContainer
}: SelectProps): ReactElement => {
    const initialValue = value || defaultValue || '';

    const asTag = mode === 'tags';
    const asMultiple = mode === 'multiple'
    const hasMode = asTag || asMultiple;

    const checkModeInitialValue = (!Array.isArray(initialValue) ? [initialValue] : initialValue).filter(e => e)

    const [isHover, setIsHover] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(defaultOpen || open);
    const [searchQuery, setSearchQuery] = useState(searchValue || '');
    const [dropdownPosition, setDropdownPosition] = useState<React.CSSProperties>({});
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
         
        const handleClickOutside = (event: MouseEvent): void => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
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

    useEffect(() => {
        if (!selectRef.current || !getPopupContainer) return;

        const selectBox = selectRef.current.getBoundingClientRect();
        const dropdownHeight = listHeight;
        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - selectBox.bottom;
        const spaceAbove = selectBox.top;

        let positionStyle: React.CSSProperties = {
            top: `${selectBox.bottom}px`,
            left: `${selectBox.left}px`,
            width: `${selectBox.width}px`,
        };

        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
            positionStyle = {
                top: `${selectBox.top - dropdownHeight}px`,
                left: `${selectBox.left}px`,
                width: `${selectBox.width}px`,
            };
        }

        setDropdownPosition(positionStyle);
    }, [listHeight, getPopupContainer]);


    const handleSearch = (e: SyntheticBaseEvent) => {
        setSearchQuery(e.target.value as string);
        onSearch?.(e.target.value as string);

        if (!isOpen) {
            setIsOpen(!isOpen || open)
        }
    };

    const handleEnterAddNewTag = () => {
        if (asMultiple || (maxCount && selected.length >= maxCount && !selected.includes(searchQuery))) {
            return;
        }

        const newOptionValue = searchQuery.trim();

        if (!newOptionValue || !hasMode || (selected).includes(newOptionValue)) {
            return;
        }

        const updatedSelected = [...(selected), newOptionValue];

        onChange?.(updatedSelected);
        onSelect?.(newOptionValue);

        const input = selectRef.current?.querySelector('input');
        if (input) {
            input.value = ''
        }

        setSelected(updatedSelected);
        handleClearInputValue();
    };

    const handleSelect = (e: SyntheticBaseEvent, optionValue: string, option?: OptionType) => {
        if (hasMode) {
            if (maxCount && selected.length >= maxCount && !selected.includes(optionValue)) {
                return;
            }

            const newSelection = selected.includes(optionValue)
                ? (selected as string[]).filter((item) => item !== optionValue)
                : [...selected, optionValue];

            setSelected(newSelection);
            onChange?.(newSelection, option);

            if ((selected).includes(optionValue)) {
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

        handleClearInputValue();
    };

    const handleClear = () => {
        const value = hasMode ? [] : "";

        setSelected(value);
        onChange?.('');
        onClear?.();

        handleClearInputValue();
    };

    const handleRemoveTag = (e: SyntheticBaseEvent) => {
        const updatedSelected = (selected as string[]).filter((item) => item !== e.target.value);

        onChange?.(updatedSelected);
        setSelected(updatedSelected);
    };

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim() !== '') {
            handleEnterAddNewTag()
        }

        if (e.key === 'Backspace' && !searchQuery.trim().length) {
            const updatedSelected = (selected as string[]).filter((item) => item !== selected[selected.length - 1]);

            onChange?.(updatedSelected);
            setSelected(updatedSelected);
        }
    }

    const ArrowContainer = useMemo(() => {
        return showSearch && isOpen ? <SearchIcon /> : <span>
            {showArrow && <ArrowIcon isOpen={isOpen} />}
        </span>
    }, [showArrow, showSearch, isOpen]);

    const popupContainer = useMemo(() => {
        return getPopupContainer ? getPopupContainer(selectRef.current!) : selectRef.current;
    }, [getPopupContainer]);

    const extractedOptions = children
        ? (Array.isArray(children) ? children : [children]).map((child: { props: OptionType }) => child.props) : options;

    const filteredOptions = extractedOptions.filter((option: OptionType) => {
        if (filterOption === false) {
            return true;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const valueToCheck = `${option[optionFilterProp] || option.value}`;
        return valueToCheck.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const dropdownContent = !loading && isOpen && (
        <div className={cc([`${prefixCls}-dropdown`, { [dropdownClassName]: dropdownClassName }])} style={{ ...dropdownPosition, maxHeight: listHeight }}>
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
                <div className={`${prefixCls}-options`} style={{ maxHeight: listHeight, overflowY: 'auto' }}>
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
                            key={`${props.value}`}
                            {...props}
                            className={cc([
                                className,
                                {
                                    [`${prefixCls}-focused`]: hasMode ? selected.includes(props.value as string) : props.value === selected,
                                    [`${prefixCls}-disabled`]: maxCount && hasMode && !selected.includes(props.value as string) ? selected.length >= maxCount : false
                                }
                            ])}
                            onClick={(e) => {
                                if (props.disabled) {
                                    return
                                }

                                handleSelect(e as MouseEventHandlerSelect, props.value as string, { children, className, ...props } as OptionType)
                            }}
                            data-value={props.value}
                        >
                            <div dangerouslySetInnerHTML={{
                                __html: (children || props.value) as string
                            }} />

                            {hasMode &&selected.includes(props.value as string) && (
                                <span className={`${prefixCls}-selected-icon`}>{
                                    menuItemSelectedIcon === true ? <CheckIcon /> : menuItemSelectedIcon}
                                </span>
                            )}
                        </Option>
                    )) : !asTag ? notFoundContent || <EmptyContent /> : null}
                </div>
            )}
        </div>
    );

    return (
        <div
            id={id}
            style={style}
            ref={selectRef}
            className={cc([{
                [size]: size,
                [prefixCls]: prefixCls,
                [`${prefixCls}-error`]: error,
                [`${prefixCls}-multi`]: hasMode,
                [`${prefixCls}-disabled`]: disabled
            }])}>

            <div
                className={`${prefixCls}-trigger`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => !disabled && setIsOpen(!isOpen)}>

                {hasMode ? <div
                    style={style}
                    className={`${prefixCls}-tag-container`}>
                    {(selected as string[]).map((tag, index) => (
                        tagRender
                            ? <div key={`${index}_${tag}`}>
                                {tagRender?.({ label: tag, value: tag, onClose: handleRemoveTag, closable: true })}
                            </div>
                            : <Tag
                                closable
                                value={tag}
                                label={tag === '' ? placeholder : extractedOptions.find(e => e.value === tag)?.children || tag}
                                onClose={handleRemoveTag}
                                key={`${index}_${tag}`} />
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
                </div> : (
                    <div
                        className={`${prefixCls}-input`}
                        onClick={() => !disabled && setIsOpen(!isOpen || open)}
                        style={{ opacity: isOpen || selected === '' ? '0.6' : '1' }}
                    >
                        {selected === '' ? placeholder : extractedOptions.find(e => e.value === selected)?.children || selected}
                    </div>
                )}

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

            {popupContainer ? createPortal(dropdownContent, popupContainer) : dropdownContent}
        </div>
    );
};

Select.Option = Option;

export { Select };
