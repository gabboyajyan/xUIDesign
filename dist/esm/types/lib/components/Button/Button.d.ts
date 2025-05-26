import { ReactElement, ReactNode } from 'react';
import { ButtonProps } from '../../types/button';
import './style.css';
declare const Button: ({ type, variant, color, shape, size, htmlType, className, rootClassName, classNames: customClassNames, styles, prefixCls, iconPosition, disabled, ghost, danger, block, children, href, iconNode, isLoading, ...restProps }: ButtonProps & {
    iconNode?: ReactNode;
    isLoading?: boolean;
}) => ReactElement;
export default Button;
