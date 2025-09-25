import * as react from 'react';
import { CSSProperties, ReactNode } from 'react';
import * as __types_select from '@/types/select';
export { CustomTagProps, DisplayValueType, OptionProps, OptionType, SelectProps, TagProps } from '@/types/select';
import * as __types_radio from '@/types/radio';
export { RadioButtonProps, RadioGroupProps, RadioProps } from '@/types/radio';
import * as __types_input from '@/types/input';
export { InputProps, TextareaProps } from '@/types/input';
import * as __types_form from '@/types/form';
export { FieldData, FieldError, FieldInstancesInputRef, FormInstance, FormItemChildComponentProps, FormProps, RuleObject, RuleRender } from '@/types/form';
import * as __types_datepicker from '@/types/datepicker';
export { TDatePickerProps, TRangePickerProps, TimePickerProps } from '@/types/datepicker';
import * as __types_upload from '@/types/upload';
export { RcFile, UploadChangeParam, UploadFile, UploadProps } from '@/types/upload';
import * as __types_checkbox from '@/types/checkbox';
export { CheckboxProps } from '@/types/checkbox';
import * as __types_button from '@/types/button';
export { BaseButtonProps, ButtonProps, ButtonType } from '@/types/button';
export { ArrowIcon, CalendarIcon, CheckIcon, ClearIcon, DateDistanceIcon, ErrorIcon, LoadingIcon, SearchIcon, SpinerIcon, StampleIcon, SuccessIcon, TimeIcon, TrashIcon } from '@/components/Icons';
export { useForm } from '@/hooks/useForm';
export { useWatch } from '@/hooks/useWatch';
export { DefaultProps, MouseEventHandlerSelect, RuleType, RuleTypes, SyntheticBaseEvent, TargetProps } from '@/types';
export { FormContext } from '@/components/Form/Form';
export { clsx, createArray, parseValue } from '@/helpers';
export { flattenChildren } from '@/helpers/flatten';

interface DefaultProps {
    prefixCls?: string;
    prefixClsV3?: string;
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
declare const Checkbox: react.ComponentType<__types_checkbox.CheckboxProps>;
declare const Switch: react.ComponentType<SwitchProps>;
declare const Empty: react.ComponentType<EmptyContentProps>;
declare const Upload: react.ComponentType<__types_upload.UploadProps>;
declare const DatePicker: react.ComponentType<__types_datepicker.TDatePickerProps>;
declare const RangePicker: react.ComponentType<__types_datepicker.TRangePickerProps>;
declare const TimePicker: react.ComponentType<__types_datepicker.TimePickerProps>;
declare const Form: react.ComponentType<__types_form.FormProps>;
declare const FormItem: react.ComponentType<__types_form.FormItemProps>;
declare const Input: react.ComponentType<__types_input.InputProps>;
declare const Textarea: react.ComponentType<__types_input.TextareaProps>;
declare const Radio: react.ComponentType<__types_radio.RadioProps>;
declare const RadioButton: react.ComponentType<__types_radio.RadioButtonProps>;
declare const RadioGroup: react.ComponentType<__types_radio.RadioGroupProps>;
declare const Select: react.ComponentType<__types_select.SelectProps>;
declare const Option: react.ComponentType<__types_select.OptionProps>;
declare const Tag: react.ComponentType<__types_select.CustomTagProps>;
declare const Skeleton: react.ComponentType<SkeletonProps>;
declare const SkeletonAvatar: react.ComponentType<SkeletonAvatarProps>;
declare const SkeletonButton: react.ComponentType<SkeletonButtonProps>;
declare const SkeletonImage: react.ComponentType<SkeletonImageProps>;
declare const SkeletonInput: react.ComponentType<SkeletonInputProps>;

export { Button, Checkbox, DatePicker, Empty, Form, FormItem, Input, Option, Radio, RadioButton, RadioGroup, RangePicker, Select, Skeleton, SkeletonAvatar, SkeletonButton, SkeletonImage, SkeletonInput, Switch, Tag, Textarea, TimePicker, Upload };
