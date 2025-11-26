import { Placement } from "../types";
import { CSSProperties, ReactNode, RefObject } from "react";
type TPosition = {
    isOpen: boolean;
    popupRef: RefObject<HTMLDivElement | null>;
    triggerRef: RefObject<HTMLDivElement | null>;
    getPopupContainer?: HTMLElement;
    placement?: Placement;
    offset?: number;
    children?: ReactNode;
};
export declare const usePosition: ({ isOpen, offset, popupRef, placement, triggerRef, children, getPopupContainer, }: TPosition) => {
    showPlacement: string;
    dropdownPosition: CSSProperties;
};
export {};
