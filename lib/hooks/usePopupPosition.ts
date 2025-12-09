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

const OFFSET = 11;

type TPopupPosition = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    targetRef: RefObject<HTMLDivElement | null>;
    popupRef: RefObject<HTMLDivElement | null>;
    placement?: Placement;
    popupContainer?: HTMLElement | null;
    showInnerContent?: boolean;
}

export const usePopupPosition = ({
    open,
    setOpen,
    popupRef,
    targetRef,
    placement,
    popupContainer,
    showInnerContent
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
        const _containsElement = scrollableParents?.contains(popupContainer as HTMLDivElement) && popupContainer !== scrollableParents && !inBody

        const positions = !popupContainer
            ? {
                top: (targetRef.current?.offsetTop || 0) + OFFSET,
                left: (targetRef.current?.offsetLeft || 0)
            }
            : _containsElement
                ? {
                    top: (targetRef.current?.clientTop || 0) + (targetRef.current?.offsetTop || 0) + OFFSET,
                    left: (targetRef.current?.clientLeft || 0) + (targetRef.current?.offsetLeft || 0)
                }
                : inBody
                    ? {
                        top: container.top + OFFSET,
                        left: container.left
                    }
                    : {
                        top: (relativePosition.top || 0) + (targetRef.current?.offsetTop || 0) - (scrollableParents?.offsetTop || 0) + OFFSET,
                        left: relativePosition.left + (targetRef.current?.offsetLeft || 0) - (targetRef.current?.clientWidth || 0) / 2
                    };

        if (e?.target === scrollableParents && inBody) {
            setOpen(false);
            setPopupPosition({});

            return
        }

        const popupRect = popupRef.current?.getBoundingClientRect();

        if (popupRect) {
            if (!popupRect?.width) {
                setOpen(false);
                setPopupPosition({});

                const timeout = setTimeout(() => {
                    setOpen(true);

                    clearTimeout(timeout)
                }, 10);

                return
            }

            const availableSpace = {
                top: container.top - (popupRect.height + OFFSET),
                bottom: (inBody ? window.innerHeight : (scrollableParents?.clientHeight || 0)) - (container.bottom + popupRect.height + OFFSET),

                left: container.left - (popupRect.width + OFFSET),
                right: (inBody ? window.innerWidth : (scrollableParents?.clientWidth || 0)) - (((targetRef.current?.offsetLeft || 0) || container.right) + popupRect.width + OFFSET)
            };

            let newPlacement = _placement;

            if (availableSpace.bottom < 0 && availableSpace.top > 0) {
                newPlacement = newPlacement.replace('bottom', 'top') as Placement;
            } else if (availableSpace.top < 0 && availableSpace.bottom > 0) {
                newPlacement = newPlacement.replace('top', 'bottom') as Placement;
            }

            if (availableSpace.left < 0 && availableSpace.right > 0 && availableSpace.right > popupRect.width) {
                newPlacement = newPlacement.replace('Right', 'Left') as Placement;
            } else if (availableSpace.right < 0 && availableSpace.left > 0 && availableSpace.left > popupRect.width) {
                newPlacement = newPlacement.replace('Left', 'Right') as Placement;
            }

            if (showInnerContent) {
                if (availableSpace.right < 0 && availableSpace.left < 0) {
                    if (newPlacement.includes('Right')) {
                        positions.left = (popupRect.width - positions.left) + container.left
                    }

                    if (newPlacement.includes('Left')) {
                        positions.left = positions.left - popupRect.width + container.width
                    }
                }
            }

            _setPlacement(newPlacement);
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
    }, [targetRef, popupContainer, popupRef, showInnerContent, inBody, _placement, setOpen]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const controller = new AbortController();
        const options = { passive: true, signal: controller.signal };

        const { scrollableParents } = getElementParentDetails(targetRef.current, true);
        scrollableParents?.addEventListener("scroll", calculatePosition, options);

        calculatePosition();

        document.body.addEventListener("scroll", calculatePosition, options);
        document.body.addEventListener("resize", calculatePosition, options);

        return () => {
            controller.abort();

            setPopupPosition({});
        };
    }, [open, targetRef, calculatePosition]);

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
