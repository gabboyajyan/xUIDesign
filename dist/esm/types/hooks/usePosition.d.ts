import { Placement } from "../types";
import { CSSProperties, RefObject } from "react";
type TPosition = {
    isOpen: boolean;
    popupRef: RefObject<HTMLDivElement | null>;
    triggerRef: RefObject<HTMLDivElement | null>;
    getPopupContainer?: HTMLElement;
    placement?: Placement;
    offset?: number;
    placementPositionOffset?: number;
    listenPopoverPositions?: CSSProperties;
};
export declare const usePosition: ({ isOpen, offset, popupRef, placement, triggerRef, listenPopoverPositions, getPopupContainer, placementPositionOffset }: TPosition) => {
    showPlacement: string;
    dropdownPosition: CSSProperties;
};
export {};
