import * as react from 'react';
import { CSSProperties, ReactNode, MouseEventHandler, MouseEvent, ReactEventHandler, Key, FocusEventHandler, KeyboardEventHandler, FocusEvent } from 'react';
import * as __types_form from '@/types/form';
export { FormInstance } from '@/types/form';
import * as __types from '@/types';
export { RuleTypes } from '@/types';
import * as __types_button from '@/types/button';
export { ButtonProps } from '@/types/button';
export { ArrowIcon, CalendarIcon, CheckIcon, ClearIcon, DateDistanceIcon, ErrorIcon, LoadingIcon, SearchIcon, SpinerIcon, StampleIcon, SuccessIcon, TimeIcon, TrashIcon } from '@/components/Icons';
export { useForm } from '@/hooks/useForm';
export { useWatch } from '@/hooks/useWatch';
export { clsx, createArray, parseValue } from '@/helpers';

type RuleType = any;
type SizeType = 'small' | 'middle' | 'large';
interface DefaultProps {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    noStyle?: boolean;
}
type TargetProps = {
    target: {
        value: RuleType;
    };
};
type SyntheticBaseEvent = {
    target: EventTarget & {
        value: RuleType;
    };
    nativeEvent?: Event & {
        data?: string | null;
    };
    currentTarget: EventTarget;
};

declare type widthUnit = number | string;
interface SkeletonElementProps {
    className?: string;
    style?: CSSProperties;
    size?: 'large' | 'small' | 'default' | number;
    shape?: 'circle' | 'square' | 'round';
    active?: boolean;
}
type SkeletonProps = DefaultProps & {
    active?: boolean;
    loading?: boolean;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    avatar?: SkeletonAvatarProps | boolean;
    title?: SkeletonTitleProps | boolean;
    paragraph?: SkeletonParagraphProps | boolean;
    round?: boolean;
    teamLogo?: boolean;
};
interface SkeletonTitleProps {
    className?: string;
    style?: CSSProperties;
    width?: number | string;
}
interface SkeletonParagraphProps {
    className?: string;
    style?: CSSProperties;
    width?: widthUnit | Array<widthUnit>;
    rows?: number;
}
type SkeletonAvatarProps = Omit<SkeletonElementProps, 'shape'> & DefaultProps & {
    shape?: 'circle' | 'square';
    active?: boolean;
    applyElementStyle?: boolean;
    wrapperStyle?: CSSProperties;
};
type SkeletonImageProps = DefaultProps & Omit<SkeletonElementProps, 'size' | 'shape' | 'active'>;
type SkeletonInputProps = Omit<SkeletonElementProps, 'size' | 'shape'> & DefaultProps & {
    size?: 'large' | 'small' | 'default';
    block?: boolean;
};
type SkeletonButtonProps = Omit<SkeletonElementProps, 'size'> & DefaultProps & {
    size?: 'large' | 'small' | 'default';
    block?: boolean;
    applyElementStyle?: boolean;
};

interface OptionType {
    value: RuleType;
    disabled?: boolean;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLDivElement>;
    render?: (label: string) => ReactNode;
    prefixCls?: string;
    label?: RuleType;
}
type CustomTagProps = DefaultProps & {
    label?: ReactNode;
    value: string;
    onClose: (e: MouseEvent<HTMLSpanElement> & TargetProps) => void;
    onMouseDown?: MouseEventHandler | undefined;
    onLoadCapture?: ReactEventHandler | undefined;
    closable?: boolean;
    isMaxTag?: boolean;
    color?: string;
    icon?: ReactNode;
};
interface DisplayValueType {
    key?: Key;
    value?: RuleType;
    label?: ReactNode;
    title?: string | number;
    disabled?: boolean;
}
interface OptionProps {
    value: RuleType;
    disabled?: boolean;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLDivElement>;
    render?: (label: string) => ReactNode;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    prefixCls?: string;
    selected?: boolean;
    title?: string;
}

