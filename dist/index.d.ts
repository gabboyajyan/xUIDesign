import * as react from 'react';
import { CSSProperties, ReactNode, MouseEventHandler, MouseEvent, ReactEventHandler, Key, FC, ComponentClass, FormEvent, ReactElement, FocusEvent, KeyboardEvent, FocusEventHandler, KeyboardEventHandler, ButtonHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type RuleType = any;
type RuleTypes = RuleType | RuleType[];
type SizeType$1 = 'small' | 'middle' | 'large';
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

type RuleRender = (form: FormInstance) => RuleObject;
type RuleObject = RuleRender | {
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
    warningPattern?: RegExp;
    warningMessage?: string;
    validator?: (rule: RuleObject, value: RuleTypes, callback: (error?: string) => void) => Promise<void> | void;
};
interface FieldData {
    name: string | string[];
    value?: RuleTypes;
    errors?: string[];
}
type FieldInstancesInputRef = HTMLInputElement | null;
type FieldInstancesRef = {
    input?: FieldInstancesInputRef;
};
interface FieldError {
    name: string;
    errors: string[];
}
type FormLayoutTypes = 'horizontal' | 'vertical' | 'inline';
type FormProps = DefaultProps & {
    colon?: boolean;
    name?: string;
    layout?: FormLayoutTypes;
    form?: FormInstance;
    size?: SizeType$1;
    initialValues?: Record<string, RuleTypes>;
    children?: ReactNode;
    component?: false | string | FC<ReactNode> | ComponentClass<ReactNode>;
    fields?: FieldData[];
    onChange?: (e: FormEvent<HTMLFormElement>) => void;
    onFieldsChange?: (changedFields: FieldData[]) => void;
    onSubmitCapture?: (changedFields: FieldData[]) => void;
    onValuesChange?: (changedValues: Record<string, RuleTypes>, allValues: Record<string, RuleTypes>) => void;
    onFinish?: (values: Record<string, RuleTypes>) => void;
    onFinishFailed?: (errorInfo: {
        values: Record<string, RuleTypes>;
        errorFields: Pick<FieldError, 'errors' | 'name'>[];
    }) => void;
};
type FormItemProps = DefaultProps & {
    name: string;
    label?: string | ReactNode;
    rules?: RuleObject[];
    initialValue?: RuleType;
    children: (ReactElement & {
        props: {
            value: RuleTypes;
        };
    }) | (ReactElement & {
        props: {
            value: RuleTypes;
        };
    })[];
    layout?: FormLayoutTypes;
    valuePropName?: string;
    dependencies?: string[];
    normalize?: (value: RuleType, prevValue: RuleType, allValues: RuleType) => RuleType;
    feedbackIcons?: boolean;
};
interface FormInstance {
    submit: () => Promise<Record<string, RuleTypes> | undefined>;
    setFields: (fields: FieldData[]) => void;
    resetFields: (nameList?: string[]) => void;
    getFieldError: (name: string) => string[];
    registerField: (name: string, rules?: RuleObject[]) => void;
    setFieldValue: (name: string, value: RuleTypes) => void;
    getFieldValue: (name: string) => RuleTypes;
    validateFields: (nameList?: string[]) => Promise<boolean>;
    setFieldsValue: (values: Partial<Record<string, RuleTypes>>) => void;
    getFieldsValue: (nameList?: string[]) => Record<string, RuleTypes>;
    isFieldTouched: (name: string) => boolean;
    getFieldsError: () => Pick<FieldError, 'errors' | 'name'>[];
    isFieldsTouched: (nameList?: string[], allFieldsTouched?: boolean) => boolean;
    getFieldWarning: (name: string) => string[];
    subscribeToField: (name: string, callback: (value: RuleTypes) => void) => () => void;
    subscribeToForm: (callback: (values: Record<string, RuleTypes>) => void) => () => void;
    subscribeToFields: (names: string[], callback: (values: Record<string, RuleTypes>) => void) => () => void;
    isFieldValidating: (name: string) => boolean;
    onFieldsChange?: (changedFields: FieldData[]) => void;
    onValuesChange?: (changedValues: Record<string, RuleTypes>, allValues: Record<string, RuleTypes>) => void;
    getFieldInstance: (fieldName: string) => FieldInstancesRef;
    isReseting: boolean;
}

declare const Form: FC<FormProps> & {
    Item: FC<FormItemProps>;
};

declare const FormItem: {
    ({ prefixCls, name, label, rules, children, className, layout, style, valuePropName, dependencies, initialValue, feedbackIcons, ...props }: FormItemProps): react_jsx_runtime.JSX.Element;
    displayName: string;
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
    size?: SizeType$1;
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

declare const DatePicker: (({ value, onChange, onCalendarChange, disabled, error, placeholder, prefixCls, noStyle, feedbackIcons, locale, placement, defaultValue, size, format, getPopupContainer, showToday, allowClear, disabledDate, suffixIcon, picker, prefix, defaultOpen, inputReadOnly, bordered }: TDatePickerProps) => react_jsx_runtime.JSX.Element) & {
    RangePicker: ({ prefixCls, value, onChange, placeholder, disabled, error, format, prefix, allowClear, inputReadOnly, size, picker, locale, disabledDate, style, className, separator, defaultValue, bordered }: TRangePickerProps) => react_jsx_runtime.JSX.Element;
};

declare const TimePicker: FC<TimePickerProps>;

declare const RangePicker: ({ prefixCls, value, onChange, placeholder, disabled, error, format, prefix, allowClear, inputReadOnly, size, picker, locale, disabledDate, style, className, separator, defaultValue, bordered }: TRangePickerProps) => react_jsx_runtime.JSX.Element;

declare const Textarea: react.ForwardRefExoticComponent<Omit<react.TextareaHTMLAttributes<HTMLTextAreaElement>, "onResize"> & DefaultProps & {
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
    size?: SizeType$1;
    status?: "success" | "error";
    rootClassName?: string;
    variant?: "outlined" | "borderless" | "filled" | "underlined";
    error?: boolean;
    allowClear?: boolean;
} & react.RefAttributes<HTMLTextAreaElement>>;

declare const InputComponent: react.ForwardRefExoticComponent<Omit<react.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> & DefaultProps & {
    addonBefore?: react.ReactNode;
    addonAfter?: react.ReactNode;
    size?: SizeType$1;
    prefix?: react.ReactNode;
    suffix?: react.ReactNode;
    disabled?: boolean;
    allowClear?: boolean;
    error?: boolean;
    bordered?: boolean;
    iconRender?: (visible: boolean) => react.ReactElement;
    onChange?: (event: SyntheticBaseEvent) => void;
    onClick?: react.MouseEventHandler<HTMLElement>;
    onMouseEnter?: react.MouseEventHandler<HTMLElement>;
    onMouseLeave?: react.MouseEventHandler<HTMLElement>;
    onKeyPress?: react.KeyboardEventHandler<HTMLElement>;
    onKeyDown?: react.KeyboardEventHandler<HTMLElement>;
    onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
    feedbackIcons?: boolean;
} & react.RefAttributes<HTMLInputElement>>;
declare const Input: typeof InputComponent & {
    TextArea: typeof Textarea;
};

interface RadioGroupProps {
    defaultValue?: RuleType;
    value?: RuleType;
    onChange?: (e: SyntheticBaseEvent) => void;
    size?: SizeType$1;
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
    size?: SizeType$1;
};

declare const Radio: react.ForwardRefExoticComponent<DefaultProps & {
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    title?: string;
    onChange?: (e: SyntheticBaseEvent) => void;
    onClick?: react.MouseEventHandler<HTMLElement>;
    onMouseEnter?: react.MouseEventHandler<HTMLElement>;
    onMouseLeave?: react.MouseEventHandler<HTMLElement>;
    onKeyPress?: react.KeyboardEventHandler<HTMLElement>;
    onKeyDown?: react.KeyboardEventHandler<HTMLElement>;
    onFocus?: react.FocusEventHandler<HTMLInputElement>;
    onBlur?: react.FocusEventHandler<HTMLInputElement>;
    value?: RuleType;
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
} & react.RefAttributes<HTMLLabelElement>> & {
    Group: ({ defaultValue, value, size, disabled, name, id, style, buttonStyle, block, prefixCls, className, options, children, ...props }: RadioGroupProps) => react_jsx_runtime.JSX.Element;
    Button: ({ prefixCls, className, checked, disabled, children, size, ...props }: RadioButtonProps) => react_jsx_runtime.JSX.Element;
};

declare const RadioGroup: ({ defaultValue, value, size, disabled, name, id, style, buttonStyle, block, prefixCls, className, options, children, ...props }: RadioGroupProps) => react_jsx_runtime.JSX.Element;

declare const RadioButton: ({ prefixCls, className, checked, disabled, children, size, ...props }: RadioButtonProps) => react_jsx_runtime.JSX.Element;

declare const Select: react.ForwardRefExoticComponent<DefaultProps & {
    id?: string;
    searchValue?: string;
    onSearch?: (value: string) => void;
    autoClearSearchValue?: boolean;
    onSelect?: (value: RuleTypes, option?: OptionType) => void;
    onDeselect?: (value: string, option?: OptionType) => void;
    filterOption?: boolean | ((input: string, option: OptionType) => boolean);
    optionFilterProp?: string;
    options?: OptionType[];
    children?: react.ReactNode;
    defaultActiveFirstOption?: boolean;
    listHeight?: number;
    menuItemSelectedIcon?: react.ReactNode;
    mode?: "default" | "multiple" | "tags";
    value?: RuleTypes;
    defaultValue?: RuleTypes;
    maxCount?: number;
    onChange?: (e: RuleTypes, option?: OptionType) => void;
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
    tagRender?: ((props: CustomTagProps) => ReactElement) | undefined;
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
} & react.RefAttributes<HTMLDivElement>> & {
    Option: react.FC<OptionProps>;
};

declare const Tag: FC<CustomTagProps>;

declare const Option: FC<OptionProps>;

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

declare const Skeleton: {
    ({ prefixCls, active, className, style, avatar, paragraph, round, title, teamLogo }: SkeletonProps): ReactElement;
    Image: react.FC<SkeletonImageProps>;
    Input: react.FC<SkeletonInputProps>;
    Avatar: react.FC<SkeletonAvatarProps>;
    Button: react.FC<SkeletonButtonProps>;
};

declare const SkeletonImage: FC<SkeletonImageProps>;

declare const SkeletonInput: FC<SkeletonInputProps>;

declare const SkeletonAvatar: FC<SkeletonAvatarProps>;

declare const SkeletonButton: FC<SkeletonButtonProps>;

type EmptyContentProps = DefaultProps & {
    title?: string;
    description?: string;
    icon?: ReactNode;
};

declare const EmptyContent: ({ icon, style, className, title, description, prefixCls }: EmptyContentProps) => react_jsx_runtime.JSX.Element;

declare const ButtonTypes: readonly ["default", "primary", "dashed", "link", "text", "ghost"];
declare const ButtonShapes: readonly ["default", "circle", "round"];
declare const ButtonVariantTypes: readonly ["outlined", "dashed", "solid", "filled", "text", "link"];
declare const ButtonColorTypes: readonly ["default", "primary", "danger", "blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];
type ButtonType = (typeof ButtonTypes)[number];
type ButtonShape = (typeof ButtonShapes)[number];
type ButtonVariantType = (typeof ButtonVariantTypes)[number];
type ButtonColorType = (typeof ButtonColorTypes)[number];
type SizeType = 'small' | 'middle' | 'large' | undefined;
type ButtonHTMLType = 'button' | 'submit' | 'reset';
interface BaseButtonProps {
    type?: ButtonType;
    color?: ButtonColorType;
    variant?: ButtonVariantType;
    icon?: ReactNode;
    iconPosition?: 'start' | 'end';
    shape?: ButtonShape;
    size?: SizeType;
    disabled?: boolean;
    loading?: boolean | {
        delay?: number;
        icon?: ReactNode;
    };
    prefixCls?: string;
    className?: string;
    rootClassName?: string;
    ghost?: boolean;
    danger?: boolean;
    block?: boolean;
    children?: ReactNode;
    classNames?: {
        icon?: string;
    };
    styles?: {
        icon?: CSSProperties;
    };
}
interface ButtonProps extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'type'> {
    href?: string;
    htmlType?: ButtonHTMLType;
}

declare const ButtonComponent: ({ type, variant, color, shape, size, htmlType, className, rootClassName, classNames: customClassNames, styles, prefixCls, icon, iconPosition, loading, disabled, ghost, danger, block, children, href, ...restProps }: ButtonProps) => ReactElement;

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

declare const Upload: ({ prefixCls, multiple, style, className, onChange, action, name, method, headers, directory, beforeUpload, rootClassName, onRemove, disabled, withCredentials, openFileDialogOnClick, maxCount, fileList: controlledFileList, customRequest, accept, listType, showUploadList, children, noStyle, defaultFileList }: UploadProps) => react_jsx_runtime.JSX.Element;

declare const Checkbox: react.ForwardRefExoticComponent<DefaultProps & {
    disabled?: boolean;
    onChange?: (e: MouseEvent<HTMLInputElement> & TargetProps) => void;
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

declare const ClearIcon: () => react_jsx_runtime.JSX.Element;
declare const ArrowIcon: ({ isOpen }: {
    isOpen: boolean;
}) => react_jsx_runtime.JSX.Element;
declare const LoadingIcon: () => react_jsx_runtime.JSX.Element;
declare const CheckIcon: () => react_jsx_runtime.JSX.Element;
declare const SearchIcon: () => react_jsx_runtime.JSX.Element;
declare const CalendarIcon: () => react_jsx_runtime.JSX.Element;
declare const SuccessIcon: () => react_jsx_runtime.JSX.Element;
declare const ErrorIcon: () => react_jsx_runtime.JSX.Element;
declare const DateDistanceIcon: () => react_jsx_runtime.JSX.Element;
declare const TimeIcon: () => react_jsx_runtime.JSX.Element;
declare const StampleIcon: () => react_jsx_runtime.JSX.Element;
declare const TrashIcon: () => react_jsx_runtime.JSX.Element;
declare const SpinerIcon: () => react_jsx_runtime.JSX.Element;

declare const useForm: (initialValues?: Record<string, RuleTypes>, onFieldsChange?: (changedFields: FieldData[]) => void, onValuesChange?: (changedValues: Record<string, RuleTypes>, allValues: Record<string, RuleTypes>) => void) => FormInstance;

type UseWatchProps = {
    name?: string;
    defaultValue?: RuleType;
    form?: FormInstance;
};
declare const useWatch: ({ name, defaultValue, form }: UseWatchProps) => any;

export { ArrowIcon, ButtonComponent as Button, CalendarIcon, CheckIcon, Checkbox, ClearIcon, DateDistanceIcon, DatePicker, EmptyContent as Empty, ErrorIcon, Form, FormItem, Input, LoadingIcon, Option, Radio, RadioButton, RadioGroup, RangePicker, SearchIcon, Select, Skeleton, SkeletonAvatar, SkeletonButton, SkeletonImage, SkeletonInput, SpinerIcon, StampleIcon, SuccessIcon, Tag, Textarea, TimeIcon, TimePicker, TrashIcon, Upload, useForm, useWatch };
