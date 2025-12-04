import {
    CSSProperties,
    Dispatch,
    RefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { Placement } from "../types";
import { getElementParentDetails } from "../helpers";

const OFFSET = 12;

type TPopupPosition = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    targetRef: RefObject<HTMLDivElement | null>;
    popupRef: RefObject<HTMLDivElement | null>;
    placement?: Placement;
    popupContainer?: HTMLElement | null;
}

export const usePopupPosition = ({
    open,
    setOpen,
    popupRef,
    targetRef,
    placement,
    popupContainer,
}: TPopupPosition): {
    _placement: Placement;
    popupStyle: CSSProperties
} => {
    const [_placement, _setPlacement] = useState<Placement>(placement ?? "bottomLeft");
    const [popupPosition, setPopupPosition] = useState<CSSProperties>({});

    const inBody = useMemo(() => popupContainer?.tagName === 'BODY', [popupContainer]);

    const calculatePosition = useCallback((e?: Event) => {
        const container = targetRef.current?.getBoundingClientRect();

        if (!container) {
            return;
        }

        const { scrollableParents, relativePosition } = getElementParentDetails(targetRef.current, true);
        const _containsElement = scrollableParents?.contains(popupContainer as HTMLDivElement) && popupContainer !== scrollableParents

        const positions = !popupContainer
            ? {
                top: (targetRef.current?.offsetTop || 0) + OFFSET,
                left: (targetRef.current?.offsetLeft || 0)
            }
            : _containsElement
                ? {
                    top: (targetRef.current?.clientLeft || 0) + (targetRef.current?.offsetTop || 0) + OFFSET,
                    left: (targetRef.current?.clientLeft || 0) + (targetRef.current?.offsetLeft || 0)
                }
                : inBody
                    ? {
                        top: container.top,
                        left: container.left - (targetRef.current?.clientWidth || 0) / 2
                    }
                    : {
                        top: (relativePosition.top || 0) + (targetRef.current?.offsetTop || 0) - (scrollableParents?.offsetTop || 0) + OFFSET,
                        left: relativePosition.left + (targetRef.current?.offsetLeft || 0) - (targetRef.current?.clientWidth || 0) / 2
                    };

        if (!inBody) {
            const hasNotSpaceFromBottom = relativePosition.top - ((scrollableParents?.scrollHeight || 0) - (scrollableParents?.scrollTop || 0) - (popupRef.current?.clientHeight || 0)) - OFFSET
            const hasNotSpaceFromTop = (relativePosition.top + (popupRef.current?.clientHeight || 0) - container.height - (OFFSET * 2)) - (scrollableParents?.scrollTop || 0)

            if (hasNotSpaceFromBottom < 0) {
                _setPlacement(_placement.replace('bottom', 'top') as Placement)
            }

            if (hasNotSpaceFromTop <= 0) {
                _setPlacement(_placement.replace('top', 'bottom') as Placement)
            }
        }

        if (e?.target === scrollableParents && inBody) {
            setOpen(false);
            setPopupPosition({});

            return
        }

        const _calculation = () => {
            switch (_placement) {
                case "bottom":
                    setPopupPosition({
                        top: positions.top + container.height,
                        left: positions.left + ((container.width || 0) / 2) - ((popupRef.current?.offsetWidth || 0) / 2)
                    });
                    break;
                case "bottomLeft":
                    setPopupPosition({
                        top: positions.top + container.height, 
                        left: positions.left 
                    });
                    break;
                case "bottomRight":
                    setPopupPosition({ 
                        top: positions.top + container.height, 
                        left: positions.left + (container.width || 0) - (popupRef.current?.offsetWidth || 0) 
                    });
                    break;
                case "top":
                    setPopupPosition({
                        top: positions.top - (popupRef.current?.clientHeight || 0) - (OFFSET * 2),
                        left: positions.left + ((container.width || 0) / 2) - ((popupRef.current?.offsetWidth || 0) / 2)
                    });
                    break;
                case "topLeft":
                    setPopupPosition({
                        top: positions.top - (popupRef.current?.clientHeight || 0) - (OFFSET * 2), 
                        left: positions.left 
                    });
                    break;
                case "topRight":
                    setPopupPosition({ 
                        top: positions.top - (popupRef.current?.clientHeight || 0) - (OFFSET * 2), 
                        left: positions.left + (container.width || 0) - (popupRef.current?.offsetWidth || 0) 
                    });
                    break;
            }
        }

        _calculation()
    }, [targetRef, popupRef, popupContainer, inBody, _placement, setOpen]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const setPositionRelative = (position: string) => {
            (scrollableParents as HTMLDivElement).style.position = position;

            if (popupContainer) {
                (popupContainer as HTMLDivElement).style.position = position;
            }
        }

        const controller = new AbortController();
        const options = { passive: true, signal: controller.signal };

        const { scrollableParents } = getElementParentDetails(targetRef.current, true);
        scrollableParents?.addEventListener("scroll", calculatePosition, options);

        setPositionRelative('relative');

        calculatePosition();

        document.body.addEventListener("scroll", calculatePosition, options);
        document.body.addEventListener("resize", calculatePosition, options);

        return () => {
            controller.abort();
            setPositionRelative('unset');
        };
    }, [open, targetRef, popupContainer, inBody, calculatePosition]);

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
