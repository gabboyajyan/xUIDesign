import { Placement } from "../types";
import { CSSProperties, RefObject } from "react";
type TPosition = {
    isOpen: boolean;
    popupRef: RefObject<HTMLDivElement | null>;
    triggerRef: RefObject<HTMLDivElement | null>;
    getPopupContainer?: HTMLElement;
    placement?: Placement;
    offset?: number;
};
export declare const usePosition: ({ isOpen, offset, popupRef, placement, triggerRef, getPopupContainer }: TPosition) => {
    shouldShowAbove: boolean;
    dropdownPosition: CSSProperties;
};
export {};
