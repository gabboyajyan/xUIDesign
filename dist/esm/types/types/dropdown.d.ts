import { CSSProperties, MouseEvent, ReactElement, ReactNode, RefObject } from "react";
import { DefaultProps, Placement, TriggerType } from ".";
export interface DropdownItemType {
    key: string;
    label?: ReactNode;
    disabled?: boolean;
    onClick?: (e: MouseEvent) => void;
    danger?: boolean;
}
declare type OverlayFunc = () => ReactElement;
export type DropdownProps = DefaultProps & {
    children: ReactNode;
    menu?: {
        items: DropdownItemType[];
    };
    open?: boolean;
    defaultOpen?: boolean;
    onVisibleChange?: ((open: boolean) => void) | undefined;
    trigger?: TriggerType;
    placement?: Placement;
    overlayClassName?: string;
    overlayStyle?: CSSProperties;
    getPopupContainer?: ((node: HTMLElement) => HTMLElement) | undefined;
    destroyOnHidden?: boolean;
    disabled?: boolean;
    arrow?: boolean;
    autoFocus?: boolean;
    autoAdjustOverflow?: boolean;
    popupRender?: (node: ReactNode) => ReactNode;
    overlay?: ReactElement | OverlayFunc;
    showInnerContent?: boolean;
};
export type DropdownMenuInnerProps = DefaultProps & {
    items: DropdownItemType[];
    menuRef: RefObject<HTMLUListElement | null>;
    onClose: () => void;
};
export {};
