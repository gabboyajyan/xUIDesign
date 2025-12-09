import { CSSProperties, ReactNode } from "react";
import { DefaultProps, TriggerType } from ".";

export type PopoverProps = DefaultProps & {
    content: ReactNode;
    children: ReactNode;
    trigger?: TriggerType;
    placement?: "top" | "bottom" | "left" | "right" | "topRight" | "bottomRight" | "topLeft" | "bottomLeft";
    open?: boolean;
    overlayStyle?: CSSProperties;
    overlayClassName?: string;
    title?: string | ReactNode;
    visible?: boolean;
    listenPopoverPositions?: CSSProperties;
    placementPositionOffset?: number;
    showInnerContent?: boolean;
    onVisibleChange?: ((open: boolean) => void) | undefined;
    getPopupContainer?: ((node: HTMLElement) => HTMLElement) | undefined
}