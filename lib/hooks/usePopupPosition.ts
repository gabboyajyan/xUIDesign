import {
    CSSProperties,
    Dispatch,
    RefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useState
} from "react";
import { Placement } from "../types";
import { getScrollParent } from "../helpers";

const OFFSET = 12;

type TPopupPosition = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    targetRef: RefObject<HTMLDivElement | null>;
    popupRef: RefObject<HTMLDivElement | null>;
    placement: Placement;
    inBody: boolean;
}

export const usePopupPosition = ({
    open,
    setOpen,
    inBody,
    popupRef,
    targetRef,
    placement
}: TPopupPosition): {
    popupStyle: CSSProperties
} => {
    const [popupPosition, setPopupPosition] = useState<CSSProperties>({});

    const calculatePosition = useCallback((e?: Event) => {
        const container = targetRef.current?.getBoundingClientRect();

        if (!container) {
            return;
        }

        const scrollableParents = getScrollParent(targetRef.current, true);
        const scrollSameTarget = e?.target === scrollableParents;

        if (scrollSameTarget) {
            // console.log(container.top);
        }

        const _calculation = () => {
            const _bottomCollectionTop = !placement.includes('bottom') ? 0 : (inBody
                ? (targetRef.current?.offsetTop || 0) + (targetRef.current?.clientHeight || 0) - (scrollableParents?.scrollTop || 0) + (scrollableParents?.offsetTop || 0)
                : (targetRef.current?.offsetTop || 0) + (targetRef.current?.clientHeight || 0)) + OFFSET;

            const _topCollectionTop = !placement.includes('top') ? 0 : (inBody
                ? (targetRef.current?.offsetTop || 0) - (popupRef.current?.clientHeight || 0) - (scrollableParents?.scrollTop || 0) + (scrollableParents?.offsetTop || 0)
                : (targetRef.current?.offsetTop || 0) - (popupRef.current?.clientHeight || 0)) - OFFSET;

            switch (placement) {
                case "bottom":
                    setPopupPosition({
                        top: _bottomCollectionTop,
                        left: (targetRef.current?.offsetLeft || 0) + ((container.width || 0) / 2) - ((popupRef.current?.offsetWidth || 0) / 2)
                    });
                    break;
                case "bottomLeft":
                    setPopupPosition({
                        top: _bottomCollectionTop,
                        left: (targetRef.current?.offsetLeft || 0)
                    });
                    break;
                case "bottomRight":
                    setPopupPosition({
                        top: _bottomCollectionTop,
                        left: (targetRef.current?.offsetLeft || 0) + (container.width || 0) - (popupRef.current?.offsetWidth || 0)
                    });
                    break;
                case "top":
                    setPopupPosition({
                        top: _topCollectionTop,
                        left: (targetRef.current?.offsetLeft || 0) + ((container.width || 0) / 2) - ((popupRef.current?.offsetWidth || 0) / 2)
                    });
                    break;
                case "topLeft":
                    setPopupPosition({
                        top: _topCollectionTop,
                        left: (targetRef.current?.offsetLeft || 0)
                    });
                    break;
                case "topRight":
                    setPopupPosition({
                        top: _topCollectionTop,
                        left: (targetRef.current?.offsetLeft || 0) + (container.width || 0) - (popupRef.current?.offsetWidth || 0)
                    });
                    break;
            }
        }

        const spaceAboveFromTop = Math.round(container?.top + container?.height) <= 0 || Math.round((targetRef.current?.offsetTop || 0) - (scrollableParents?.scrollTop || 0) + container?.height) <= 0;
        const spaceAboveFromBottom = Math.round((targetRef.current?.offsetTop || 0) - (scrollableParents?.offsetHeight || 0) - (scrollableParents?.scrollTop || 0) + container?.height) >= 0

        if (spaceAboveFromTop || spaceAboveFromBottom) {
            setOpen(false);
            setPopupPosition({});

            return
        }

        _calculation()
    }, [targetRef, popupRef, placement, inBody, setOpen]);

    useEffect(() => {
        if (!open) {
            return;
        }

        calculatePosition(undefined);

        const controller = new AbortController();

        const options = { passive: true, signal: controller.signal };

        const scrollableParents = getScrollParent(targetRef.current, true);
        scrollableParents?.addEventListener("scroll", calculatePosition, options);

        document.body.addEventListener("scroll", calculatePosition, options);
        document.body.addEventListener("resize", calculatePosition, options);

        return () => {
            controller.abort();
        };
    }, [inBody, open, targetRef, calculatePosition]);

    return {
        popupStyle: {
            zIndex: 10000,
            position: "absolute",
            opacity: Object.keys(popupPosition).length ? 1 : 0,
            ...popupPosition
        }
    };
};