interface RadioGroupProps {
    defaultValue?: RuleType;
    value?: RuleType;
    onChange?: (e: SyntheticBaseEvent) => void;
    size?: SizeType;
    disabled?: boolean;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
    name?: string;
    children?: ReactNode;
    id?: string;
    optionType?: 'default' | 'button';
    buttonStyle?: 'outline' | 'solid';
    onFocus?: FocusEventHandler<HTMLDivElement>;
    onBlur?: FocusEventHandler<HTMLDivElement>;
    block?: boolean;
    prefixCls?: string;
    className?: string;
    options?: Array<{
        label: ReactNode;
        value: RuleType;
        disabled?: boolean;
    }> | string[] | number[];
    style?: CSSProperties;
}
type RadioProps = DefaultProps & {
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    title?: string;
    onChange?: (e: SyntheticBaseEvent) => void;
    onClick?: MouseEventHandler<HTMLElement>;
    onMouseEnter?: MouseEventHandler<HTMLElement>;
    onMouseLeave?: MouseEventHandler<HTMLElement>;
    onKeyPress?: KeyboardEventHandler<HTMLElement>;
    onKeyDown?: KeyboardEventHandler<HTMLElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    value?: RuleType;
    tabIndex?: number;
    name?: string;
    children?: ReactNode;
    id?: string;
    autoFocus?: boolean;
    type?: string;
    skipGroup?: boolean;
    required?: boolean;
    button?: boolean;
    error?: boolean;
};
type RadioButtonProps = RadioProps & {
    children?: ReactNode;
    size?: SizeType;
};

