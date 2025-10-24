'use client';

import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { clsx } from '../../helpers';
import { TDatePickerProps } from '../../types/datepicker';
import { prefixClsDatePicker } from '../../utils';
import { CalendarIcon, ClearIcon, ErrorIcon } from '../Icons/Icons';
import './style.css';

const INPUT_SIZE = 12;
const CONTENT_PADDING = 6;
export const NUMBER_SIX = 6;
export const MONTH_LENGTH = 11;
export const NEXT_DAYS_COUNT_AS_CURRENT_MUNTH = 35;

const DatePicker = ({
  value,
  onChange,
  onCalendarChange,
  disabled,
  error,
  placeholder = 'Select date',
  prefixCls = prefixClsDatePicker,
  noStyle,
  feedbackIcons,
  locale,
  placement = 'bottomLeft',
  defaultValue,
  size = 'large',
  format = 'YYYY-MM-DD',
  getPopupContainer,
  showToday = true,
  allowClear = false,
  disabledDate,
  suffixIcon,
  picker = 'date',
  prefix,
  defaultOpen = false,
  inputReadOnly = false,
  bordered = true
}: TDatePickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialDate = value || defaultValue;
  const popupContainerRef = useRef<HTMLElement | null>(null);
  const [placementPossition, setPlacementPossition] = useState<CSSProperties>(
    {}
  );

  const DateNow = new Date();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  );

  const [selectedDatePlaceholder, setSelectedDatePlaceholder] = useState<
    string | undefined
  >(initialDate ? formatDate(initialDate) : undefined);

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [currentYear, setCurrentYear] = useState(
    initialDate ? new Date(initialDate).getFullYear() : DateNow.getFullYear()
  );

  const [currentMonth, setCurrentMonth] = useState(
    initialDate ? new Date(initialDate).getMonth() : DateNow.getMonth()
  );

  const [viewMode, setViewMode] = useState<'day' | 'month' | 'year'>(
    picker === 'month' ? 'month' : picker === 'year' ? 'year' : 'day'
  );

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
    setSelectedDate(value || defaultValue);
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const controller = new AbortController();

    if (isOpen) {
      calculateDatePickerPopupPossition();

      document.addEventListener('scroll', calculateDatePickerPopupPossition, {
        signal: controller.signal
      });

      document.addEventListener('mousedown', handleClickOutside, {
        signal: controller.signal
      });
    }

    return () => {
      controller.abort();
    };
  }, [isOpen]);

  useEffect(() => {
    if (getPopupContainer && containerRef.current) {
      popupContainerRef.current = getPopupContainer(containerRef.current);
    }
  }, [getPopupContainer]);

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  function formatDate(date: Date): string {
    if (typeof format === 'function') {
      return format(date);
    }

    if (typeof format === 'string') {
      date = new Date(date);

      return format
        .replace(/YYYY/, date.getFullYear().toString())
        .replace(/MM/, (date.getMonth() + 1).toString().padStart(2, '0'))
        .replace(/DD/, date.getDate().toString().padStart(2, '0'));
    }

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  const handleSelect = (day: number, month: number, year: number) => {
    if (disabled) {
      return;
    }

    const date = new Date(year, month, day);

    if (disabledDate?.(date, { from: undefined, to: undefined })) {
      return;
    }

    setCurrentMonth(month);
    setCurrentYear(year);
    setSelectedDate(date);

    const formatted = formatDate(date);
    setSelectedDatePlaceholder(formatted);
    onChange?.(date.toUTCString(), formatted);
    onCalendarChange?.(date.toUTCString(), formatted, { range: undefined });
    setIsOpen(false);
  };

  const clearSelection = () => {
    setSelectedDate(undefined);
    setSelectedDatePlaceholder(undefined);
    onChange?.(null, '');
  };

  const isMonthDisabled = (month: number) => {
    const date = new Date(currentYear, month + 1, 1);

    return disabledDate?.(date, { from: undefined, to: undefined });
  };

  const isYearDisabled = (year: number) => {
    const date = new Date(year + 1, currentMonth, 1);

    return disabledDate?.(date, { from: undefined, to: undefined });
  };

  function calculateDatePickerPopupPossition() {
    const datePickerContainerHeight =
      (containerRef.current?.clientHeight || 0) + CONTENT_PADDING;

    const datePickerPossitionFromTop =
      containerRef.current?.getBoundingClientRect().top || 0;

    const datePickerPossitionFromBottom =
      window.innerHeight -
      (containerRef.current?.getBoundingClientRect().bottom || 0);

    const datePickerContainerPopupHeight =
      containerRef.current?.querySelector(`.${prefixCls}-dropdown`)
        ?.clientHeight || 0;

    const picker = containerRef.current?.querySelector(`.${prefixCls}-input`) as HTMLButtonElement
    
    setPlacementPossition(
      ['topLeft', 'topRight'].includes(placement)
        ? {
          position: 'absolute',
          top:
            datePickerPossitionFromTop - datePickerContainerPopupHeight < 0
              ? datePickerContainerHeight
              : -datePickerContainerPopupHeight,
        }
        : {
          position: 'absolute',
          top:
            datePickerPossitionFromBottom > datePickerContainerPopupHeight
              ? 0
              : -(datePickerContainerPopupHeight + datePickerContainerHeight),
          ...(placement.includes('Left') ? {} : { right: (containerRef.current?.offsetWidth || 0) - picker.offsetWidth })
        }
    );
  }

  const prevMonth = currentMonth === 0 ? MONTH_LENGTH : currentMonth - 1;
  const nextMonth = currentMonth === MONTH_LENGTH ? 0 : currentMonth + 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const nextMonthYear =
    currentMonth === MONTH_LENGTH ? currentYear + 1 : currentYear;

  const totalDays = daysInMonth(currentYear, currentMonth);
  const firstDay = firstDayOfMonth(currentYear, currentMonth);
  const prevMonthDays = daysInMonth(prevMonthYear, prevMonth);
  const nextDaysCount =
    NEXT_DAYS_COUNT_AS_CURRENT_MUNTH - (firstDay + totalDays);

  const days = [
    ...Array.from({ length: firstDay }, (_, i) => ({
      day: prevMonthDays - firstDay + i + 1,
      current: false,
      month: prevMonth,
      year: prevMonthYear
    })),
    ...Array.from({ length: totalDays }, (_, i) => ({
      day: i + 1,
      current: true,
      month: currentMonth,
      year: currentYear
    })),
    ...Array.from({ length: nextDaysCount }, (_, i) => ({
      day: i + 1,
      current: false,
      month: nextMonth,
      year: nextMonthYear
    }))
  ];

  return (
    <div
      ref={containerRef}
      className={clsx([
        `${prefixCls}-container`,
        {
          noStyle,
          [`${prefixCls}-${size}`]: size
        }
      ])}
    >
      <div className={`${prefixCls}-input-wrapper`}>
        <button
          type="button"
          className={clsx([
            `${prefixCls}-input`,
            {
              noBordered: !bordered,
              [`${prefixCls}-error`]: error,
              [`${prefixCls}-${size}`]: size,
              [`${prefixCls}-disabled`]: disabled
            }
          ])}
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen)
          }}
        >
          {prefix || null}
          <input
            key={selectedDate?.toString()}
            size={INPUT_SIZE}
            disabled={disabled}
            readOnly={inputReadOnly}
            className={`${prefixCls}-selected-date globalEllipsis`}
            placeholder={placeholder}
            style={{ opacity: isOpen ? '0.6' : 1 }}
            defaultValue={selectedDatePlaceholder}
          />
          <span className={`${prefixCls}-icon`}>
            {allowClear && selectedDate ? (
              <span className={`${prefixCls}-clear`} onClick={clearSelection}>
                {typeof allowClear === 'object' && allowClear.clearIcon ? (
                  allowClear.clearIcon
                ) : (
                  <ClearIcon />
                )}
              </span>
            ) : (
              suffixIcon || <CalendarIcon />
            )}
            {error && feedbackIcons ? <ErrorIcon /> : null}
          </span>
        </button>
      </div>

      <div
        style={popupContainerRef.current ? { position: 'absolute' } : {}}
        className={clsx([
          placement,
          `${prefixCls}-dropdown-wrapper`,
          {
            show: isOpen
          }
        ])}
      >
        {isOpen && (
          <div className={`${prefixCls}-dropdown`} style={placementPossition}>
            <div className={`${prefixCls}-header`}>
              <div className={`${prefixCls}-nav-buttons`}>
                <button onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setCurrentYear((y: number) => y - 1)
                }}>
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
                  }}
                >
                  &lsaquo;
                </button>
              </div>
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
                  {currentYear}
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
                  {localeMonths[currentMonth]}
                </button>
              </div>
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
                  }}
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
            </div>

            {viewMode === 'day' && (
              <div className={`${prefixCls}-grid day`}>
                {localeWeekdays.map(day => (
                  <div key={day} className={`${prefixCls}-day-header`}>
                    {day}
                  </div>
                ))}
                {days.map(({ day, current, month, year }, idx) => {
                  const isSelected =
                    selectedDate &&
                    selectedDate.getDate() === day &&
                    selectedDate.getMonth() === month &&
                    selectedDate.getFullYear() === year;

                  return (
                    <button
                      key={`${year}-${month}-${day}-${idx}`}
                      className={clsx([
                        `${prefixCls}-day`,
                        {
                          [`${prefixCls}-selected`]: isSelected,
                          [`${prefixCls}-other-month`]: !current
                        }
                      ])}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        handleSelect(day, month, year)
                      }}
                      disabled={disabledDate?.(new Date(year, month, day), {
                        from: undefined,
                        to: undefined
                      })}
                    >
                      {day}
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

            {showToday && (
              <div
                className={`${prefixCls}-day-footer`}
                style={{ gridColumn: 'span 7' }}
              >
                <button
                  className={`${prefixCls}-select`}
                  disabled={disabledDate?.(
                    new Date(
                      DateNow.getDate(),
                      DateNow.getMonth(),
                      DateNow.getFullYear()
                    ),
                    { from: undefined, to: undefined }
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    handleSelect(
                      DateNow.getDate(),
                      DateNow.getMonth(),
                      DateNow.getFullYear()
                    );
                  }}
                >
                  {locale?.today || 'Today'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
