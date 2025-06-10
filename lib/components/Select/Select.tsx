'use client';

import React, {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import {
  ArrowIcon,
  CheckIcon,
  ClearIcon,
  ErrorIcon,
  LoadingIcon,
  SearchIcon
} from '../Icons/Icons';
import { clsx } from '../../helpers';
import { MouseEventHandlerSelect, SyntheticBaseEvent } from '../../types';
import { OptionType, SelectProps } from '../../types/select';
import { prefixClsSelect } from '../../utils';
import Option from './Option/Option';
import Tag from './Tag/Tag';
import { Empty } from '../Empty';
import './style.css';

const LIST_HEIGHT = 200;
const PADDING_PLACEMENT = 18;
const PADDING_TAG_INPUT = 4;

function getTextFromNode(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return node.toString();
  }

  if (React.isValidElement(node)) {
    const html = ReactDOMServer.renderToStaticMarkup(node);
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  return '';
}

const SelectComponent = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      prefixCls = prefixClsSelect,
      id,
      searchValue = '',
      autoClearSearchValue = true,
      filterOption = true,
      optionFilterProp,
      children,
      options = [],
      listHeight = LIST_HEIGHT,
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
      size = 'large',
      error = false,
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
      notFoundContent = false,
      tagRender,
      getPopupContainer,
      dropdownRender,
      noStyle,
      feedbackIcons,
      placement = 'bottomLeft',
      removeIcon
    },
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    const asTag = mode === 'tags';
    const asMultiple = mode === 'multiple';
    const hasMode = asTag || asMultiple;

    const initialValue = useMemo(
      () => value || defaultValue || '',
      [value, defaultValue]
    );

    const checkModeInitialValue = useMemo(
      () =>
        (!Array.isArray(initialValue) ? [initialValue] : initialValue).filter(
          e => e
        ),
      [initialValue]
    );

    const [isHover, setIsHover] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const [searchInputWidth, setSearchInputWidth] = useState<number>(0);
    const [isOpen, setIsOpen] = useState(defaultOpen || open);
    const [searchQuery, setSearchQuery] = useState(searchValue || '');
    const [dropdownPosition, setDropdownPosition] = useState<CSSProperties>({});

    const [selected, setSelected] = useState(
      hasMode ? checkModeInitialValue : initialValue
    );

    useImperativeHandle(ref, () => ({
      focus: () => selectRef.current?.focus(),
      blur: () => (selectRef.current as HTMLInputElement)?.blur(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      scrollTo: (...args) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        (selectRef.current as HTMLDivElement)?.scrollTo(...args),
      nativeElement: selectRef.current
    }));

    const handleMouseEnter = () =>
      !disabled && selected?.length && setIsHover(true);

    const handleMouseLeave = () => !disabled && setIsHover(false);

    const handleClearInputValue = useCallback(() => {
      if (!autoClearSearchValue) {
        return;
      }

      setSearchQuery('');

      let inputContainer = selectRef.current?.querySelector(
        `[id='${prefixCls}-search-tag-input']`
      ) as HTMLDivElement;

      if (!inputContainer) {
        inputContainer = selectRef.current?.querySelector(
          "[content-editable='plaintext-only']"
        ) as HTMLDivElement;
      }

      if (inputContainer) {
        inputContainer.innerText = '';
      }
    }, [autoClearSearchValue, prefixCls]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent): void => {
        if (!selectRef.current) return;

        const dropdown = document.querySelector(`.${prefixCls}-dropdown`);
        const clickedInside =
          selectRef.current.contains(event.target as Node) ||
          (dropdown && dropdown.contains(event.target as Node));

        if (!clickedInside) {
          setIsOpen(false);
          handleClearInputValue();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [handleClearInputValue, open, hasMode, prefixCls]);

    const updateDropdownPosition = useCallback(() => {
      if (!selectRef.current) return;

      const selectBox = selectRef.current.getBoundingClientRect();
      const dropdownHeight = listHeight;
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - selectBox.bottom;
      const spaceAbove = selectBox.top;

      let positionStyle: CSSProperties = {
        ...getPopupContainer ? {
          top: `${selectBox.bottom}px`,
          left: `${selectBox.left}px`,
        } : {},
        width: `${selectBox.width}px`,
        position: 'absolute',
      };

      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        positionStyle = {
          ...getPopupContainer ? {
            top: `${selectBox.top - dropdownHeight}px`,
            left: `${selectBox.left}px`,
          } : {},
          width: `${selectBox.width}px`,
          position: 'absolute',
        };
      }

      setDropdownPosition(positionStyle);
    }, [listHeight, getPopupContainer]);

    useEffect(() => {
      if (!isOpen) return;

      updateDropdownPosition();

      const scrollableParents = getScrollParents(selectRef.current!);

      const handleScroll = () => {
        updateDropdownPosition();
      };

      scrollableParents.forEach(el => {
        el.addEventListener('scroll', handleScroll, { passive: true });
      });

      window.addEventListener('resize', updateDropdownPosition);

      return () => {
        scrollableParents.forEach(el => {
          el.removeEventListener('scroll', handleScroll);
        });
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }, [isOpen, getPopupContainer, updateDropdownPosition]);

    const getScrollParents = (element: HTMLElement): HTMLElement[] => {
      const parents: HTMLElement[] = [];
      let current = element.parentElement;

      while (current) {
        if (current.scrollHeight > current.clientHeight) {
          parents.push(current);
        }
        current = current.parentElement;
      }

      return parents;
    };

    const handleSearch = (e: SyntheticBaseEvent) => {
      setSearchQuery(e.target.value as string);
      onSearch?.(e.target.value as string);

      if (!isOpen) {
        setIsOpen(!isOpen || open);
        handleClearInputValue();
      }
    };

    const handleEnterAddNewTag = () => {
      if (
        asMultiple ||
        (maxCount &&
          selected.length >= maxCount &&
          !selected.includes(searchQuery))
      ) {
        return;
      }

      const newOptionValue = searchQuery.trim();

      if (!newOptionValue || !hasMode || selected.includes(newOptionValue)) {
        return;
      }

      const updatedSelected = [...selected, newOptionValue];

      onChange?.(updatedSelected);
      onSelect?.(updatedSelected);

      const input = selectRef.current?.querySelector('input');

      if (input) {
        input.value = '';
      }

      setSelected(updatedSelected);
      handleClearInputValue();
    };

    const handleSelect = (
      e: SyntheticBaseEvent,
      optionValue: string,
      option?: OptionType
    ) => {
      if (hasMode) {
        if (
          maxCount &&
          selected.length >= maxCount &&
          !selected.includes(optionValue)
        ) {
          return;
        }

        const newSelection = selected.includes(optionValue)
          ? (selected as string[]).filter(item => item !== optionValue)
          : [...selected, optionValue];

        setSelected(newSelection);
        onChange?.(newSelection, option);
        onSelect?.(newSelection, option);

        if (selected.includes(optionValue)) {
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
      const value = hasMode ? [] : '';

      setSelected(value);
      onChange?.('');
      onSelect?.('');
      onClear?.();

      handleClearInputValue();
    };

    const handleRemoveTag = (e: SyntheticBaseEvent) => {
      const updatedSelected = hasMode
        ? (selected as string[]).filter(item => item !== e.target.value)
        : e.target.value;

      onChange?.(updatedSelected);
      onSelect?.(updatedSelected);
      setSelected(updatedSelected);
    };

    const handleOnKeyDown = (
      e: KeyboardEvent<HTMLInputElement> & {
        target: { value: string; innerText: string };
      }
    ) => {
      const timeout = setTimeout(() => {
        e.target.value = e.target.innerText.trim().replace('\n', '');

        setSearchQuery(e.target.value);
        onSearch?.(e.target.value);

        if (e.key === 'Enter' && searchQuery.trim() !== '') {
          if (!asTag) {
            e.stopPropagation();
            e.preventDefault();

            clearTimeout(timeout);

            return;
          }

          handleEnterAddNewTag();

          e.target.innerText = '';
        }

        if (
          e.key === 'Backspace' &&
          (hasMode ? !searchQuery.trim().length : searchQuery.trim().length)
        ) {
          const updatedSelected = hasMode
            ? (selected as string[]).filter(
              item => item !== selected[selected.length - 1]
            )
            : searchQuery.trim();

          onChange?.(updatedSelected);
          onSelect?.(updatedSelected);
          setSelected(updatedSelected);
        }

        clearTimeout(timeout);
      });
    };

    const ArrowContainer = useMemo(() => {
      if (!showArrow) {
        return null;
      }

      return showSearch && isOpen ? (
        <SearchIcon />
      ) : (
        <span>
          {suffixIcon || (showArrow && <ArrowIcon isOpen={isOpen} />)}
        </span>
      );
    }, [showArrow, showSearch, isOpen, suffixIcon]);

    const popupContainer = useMemo(() => {
      if (typeof window === 'undefined') {
        return selectRef.current;
      }

      return getPopupContainer?.(selectRef.current) || selectRef.current;
    }, [getPopupContainer]);

    const extractedOptions = children
      ? (Array.isArray(children) ? children : [children])
        .filter(e => e)
        .map((child: { props: OptionType }) => child.props)
      : options;

    const filteredOptions = extractedOptions.filter((option: OptionType) => {
      if (typeof filterOption === 'function') {
        return filterOption(searchQuery, option);
      }

      if (filterOption === false) {
        return true;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const optionFilterPropValue = option[optionFilterProp]

      const valueToCheck =
        optionFilterProp && typeof optionFilterPropValue === 'string'
          ? String(optionFilterPropValue)
          : getTextFromNode(option.children) || String(option.value);

      return valueToCheck.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleTriggerClick = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }

      const searchContent = selectRef.current?.getElementsByClassName(
        `${prefixCls}-tag-container`
      )?.[0] as HTMLDivElement;

      if (searchContent) {
        setSearchInputWidth(searchContent.clientWidth - PADDING_TAG_INPUT);
      }

      const timeout = setTimeout(() => {
        const searchInput = document.getElementById(
          `${prefixCls}-search-tag-input`
        );

        if (searchInput) {
          searchInput?.focus();
        }

        clearTimeout(timeout);
      }, 0);
    };

    const dataRender = (() => {
      const options = filteredOptions.map(
        ({ children, className = '', ...props }, index) => {
          const isSelected = hasMode
            ? selected.includes(props.value as string)
            : props.value === selected;

          return (
            <Option
              key={`${props.value}_${index}`}
              {...props}
              selected={isSelected}
              className={clsx([
                className,
                {
                  [`${prefixCls}-focused`]: hasMode
                    ? isSelected
                    : props.value === selected,
                  [`${prefixCls}-disabled`]:
                    maxCount && hasMode && !isSelected
                      ? selected.length >= maxCount
                      : false
                }
              ])}
              onClick={e => {
                if (props.disabled) {
                  return;
                }

                handleSelect(
                  e as MouseEventHandlerSelect,
                  props.value as string,
                  { children, className, ...props } as OptionType
                );
              }}
              data-value={props.value}
            >
              {children || props.value}

              {hasMode && isSelected && (
                <span className={`${prefixCls}-selected-icon`}>
                  {menuItemSelectedIcon === true ? (
                    <CheckIcon />
                  ) : (
                    menuItemSelectedIcon
                  )}
                </span>
              )}
            </Option>
          );
        }
      );

      return dropdownRender ? dropdownRender(options) : options;
    })();

    const dropdownContent = !loading && isOpen && (
      <div
        className={clsx([
          `${prefixCls}-dropdown`,
          {
            [placement]: placement,
            [dropdownClassName]: dropdownClassName
          }
        ])}
        style={{
          ...dropdownPosition,
          maxHeight: listHeight,
          ...(['topLeft', 'topRight'].includes(placement)
            ? {
              top:
                -(
                  (selectRef.current?.querySelector(`.${prefixCls}-dropdown`)
                    ?.clientHeight || listHeight) + PADDING_PLACEMENT
                ) + (selectRef.current?.clientHeight || 0)
            }
            : {})
        }}
      >
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
          <div
            className={`${prefixCls}-options`}
            style={{
              maxHeight: listHeight,
              overflowY: 'auto',
              maxWidth: selectRef.current ? `${selectRef.current.getBoundingClientRect().width}px` : 'inherit',
            }}
          >
            {asTag && !!searchQuery && (
              <Option
                value={searchQuery}
                className={`${prefixCls}-focused`}
                onClick={e => {
                  handleSelect(e as MouseEventHandlerSelect, searchQuery);
                }}
                data-value={searchQuery}
              >
                {searchQuery}
              </Option>
            )}

            {filteredOptions.length
              ? dataRender
              : !asTag
                ? notFoundContent || <Empty />
                : null}
          </div>
        )}
      </div>
    );

    return (
      <div
        id={id}
        ref={selectRef}
        style={style}
        className={clsx([
          {
            [size]: size,
            noStyle: noStyle,
            [prefixCls]: prefixCls,
            [`${prefixCls}-error`]: error,
            [`${prefixCls}-multi`]: hasMode,
            [`${prefixCls}-disabled`]: disabled
          }
        ])}
      >
        <div
          onClick={handleTriggerClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`${prefixCls}-trigger`}
        >
          {showSearch ? (
            <div
              style={{
                ...style,
                ...(isOpen ? { maxWidth: `${searchInputWidth}px` } : {}),
                minWidth: `${searchInputWidth}px`
              }}
              className={`${prefixCls}-tag-container`}
            >
              {hasMode &&
                (selected as string[]).map((tag, index) =>
                  tagRender ? (
                    <div key={`${index}_${tag}`}>
                      {tagRender?.({
                        label:
                          extractedOptions.find(e => e.value === tag)
                            ?.children || tag,
                        value: tag,
                        onClose: handleRemoveTag,
                        closable: true
                      })}
                    </div>
                  ) : (
                    <Tag
                      closable
                      value={tag}
                      label={
                        tag === ''
                          ? placeholder
                          : extractedOptions.find(e => e.value === tag)
                            ?.children || tag
                      }
                      onClose={handleRemoveTag}
                      key={`${index}_${tag}`}
                    />
                  )
                )}

              {isOpen ? (
                <div className={`${prefixCls}-tag`}>
                  <div
                    onClick={e => {
                      if (disabled) {
                        e.preventDefault();
                        e.stopPropagation();

                        return;
                      }
                    }}
                    onKeyDown={handleOnKeyDown}
                    style={{
                      width: 'auto',
                      display: 'ruby',
                      textAlign: 'center'
                    }}
                    contentEditable="plaintext-only"
                    id={`${prefixCls}-search-tag-input`}
                    className={`${prefixCls}-tag-input`}
                  />
                </div>
              ) : !hasMode ? (
                <div
                  className={`${prefixCls}-input globalEllipsis`}
                  style={{ opacity: isOpen || selected === '' ? '0.6' : '1' }}
                >
                  {selected === ''
                    ? placeholder
                    : extractedOptions.find(e => e.value === selected)
                      ?.children || selected}
                </div>
              ) : null}
            </div>
          ) : !hasMode ? (
            <div
              className={`${prefixCls}-input globalEllipsis`}
              onClick={() => !disabled && setIsOpen(!isOpen || open)}
              style={{ opacity: isOpen || selected === '' ? '0.6' : '1' }}
            >
              {selected === ''
                ? placeholder
                : (() => {
                  const option = extractedOptions.find(
                    e => e.value === selected
                  );

                  return option?.children || option?.value || null;
                })()}
            </div>
          ) : null}

          {isHover && !loading ? (
            allowClear && selected ? (
              <button
                className={`${prefixCls}-clear-btn`}
                onClick={handleClear}
              >
                {removeIcon || <ClearIcon />}
              </button>
            ) : (
              <span className={`${prefixCls}-arrow`}>
                {ArrowContainer}
                {error && feedbackIcons ? <ErrorIcon /> : null}
              </span>
            )
          ) : (
            <>
              {!loading && (
                <span className={`${prefixCls}-arrow`}>
                  {ArrowContainer}
                  {error && feedbackIcons ? <ErrorIcon /> : null}
                </span>
              )}

              {loading && (
                <span className={`${prefixCls}-loading`}>
                  <LoadingIcon />
                </span>
              )}
            </>
          )}
        </div>

        {popupContainer
          ? createPortal(dropdownContent, popupContainer)
          : dropdownContent}
      </div>
    );
  }
);

SelectComponent.displayName = 'Select';
const Select = Object.assign(SelectComponent, { Option });

export default Select;