interface BaseInfo {
    range?: 'start' | 'end';
    source?: string;
}
type CustomFormat<RuleType> = (value: RuleType) => string;
type FormatType<DateType = RuleType> = string | CustomFormat<DateType>;
type PanelMode = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | 'decade';
type TDatePickerProps = DefaultProps & {
    value?: Date;
    disabled?: boolean;
    placeholder?: string;
    error?: boolean;
    feedbackIcons?: boolean;
    locale?: Locale;
    placement?: string;
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
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    showToday?: boolean;
    inputReadOnly?: boolean;
    picker?: PanelMode;
    bordered?: boolean;
};
type TRangePickerProps = Omit<TDatePickerProps, 'placeholder' | 'value' | 'defaultValue'> & {
    placeholder?: string[];
    value?: Date[];
    defaultValue?: Date[];
    separator?: ReactNode;
};
type Locale = {
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
interface DisabledTimes {
    disabledHours?: () => number[];
    disabledMinutes?: (hour: number) => number[];
    disabledSeconds?: (hour: number, minute: number) => number[];
}
type PickerFocusEventHandler = (e: FocusEvent<HTMLElement>, info: BaseInfo) => void;
type TimePickerProps = DefaultProps & {
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
};

interface RcFile extends File {
    uid: string;
    lastModifiedDate: Date;
    webkitRelativePath: string;
}
type UploadFile<RcFile> = {
    originFileObj: RcFile;
    uid: string;
    name: string;
    status?: 'uploading' | 'done' | 'error' | 'removed';
    percent?: number;
    url?: string;
    file?: RcFile;
};
type UploadChangeParam = {
    file: UploadFile<RuleType>;
    fileList: UploadFile<RuleType>[];
};
type UploadProps = DefaultProps & {
    type?: string;
    name?: string;
    defaultFileList?: UploadFile<RuleType>[];
    fileList?: UploadFile<RuleType>[];
    action?: string | ((file: RcFile) => string) | ((file: RcFile) => PromiseLike<string>);
    directory?: boolean;
    data?: Record<string, unknown> | ((file: UploadFile<RuleType>) => Record<string, unknown> | Promise<Record<string, unknown>>);
    method?: 'POST' | 'PUT' | 'PATCH';
    headers?: Record<string, string>;
    showUploadList?: boolean;
    multiple?: boolean;
    accept?: string;
    beforeUpload?: (file: RcFile, fileList: File[]) => boolean | Promise<boolean>;
    onChange?: (info: UploadChangeParam) => void;
    onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
    listType?: string;
    className?: string;
    rootClassName?: string;
    onPreview?: (file: UploadFile<RuleType>) => void;
    onDownload?: (file: UploadFile<RuleType>) => void;
    onRemove?: (file: UploadFile<RuleType>) => void | boolean | Promise<void | boolean>;
    disabled?: boolean;
    style?: React.CSSProperties;
    customRequest?: (options: {
        file: RcFile;
        onSuccess: (response: RuleType) => void;
        onError: (error: RuleType) => void;
        onProgress: (event: ProgressEvent) => void;
    }) => void;
    withCredentials?: boolean;
    openFileDialogOnClick?: boolean;
    maxCount?: number;
    children?: React.ReactNode;
};

type EmptyContentProps = DefaultProps & {
    title?: string;
    description?: string;
    icon?: ReactNode;
};

declare const Button: react.ComponentType<__types_button.ButtonProps>;
declare const Checkbox: react.ComponentType<__types.DefaultProps & {
    disabled?: boolean;
    onChange?: (e: react.MouseEvent<HTMLInputElement> & __types.TargetProps) => void;
    onClick?: react.MouseEventHandler<HTMLElement>;
    onMouseEnter?: react.MouseEventHandler<HTMLElement>;
    onMouseLeave?: react.MouseEventHandler<HTMLElement>;
    onKeyPress?: react.KeyboardEventHandler<HTMLElement>;
    onKeyDown?: react.KeyboardEventHandler<HTMLElement>;
    value?: boolean;
    tabIndex?: number;
    name?: string;
    children?: react.ReactNode;
    id?: string;
    autoFocus?: boolean;
    type?: string;
    skipGroup?: boolean;
    required?: boolean;
    defaultChecked?: boolean;
    checked?: boolean;
} & react.RefAttributes<HTMLDivElement>>;
declare const Empty: react.ComponentType<EmptyContentProps>;
declare const Upload: react.ComponentType<UploadProps>;
declare const DatePicker: react.ComponentType<TDatePickerProps>;
declare const RangePicker: react.ComponentType<TRangePickerProps>;
declare const TimePicker: react.ComponentType<TimePickerProps>;
declare const Form: react.ComponentType<__types_form.FormProps>;
declare const FormItem: react.ComponentType<__types_form.FormItemProps>;
declare const Input: react.ComponentType<Omit<react.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> & __types.DefaultProps & {
    addonBefore?: react.ReactNode;
    addonAfter?: react.ReactNode;
    size?: __types.SizeType;
    prefix?: react.ReactNode;
    suffix?: react.ReactNode;
    disabled?: boolean;
    allowClear?: boolean;
    error?: boolean;
    bordered?: boolean;
    iconRender?: (visible: boolean) => react.ReactElement;
    onChange?: (event: __types.SyntheticBaseEvent) => void;
    onClick?: react.MouseEventHandler<HTMLElement>;
    onMouseEnter?: react.MouseEventHandler<HTMLElement>;
    onMouseLeave?: react.MouseEventHandler<HTMLElement>;
    onKeyPress?: react.KeyboardEventHandler<HTMLElement>;
    onKeyDown?: react.KeyboardEventHandler<HTMLElement>;
    onPressEnter?: (event: react.KeyboardEvent<HTMLInputElement>) => void;
    feedbackIcons?: boolean;
} & react.RefAttributes<HTMLInputElement>>;
declare const Textarea: react.ComponentType<Omit<react.TextareaHTMLAttributes<HTMLTextAreaElement>, "onResize"> & __types.DefaultProps & {
    value?: string;
    className?: string;
    style?: react.CSSProperties;
    autoSize?: boolean | {
        minRows?: number;
        maxRows?: number;
    };
    onPressEnter?: react.KeyboardEventHandler<HTMLTextAreaElement>;
    onResize?: (size: {
        width: number;
        height: number;
    }) => void;
    styles?: {
        textarea?: react.CSSProperties;
        count?: react.CSSProperties;
    };
    bordered?: boolean;
    size?: __types.SizeType;
    status?: "success" | "error";
    rootClassName?: string;
    variant?: "outlined" | "borderless" | "filled" | "underlined";
    error?: boolean;
    allowClear?: boolean;
} & react.RefAttributes<HTMLTextAreaElement>>;
declare const Radio: react.ComponentType<__types.DefaultProps & {
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    title?: string;
    onChange?: (e: __types.SyntheticBaseEvent) => void;
    onClick?: react.MouseEventHandler<HTMLElement>;
    onMouseEnter?: react.MouseEventHandler<HTMLElement>;
    onMouseLeave?: react.MouseEventHandler<HTMLElement>;
    onKeyPress?: react.KeyboardEventHandler<HTMLElement>;
    onKeyDown?: react.KeyboardEventHandler<HTMLElement>;
    onFocus?: react.FocusEventHandler<HTMLInputElement>;
    onBlur?: react.FocusEventHandler<HTMLInputElement>;
    value?: __types.RuleType;
    tabIndex?: number;
    name?: string;
    children?: react.ReactNode;
    id?: string;
    autoFocus?: boolean;
    type?: string;
    skipGroup?: boolean;
    required?: boolean;
    button?: boolean;
    error?: boolean;
} & react.RefAttributes<HTMLLabelElement>>;
declare const RadioButton: react.ComponentType<RadioButtonProps>;
declare const RadioGroup: react.ComponentType<RadioGroupProps>;
declare const Select: react.ComponentType<__types.DefaultProps & {
    id?: string;
    searchValue?: string;
    onSearch?: (value: string) => void;
    autoClearSearchValue?: boolean;
    onSelect?: (value: __types.RuleTypes, option?: OptionType) => void;
    onDeselect?: (value: string, option?: OptionType) => void;
    filterOption?: boolean | ((input: string, option: OptionType) => boolean);
    optionFilterProp?: string;
    options?: OptionType[];
    children?: react.ReactNode;
    defaultActiveFirstOption?: boolean;
    listHeight?: number;
    menuItemSelectedIcon?: react.ReactNode;
    mode?: "default" | "multiple" | "tags";
    value?: __types.RuleTypes;
    defaultValue?: __types.RuleTypes;
    maxCount?: number;
    onChange?: (e: __types.RuleTypes, option?: OptionType) => void;
    disabled?: boolean;
    loading?: boolean;
    placeholder?: string;
    allowClear?: boolean;
    filterable?: boolean;
    defaultOpen?: boolean;
    size?: "small" | "middle" | "large";
    onClear?: () => void;
    error?: boolean;
    showSearch?: boolean;
    tagRender?: ((props: CustomTagProps) => react.ReactElement) | undefined;
    maxTagPlaceholder?: react.ReactNode | ((omittedValues: DisplayValueType[]) => react.ReactNode);
    dropdownClassName?: string;
    showArrow?: boolean;
    onBlur?: react.FocusEventHandler<HTMLElement> | undefined;
    onDropdownVisibleChange?: ((open: boolean) => void) | undefined;
    showAction?: ("click" | "focus")[] | undefined;
    suffixIcon?: react.ReactNode;
    open?: boolean;
    notFoundContent?: react.ReactNode;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    dropdownRender?: (menu: react.ReactNode) => react.ReactNode;
    feedbackIcons?: boolean;
    placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
    removeIcon?: react.ReactNode;
} & react.RefAttributes<HTMLDivElement>>;
declare const Option: react.ComponentType<OptionProps>;
declare const Tag: react.ComponentType<CustomTagProps>;
declare const Skeleton: react.ComponentType<SkeletonProps>;
declare const SkeletonAvatar: react.ComponentType<SkeletonAvatarProps>;
declare const SkeletonButton: react.ComponentType<SkeletonButtonProps>;
declare const SkeletonImage: react.ComponentType<SkeletonImageProps>;
declare const SkeletonInput: react.ComponentType<SkeletonInputProps>;

export { Button, Checkbox, DatePicker, Empty, Form, FormItem, Input, Option, Radio, RadioButton, RadioGroup, RangePicker, Select, Skeleton, SkeletonAvatar, SkeletonButton, SkeletonImage, SkeletonInput, Tag, Textarea, TimePicker, Upload };
