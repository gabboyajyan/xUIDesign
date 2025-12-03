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
    placement?: Placement;
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
    _placement: Placement;
    popupStyle: CSSProperties
} => {
    const [_placement, _setPlacement] = useState<Placement>(placement ?? "bottomLeft");
    const [popupPosition, setPopupPosition] = useState<CSSProperties>({});

    const calculatePosition = useCallback((e?: Event) => {
        const container = targetRef.current?.getBoundingClientRect();

        if (!container) {
            return;
        }

        const scrollableParents = getScrollParent(targetRef.current, true);
        const scrollSameTarget = e?.target === scrollableParents;

        if (!inBody) {
            const hidePopupFromTop = Math.round((targetRef.current?.offsetTop || 0) - (scrollableParents?.scrollTop || 0) + container?.height);
            const hidePopupFromBottom = Math.round((targetRef.current?.offsetTop || 0) - (scrollableParents?.offsetHeight || 0) - (scrollableParents?.scrollTop || 0) + container?.height)
            const spaceAboveFromTop = hidePopupFromTop - Math.round((popupRef.current?.clientHeight || 0) + container?.height + OFFSET);
            const spaceAboveFromBottom = -Math.round((popupRef.current?.clientHeight || 0) + container?.height - OFFSET);

            if (spaceAboveFromBottom <= hidePopupFromBottom) {
                _setPlacement(_placement.replace('bottom', 'top') as Placement)
            }

            if (spaceAboveFromTop <= 0) {
                _setPlacement(_placement.replace('top', 'bottom') as Placement)
            }
        }

        if (scrollSameTarget && inBody) {
            setOpen(false);
            setPopupPosition({});

            return
        }

        const _calculation = () => {
            const _placementBottom = !_placement.includes('bottom') ? 0 : (inBody
                ? (targetRef.current?.offsetTop || 0) + (targetRef.current?.clientHeight || 0) - (scrollableParents?.scrollTop || 0) + (scrollableParents?.offsetTop || 0)
                : (targetRef.current?.offsetTop || 0) + (targetRef.current?.clientHeight || 0)) + OFFSET;

            const _placementTop = !_placement.includes('top') ? 0 : (inBody
                ? (targetRef.current?.offsetTop || 0) - (popupRef.current?.clientHeight || 0) - (scrollableParents?.scrollTop || 0) + (scrollableParents?.offsetTop || 0)
                : (targetRef.current?.offsetTop || 0) - (popupRef.current?.clientHeight || 0)) - OFFSET;

            const _positionLeft = inBody ? container.left : (targetRef.current?.offsetLeft || 0)

            switch (_placement) {
                case "bottom":
                    setPopupPosition({ top: _placementBottom, left: _positionLeft + ((container.width || 0) / 2) - ((popupRef.current?.offsetWidth || 0) / 2) });
                    break;
                case "bottomLeft":
                    setPopupPosition({ top: _placementBottom, left: _positionLeft });
                    break;
                case "bottomRight":
                    setPopupPosition({ top: _placementBottom, left: _positionLeft + (container.width || 0) - (popupRef.current?.offsetWidth || 0) });
                    break;
                case "top":
                    setPopupPosition({ top: _placementTop, left: _positionLeft + ((container.width || 0) / 2) - ((popupRef.current?.offsetWidth || 0) / 2) });
                    break;
                case "topLeft":
                    setPopupPosition({ top: _placementTop, left: _positionLeft });
                    break;
                case "topRight":
                    setPopupPosition({ top: _placementTop, left: _positionLeft + (container.width || 0) - (popupRef.current?.offsetWidth || 0) });
                    break;
            }
        }

        _calculation()
    }, [targetRef, popupRef, inBody, _placement, setOpen]);

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
        _placement,
        popupStyle: {
            zIndex: 10000,
            position: "absolute",
            opacity: Object.keys(popupPosition).length ? 1 : 0,
            ...popupPosition
        }
    };
};
