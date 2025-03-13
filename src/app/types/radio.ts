import {
    ReactNode,
    FocusEventHandler,
    KeyboardEventHandler,
    MouseEventHandler,
    CSSProperties,
    ChangeEvent
} from "react";
import { DefaultProps, RuleType, SizeType, SyntheticBaseEvent, TargetProps } from ".";

export type RadioValueType = string | number | readonly string[] | undefined

export interface RadioGroupProps {
    defaultValue?: RuleType;
    value?: RuleType;
    onChange?: (e: ChangeEvent & TargetProps) => void;
    size?: SizeType;
    disabled?: boolean;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
    name?: string;
    children?: ReactNode;
    id?: string;
    optionType?: 'default' | 'button';
    buttonStyle?: 'outline' | 'solid';
    onFocus?: FocusEventHandler<HTMLDivElement>;
    onBlur?: FocusEventHandler<HTMLDivElement>;
    block?: boolean;
    prefixCls?: string;
    className?: string;
    options?: Array<{ label: ReactNode; value: RuleType; disabled?: boolean }> | string[] | number[];
    style?: CSSProperties;
}

export type RadioProps = DefaultProps & {
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    title?: string;
    onChange?: (e: SyntheticBaseEvent) => void;
    onClick?: MouseEventHandler<HTMLElement>;
    onMouseEnter?: MouseEventHandler<HTMLElement>;
    onMouseLeave?: MouseEventHandler<HTMLElement>;
    onKeyPress?: KeyboardEventHandler<HTMLElement>;
    onKeyDown?: KeyboardEventHandler<HTMLElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    value?: RuleType;
    tabIndex?: number;
    name?: string;
    children?: ReactNode;
    id?: string;
    autoFocus?: boolean;
    type?: string;
    skipGroup?: boolean;
    required?: boolean;
};