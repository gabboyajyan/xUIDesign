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
    addTop?: number;
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
    addTop = 4,
    popupRef,
    placement,
    triggerRef,
    getPopupContainer
}: TPosition): {
    shouldShowAbove: boolean;
    dropdownPosition: CSSProperties
} => {
    const [shouldShowAbove, setShouldShowAbove] = useState(false);
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
        const hasRight = placement?.includes('Right');

        setShouldShowAbove(_shouldShowAbove);

        if (getPopupContainer) {
            const leftPosition = hasRight
                ? (inputRect.left || 0) + (triggerRef.current?.offsetWidth || 0) - (popupRef.current?.offsetWidth || 0)
                : (inputRect.left || 0) + document.documentElement.scrollLeft

            const _top = (inputRect.top || 0) + document.documentElement.scrollTop;

            if (_shouldShowAbove) {
                setDropdownPosition({
                    top: _top - (popupRef.current?.offsetHeight || 0) + 4 - (addTop !== 4 ? addTop * 2 : 0),
                    left: leftPosition
                })
            } else {
                setDropdownPosition({
                    top: _top + (triggerRef.current?.offsetHeight || 0) + 4,
                    left: leftPosition
                })
            }
        } else {
            setDropdownPosition({
                top:
                    (_shouldShowAbove
                        ? triggerRef.current.offsetTop -
                        (popupRef.current?.offsetHeight || dropdownHeight) - (addTop * 2)
                        : triggerRef.current.offsetTop + triggerRef.current?.offsetHeight) + addTop,
                ...(hasRight ? {
                    left: triggerRef.current.offsetLeft + (triggerRef.current?.offsetWidth || 0) - (popupRef.current?.offsetWidth || 0),
                } : {
                    left: triggerRef.current.offsetLeft
                })
            });
        }
    }, [
        addTop,
        popupRef,
        placement,
        triggerRef,
        getPopupContainer
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
        triggerRef,
        getPopupContainer,
        dropdownPosition
    ]);

    return {
        shouldShowAbove,
        dropdownPosition: _dropdownPosition
    }
}