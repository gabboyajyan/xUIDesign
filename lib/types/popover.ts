import { CSSProperties, ReactNode } from "react";
import { DefaultProps } from ".";

export type PopoverProps = DefaultProps & {
    content: ReactNode;
    children: ReactNode;
    trigger?: "click" | "hover";
    placement?: "top" | "bottom" | "left" | "right" | "topRight" | "bottomRight" | "topLeft" | "bottomLeft";
    open?: boolean;
    overlayStyle?: CSSProperties;
    overlayClassName?: string;
    title?: string | ReactNode;
    visible?: boolean;
    listenPopoverPossitions?: CSSProperties;
    onVisibleChange?: ((open: boolean) => void) | undefined;
    getPopupContainer?: ((node: HTMLElement) => HTMLElement | ParentNode) | undefined
}