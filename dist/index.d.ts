import * as react from 'react';
import { CSSProperties, ReactNode, ButtonHTMLAttributes, ReactElement, MouseEvent, MouseEventHandler, KeyboardEventHandler } from 'react';

type RuleType = any;
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

declare const EmptyContent: ({ icon, style, className, title, description, prefixCls }: EmptyContentProps) => react.JSX.Element;

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

export { Button, Checkbox, EmptyContent as Empty };
