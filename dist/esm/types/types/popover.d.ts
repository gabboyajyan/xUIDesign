export interface PopoverProps {
    prefixCls?: string;
    content: React.ReactNode;
    children: React.ReactNode;
    trigger?: "click" | "hover";
    placement?: "top" | "bottom" | "left" | "right" | "topRight" | "bottomRight" | "topLeft" | "bottomLeft";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    getPopupContainer?: ((node: HTMLElement) => HTMLElement) | undefined;
}
