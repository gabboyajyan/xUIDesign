import { Placement } from "../types";
import { CSSProperties, RefObject } from "react";
type TPosition = {
    isOpen: boolean;
    popupRef: RefObject<HTMLDivElement | null>;
    containerRef: RefObject<HTMLDivElement | null>;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    placement?: Placement;
    addTop?: number;
};
export declare const usePosition: ({ isOpen, addTop, popupRef, placement, containerRef, getPopupContainer }: TPosition) => {
    shouldShowAbove: boolean;
    dropdownPosition: CSSProperties;
};
export {};
