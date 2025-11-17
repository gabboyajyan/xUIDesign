import { Placement } from "../types";
import { CSSProperties, RefObject } from "react";
type TPossition = {
    isOpen: boolean;
    popupRef: RefObject<HTMLDivElement | null>;
    containerRef: RefObject<HTMLDivElement | null>;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    placement?: Placement;
    addTop?: number;
};
export declare const usePossition: ({ isOpen, addTop, popupRef, placement, containerRef, getPopupContainer }: TPossition) => {
    shouldShowAbove: boolean;
    dropdownPosition: CSSProperties;
};
export {};
