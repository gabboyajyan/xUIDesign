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
const LEFT_OR_RIGHT = ['left', 'right'];

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
                        top: container.top + window.scrollY + OFFSET,
                        left: container.left + window.scrollX
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
            const onlyLeftOrRight = LEFT_OR_RIGHT.includes(newPlacement);

            if (availableSpace.bottom < 0 && availableSpace.top > 0) {
                newPlacement = newPlacement.replace('bottom', 'top') as Placement;
            } else if (availableSpace.top < 0 && availableSpace.bottom > 0) {
                newPlacement = newPlacement.replace('top', 'bottom') as Placement;
            }

            if (onlyLeftOrRight) {
                if (availableSpace.left < 0) {
                    newPlacement = newPlacement.replace('left', 'right') as Placement;
                } else if (availableSpace.right < 0) {
                    newPlacement = newPlacement.replace('right', 'left') as Placement;
                }
            } else {
                if (availableSpace.left < 0 && availableSpace.right > 0 && availableSpace.right > popupRect.width) {
                    newPlacement = newPlacement.replace('Right', 'Left') as Placement;
                } else if (availableSpace.right < 0 && availableSpace.left > 0 && availableSpace.left > popupRect.width) {
                    newPlacement = newPlacement.replace('Left', 'Right') as Placement;
                }
            }

            if (availableSpace.right < 0 && availableSpace.left < 0) {
                if (newPlacement.includes('Left') || newPlacement.includes('Right')) {
                    const popupWidth = popupRect.width;
                    const targetWidth = container.width;
    
                    if (!popupContainer || _containsElement) {
                        positions.left = positions.left - (popupWidth / 2) + (targetWidth / 2);
                    } else if (inBody) {
                        positions.left = container.left + window.scrollX + (targetWidth / 2) - (popupWidth / 2);
                    }
    
                    if (newPlacement.includes('Left')) {
                        newPlacement = newPlacement.replace('Left', '') as Placement;
                    } else if (newPlacement.includes('Right')) {
                        newPlacement = newPlacement.replace('Right', '') as Placement;
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
                case "left":
                    setPopupPosition({
                        top: positions.top - OFFSET,
                        left: positions.left - (popupRef.current?.offsetWidth || 0) - OFFSET
                    });
                    break
                case "right":
                    setPopupPosition({
                        top: positions.top - OFFSET,
                        left: positions.left + container.width + OFFSET
                    });
                    break
            }
        }

        _calculation()
    }, [targetRef, popupContainer, popupRef, inBody, _placement, setOpen]);

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
