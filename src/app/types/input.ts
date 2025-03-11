import { ChangeEvent, InputHTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { DefaultProps, SizeType, TargetProps } from ".";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & DefaultProps & {
    addonBefore?: ReactNode;
    addonAfter?: ReactNode;
    size?: SizeType;
    prefix?: ReactNode;
    suffix?: ReactNode;
    disabled?: boolean;
    allowClear?: boolean;
    error?: boolean;
    onChange?: (event: ChangeEvent & TargetProps) => void,
    onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
};