'use client';

import { useEffect, useRef, useState } from 'react';
import cc from 'classcat';
import { TDatePickerProps } from '@/xUiDesign/types/datepicker';
import { prefixClsDatepicker } from '@/xUiDesign/utils';
import './style.css';
import { CalendarIcon, ClearIcon, ErrorIcon } from '../icons';

const NUMBER_SIX = 6;
const INPUT_SIZE = 12;
const MONTH_LENGTH = 11;
const NEXT_DAYS_COUNT_AS_CURRENT_MUNTH = 42;

const DatePicker = ({
  value,
  onChange,
  onCalendarChange,
  disabled,
  error,
  placeholder = 'Select date',
  prefixCls = prefixClsDatepicker,
  noStyle,
  feedbackIcons,
  locale,
  placement = 'bottomLeft',
  defaultValue,
  size = 'large',
  format = 'YYYY-MM-DD',
  getPopupContainer,
  showToday = false,
  allowClear = true,
  disabledDate,
  suffixIcon,
  picker = 'date'
}: TDatePickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const popupContainerRef = useRef<HTMLElement | null>(null);
  const initialDate = value || defaultValue || null;

  const DateNow = new Date();

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [selectedDatePlaceholder, setSelectedDatePlaceholder] =
    useState<string>();

  const [isOpen, setIsOpen] = useState(false);
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const formatDate = (date: Date): string => {
    if (typeof format === 'function') {
      return format(date);
    }

    if (typeof format === 'string') {
      return format
        .replace(/YYYY/, date.getFullYear().toString())
        .replace(/MM/, (date.getMonth() + 1).toString().padStart(2, '0'))
        .replace(/DD/, date.getDate().toString().padStart(2, '0'));
    }

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

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
    setSelectedDate(null);
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
      className={cc([
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
          className={cc([
            `${prefixCls}-input`,
            {
              [`${prefixCls}-error`]: error,
              [`${prefixCls}-${size}`]: size,
              [`${prefixCls}-disabled`]: disabled
            }
          ])}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            size={INPUT_SIZE}
            className={cc([
              `${prefixCls}-selected-date globalEllipsis`,
              {
                [`${prefixCls}-placeholder`]: !selectedDate
              }
            ])}
            placeholder={selectedDatePlaceholder || placeholder}
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
        className={cc([
          placement,
          `${prefixCls}-dropdown-wrapper`,
          {
            show: isOpen
          }
        ])}
      >
        {isOpen && (
          <div className={`${prefixCls}-dropdown`}>
            <div className={`${prefixCls}-header`}>
              <div className={`${prefixCls}-nav-buttons`}>
                <button onClick={() => setCurrentYear(y => y - 1)}>
                  &laquo;
                </button>
                <button
                  onClick={() =>
                    setCurrentMonth(m =>
                      m === 0
                        ? (setCurrentYear(y => y - 1), MONTH_LENGTH)
                        : m - 1
                    )
                  }
                >
                  &lsaquo;
                </button>
              </div>
              <div className={`${prefixCls}-dropdown-selects`}>
                <button
                  type="button"
                  className={`${prefixCls}-select`}
                  onClick={() => setViewMode('year')}
                >
                  {currentYear}
                </button>
                <button
                  type="button"
                  className={`${prefixCls}-select`}
                  onClick={() => setViewMode('month')}
                >
                  {localeMonths[currentMonth]}
                </button>
              </div>
              <div className={`${prefixCls}-nav-buttons`}>
                <button
                  onClick={() =>
                    setCurrentMonth(m =>
                      m === MONTH_LENGTH
                        ? (setCurrentYear(y => y + 1), 0)
                        : m + 1
                    )
                  }
                >
                  &rsaquo;
                </button>
                <button onClick={() => setCurrentYear(y => y + 1)}>
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
                      className={cc([
                        `${prefixCls}-day`,
                        {
                          [`${prefixCls}-selected`]: isSelected,
                          [`${prefixCls}-other-month`]: !current
                        }
                      ])}
                      onClick={() => handleSelect(day, month, year)}
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
                    onClick={() => {
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
                      onClick={() => {
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
                  onClick={() => {
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
