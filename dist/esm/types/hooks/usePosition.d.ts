import { Placement } from "../types";
import { CSSProperties, RefObject } from "react";
type TPosition = {
    isOpen: boolean;
    popupRef: RefObject<HTMLDivElement | null>;
    triggerRef: RefObject<HTMLDivElement | null>;
    getPopupContainer?: HTMLElement | ParentNode;
    placement?: Placement;
    offset?: number;
    listenPopoverPossitions?: CSSProperties;
};
export declare const usePosition: ({ isOpen, offset, popupRef, placement, triggerRef, listenPopoverPossitions, getPopupContainer, }: TPosition) => {
    showPlacement: string;
    dropdownPosition: CSSProperties;
};
export {};
