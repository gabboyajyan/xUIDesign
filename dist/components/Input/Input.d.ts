import { InputProps } from '../../types/input';
import Textarea from './Textarea/Textarea';
import './style.css';
declare const InputComponent: {
    ({ size, error, suffix, prefix, addonAfter, addonBefore, onPressEnter, disabled, allowClear, prefixCls, prefixClsV3, className, value, iconRender, noStyle, feedbackIcons, mask, maskChar, maskRegex, __injected, defaultValue, child, ref, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const Input: typeof InputComponent & {
    TextArea: typeof Textarea;
};
export default Input;
