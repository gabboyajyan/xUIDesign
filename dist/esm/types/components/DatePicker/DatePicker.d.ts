import React from 'react';
import { TDatePickerProps } from '../../types/datepicker';
import './style.css';
export declare const NUMBER_SIX = 6;
export declare const MONTH_LENGTH = 11;
export declare const NEXT_DAYS_COUNT_AS_CURRENT_MUNTH = 35;
declare const DatePicker: ({ value, onChange, onCalendarChange, disabled, error, placeholder, prefixCls, noStyle, feedbackIcons, locale, placement, defaultValue, size, format, getPopupContainer, showToday, allowClear, disabledDate, suffixIcon, picker, prefix, defaultOpen, inputReadOnly, bordered }: TDatePickerProps) => React.JSX.Element;
export default DatePicker;
