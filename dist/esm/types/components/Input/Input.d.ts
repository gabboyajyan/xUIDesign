import React, { KeyboardEvent } from 'react';
import { SyntheticBaseEvent } from '../../types';
import './style.css';
import Textarea from './Textarea/Textarea';
declare const InputComponent: React.ForwardRefExoticComponent<Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> & import("../../types").DefaultProps & {
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    size?: import("../../types").SizeType;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    disabled?: boolean;
    allowClear?: boolean;
    error?: boolean;
    bordered?: boolean;
    iconRender?: (visible: boolean) => React.ReactElement;
    onChange?: (event: SyntheticBaseEvent) => void;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
    feedbackIcons?: boolean;
} & React.RefAttributes<HTMLInputElement>>;
declare const Input: typeof InputComponent & {
    TextArea: typeof Textarea;
};
export default Input;
