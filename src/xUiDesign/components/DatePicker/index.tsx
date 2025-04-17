'use client';

import { useState } from 'react';
import cc from 'classcat';
import { TDatePickerProps } from '@/xUiDesign/types/datepicker';
import { prefixClsDatepicker } from '@/xUiDesign/utils';
import './style.css';
import { CalendarIcon, ErrorIcon } from '../icons';

const NUMBER_SIX = 6;
const DAY_LESS_TEN = 9;
const MONTH_LENGTH = 11;
const MONTH_LESS_TEN = 9;
const NEXT_DAYS_COUNT_AS_CURRENT_MUNTH = 42;

const DatePicker = ({
  value,
  onChange,
  disabled,
  error,
  placeholder = 'Select date',
  prefixCls = prefixClsDatepicker,
  noStyle,
  feedbackIcons
}: TDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [selectedDatePlaceholder, setSelectedDatePlaceholder] =
    useState<string>();

  const [isOpen, setIsOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [viewMode, setViewMode] = useState<'day' | 'month' | 'year'>('day');

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const handleSelect = (day: number, month: number, year: number) => {
    if (disabled) {
      return;
    }

    setCurrentMonth(month);
    setCurrentYear(year);

    const date = new Date(year, month, day);
    setSelectedDate(date);

    const selectedDatePlaceholder = `${year}-${
      month < MONTH_LESS_TEN ? '0' : ''
    }${month + 1}-${day < DAY_LESS_TEN ? '0' : ''}${day}`;

    setSelectedDatePlaceholder(selectedDatePlaceholder);
    onChange?.(selectedDatePlaceholder);
    setIsOpen(false);
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
    // Previous month's tail
    ...Array.from({ length: firstDay }, (_, i) => ({
      day: prevMonthDays - firstDay + i + 1,
      current: false,
      month: prevMonth,
      year: prevMonthYear
    })),

    // Current month
    ...Array.from({ length: totalDays }, (_, i) => ({
      day: i + 1,
      current: true,
      month: currentMonth,
      year: currentYear
    })),

    // Next month's head
    ...Array.from({ length: nextDaysCount }, (_, i) => ({
      day: i + 1,
      current: false,
      month: nextMonth,
      year: nextMonthYear
    }))
  ];

  return (
    <div className={cc([`${prefixCls}-container`, { noStyle }])}>
      <button
        type="button"
        className={cc([
          `${prefixCls}-input`,
          {
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-error`]: error
          }
        ])}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${prefixCls}-selected-date ${
            !selectedDate ? `${prefixCls}-placeholder` : ''
          }`}
        >
          {selectedDatePlaceholder || placeholder}
        </span>
        <span className={`${prefixCls}-icon`}>
          <CalendarIcon />
          {error && feedbackIcons ? <ErrorIcon /> : null}
        </span>
      </button>

      {isOpen && (
        <div className={`${prefixCls}-dropdown`}>
          <div className={`${prefixCls}-header`}>
            <div className={`${prefixCls}-nav-buttons`}>
              <button onClick={() => setCurrentYear(y => y - 1)}>
                &laquo;
              </button>
              <button
                onClick={() =>
                  setCurrentMonth(m => {
                    if (m === 0) {
                      setCurrentYear(y => y - 1);

                      return MONTH_LENGTH;
                    }

                    return m - 1;
                  })
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
                {new Date(0, currentMonth).toLocaleString('default', {
                  month: 'long'
                })}
              </button>
            </div>
            <div className={`${prefixCls}-nav-buttons`}>
              <button
                onClick={() =>
                  setCurrentMonth(m => {
                    if (m === MONTH_LENGTH) {
                      setCurrentYear(y => y + 1);

                      return 0;
                    }

                    return m + 1;
                  })
                }
              >
                &rsaquo;
              </button>
              <button onClick={() => setCurrentYear(y => y + 1)}>
                &raquo;
              </button>
            </div>
          </div>

          {/* Calendar views */}
          {viewMode === 'day' && (
            <div className={`${prefixCls}-grid ${viewMode}`}>
              {['Su', 'Mo', 'Tu', 'We', 'Thu', 'Fr', 'Sa'].map(day => (
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
                    onClick={() => {
                      handleSelect(day, month, year);
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          )}

          {viewMode === 'month' && (
            <div className={`${prefixCls}-grid`}>
              {Array.from({ length: 12 }, (_, i) => (
                <button
                  key={i}
                  className={`${prefixCls}-day`}
                  onClick={() => {
                    setCurrentMonth(i);
                    setViewMode('day');
                  }}
                >
                  {new Date(0, i).toLocaleString('default', { month: 'short' })}
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
                    className={`${prefixCls}-day`}
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
      )}
    </div>
  );
};

export default DatePicker;
