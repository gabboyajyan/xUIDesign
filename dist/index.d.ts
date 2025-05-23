import * as react_jsx_runtime from 'react/jsx-runtime';
import { CSSProperties, ReactNode, ButtonHTMLAttributes, ReactElement, MouseEvent, MouseEventHandler, KeyboardEventHandler } from 'react';

type RuleType = any;
type RuleTypes = RuleType | RuleType[];
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

declare const Button: ({ type, variant, color, shape, size, htmlType, className, rootClassName, classNames: customClassNames, styles, prefixCls, iconPosition, disabled, ghost, danger, block, children, href, iconNode, isLoading, ...restProps }: ButtonProps & {
    iconNode?: ReactNode;
    isLoading?: boolean;
}) => ReactElement;

type CheckboxProps = DefaultProps & {
    disabled?: boolean;
    onChange?: (e: MouseEvent<HTMLInputElement> & TargetProps) => void;
    onClick?: MouseEventHandler<HTMLElement>;
    onMouseEnter?: MouseEventHandler<HTMLElement>;
    onMouseLeave?: MouseEventHandler<HTMLElement>;
    onKeyPress?: KeyboardEventHandler<HTMLElement>;
    onKeyDown?: KeyboardEventHandler<HTMLElement>;
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

declare const Checkbox: {
    ({ prefixCls, className, defaultChecked, checked, style, disabled, onChange, onClick, onMouseEnter, onMouseLeave, onKeyPress, onKeyDown, tabIndex, name, children, id, autoFocus, type, value, required, noStyle }: CheckboxProps): ReactElement;
    displayName: string;
};

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

declare const useForm: (initialValues?: Record<string, RuleTypes>, onFieldsChange?: (changedFields: FieldData[]) => void, onValuesChange?: (changedValues: Record<string, RuleTypes>, allValues: Record<string, RuleTypes>) => void) => FormInstance;

type UseWatchProps = {
    name?: string;
    defaultValue?: RuleType;
    form?: FormInstance;
};
declare const useWatch: ({ name, defaultValue, form }: UseWatchProps) => any;

export { Button, Checkbox, EmptyContent as Empty, useForm, useWatch };
