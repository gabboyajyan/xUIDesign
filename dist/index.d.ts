import * as react from 'react';
import { CSSProperties, ReactNode } from 'react';
import * as __types_select from '@/types/select';
export { CustomTagProps, DisplayValueType, OptionProps, OptionType, SelectProps, TagProps } from '@/types/select';
import * as __types_radio from '@/types/radio';
export { RadioButtonProps, RadioGroupProps, RadioProps } from '@/types/radio';
import * as __types_form from '@/types/form';
export { FieldData, FieldError, FieldInstancesInputRef, FormInstance, FormItemChildComponentProps, FormProps, RuleObject, RuleRender } from '@/types/form';
import * as __types_datepicker from '@/types/datepicker';
export { TDatePickerProps, TRangePickerProps, TimePickerProps } from '@/types/datepicker';
import * as __types_upload from '@/types/upload';
export { RcFile, UploadChangeParam, UploadFile, UploadProps } from '@/types/upload';
import * as __types from '@/types';
export { DefaultProps, MouseEventHandlerSelect, RuleType, RuleTypes, SyntheticBaseEvent, TargetProps } from '@/types';
import * as __types_button from '@/types/button';
export { BaseButtonProps, ButtonProps, ButtonType } from '@/types/button';
export { ArrowIcon, CalendarIcon, CheckIcon, ClearIcon, DateDistanceIcon, ErrorIcon, LoadingIcon, SearchIcon, SpinerIcon, StampleIcon, SuccessIcon, TimeIcon, TrashIcon } from '@/components/Icons';
export { useForm } from '@/hooks/useForm';
export { useWatch } from '@/hooks/useWatch';
export { CheckboxProps } from '@/types/checkbox';
export { InputProps, TextareaProps } from '@/types/input';
export { FormContext } from '@/components/Form/Form';
export { clsx, createArray, parseValue } from '@/helpers';
export { flattenChildren } from '@/helpers/flatten';

interface DefaultProps {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    noStyle?: boolean;
}

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

type EmptyContentProps = DefaultProps & {
    title?: string;
    description?: string;
    icon?: ReactNode;
};

type SwitchProps = DefaultProps & {
    disabled?: boolean;
    onChange?: (value: boolean) => void;
    onClick?: (value: boolean) => void;
    value?: boolean;
    tabIndex?: number;
    name?: string;
    children?: ReactNode;
    id?: string;
    autoFocus?: boolean;
    type?: string;
    skipGroup?: boolean;
    required?: boolean;
    defaultChecked?: boolean;
    checked?: boolean;
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
declare const Switch: react.ComponentType<SwitchProps>;
declare const Empty: react.ComponentType<EmptyContentProps>;
declare const Upload: react.ComponentType<__types_upload.UploadProps>;
declare const DatePicker: react.ComponentType<__types_datepicker.TDatePickerProps>;
declare const RangePicker: react.ComponentType<__types_datepicker.TRangePickerProps>;
declare const TimePicker: react.ComponentType<__types_datepicker.TimePickerProps>;
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
    child?: react.ReactNode;
    mask?: string;
    maskChar?: string;
    maskRegex?: RegExp;
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
declare const RadioButton: react.ComponentType<__types_radio.RadioButtonProps>;
declare const RadioGroup: react.ComponentType<__types_radio.RadioGroupProps>;
declare const Select: react.ComponentType<__types.DefaultProps & {
    id?: string;
    searchValue?: string;
    onSearch?: (value: string) => void;
    autoClearSearchValue?: boolean;
    onSelect?: (value: __types.RuleTypes, option?: __types_select.OptionType) => void;
    onDeselect?: (value: string, option?: __types_select.OptionType) => void;
    filterOption?: boolean | ((input: string, option: __types_select.OptionType) => boolean);
    optionFilterProp?: string;
    options?: __types_select.OptionType[];
    children?: react.ReactNode;
    defaultActiveFirstOption?: boolean;
    listHeight?: number;
    menuItemSelectedIcon?: react.ReactNode;
    mode?: "default" | "multiple" | "tags";
    value?: __types.RuleTypes;
    defaultValue?: __types.RuleTypes;
    maxCount?: number;
    onChange?: (e: __types.RuleTypes, option?: __types_select.OptionType) => void;
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
    tagRender?: ((props: __types_select.CustomTagProps) => react.ReactElement) | undefined;
    maxTagPlaceholder?: react.ReactNode | ((omittedValues: __types_select.DisplayValueType[]) => react.ReactNode);
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
declare const Option: react.ComponentType<__types_select.OptionProps>;
declare const Tag: react.ComponentType<__types_select.CustomTagProps>;
declare const Skeleton: react.ComponentType<SkeletonProps>;
declare const SkeletonAvatar: react.ComponentType<SkeletonAvatarProps>;
declare const SkeletonButton: react.ComponentType<SkeletonButtonProps>;
declare const SkeletonImage: react.ComponentType<SkeletonImageProps>;
declare const SkeletonInput: react.ComponentType<SkeletonInputProps>;

export { Button, Checkbox, DatePicker, Empty, Form, FormItem, Input, Option, Radio, RadioButton, RadioGroup, RangePicker, Select, Skeleton, SkeletonAvatar, SkeletonButton, SkeletonImage, SkeletonInput, Switch, Tag, Textarea, TimePicker, Upload };
