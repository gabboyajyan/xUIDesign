import { ForwardedRef, ReactElement } from 'react';
import { CheckboxProps } from '../../types/checkbox';
declare const Checkbox: {
    ({ prefixCls, className, defaultChecked, checked, style, disabled, onChange, onClick, onMouseEnter, onMouseLeave, onKeyPress, onKeyDown, tabIndex, name, children, id, autoFocus, type, value, required, noStyle, ref }: CheckboxProps & {
        ref?: ForwardedRef<HTMLDivElement>;
    }): ReactElement;
    displayName: string;
};
export default Checkbox;
