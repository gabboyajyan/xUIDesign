import {
    CSSProperties,
    RefObject,
    useCallback,
    useEffect,
    useState
} from "react";

type TPossition = {
    isOpen: boolean;
    popupRef: RefObject<HTMLDivElement | null>;
    containerRef: RefObject<HTMLDivElement | null>;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
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

export const usePossition = ({
    isOpen,
    popupRef,
    placement,
    containerRef,
    getPopupContainer
}: TPossition): {
    dropdownPosition: CSSProperties
} => {
    const [dropdownPosition, setDropdownPosition] = useState<CSSProperties>({});

    const dropdownPossition = useCallback(() => {
        if (!containerRef.current) return {};

        const inputRect = containerRef.current.getBoundingClientRect();
        const dropdownHeight = popupRef.current?.offsetHeight || (popupRef.current?.offsetHeight || 0);

        const popupContainer = getPopupContainer
            ? getPopupContainer(document.body)
            : getScrollParent(containerRef.current, true) || document.body;

        const containerRect = popupContainer.getBoundingClientRect();

        const spaceAbove = inputRect.top - containerRect.top;
        const spaceBelow = containerRect.bottom - inputRect.bottom;

        const shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;
        const hasRight = placement?.includes('Right');

        if (getPopupContainer) {
            const leftPossition = hasRight
                ? (containerRef.current?.getBoundingClientRect().left || 0) + (containerRef.current?.offsetWidth || 0) - (popupRef.current?.offsetWidth || 0)
                : (containerRef.current?.getBoundingClientRect().left || 0) + document.documentElement.scrollLeft

            if (shouldShowAbove) {
                setDropdownPosition({
                    top: (containerRef.current?.getBoundingClientRect().top || 0) + document.documentElement.scrollTop - (popupRef.current?.offsetHeight || 0) + 4,
                    left: leftPossition
                })
            } else {
                setDropdownPosition({
                    top: (containerRef.current?.getBoundingClientRect().top || 0) + document.documentElement.scrollTop + (containerRef.current?.offsetHeight || 0) + 4,
                    left: leftPossition
                })
            }
        } else {
            setDropdownPosition({
                top:
                    (shouldShowAbove
                        ? containerRef.current.offsetTop -
                        (popupRef.current?.offsetHeight || dropdownHeight) - 8
                        : containerRef.current.offsetTop + containerRef.current?.offsetHeight) + 4,
                ...(hasRight ? {
                    left: containerRef.current.offsetLeft + (containerRef.current?.offsetWidth || 0) - (popupRef.current?.offsetWidth || 0),
                } : {
                    left: containerRef.current.offsetLeft
                })
            });
        }
    }, [
        popupRef,
        placement,
        containerRef,
        getPopupContainer
    ]);

    useEffect(() => {
        if (!isOpen) return;

        const _dropdownPossition = () => dropdownPossition();

        _dropdownPossition();

        const controller = new AbortController();

        const scrollableParents = getScrollParent(containerRef.current, true);

        scrollableParents?.addEventListener('scroll', _dropdownPossition, {
            passive: true,
            signal: controller.signal
        });

        window.addEventListener('scroll', _dropdownPossition, {
            passive: true,
            signal: controller.signal
        });

        window.addEventListener('resize', _dropdownPossition, {
            signal: controller.signal
        });

        return () => {
            controller.abort();
        };
    }, [
        isOpen,
        containerRef,
        getPopupContainer,
        dropdownPossition
    ]);

    return {
        dropdownPosition
    }
}