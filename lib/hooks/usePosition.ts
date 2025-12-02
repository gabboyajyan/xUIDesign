import { Placement } from "../types";
import {
    CSSProperties,
    RefObject,
    useCallback,
    useEffect,
    useState
} from "react";

type TPosition = {
    isOpen: boolean;
    popupRef: RefObject<HTMLDivElement | null>;
    triggerRef: RefObject<HTMLDivElement | null>;
    getPopupContainer?: HTMLElement;
    placement?: Placement;
    offset?: number;
    placementPositionOffset?: number;
    listenPopoverPositions?: CSSProperties;
    prefixCls?: string;
};

function getScrollParent(
    el: HTMLElement | null,
    includeSelf = false
): HTMLElement | null {
    if (!el) return null;

    let current: HTMLElement | null = includeSelf ? el : el.parentElement;

    while (current) {
        const style = getComputedStyle(current);

        const overflowY = style.overflowY;
        const overflowX = style.overflowX;

        const canScroll =
            overflowY === 'auto' ||
            overflowY === 'scroll' ||
            overflowX === 'auto' ||
            overflowX === 'scroll';

        if (canScroll) {
            return current;
        }

        current = current.parentElement;
    }

    return document.scrollingElement as HTMLElement;
}

export const usePosition = ({
    isOpen,
    offset = 4,
    popupRef,
    placement,
    triggerRef,
    listenPopoverPositions,
    getPopupContainer,
    placementPositionOffset = 1,
    prefixCls = ''
}: TPosition): {
    showPlacement: string;
    dropdownPosition: CSSProperties
} => {
    const [showPlacement, setShowPlacement] = useState('');
    const [_dropdownPosition, setDropdownPosition] = useState<CSSProperties>({});

    const dropdownPosition = useCallback(() => {
        if (!triggerRef.current) {
            return {};
        }

        const inputRect = triggerRef.current?.getBoundingClientRect();
        const dropdownHeight = popupRef.current?.offsetHeight || (popupRef.current?.offsetHeight || 0);
        const containerRect = (getPopupContainer || getScrollParent(triggerRef.current, true) || document.body).getBoundingClientRect();

        const spaceAbove = inputRect.top - containerRect.top;
        const spaceBelow = containerRect.bottom - inputRect.bottom;

        const _shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;
        const hasLeft = placement?.toLowerCase()?.includes('left');
        const hasRight = placement?.toLowerCase()?.includes('right');

        const isLeft = placement === 'left';
        const isRight = placement === 'right';
        const isBottom = placement === 'bottom';
        const isTop = placement === 'top';

        setShowPlacement(`${prefixCls}-${_shouldShowAbove ? 'top' : 'bottom'}${hasRight ? 'Right' : hasLeft ? 'Left' : ''}${isBottom || isTop ? 'Left' : 'Right'} ${placement}`)

        if (getPopupContainer) {
            const leftPosition = hasRight
                ? isRight 
                    ? (inputRect.left || 0) + (triggerRef.current?.offsetWidth || 0) + offset 
                    : (inputRect.left || 0) + (triggerRef.current?.offsetWidth || 0) - (popupRef.current?.offsetWidth || 0)
                : isLeft
                    ? (inputRect.left || 0) + document.documentElement.scrollLeft - (popupRef.current?.offsetWidth || 0) - offset
                    : (inputRect.left || 0) + document.documentElement.scrollLeft

            const _top = isRight || isLeft
                ? triggerRef.current.offsetTop - triggerRef.current.offsetHeight
                : (inputRect.top || 0) + document.documentElement.scrollTop;

            setDropdownPosition({
                top: _shouldShowAbove
                    ? _top - (popupRef.current?.offsetHeight || 0) + 4 - (offset !== 4 ? offset * 2 : 0)
                    : _top + (triggerRef.current?.offsetHeight || 0) + offset,
                left: leftPosition
            })
        } else {
            if (isLeft) {
                setDropdownPosition({
                    top: triggerRef.current.offsetTop,
                    left: triggerRef.current.offsetLeft - (popupRef.current?.offsetWidth || 0) - offset
                })
            } else if (isRight) {
                setDropdownPosition({
                    top: triggerRef.current.offsetTop,
                    left: triggerRef.current.offsetLeft + (triggerRef.current?.offsetWidth || 0) + offset
                })
            } else {
                setDropdownPosition({
                    top:
                        (_shouldShowAbove
                            ? triggerRef.current.offsetTop -
                            (popupRef.current?.offsetHeight || dropdownHeight) - offset * 2
                            : triggerRef.current.offsetTop + triggerRef.current?.offsetHeight) + offset,
                    ...(hasRight ? {
                        left: triggerRef.current.offsetLeft + (triggerRef.current?.offsetWidth || 0) - (popupRef.current?.offsetWidth || 0) / placementPositionOffset,
                    } : {
                        left: triggerRef.current.offsetLeft
                    })
                });
            }

        }
    }, [
        offset,
        popupRef,
        prefixCls,
        placement,
        triggerRef,
        getPopupContainer,
        placementPositionOffset
    ]);

    useEffect(() => {
        if (!isOpen) return;

        const _dropdownPosition = () => dropdownPosition();

        _dropdownPosition();

        const controller = new AbortController();

        const scrollableParents = getScrollParent(triggerRef.current, true);

        scrollableParents?.addEventListener('scroll', _dropdownPosition, {
            passive: true,
            signal: controller.signal
        });

        window.addEventListener('scroll', _dropdownPosition, {
            passive: true,
            signal: controller.signal
        });

        window.addEventListener('resize', _dropdownPosition, {
            signal: controller.signal
        });

        return () => {
            controller.abort();
        };
    }, [
        isOpen,
        listenPopoverPositions,
        triggerRef,
        getPopupContainer,
        dropdownPosition
    ]);

    return {
        showPlacement,
        dropdownPosition: {
            ..._dropdownPosition,
            opacity: Object.keys(_dropdownPosition).length ? 1 : 0
        }
    }
}