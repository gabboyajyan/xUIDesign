import { CSSProperties, Dispatch, RefObject, SetStateAction } from "react";
import { Placement } from "../types";
type TPopupPosition = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    targetRef: RefObject<HTMLDivElement | null>;
    popupRef: RefObject<HTMLDivElement | null>;
    placement?: Placement;
    popupContainer?: HTMLElement | null;
    useTargetWidth?: boolean;
    listenPopoverPossitions?: CSSProperties;
};
export declare const usePopupPosition: ({ open, setOpen, popupRef, targetRef, placement, popupContainer, useTargetWidth, listenPopoverPossitions }: TPopupPosition) => {
    _placement: Placement;
    popupStyle: CSSProperties;
};
export {};
