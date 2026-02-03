import React from 'react';
import { InputProps } from '../../types/input';
import Textarea from './Textarea/Textarea';
import './style.css';
export interface MyInputHandle {
    focus: () => void;
    blur: () => void;
    input: HTMLInputElement | null;
    nativeElement: HTMLInputElement | null;
    setSelectionRange: (start: number, end: number) => void;
}
declare const InputComponent: {
    ({ size, error, suffix, prefix, addonAfter, addonBefore, onPressEnter, disabled, allowClear, prefixCls, prefixClsV3, className, value, iconRender, noStyle, feedbackIcons, mask, maskChar, maskRegex, __injected, defaultValue, child, ref, ...props }: InputProps): React.JSX.Element;
    displayName: string;
};
declare const Input: typeof InputComponent & {
    TextArea: typeof Textarea;
};
export default Input;
