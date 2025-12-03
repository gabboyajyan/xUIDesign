import { CSSProperties, RefObject } from "react";
import { Placement } from "../types";
type TPopupPosition = {
    targetRef: RefObject<HTMLDivElement | null>;
    popupRef: RefObject<HTMLDivElement | null>;
    placement: Placement;
    open: boolean;
    inBody: boolean;
};
export declare const usePopupPosition: ({ open, inBody, popupRef, targetRef, placement }: TPopupPosition) => {
    popupStyle: CSSProperties;
};
export {};
