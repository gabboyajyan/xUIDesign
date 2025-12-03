import { CSSProperties, RefObject, useCallback, useEffect, useRef, useState } from "react"
import { Placement } from "../types"
import { getScrollParent } from "../helpers"

const OFFSET = 12;

type TPopupPosition = {
    targetRef: RefObject<HTMLDivElement | null>,
    popupRef: RefObject<HTMLDivElement | null>,
    placement: Placement,
    open: boolean,
    inBody: boolean;
}

export const usePopupPosition = ({
    open,
    inBody,
    popupRef,
    targetRef,
    placement
}: TPopupPosition): {
    popupStyle: CSSProperties
} => {
    const [popupPosition, setPopupPosition] = useState<CSSProperties>({});
    const rafRef = useRef<number | null>(null);

    const calculatePosition = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
            const scrollableParents = getScrollParent(targetRef.current, true);
            const container = targetRef.current?.getBoundingClientRect();

            if (!container) {
                return;
            }

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
        });
    }, [targetRef, popupRef, placement, inBody]);

    useEffect(() => {
        if (!open) {
            return;
        }

        calculatePosition();

        const controller = new AbortController();
        const scrollableParents = getScrollParent(targetRef.current, true);

        const options = { passive: true, signal: controller.signal };

        scrollableParents?.addEventListener("scroll", calculatePosition, options);

        window.addEventListener("scroll", calculatePosition, options);
        window.addEventListener("resize", calculatePosition, { signal: controller.signal });

        return () => {
            controller.abort();

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [open, targetRef, calculatePosition]);

    return {
        popupStyle: {
            zIndex: 10000,
            position: "absolute",
            opacity: Object.keys(popupPosition).length ? 1 : 0,
            ...popupPosition
        }
    };
};
