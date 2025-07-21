import { MouseEvent, ReactNode } from 'react';
import { DefaultProps, TargetProps } from '.';
export type SwitchProps = DefaultProps & {
    disabled?: boolean;
    onChange?: (e: MouseEvent<HTMLInputElement> & TargetProps) => void;
    onClick?: (value: boolean) => void;
    value?: boolean;
    tabIndex?: number;
    name?: string;
    children?: ReactNode;
    id?: string;
    autoFocus?: boolean;
    type?: string;
    skipGroup?: boolean;
    required?: boolean;
    defaultChecked?: boolean;
    checked?: boolean;
};
