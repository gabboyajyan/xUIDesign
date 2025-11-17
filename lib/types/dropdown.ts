import { CSSProperties, MouseEvent, ReactElement, ReactNode, RefObject } from "react";
import { DefaultProps, Placement } from ".";

export type TriggerType = 'click' | 'hover' | 'contextMenu' | Array<TriggerType>;

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
    menu?: { items: DropdownItemType[] };
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: TriggerType;
    placement?: Placement;
    overlayClassName?: string;
    overlayStyle?: CSSProperties;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    destroyOnHidden?: boolean;
    disabled?: boolean;
    arrow?: boolean;
    autoFocus?: boolean;
    autoAdjustOverflow?: boolean;
    popupRender?: (node: ReactNode) => ReactNode;
    overlay?: ReactElement | OverlayFunc;
    onVisibleChange?: ((open: boolean) => void) | undefined;
}


export type DropdownMenuInnerProps = DefaultProps & {
    items: DropdownItemType[];
    menuRef: RefObject<HTMLUListElement | null>;
    onClose: () => void;
}