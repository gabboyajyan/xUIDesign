import { ReactNode } from 'react';
import { DefaultProps } from '.';
export type SwitchProps = DefaultProps & {
    disabled?: boolean;
    onChange?: (value: boolean) => void;
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
    controlled?: boolean;
};
