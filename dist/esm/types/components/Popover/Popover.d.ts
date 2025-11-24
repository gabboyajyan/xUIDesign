import React from "react";
import './style.css';
declare const Popover: React.ForwardRefExoticComponent<import("../..").DefaultProps & {
    content: React.ReactNode;
    children: React.ReactNode;
    trigger?: "click" | "hover";
    placement?: "top" | "bottom" | "left" | "right" | "topRight" | "bottomRight" | "topLeft" | "bottomLeft";
    open?: boolean;
    overlayStyle?: React.CSSProperties;
    overlayClassName?: string;
    title?: string | React.ReactNode;
    visible?: boolean;
    onVisibleChange?: ((open: boolean) => void) | undefined;
    getPopupContainer?: ((node: HTMLElement) => HTMLElement) | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export default Popover;
