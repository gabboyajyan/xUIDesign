import { ReactElement } from 'react';
import { ButtonProps } from '../../types/button';
import './style.css';
type ButtonBaseProps = ButtonProps & {
    iconNode?: React.ReactNode;
    isLoading?: boolean;
};
declare const ButtonBase: ({ type, variant, color, shape, size, htmlType, className, rootClassName, classNames: customClassNames, styles, prefixCls, iconPosition, disabled, ghost, danger, block, children, href, iconNode, isLoading, ...restProps }: ButtonBaseProps) => ReactElement;
export default ButtonBase;
