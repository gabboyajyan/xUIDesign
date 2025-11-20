import { CSSProperties, ReactNode } from "react";

export interface PopoverProps {
    prefixCls?: string;
    content: ReactNode;
    children: ReactNode;
    trigger?: "click" | "hover";
    placement?: "top" | "bottom" | "left" | "right" | "topRight" | "bottomRight" | "topLeft" | "bottomLeft";
    open?: boolean;
    overlayStyle?: CSSProperties;
    overlayClassName?: string;
    title?: string | ReactNode;
    onVisibleChange?: ((open: boolean) => void) | undefined;
    getPopupContainer?: ((node: HTMLElement) => HTMLElement) | undefined
}