import React, { CSSProperties } from 'react';
import './style.css';
declare const Dropdown: React.ForwardRefExoticComponent<import("../..").DefaultProps & {
    children: React.ReactNode;
    menu?: {
        items: import("../../types/dropdown").DropdownItemType[];
    };
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: import("../../types/dropdown").TriggerType;
    placement?: import("../..").Placement;
    overlayClassName?: string;
    overlayStyle?: CSSProperties;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    destroyOnHidden?: boolean;
    disabled?: boolean;
    arrow?: boolean;
    autoFocus?: boolean;
    autoAdjustOverflow?: boolean;
    popupRender?: (node: React.ReactNode) => React.ReactNode;
    overlay?: React.ReactElement | (() => React.ReactElement);
} & React.RefAttributes<HTMLDivElement>>;
export default Dropdown;
