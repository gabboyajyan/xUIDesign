import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import './style.css';
declare const Checkbox: React.ForwardRefExoticComponent<import("../../types").DefaultProps & {
    disabled?: boolean;
    onChange?: (e: MouseEvent<HTMLInputElement> & import("../../types").TargetProps) => void;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    value?: boolean;
    tabIndex?: number;
    name?: string;
    children?: React.ReactNode;
    id?: string;
    autoFocus?: boolean;
    type?: string;
    skipGroup?: boolean;
    required?: boolean;
    defaultChecked?: boolean;
    checked?: boolean;
} & {
    internalChecked: boolean;
    setInternalChecked?: Dispatch<SetStateAction<boolean>>;
} & React.RefAttributes<HTMLDivElement>>;
export default Checkbox;
