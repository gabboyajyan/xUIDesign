import { KeyboardEvent } from 'react';
import { SyntheticBaseEvent } from '../../types';
import './style.css';
import Textarea from './Textarea/Textarea';
declare const InputComponent: import("react").ForwardRefExoticComponent<Omit<import("react").InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> & import("../../types").DefaultProps & {
    addonBefore?: import("react").ReactNode;
    addonAfter?: import("react").ReactNode;
    size?: import("../../types").SizeType;
    prefix?: import("react").ReactNode;
    suffix?: import("react").ReactNode;
    disabled?: boolean;
    allowClear?: boolean;
    error?: boolean;
    bordered?: boolean;
    iconRender?: (visible: boolean) => import("react").ReactElement;
    onChange?: (event: SyntheticBaseEvent) => void;
    onClick?: import("react").MouseEventHandler<HTMLElement>;
    onMouseEnter?: import("react").MouseEventHandler<HTMLElement>;
    onMouseLeave?: import("react").MouseEventHandler<HTMLElement>;
    onKeyPress?: import("react").KeyboardEventHandler<HTMLElement>;
    onKeyDown?: import("react").KeyboardEventHandler<HTMLElement>;
    onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
    feedbackIcons?: boolean;
} & import("react").RefAttributes<HTMLInputElement>>;
declare const Input: typeof InputComponent & {
    TextArea: typeof Textarea;
};
export default Input;
