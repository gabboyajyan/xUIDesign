import React from 'react';
import './style.css';
declare const Textarea: React.ForwardRefExoticComponent<Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onResize"> & import("../../..").DefaultProps & {
    value?: string;
    className?: string;
    style?: React.CSSProperties;
    autoSize?: boolean | {
        minRows?: number;
        maxRows?: number;
    };
    onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
    onResize?: (size: {
        width: number;
        height: number;
    }) => void;
    styles?: {
        textarea?: React.CSSProperties;
        count?: React.CSSProperties;
    };
    bordered?: boolean;
    size?: import("../../../types").SizeType;
    status?: "success" | "error";
    rootClassName?: string;
    variant?: "outlined" | "borderless" | "filled" | "underlined";
    error?: boolean;
    allowClear?: boolean;
} & React.RefAttributes<HTMLTextAreaElement>>;
export default Textarea;
