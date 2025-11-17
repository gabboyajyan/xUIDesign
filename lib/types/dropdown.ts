import { CSSProperties, ReactNode } from "react";
import { DefaultProps } from ".";

export type TriggerType = 'click' | 'hover' | 'contextMenu' | Array<TriggerType>;

export type Placement =
    | 'bottomLeft'
    | 'bottom'
    | 'bottomRight'
    | 'topLeft'
    | 'top'
    | 'topRight'
    | 'left'
    | 'right';

export interface DropdownItemType {
    key: string;
    label?: ReactNode;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    danger?: boolean;
}

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
    getPopupContainer?: () => HTMLElement;
    destroyOnHidden?: boolean;
    disabled?: boolean;
    arrow?: boolean;
    autoFocus?: boolean;
    autoAdjustOverflow?: boolean;
    popupRender?: (node: ReactNode) => ReactNode;
}


export type DropdownMenuInnerProps = DefaultProps & {
    items: DropdownItemType[];
    menuRef: React.RefObject<HTMLUListElement | null>;
    onClose: () => void;
}