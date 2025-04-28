import { ReactNode } from 'react';
import { DefaultProps, RuleType, SizeType } from '.';

export interface BaseInfo {
  range?: 'start' | 'end';
}

export type CustomFormat<DateType> = (value: DateType) => string;
export type FormatType<DateType = RuleType> = string | CustomFormat<DateType>;
export type PanelMode =
  | 'time'
  | 'date'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | 'decade';

export type TDatePickerProps = DefaultProps & {
  value?: Date;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
  feedbackIcons?: boolean;
  locale?: Locale;
  placement?: string;
  defaultOpen?: boolean;
  allowClear?:
    | boolean
    | {
        clearIcon?: ReactNode;
      };
  defaultValue?: Date;
  disabledDate?: (
    date: RuleType,
    info: {
      to: RuleType;
      from?: RuleType;
    }
  ) => boolean;
  suffixIcon?: ReactNode;
  prefix?: ReactNode;
  size?: SizeType;
  format?:
    | FormatType<RuleType>
    | FormatType<RuleType>[]
    | {
        format: string;
        type?: 'mask';
      };
  onChange?: (
    date: RuleType | RuleType[],
    dateString: string | string[]
  ) => void;
  onCalendarChange?: (
    date: RuleType | RuleType[],
    dateString: string | string[],
    info: BaseInfo
  ) => void;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  showToday?: boolean;
  inputReadOnly?: boolean;
  picker?: PanelMode;
  bordered?: boolean
};

export type TRangePickerProps = Omit<TDatePickerProps, 'placeholder' | 'value' |'defaultValue'> & {
  placeholder?: string[]
  value?: Date[];
  defaultValue?: Date[];
  separator?: ReactNode
}

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
