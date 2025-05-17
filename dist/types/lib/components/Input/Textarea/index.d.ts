import './style.css';
declare const Textarea: import("react").ForwardRefExoticComponent<Omit<import("react").TextareaHTMLAttributes<HTMLTextAreaElement>, "onResize"> & import("../../../types").DefaultProps & {
    value?: string;
    className?: string;
    style?: import("react").CSSProperties;
    autoSize?: boolean | {
        minRows?: number;
        maxRows?: number;
    };
    onPressEnter?: import("react").KeyboardEventHandler<HTMLTextAreaElement>;
    onResize?: (size: {
        width: number;
        height: number;
    }) => void;
    styles?: {
        textarea?: import("react").CSSProperties;
        count?: import("react").CSSProperties;
    };
    bordered?: boolean;
    size?: import("../../../types").SizeType;
    status?: "success" | "error";
    rootClassName?: string;
    variant?: "outlined" | "borderless" | "filled" | "underlined";
    error?: boolean;
    allowClear?: boolean;
} & import("react").RefAttributes<HTMLTextAreaElement>>;
export { Textarea };
