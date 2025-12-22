'use client';

import React, {
  Children,
  CSSProperties,
  Fragment,
  isValidElement,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
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
import { prefixClsForm, prefixClsSelect, prefixClsSelectV3 } from '../../utils';
import Option from './Option/Option';
import Tag from './Tag/Tag';
import { Empty } from '../Empty';
import { ConditionalWrapper } from '../ConditionalWrapper';
import './style.css';

const LIST_HEIGHT = 200;
const PADDING_PLACEMENT = 16;
const PADDING_TAG_INPUT = 4;
const FORM_MARGIN_BOTTOM = 20;

function getTextFromNode(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return node.toString();
  }

  if (isValidElement(node)) {
    const html = ReactDOMServer.renderToStaticMarkup(node);
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  return '';
}

const Select = ({
  prefixCls = prefixClsSelect,
  prefixClsV3 = prefixClsSelectV3,
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
  className = '',
  suffixIcon,
  searchIcon,
  style,
  showSearch = false,
  open = true,
  closeFromParent = false,
  showArrow = true,
  notFoundContent = false,
  noStyle,
  feedbackIcons,
  placement = 'bottomLeft',
  removeIcon,
  maxTagCount,
  iconClickClear,
  onSearch,
  onSelect,
  onDeselect,
  onClear,
  onChange,
  onClose,
  tagRender,
  getPopupContainer,
  dropdownRender,
  onDropdownVisibleChange,
  iconClick,
  ref,
  controlled
}: SelectProps
): ReactElement => {
  const asTag = mode === 'tags';
  const asMultiple = mode === 'multiple';
  const hasMode = asTag || asMultiple;

  const initialValue = useMemo(
    () => value ?? defaultValue ?? '',
    [value]
  );

  const checkModeInitialValue = useMemo(
    () =>
      (!Array.isArray(initialValue) ? [initialValue] : initialValue).filter(
        e => e !== undefined && e !== ''
      ),
    [initialValue]
  );

  const [isHover, setIsHover] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [searchInputWidth, setSearchInputWidth] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isOpenChecker, setIsOpenChecker] = useState(isOpen);
  const [searchQuery, setSearchQuery] = useState(searchValue || '');
  const [dropdownPosition, setDropdownPosition] = useState<CSSProperties>({});
  const [lastTagWidth, setLastTagWidth] = useState(0);

  const tagtriggerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLDivElement>(null);
  const [responsiveTagCount, setResponsiveTagCount] = useState<number | null>(null);

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
  }), []);

  const handleMouseEnter = useCallback(() =>
    !disabled && selected?.length && setIsHover(true), [disabled, selected?.length]);

  const handleMouseLeave = useCallback(() => !disabled && setIsHover(false), [disabled]);

  const handleClearInputValue = useCallback(() => {
    if (!autoClearSearchValue) {
      return;
    }

    setSearchQuery('');

    let inputContainer = selectRef.current?.querySelector(
      `[id='${prefixCls}-search-tag-input']`
    ) as HTMLDivElement;

    if (!inputContainer) {
      let inputContainer = selectRef.current?.querySelector(
        `[id='${prefixClsV3}-search-tag-input']`
      ) as HTMLDivElement;

      if (!inputContainer) {
        inputContainer = selectRef.current?.querySelector(
          "[content-editable='plaintext-only']"
        ) as HTMLDivElement;
      }
    }

    if (inputContainer) {
      inputContainer.innerText = '';
    }
  }, [autoClearSearchValue, prefixCls, prefixClsV3]);

  useEffect(() => {
    !controlled && setSelected(hasMode ? checkModeInitialValue : initialValue)
  }, [checkModeInitialValue, hasMode, initialValue])

  const handleClickOutside = useCallback((event?: MouseEvent): void => {
    if (!selectRef.current) return;

    const dropdown = document.querySelector(`.${prefixCls}-dropdown`) || document.querySelector(`.${prefixClsV3}-dropdown`);

    const clickedInside =
      selectRef.current.contains(event?.target as Node) ||
      (dropdown && dropdown.contains(event?.target as Node));

    if (!clickedInside) {
      setSearchFocused(false);
      setIsOpen(false);
      handleClearInputValue();
      onClose?.();
      onDropdownVisibleChange?.(false, selected)
    }
  }, [selectRef.current, prefixCls, prefixClsV3, selected]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const updateDropdownPosition = useCallback((searchQueryUpdated?: boolean) => {
    if (!selectRef.current) {
      return;
    }

    const triggerNode =
      (selectRef.current?.querySelector(`.${prefixCls}-trigger`) || selectRef.current?.querySelector(`.${prefixClsV3}-trigger`)) as HTMLElement;

    const selectBox = triggerNode.getBoundingClientRect();
    const dropdownHeight = ((getPopupContainer
      ? getPopupContainer(triggerNode)
      : selectRef.current)?.querySelector(`.${prefixCls}-dropdown`) as HTMLElement)?.clientHeight || listHeight;
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - selectBox.bottom;
    const spaceAbove = selectBox.top;

    let positionStyle: CSSProperties = {
      width: `${triggerNode.offsetWidth + PADDING_PLACEMENT}px`,
      position: 'absolute',
    };

    const shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;
    const shouldShowBelow = spaceAbove < dropdownHeight && spaceBelow > dropdownHeight;
    const inForm = !triggerNode.closest(`.${prefixClsForm}`) ? FORM_MARGIN_BOTTOM : 0;

    if (isOpen && (shouldShowAbove || shouldShowBelow || searchQueryUpdated || !isOpenChecker)) {
      if (getPopupContainer) {
        positionStyle = {
          ...positionStyle,
          top: shouldShowAbove
            ? `${selectBox.top + document.documentElement.scrollTop - dropdownHeight + (PADDING_PLACEMENT / 2) + inForm - triggerNode.offsetHeight}px`
            : `${selectBox.top + document.documentElement.scrollTop + triggerNode.offsetHeight}px`,
          left: `${selectBox.left - (PADDING_PLACEMENT / 2)}px`,
        };
      } else {
        positionStyle = {
          ...positionStyle,
          top: shouldShowAbove
            ? `${(triggerNode.offsetTop - dropdownHeight + PADDING_PLACEMENT) + inForm - triggerNode.offsetHeight}px`
            : `${triggerNode.offsetTop + triggerNode.offsetHeight}px`,
          left: `${triggerNode.offsetLeft - (PADDING_PLACEMENT / 2)}px`
        };
      }

      setDropdownPosition(positionStyle);
    }
  }, [prefixCls, listHeight, getPopupContainer, isOpenChecker, isOpen]);

  useEffect(() => {
    setIsOpenChecker(isOpen);

    if (!isOpen) {
      setDropdownPosition({});
      setSearchFocused(false);
    } else {
      if (showSearch) {
        setSearchFocused(true);
        searchInputRef.current?.focus();
      }
    }
  }, [isOpen, showSearch]);

  useEffect(() => {
    if (!open && isOpen && closeFromParent) {
      handleClickOutside();
    }
  }, [open, isOpen, closeFromParent])

  useEffect(() => {
    if (!isOpen) return;

    const _updateDropdownPosition = () => updateDropdownPosition();

    _updateDropdownPosition();

    const controller = new AbortController();
    const scrollableParents = getScrollParents(selectRef.current!);

    scrollableParents.forEach(el => {
      el.addEventListener('scroll', _updateDropdownPosition, {
        passive: true,
        signal: controller.signal
      });
    });

    window.addEventListener('scroll', _updateDropdownPosition, {
      passive: true,
      signal: controller.signal
    });

    window.addEventListener('resize', _updateDropdownPosition, {
      signal: controller.signal
    });

    return () => {
      controller.abort();
    };
  }, [isOpen, getPopupContainer, updateDropdownPosition]);

  useEffect(() => {
    updateDropdownPosition(true);
  }, [searchQuery.length]);

  const getScrollParents = useCallback((element: HTMLElement): HTMLElement[] => {
    const parents: HTMLElement[] = [];
    let current = element.parentElement;

    while (current) {
      if (current.scrollHeight > current.clientHeight) {
        parents.push(current);
      }
      current = current.parentElement;
    }

    return parents;
  }, []);

  const handleSearch = (e: SyntheticBaseEvent) => {
    setSearchQuery(e.target.value as string);
    onSearch?.(e.target.value as string);

    if (!isOpen) {
      setIsOpen(!isOpen || defaultOpen);
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
    !controlled && onSelect?.(updatedSelected);

    const input = selectRef.current?.querySelector('input');

    if (input) {
      input.value = '';
    }

    !controlled && setSelected(updatedSelected);
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

      !controlled && setSelected(newSelection);
      onChange?.(newSelection, option);

      if (selected.includes(optionValue)) {
        !controlled && onDeselect?.(optionValue, option);
      } else {
        !controlled && onSelect?.(optionValue, option);
      }
    } else {
      setIsOpen(defaultOpen);
      !controlled && setSelected(optionValue);
      onChange?.(optionValue, option);
      !controlled && onSelect?.(optionValue, option);
    }

    handleClearInputValue();
  };

  const handleClear = () => {
    const value = hasMode ? [] : '';

    !controlled && setSelected(value);
    onChange?.('');
    !controlled && onSelect?.('');
    onClear?.();

    handleClearInputValue();
  };

  const handleRemoveTag = (e: SyntheticBaseEvent) => handleSelect(e, e.target.value);

  const handleOnKeyDown = (
    e: KeyboardEvent<HTMLInputElement> & {
      target: { value: string; innerText: string };
    }
  ) => {
    if (!isOpen || e.which === 13) {
      e.stopPropagation();
      e.preventDefault();

      return;
    }

    const timeout = setTimeout(() => {
      setSearchFocused(true);

      e.target.value = (searchInputRef.current?.innerText || e.target.innerText).replace('\n', '');

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

      if (e.key === 'Backspace') {
        if (hasMode && !e.target.value.trim().length) {
          const updatedSelected = hasMode
            ? (selected as string[]).filter(
              item => item !== selected[selected.length - 1]
            )
            : e.target.value.trim();

          if (selected[selected.length - 1]) {
            !controlled && onDeselect?.(selected[selected.length - 1]);
          }

          onChange?.(updatedSelected);
          !controlled && setSelected(updatedSelected);
          setSearchFocused(false);
        }
      }

      clearTimeout(timeout);
    });
  };

  const ArrowContainer = useMemo(() => {
    if (!showArrow) {
      return null;
    }

    return (
      showSearch && isOpen
        ? (searchIcon || <SearchIcon />)
        : suffixIcon
          ? <span style={{ display: 'contents' }} onClick={() => iconClickClear ? handleClear() : iconClick?.()}>{suffixIcon}</span>
          : (showArrow && <ArrowIcon isOpen={isOpen} />)
    )
  }, [showArrow, showSearch, isOpen, suffixIcon, searchIcon]);

  const extractOptions = useCallback((children: ReactNode, options?: OptionType[]) => {
    const result: OptionType[] = [];

    const flatten = (nodes: ReactNode): void => {
      try {
        Children.forEach(nodes, (child) => {
          if (!child) return;

          if (isValidElement(child)) {
            if (child.type === Fragment || child.type === Suspense) {
              flatten((child.props as OptionType).children);
            } else {
              result.push(child.props as OptionType);
            }
          }
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        Object.assign(result, nodes)
      }
    };

    if (children) {
      flatten(children);

      return result;
    }

    return options || [];
  }, [])

  const extractedOptions = useMemo(() => {
    return children
      ? extractOptions(children)
      : Array.isArray(options) ? options : []
  }, [children, options]);

  const triggerNode = useMemo(() => {
    return selectRef.current?.querySelector(`.${prefixCls}-trigger`) as HTMLElement
  }, [prefixCls]);

  const filteredOptions = useMemo(() => {
    return extractedOptions.filter((option: OptionType) => {
      if (typeof filterOption === 'function') {
        return filterOption(searchQuery, option);
      }

      if (filterOption === false) {
        return true;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const optionFilterPropValue = option[optionFilterProp];

      const valueToCheck =
        optionFilterProp && typeof optionFilterPropValue === 'string'
          ? String(optionFilterPropValue)
          : Array.isArray(option.children) && typeof option.children[0] === 'string'
            ? option.children[0]
            : getTextFromNode(option.children) || String(option.label) || String(option.value);

      return valueToCheck.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [extractedOptions, filterOption, optionFilterProp, searchQuery]);

  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      onDropdownVisibleChange?.(!isOpen, selected)
    }

    const searchContent = selectRef.current?.getElementsByClassName(
      `${prefixCls}-tag-container`
    )?.[0] as HTMLDivElement;

    if (searchContent) {
      setSearchInputWidth(searchContent.clientWidth - PADDING_TAG_INPUT);
    }
  };

  const selectedOption = useMemo(() => {
    const option =
      extractedOptions.find(
        (e) => e.value === selected || e.label === selected || e.children === selected
      ) || selected;

    return <div style={{ display: 'contents' }}>{typeof option === 'string' ? option : option?.children || option?.label || option?.value || null}</div>;
  }, [extractedOptions, selected]) || selected || null;

  const hasMaxTagCount = hasMode && (typeof maxTagCount === 'number' || maxTagCount === 'responsive');
  const container = tagtriggerRef.current;
  const selectedTags = hasMode ? (selected as string[]) : [];

  const displayTagCount = maxTagCount === 'responsive' ? responsiveTagCount : maxTagCount;
  const tagsToDisplay = hasMaxTagCount ? selectedTags.slice(0, displayTagCount || selectedTags.length) : selectedTags;
  const overflowCount = hasMaxTagCount ? selectedTags.length - (displayTagCount || selectedTags.length) : 0;
  const tags = Array.from(container?.querySelectorAll(`.${prefixCls}-tag:not(.contentEditable):not(.${prefixCls}-tag-overflow)`) || []);

  useLayoutEffect(() => {
    if (maxTagCount === 'responsive' && container) {
      const containerWidth = container?.clientWidth || 0;
      let currentWidth = 0;
      let count = 0;

      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i] as HTMLElement;

        if (tags.length - 1 === i && overflowCount) {
          setLastTagWidth(tag.offsetWidth);
        }

        currentWidth += tag.offsetWidth + PADDING_PLACEMENT;

        if (currentWidth < containerWidth) {
          count++;
        } else {
          break;
        }
      }

      if (overflowCount === 1 && lastTagWidth + PADDING_PLACEMENT) {
        setResponsiveTagCount(0);
      }

      if (currentWidth >= containerWidth) {
        setResponsiveTagCount(count);
      }
    }
  }, [maxTagCount, container, tags, overflowCount]);

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
          [prefixClsV3]: prefixClsV3,
          [className]: !!className,
          [`${prefixCls}-error ${prefixClsV3}-error`]: error,
          [`${prefixCls}-multi ${prefixClsV3}-multi`]: hasMode,
          [`${prefixCls}-disabled ${prefixClsV3}-disabled`]: disabled
        }
      ])}
    >
      <div
        onClick={handleTriggerClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${prefixCls}-trigger ${prefixClsV3}-trigger`}
      >
        {(showSearch || hasMode) ? (
          <div
            ref={tagtriggerRef}
            style={{
              ...style,
              ...(isOpen ? { opacity: hasMode || searchQuery.length ? 1 : 0.5, maxWidth: `${searchInputWidth}px` } : {}),
              minWidth: `${searchInputWidth}px`
            }}
            className={clsx([
              `${prefixCls}-tag-container ${prefixClsV3}-tag-container`,
              {
                [`${prefixCls}-tag-container-fixHeight ${prefixClsV3}-tag-container-fixHeight`]: !tagtriggerRef.current
              }
            ])}
          >
            {hasMode ? <>
              {selectedTags.length ? (
                <>
                  {tagsToDisplay.map((tag, index) =>
                    tagRender ? (
                      <div key={`${index}_${tag}`} className={`${prefixCls}-tag-render-container`}>
                        {tagRender?.({
                          label:
                            (() => {
                              const option = extractedOptions.find(
                                e => e.value === tag || e.label === tag || e.children === tag
                              );

                              return option?.children || option?.label || option?.value || null;
                            })() || tag || null,
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
                          (() => {
                            const option = extractedOptions.find(
                              e => e.value === tag || e.label === tag || e.children === tag
                            );

                            return option?.children || option?.label || option?.value || null;
                          })() || tag || null
                        }
                        onClose={handleRemoveTag}
                        key={`${index}_${tag}`}
                      />
                    )
                  )}
                  {overflowCount > 0 && (
                    <Tag
                      label={`+${overflowCount}`}
                      className={`${prefixCls}-tag-overflow ${prefixClsV3}-tag-overflow`}
                    />
                  )}
                </>
              ) : (
                <span style={{ opacity: 0.5 }}>{searchFocused ? '' : placeholder}</span>
              )}
            </> : null}

            {isOpen ? (
              <div className={`${prefixCls}-tag ${prefixClsV3}-tag contentEditable`}>
                <div
                  translate='no'
                  ref={searchInputRef}
                  onClick={e => {
                    if (disabled) {
                      e.preventDefault();
                      e.stopPropagation();

                      return;
                    }
                  }}
                  onKeyDown={handleOnKeyDown}
                  style={{
                    minWidth: showSearch && !searchQuery.length ? 1 : 'auto',
                    display: 'ruby',
                    textAlign: 'center',
                    opacity: searchFocused ? 1 : 0
                  }}
                  {...showSearch ? {
                    contentEditable: true
                  } : {}}
                  id={`${prefixCls}-search-tag-input`}
                  className={`${prefixCls}-tag-input`}
                />
                {!hasMode && !searchQuery.length ? (selected === ''
                  ? placeholder
                  : selectedOption) : null}
              </div>
            ) : !hasMode ? (
              <div
                className={`${prefixCls}-input ${prefixClsV3}-input globalEllipsis`}
                style={{ opacity: isOpen || selected === '' ? '0.6' : '1' }}
              >
                {selected === ''
                  ? placeholder
                  : selectedOption}
              </div>
            ) : null}
          </div>
        ) : !hasMode ? (
          <div
            className={`${prefixCls}-input ${prefixClsV3}-input globalEllipsis`}
            onClick={() => !disabled && setIsOpen(!isOpen || defaultOpen)}
            style={{ opacity: isOpen || selected === '' ? '0.6' : '1' }}
          >
            {selected === ''
              ? placeholder
              : selectedOption}
          </div>
        ) : null}

        {isHover && !loading ? (
          allowClear && selected ? (
            <button
              className={`${prefixCls}-clear-btn ${prefixClsV3}-clear-btn`}
              onClick={handleClear}
            >
              {removeIcon || <ClearIcon />}
            </button>
          ) : (
            <span className={`${prefixCls}-arrow ${prefixClsV3}-arrow`}>
              {ArrowContainer}
              {error && feedbackIcons ? <ErrorIcon /> : null}
            </span>
          )
        ) : (
          <>
            {!loading && (
              <span className={`${prefixCls}-arrow ${prefixClsV3}-arrow`}>
                {ArrowContainer}
                {error && feedbackIcons ? <ErrorIcon /> : null}
              </span>
            )}

            {loading && (
              <span className={`${prefixCls}-loading ${prefixClsV3}-loading`}>
                <LoadingIcon />
              </span>
            )}
          </>
        )}
      </div>

      <ConditionalWrapper
        condition={getPopupContainer !== undefined}
        wrapper={(element) => getPopupContainer
          ? createPortal(element, getPopupContainer(triggerNode) as HTMLElement)
          : <>{element}</>
        }
      >
        {!loading && open && isOpen && (
          <div
            className={clsx([
              `${prefixCls}-dropdown ${prefixClsV3}-dropdown`,
              {
                [placement]: placement,
                [dropdownClassName]: dropdownClassName
              }
            ])}
            style={{
              ...dropdownPosition,
              maxHeight: dropdownRender ? 'unset' : listHeight
            }}
          >
            {filterable && (
              <input
                type="text"
                inputMode="text"
                className={`${prefixCls}-search ${prefixClsV3}-search`}
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search..."
              />
            )}

            {!loading && (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              <ConditionalWrapper wrapper={(element) => {
                return dropdownRender?.(element || <> </>) || <> </>
              }} condition={!!dropdownRender}>
                <div
                  className={`${prefixCls}-options ${prefixClsV3}-options`}
                  style={{
                    maxHeight: listHeight,
                    overflowY: 'auto',
                    // display: !filteredOptions.length && asTag ? 'none' : 'block',
                    maxWidth: selectRef.current ? `${selectRef.current.getBoundingClientRect().width}px` : 'inherit',
                  }}
                >
                  {asTag && !!searchQuery && (
                    <Option
                      value={searchQuery}
                      className={`${prefixCls}-focused ${prefixClsV3}-focused`}
                      onClick={e => {
                        handleSelect(e as MouseEventHandlerSelect, searchQuery);
                      }}
                      data-value={searchQuery}
                    >
                      {searchQuery}
                    </Option>
                  )}

                  {filteredOptions.length
                    ? filteredOptions.map(
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
                                [`${prefixCls}-focused ${prefixClsV3}-focused`]: hasMode
                                  ? isSelected
                                  : props.value === selected,
                                [`${prefixCls}-disabled ${prefixClsV3}-disabled`]:
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
                                { children, className, ...props, key: `${index}` } as OptionType
                              );
                            }}
                            data-value={props.value}
                          >
                            {children || props.label || props.value}

                            {menuItemSelectedIcon && hasMode && isSelected && (
                              <span className={`${prefixCls}-selected-icon ${prefixClsV3}-selected-icon`}>
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
                    ) : !asTag
                      ? notFoundContent || <Empty />
                      : null}
                </div>
              </ConditionalWrapper>
            )}
          </div>
        )}
      </ConditionalWrapper>
    </div>
  );
};

Select.displayName = 'Select';

export default Select;