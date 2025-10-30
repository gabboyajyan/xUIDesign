import { CSSProperties, RefObject } from "react";
type TPossition = {
    isOpen: boolean;
    popupHeight: number;
    popupRef: RefObject<HTMLDivElement | null>;
    containerRef: RefObject<HTMLDivElement | null>;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
};
export declare const usePossition: ({ isOpen, popupRef, popupHeight, containerRef, getPopupContainer }: TPossition) => {
    dropdownPosition: CSSProperties;
};
export {};
