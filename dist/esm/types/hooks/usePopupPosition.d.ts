import { CSSProperties, Dispatch, RefObject, SetStateAction } from "react";
import { Placement } from "../types";
type TPopupPosition = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    targetRef: RefObject<HTMLDivElement | null>;
    popupRef: RefObject<HTMLDivElement | null>;
    placement: Placement;
    inBody: boolean;
};
export declare const usePopupPosition: ({ open, setOpen, inBody, popupRef, targetRef, placement }: TPopupPosition) => {
    popupStyle: CSSProperties;
};
export {};
