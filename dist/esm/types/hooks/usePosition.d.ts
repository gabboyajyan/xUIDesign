import { Placement } from "../types";
import { CSSProperties, RefObject } from "react";
type TPosition = {
    isOpen: boolean;
    popupRef: RefObject<HTMLDivElement | null>;
    triggerRef: RefObject<HTMLDivElement | null>;
    getPopupContainer?: HTMLElement;
    placement?: Placement;
    addTop?: number;
};
export declare const usePosition: ({ isOpen, addTop, popupRef, placement, triggerRef, getPopupContainer }: TPosition) => {
    shouldShowAbove: boolean;
    dropdownPosition: CSSProperties;
};
export {};
