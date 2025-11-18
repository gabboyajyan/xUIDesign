import { FocusEvent, ReactNode } from 'react';
import { DefaultProps, Placement, RuleType, SizeType } from '.';
export interface BaseInfo {
    range?: 'start' | 'end';
    source?: string;
}
export type CustomFormat<RuleType> = (value: RuleType) => string;
export type FormatType<DateType = RuleType> = string | CustomFormat<DateType>;
export type PanelMode = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | 'decade';
export type TDatePickerProps = DefaultProps & {
    value?: Date;
    disabled?: boolean;
    placeholder?: string;
    error?: boolean;
    feedbackIcons?: boolean;
    locale?: Locale;
    placement?: Placement;
    defaultOpen?: boolean;
    allowClear?: boolean | {
        clearIcon?: ReactNode;
    };
    defaultValue?: Date;
    disabledDate?: (date: RuleType, info: {
        to: RuleType;
        from?: RuleType;
    }) => boolean;
    suffixIcon?: ReactNode;
    prefix?: ReactNode;
    size?: SizeType;
    format?: FormatType<RuleType> | FormatType<RuleType>[] | {
        format: string;
        type?: 'mask';
    };
    onChange?: (date: RuleType | RuleType[], dateString: string | string[]) => void;
    onCalendarChange?: (date: RuleType | RuleType[], dateString: string | string[], info: BaseInfo) => void;
    onOpenChange?: (open: boolean) => void;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    showToday?: boolean;
    inputReadOnly?: boolean;
    picker?: PanelMode;
    bordered?: boolean;
    defaultPickerValue?: Date;
};
export type TRangePickerProps = Omit<TDatePickerProps, 'placeholder' | 'value' | 'defaultValue'> & {
    placeholder?: string[];
    value?: Date[];
    defaultValue?: Date[];
    separator?: ReactNode;
};
export type Locale = {
    locale: string;
    dateFormat?: string;
    dateTimeFormat?: string;
    fieldDateTimeFormat?: string;
    fieldDateFormat?: string;
    fieldTimeFormat?: string;
    fieldMonthFormat?: string;
    fieldYearFormat?: string;
    fieldWeekFormat?: string;
    fieldQuarterFormat?: string;
    monthBeforeYear?: boolean;
    yearFormat?: string;
    monthFormat?: string;
    cellYearFormat?: string;
    cellQuarterFormat?: string;
    dayFormat?: string;
    cellDateFormat?: string;
    cellMeridiemFormat?: string;
    today: string;
    now: string;
    backToToday: string;
    ok: string;
    timeSelect: string;
    dateSelect: string;
    weekSelect?: string;
    clear: string;
    week: string;
    month: string;
    year: string;
    previousMonth: string;
    nextMonth: string;
    monthSelect: string;
    yearSelect: string;
    decadeSelect: string;
    previousYear: string;
    nextYear: string;
    previousDecade: string;
    nextDecade: string;
    previousCentury: string;
    nextCentury: string;
    shortWeekDays?: string[];
    shortMonths?: string[];
};
export interface DisabledTimes {
    disabledHours?: () => number[];
    disabledMinutes?: (hour: number) => number[];
    disabledSeconds?: (hour: number, minute: number) => number[];
}
export type PickerFocusEventHandler = (e: FocusEvent<HTMLElement>, info: BaseInfo) => void;
export type DisabledDate<DateType = RuleType> = (date: DateType, info: {
    type: PanelMode;
    from?: DateType;
}) => boolean;
export type TimePickerProps = DefaultProps & {
    disabledTime?: (date: RuleType) => DisabledTimes;
    inputReadOnly?: boolean;
    format?: FormatType<RuleType> | FormatType<RuleType>[] | {
        format: string;
        type?: 'mask';
    };
    defaultValue?: RuleType | null;
    value?: RuleType | null;
    onChange?: (date: RuleType, dateString: string | string[]) => void;
    onBlur?: PickerFocusEventHandler;
    onSelect?: ((value: Date | null) => void) | undefined;
    showNow?: boolean;
    clearIcon?: ReactNode;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    suffixIcon?: ReactNode;
    placeholder?: string;
    placement?: Placement;
};
