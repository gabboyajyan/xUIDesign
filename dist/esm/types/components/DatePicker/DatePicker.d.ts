import { TDatePickerProps } from '@/types/datepicker';
import './style.css';
export declare const NUMBER_SIX = 6;
export declare const MONTH_LENGTH = 11;
export declare const NEXT_DAYS_COUNT_AS_CURRENT_MUNTH = 35;
declare const DatePicker: (({ value, onChange, onCalendarChange, disabled, error, placeholder, prefixCls, noStyle, feedbackIcons, locale, placement, defaultValue, size, format, getPopupContainer, showToday, allowClear, disabledDate, suffixIcon, picker, prefix, defaultOpen, inputReadOnly, bordered }: TDatePickerProps) => import("react/jsx-runtime").JSX.Element) & {
    RangePicker: ({ prefixCls, value, onChange, placeholder, disabled, error, format, prefix, allowClear, inputReadOnly, size, picker, locale, disabledDate, style, className, separator, defaultValue, bordered }: import("@/types/datepicker").TRangePickerProps) => import("react/jsx-runtime").JSX.Element;
};
export default DatePicker;
