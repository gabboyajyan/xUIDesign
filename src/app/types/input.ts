import { InputHTMLAttributes, KeyboardEvent, KeyboardEventHandler, MouseEventHandler, ReactNode } from "react";
import { DefaultProps, SyntheticBaseEvent, SizeType } from ".";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & DefaultProps & {
    addonBefore?: ReactNode;
    addonAfter?: ReactNode;
    size?: SizeType;
    prefix?: ReactNode;
    suffix?: ReactNode;
    disabled?: boolean;
    allowClear?: boolean;
    error?: boolean;
    onChange?: (event: SyntheticBaseEvent) => void,
    onClick?: MouseEventHandler<HTMLElement>;
    onMouseEnter?: MouseEventHandler<HTMLElement>;
    onMouseLeave?: MouseEventHandler<HTMLElement>;
    onKeyPress?: KeyboardEventHandler<HTMLElement>;
    onKeyDown?: KeyboardEventHandler<HTMLElement>;
    onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
};