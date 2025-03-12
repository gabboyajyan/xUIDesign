import {
    ReactNode,
    ChangeEvent,
    CSSProperties,
    FocusEventHandler,
    KeyboardEventHandler,
    MouseEventHandler
} from "react";
import { RuleType } from ".";

// export type RadioOptionType = {
//     label: ReactNode;
//     value: string | number;
//     disabled?: boolean;
// };

export type RadioProps = {
    prefixCls?: string;
    className?: string;
    rootClassName?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    style?: CSSProperties;
    disabled?: boolean;
    title?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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