import { ButtonHTMLAttributes, ReactNode, CSSProperties, ReactElement } from 'react';

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

export { ButtonComponent as Button };
