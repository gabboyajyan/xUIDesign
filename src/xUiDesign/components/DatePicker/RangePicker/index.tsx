'use client';

import { useEffect, useRef, useState } from 'react';
import cc from 'classcat';
import { TRangePickerProps } from '@/xUiDesign/types/datepicker';
import { prefixClsRangePicker } from '@/xUiDesign/utils';
import './style.css';
import { MONTH_LENGTH, NEXT_DAYS_COUNT_AS_CURRENT_MUNTH, NUMBER_SIX } from '..';
import { CalendarIcon, ClearIcon, DateDistanceIcon } from '../../icons';

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
  style = {},
  className = '',
  separator,
  defaultValue,
  bordered = true,
}: TRangePickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<
    [Date | null, Date | null]
  >([value?.[0] || defaultValue?.[0] || null, value?.[1] || defaultValue?.[1] || null]);

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
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

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (date: Date) => {
    if (!selectedDates[0] || (selectedDates[0] && selectedDates[1])) {
      setSelectedDates([date, null]);
    } else {
      const start = selectedDates[0];
      const end = date < start ? start : date;
      const begin = date < start ? date : start;
      setSelectedDates([begin, end]);
      onChange?.(
        [begin.toUTCString(), end.toUTCString()],
        [formatDate(begin), formatDate(end)]
      );
      setIsOpen(false);
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
      <div className={`${prefixCls}-header`}>
        {all || !monthOffset ? (
          <div className={`${prefixCls}-nav-buttons`}>
            <button onClick={() => setCurrentYear((y: number) => y - 1)}>
              &laquo;
            </button>
            <button
              onClick={() =>
                setCurrentMonth((m: number) =>
                  m === 0
                    ? (setCurrentYear((y: number) => y - 1), MONTH_LENGTH)
                    : m - 1
                )
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
            onClick={() => setViewMode('year')}
          >
            {baseYear}
          </button>
          <button
            type="button"
            className={`${prefixCls}-select`}
            onClick={() => setViewMode('month')}
          >
            {localeMonths[baseMonth]}
          </button>
        </div>
        {all || monthOffset ? (
          <div className={`${prefixCls}-nav-buttons`}>
            <button
              onClick={() =>
                setCurrentMonth((m: number) =>
                  m === MONTH_LENGTH
                    ? (setCurrentYear((y: number) => y + 1), 0)
                    : m + 1
                )
              }
            >
              &rsaquo;
            </button>
            <button onClick={() => setCurrentYear((y: number) => y + 1)}>
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
                  d => d?.toDateString() === day.toDateString()
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
                  onClick={() => day && handleSelect(day)}
                  onMouseEnter={() => day && setHoveredDate(day)}
                  className={cc([
                    `${prefixCls}-day`,
                    {
                      [`${prefixCls}-selected`]: isSelected,
                      [`${prefixCls}-in-range`]: inRange,
                      [`${prefixCls}-hover-end`]:
                        hoveredDate &&
                        selectedDates[0] &&
                        !selectedDates[1] &&
                        hoveredDate > selectedDates[0] &&
                        hoveredDate.toDateString() === day?.toDateString(),
                      [`${prefixCls}-other-month`]: !isSameMonth
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
      </div>
    );
  };

  const handleClear = () => {
    setSelectedDates([null, null]);
    onChange?.(null, ['', '']);
  };

  return (
    <div
      ref={containerRef}
      style={style}
      className={cc([
        `${prefixCls}-range-container`,
        { 
          [`${prefixCls}-${size}`]: size,
          [className]: className
        }
      ])}
    >
      <div className={`${prefixCls}-range-input-wrapper`}>
        <button
          type="button"
          className={cc([
            `${prefixCls}-input`,
            {
              noBordered: !bordered,
              [`${prefixCls}-error`]: error,
              [`${prefixCls}-disabled`]: disabled
            }
          ])}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
        >
          {prefix}
          <input
            readOnly={inputReadOnly}
            className={`${prefixCls}-selected-date`}
            placeholder={placeholder[0]}
            value={selectedDates[0] ? formatDate(selectedDates[0]) : ''}
          />
          <span className={`${prefixCls}-range-separator`}>
            {separator || <DateDistanceIcon />}
          </span>
          <input
            readOnly={inputReadOnly}
            className={`${prefixCls}-selected-date`}
            placeholder={placeholder[1]}
            value={selectedDates[1] ? formatDate(selectedDates[1]) : ''}
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
        <div className={`${prefixCls}-dropdown-wrapper show`}>
          <div className={`${prefixCls}-dropdown-range`}>
            {renderCalendar(0, viewMode !== 'day')}
            {viewMode === 'day' && renderCalendar(1, viewMode !== 'day')}
          </div>
        </div>
      )}
    </div>
  );
};

export default RangePicker;
