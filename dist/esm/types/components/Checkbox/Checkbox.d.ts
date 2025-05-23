import React, { ForwardedRef } from 'react';
import { CheckboxProps } from '../../types/checkbox';
declare const Checkbox: {
    ({ prefixCls, className, style, disabled, onClick, onMouseEnter, onMouseLeave, onKeyPress, onKeyDown, tabIndex, name, children, id, autoFocus, type, required, noStyle, checked, ref }: CheckboxProps & {
        ref: ForwardedRef<HTMLDivElement>;
    }): React.JSX.Element;
    displayName: string;
};
export default Checkbox;
