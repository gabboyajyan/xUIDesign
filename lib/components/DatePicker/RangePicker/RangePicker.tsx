'use client';

import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { clsx } from '../../../helpers';
import { TRangePickerProps } from '../../../types/datepicker';
import { prefixClsRangePicker } from '../../../utils';
import { MONTH_LENGTH, NEXT_DAYS_COUNT_AS_CURRENT_MUNTH, NUMBER_SIX } from '../DatePicker';
import { CalendarIcon, ClearIcon, DateDistanceIcon } from '../../Icons/Icons';
import { createPortal } from 'react-dom';
import { ConditionalWrapper } from '@/components/ConditionalWrapper';
import './style.css';

const RangePicker = ({
  prefixCls = prefixClsRangePicker,
  value,
  onChange,
  placeholder = ['Start date', 'End date'],
  disabled,
  error,
  format = 'YYYY-MM-DD',
  prefix,
  allowClear = true,
  inputReadOnly = false,
  size = 'large',
  picker = 'date',
  locale,
  disabledDate,
  onOpenChange,
  onCalendarChange,
  style = {},
  className = '',
  separator,
  defaultValue,
  bordered = true,
  getPopupContainer
}: TRangePickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([
    value?.[0] || defaultValue?.[0] || null,
    value?.[1] || defaultValue?.[1] || null
  ]);

  useEffect(() => {
    setSelectedDates([
      value?.[0] || defaultValue?.[0] || null,
      value?.[1] || defaultValue?.[1] || null
    ])
  }, [value])

  const popupRef = useRef<HTMLDivElement>(null);

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<'day' | 'month' | 'year'>(
    picker === 'month' ? 'month' : picker === 'year' ? 'year' : 'day'
  );

  const [dropdownPosition, setDropdownPosition] = useState<CSSProperties>({});

  const localeMonths =
    locale?.shortMonths ||
    Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString(locale?.locale || 'default', {
        month: 'short'
      })
    );

  const localeWeekdays = locale?.shortWeekDays || [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownPossition = useCallback(() => {
    if (!containerRef.current) return {};

    const inputRect = containerRef.current.getBoundingClientRect();
    const popupEl = popupRef.current;
    const dropdownHeight = popupEl?.offsetHeight || 290;

    const popupContainer = getPopupContainer
      ? getPopupContainer(document.body)
      : getScrollParent(containerRef.current, true) || document.body;

    const containerRect = popupContainer.getBoundingClientRect();

    const spaceAbove = inputRect.top - containerRect.top;
    const spaceBelow = containerRect.bottom - inputRect.bottom;

    const shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;

    if (getPopupContainer) {
      if (shouldShowAbove) {
        setDropdownPosition({
          top: (containerRef.current?.getBoundingClientRect().top || 0) + document.documentElement.scrollTop - 290,
          left: (containerRef.current?.getBoundingClientRect().left || 0) + document.documentElement.scrollLeft,
        })
      } else {
        setDropdownPosition({
          top: (containerRef.current?.getBoundingClientRect().top || 0) + document.documentElement.scrollTop + (containerRef.current?.offsetHeight || 0),
          left: (containerRef.current?.getBoundingClientRect().left || 0) + document.documentElement.scrollLeft,
        })
      }
    } else {
      setDropdownPosition({
        top:
          shouldShowAbove
            ? containerRef.current.offsetTop -
            (popupEl?.offsetHeight || dropdownHeight) - 8
            : containerRef.current.offsetTop + containerRef.current.offsetHeight,
        left: containerRef.current.offsetLeft,
      });
    }
  }, [isOpen, getPopupContainer]);

  function getScrollParent(
    el: HTMLElement | null,
    includeSelf = false
  ): HTMLElement | null {
    if (!el) return null;

    let current: HTMLElement | null = includeSelf ? el : el.parentElement;

    while (current) {
      const style = getComputedStyle(current);

      const overflowY = style.overflowY;
      const overflowX = style.overflowX;

      const canScroll =
        overflowY === 'auto' ||
        overflowY === 'scroll' ||
        overflowX === 'auto' ||
        overflowX === 'scroll';

      if (canScroll) {
        return current;
      }

      current = current.parentElement;
    }

    return document.scrollingElement as HTMLElement;
  }

  useEffect(() => {
    if (!isOpen) return;

    const _dropdownPossition = () => dropdownPossition();

    _dropdownPossition();

    const controller = new AbortController();

    const scrollableParents = getScrollParent(containerRef.current, true);

    scrollableParents?.addEventListener('scroll', _dropdownPossition, {
      passive: true,
      signal: controller.signal
    });

    window.addEventListener('scroll', _dropdownPossition, {
      passive: true,
      signal: controller.signal
    });

    window.addEventListener('resize', _dropdownPossition, {
      signal: controller.signal
    });

    return () => {
      controller.abort();
    };
  }, [isOpen, getPopupContainer, dropdownPossition]);

  const isInHoverRange = (date: Date) => {
    const [start, end] = selectedDates;
    if (!start || end || !hoveredDate) return false;

    const rangeStart = hoveredDate < start ? hoveredDate : start;
    const rangeEnd = hoveredDate < start ? start : hoveredDate;

    return date > rangeStart && date < rangeEnd;
  };

  const handleSelect = (date: Date) => {
    if (!selectedDates[0] || (selectedDates[0] && selectedDates[1])) {
      setSelectedDates([date, null]);
      onCalendarChange?.([date.toUTCString(), undefined], [formatDate(date)], {});
    } else {
      const start = selectedDates[0];
      const end = date < start ? start : date;
      const begin = date < start ? date : start;
      setSelectedDates([begin, end]);
      onChange?.(
        [begin.toUTCString(), end.toUTCString()],
        [formatDate(begin), formatDate(end)]
      );
      onCalendarChange?.(
        [begin.toUTCString(), end.toUTCString()],
        [formatDate(begin), formatDate(end)], {}
      );
      setIsOpen(false);
      onOpenChange?.(false);
    }
  };

  const isMonthDisabled = (month: number) => {
    const date = new Date(currentYear, month + 1, 1);

    return disabledDate?.(date, { from: undefined, to: undefined });
  };

  const isYearDisabled = (year: number) => {
    const date = new Date(year + 1, currentMonth, 1);

    return disabledDate?.(date, { from: undefined, to: undefined });
  };

  const formatDate = (date: Date) => {
    if (typeof format === 'function') {
      return format(date);
    }

    return `${format}`
      .replace(/YYYY/, date.getFullYear().toString())
      .replace(/MM/, (date.getMonth() + 1).toString().padStart(2, '0'))
      .replace(/DD/, date.getDate().toString().padStart(2, '0'));
  };

  const isInRange = (date: Date) => {
    const [start, end] = selectedDates;

    return start && end && date > start && date < end;
  };

  const renderMonthYearSelector = (monthOffset = 0, all?: boolean) => {
    const baseYear = currentYear;
    const baseMonth = currentMonth + monthOffset;

    return (
      <div className={`${prefixCls}-header ${className}`}>
        {all || !monthOffset ? (
          <div className={`${prefixCls}-nav-buttons`}>
            <button onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              setCurrentYear((y: number) => y - 1)
            }}
            >
              &laquo;
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                setCurrentMonth((m: number) =>
                  m === 0
                    ? (setCurrentYear((y: number) => y - 1), MONTH_LENGTH)
                    : m - 1
                )
              }
              }
            >
              &lsaquo;
            </button>
          </div>
        ) : (
          <span />
        )}
        <div className={`${prefixCls}-dropdown-selects`}>
          <button
            type="button"
            className={`${prefixCls}-select`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              setViewMode('year')
            }}
          >
            {baseYear}
          </button>
          <button
            type="button"
            className={`${prefixCls}-select`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              setViewMode('month')
            }}
          >
            {localeMonths[baseMonth]}
          </button>
        </div>
        {all || monthOffset ? (
          <div className={`${prefixCls}-nav-buttons`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                setCurrentMonth((m: number) =>
                  m === MONTH_LENGTH
                    ? (setCurrentYear((y: number) => y + 1), 0)
                    : m + 1
                )
              }
              }
            >
              &rsaquo;
            </button>
            <button onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              setCurrentYear((y: number) => y + 1)
            }}>
              &raquo;
            </button>
          </div>
        ) : (
          <span />
        )}
      </div>
    );
  };

  const renderCalendar = (monthOffset = 0, all?: boolean) => {
    const baseDate = new Date(currentYear, currentMonth + monthOffset, 1);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonthDays = (() => {
      const prevMonth = new Date(year, month, 0);
      const totalDays = prevMonth.getDate();

      return Array.from(
        { length: firstDay },
        (_, i) => new Date(year, month - 1, totalDays - firstDay + i + 1)
      );
    })();

    const currentMonthDays = Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1)
    );

    const totalDisplayed = prevMonthDays.length + currentMonthDays.length;
    const remaining = NEXT_DAYS_COUNT_AS_CURRENT_MUNTH - totalDisplayed;
    const nextMonthDays = Array.from(
      { length: remaining },
      (_, i) => new Date(year, month + 1, i + 1)
    );

    const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    return (
      <div className={`${prefixCls}-calendar ${viewMode}`}>
        <div className={`${prefixCls}-calendar-header`}>
          {renderMonthYearSelector(monthOffset, all)}
        </div>
        {viewMode === 'day' && (
          <div className={`${prefixCls}-days-grid day`}>
            {localeWeekdays.map((day, i) => (
              <div key={i} className={`${prefixCls}-weekday`}>
                {day}
              </div>
            ))}
            {days.map((day, i) => {
              const isSelected =
                day &&
                selectedDates.some(
                  d => d?.toDateString() === day?.toDateString()
                );

              const inRange = day && isInRange(day);
              const isSameMonth = day?.getMonth() === month;

              return (
                <button
                  key={i}
                  disabled={disabledDate?.(day, {
                    from: undefined,
                    to: undefined
                  })}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    day && handleSelect(day)
                  }}
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();;

                    day && setHoveredDate(day);
                  }}
                  className={clsx([
                    `${prefixCls}-day`,
                    {
                      [`${prefixCls}-selected`]: isSelected,
                      [`${prefixCls}-in-range`]: inRange,
                      [`${prefixCls}-hover-end`]:
                        hoveredDate &&
                        selectedDates[0] &&
                        !selectedDates[1] &&
                        hoveredDate > selectedDates[0] &&
                        hoveredDate?.toDateString() === day?.toDateString(),
                      [`${prefixCls}-other-month`]: !isSameMonth,
                      [`${prefixCls}-in-hover-range`]: isInHoverRange(day),
                    }
                  ])}
                >
                  {day?.getDate()}
                </button>
              );
            })}
          </div>
        )}

        {viewMode === 'month' && (
          <div className={`${prefixCls}-grid`}>
            {localeMonths.map((m, i) => (
              <button
                key={i}
                className={`${prefixCls}-month`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setCurrentMonth(i);
                  setViewMode('day');
                }}
                disabled={isMonthDisabled(i)}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        {viewMode === 'year' && (
          <div className={`${prefixCls}-grid`}>
            {Array.from({ length: 12 }, (_, i) => {
              const year = currentYear - NUMBER_SIX + i;

              return (
                <button
                  key={year}
                  className={`${prefixCls}-year`}
                  disabled={isYearDisabled(year)}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setCurrentYear(year);
                    setViewMode('month');
                  }}
                >
                  {year}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const handleClear = () => {
    setSelectedDates([null, null]);
    onChange?.(null, ['', '']);
  };

  return (
    <div
      style={style}
      className={clsx([
        `${prefixCls}-range-container`,
        {
          [`${prefixCls}-${size}`]: size,
          [className]: className
        }
      ])}
    >
      <div className={`${prefixCls}-range-input-wrapper`} ref={containerRef}>
        <button
          type="button"
          className={clsx([
            `${prefixCls}-input`,
            {
              noBordered: !bordered,
              [`${prefixCls}-error`]: error,
              [`${prefixCls}-disabled`]: disabled
            }
          ])}
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            setIsOpen(!isOpen);
            onOpenChange?.(!isOpen);
          }}
        >
          {prefix}
          <input
            readOnly={inputReadOnly}
            className={`${prefixCls}-selected-date`}
            placeholder={placeholder[0]}
            key={`0_${selectedDates[0]?.toUTCString()}`}
            {...({
              [inputReadOnly ? 'value' : 'defaultValue']: selectedDates[0] ? formatDate(selectedDates[0]) : ''
            })}
          />
          <span className={`${prefixCls}-range-separator`}>
            {separator || <DateDistanceIcon />}
          </span>
          <input
            readOnly={inputReadOnly}
            className={`${prefixCls}-selected-date`}
            placeholder={placeholder[1]}
            key={`1_${selectedDates[1]?.toUTCString()}`}
            {...({
              [inputReadOnly ? 'value' : 'defaultValue']: selectedDates[1] ? formatDate(selectedDates[1]) : ''
            })}
          />
          <span className={`${prefixCls}-icon`}>
            {allowClear && (selectedDates[0] || selectedDates[1]) ? (
              <span className={`${prefixCls}-clear`} onClick={handleClear}>
                <ClearIcon />
              </span>
            ) : (
              <CalendarIcon />
            )}
          </span>
        </button>
      </div>

      {isOpen && (
        <ConditionalWrapper
          condition={getPopupContainer !== undefined}
          wrapper={(element) => getPopupContainer ? createPortal(element, getPopupContainer(popupRef.current as HTMLElement)) : <>{element}</>}>
          <div ref={popupRef} className={`${prefixCls}-dropdown-wrapper show`} style={{ ...dropdownPosition }}>
            <div className={`${prefixCls}-dropdown-range`}>
              {renderCalendar(0, viewMode !== 'day')}
              {viewMode === 'day' && renderCalendar(1, viewMode !== 'day')}
            </div>
          </div>
        </ConditionalWrapper>
      )}
    </div>
  );
};

export default RangePicker;
