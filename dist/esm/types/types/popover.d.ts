import { CSSProperties, ReactNode } from "react";
export interface PopoverProps {
    prefixCls?: string;
    content: ReactNode;
    children: ReactNode;
    trigger?: "click" | "hover";
    placement?: "top" | "bottom" | "left" | "right" | "topRight" | "bottomRight" | "topLeft" | "bottomLeft";
    open?: boolean;
    overlayStyle?: CSSProperties;
    onOpenChange?: (open: boolean) => void;
    getPopupContainer?: ((node: HTMLElement) => HTMLElement) | undefined;
}
