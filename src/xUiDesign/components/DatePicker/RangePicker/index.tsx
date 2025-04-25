'use client';

import { useState, useRef, useEffect } from 'react';
import cc from 'classcat';
import './style.css';
import { prefixClsRangePicker } from '@/xUiDesign/utils';
import { CalendarIcon, ClearIcon, DateDistanceIcon } from '../../icons';
import { TRangePickerProps } from '@/xUiDesign/types/datepicker';

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
  locale
}: TRangePickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([
    value?.[0] || null,
    value?.[1] || null
  ]);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
      onChange?.([begin.toUTCString(), end.toUTCString()], [formatDate(begin), formatDate(end)]);
      setIsOpen(false);
    }
  };

  const formatDate = (date: Date) => {
    if (typeof format === 'function') {
      return format(date);
    }

    return format
      .replace(/YYYY/, date.getFullYear().toString())
      .replace(/MM/, (date.getMonth() + 1).toString().padStart(2, '0'))
      .replace(/DD/, date.getDate().toString().padStart(2, '0'));
  };

  const isInRange = (date: Date) => {
    const [start, end] = selectedDates;
    return start && end && date > start && date < end;
  };

  const renderCalendar = (monthOffset = 0) => {
    const baseDate = new Date(currentYear, currentMonth + monthOffset, 1);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [
      ...Array.from({ length: firstDay }, (_, i) => null),
      ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
    ];

    return (
      <div className={`${prefixCls}-calendar`}>
        <div className={`${prefixCls}-calendar-header`}>
          {monthOffset === 0 && (
            <button onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(y => y - 1);
              } else {
                setCurrentMonth(m => m - 1);
              }
            }}>
              &lsaquo;
            </button>
          )}
          <span>{new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          {monthOffset === 1 && (
            <button onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(y => y + 1);
              } else {
                setCurrentMonth(m => m + 1);
              }
            }}>
              &rsaquo;
            </button>
          )}
        </div>
        <div className={`${prefixCls}-days-grid`}>
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`${prefixCls}-weekday`}>
              {localeWeekdays[i]}
            </div>
          ))}
          {days.map((day, i) => {
            const isSelected = day && selectedDates.some(d => d?.toDateString() === day.toDateString());
            const inRange = day && isInRange(day);

            return (
              <button
                key={i}
                disabled={!day}
                onClick={() => day && handleSelect(day)}
                onMouseEnter={() => day && setHoveredDate(day)}
                className={cc([
                  `${prefixCls}-day`,
                  {
                    [`${prefixCls}-selected`]: isSelected,
                    [`${prefixCls}-in-range`]: inRange,
                    [`${prefixCls}-hover-end`]:
                      hoveredDate && selectedDates[0] &&
                      !selectedDates[1] &&
                      hoveredDate > selectedDates[0] &&
                      hoveredDate.toDateString() === day?.toDateString()
                  }
                ])}
              >
                {day?.getDate()}
              </button>
            );
          })}
        </div>
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
      className={cc([
        `${prefixCls}-range-container`,
        { [`${prefixCls}-${size}`]: size }
      ])}
    >
      <div className={`${prefixCls}-range-input-wrapper`}>
        <button
          type="button"
          className={cc([
            `${prefixCls}-input`,
            { [`${prefixCls}-error`]: error, [`${prefixCls}-disabled`]: disabled }
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
            <DateDistanceIcon />
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
          <div className={`${prefixCls}-dropdown-range`}>{renderCalendar(0)}{renderCalendar(1)}</div>
        </div>
      )}
    </div>
  );
};

export default RangePicker;