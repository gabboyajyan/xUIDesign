import React, {
    useRef,
    useState,
    cloneElement,
    isValidElement,
    Children,
    useEffect,
    useMemo,
    useCallback,
    SyntheticEvent
} from "react";
import { clsx } from '../../helpers';
import { PopoverProps } from "../../types/popover";
import { ConditionalWrapper } from '../ConditionalWrapper';
import { createPortal } from 'react-dom';
import { prefixClsPopover, prefixClsPopupPosition } from "../../utils";
import { flattenChildren } from "../../helpers/flatten";
import { usePopupPosition } from "@/hooks/usePopupPosition";
import './style.css';

const Popover = ({
    prefixCls = prefixClsPopover,
    content,
    children,
    trigger = "click",
    placement = "bottomLeft",
    open,
    visible,
    title,
    style = {},
    overlayClassName = '',
    overlayStyle = {},
    onVisibleChange,
    getPopupContainer,
    listenPopoverPossitions
}: PopoverProps) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const [innerOpen, setInnerOpen] = useState(false);

    const isOpen = visible !== undefined ? visible : open !== undefined ? open : innerOpen;

    const { popupStyle, _placement } = usePopupPosition({
        targetRef,
        popupRef,
        placement,
        open: isOpen,
        setOpen: setInnerOpen,
        listenPopoverPossitions,
        popupContainer: getPopupContainer?.(targetRef.current as HTMLElement)
    });

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(e.target as Node) &&
                targetRef.current &&
                !targetRef.current.contains(e.target as Node)
            ) {
                setInnerOpen(false);
                onVisibleChange?.(false);
            }
        };

        
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);

            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    const triggers = Array.isArray(trigger) ? trigger : [trigger];

    const handleOnClick = useCallback((e: SyntheticEvent) => {
        const newState = !isOpen;

        if (triggers.includes('click')) {
            onVisibleChange?.(newState);
            setInnerOpen(newState);
        }

    }, [isOpen, triggers]);

    const handleOnMouseEnter = useCallback(() => {
        if (triggers.includes("hover")) {
            onVisibleChange?.(true);
            setInnerOpen(true);
        }
    }, [triggers]);

    const handleOnMouseLeave = useCallback(() => {
        if (triggers.includes("hover")) {
            onVisibleChange?.(false);
            setInnerOpen(false);
        }
    }, [triggers]);

    const childProps = useMemo(() => ({
        ...(triggers.includes("click") ? { onClick: handleOnClick } : {}),
        ...(triggers.includes("hover") ? { onMouseEnter: handleOnMouseEnter, onMouseLeave: handleOnMouseLeave } : {})
    }), [triggers]);

    const _children = useMemo(() => {
        if (Children.count(children) > 1) {
            children = <div>{children}</div>
        }

        return Children.map(children, (child, index) => {
            if (!isValidElement(child)) {
                child = (
                    <div key={index ?? `popover-child-${index}`}>
                        {child}
                    </div>
                )
            }

            return cloneElement(child, {
                key: index ?? `popover-child-${index}`,
                ...{
                    style,
                    ...childProps,
                    // @ts-expect-error
                    ...child.props,
                    ref: targetRef,
                    className: `${prefixCls}-wrapper-content`,
                },
            })
        })
    }, [children, style])

    const _content = useMemo(() => flattenChildren(content), [content]);

    return (
        <>
            {_children}

            {isOpen && (
                <ConditionalWrapper
                    condition={!!getPopupContainer}
                    wrapper={(element) =>
                        getPopupContainer
                            ? createPortal(element, getPopupContainer(targetRef.current as HTMLElement) as HTMLElement)
                            : <>{element}</>
                    }
                >
                    <div
                        ref={popupRef}
                        {...childProps}
                        className={clsx(prefixCls, prefixClsPopupPosition, overlayClassName)}
                        style={{
                            ...overlayStyle,
                            ...popupStyle
                        }}
                    >
                        {title && <div className={`${prefixCls}-title`}>{title}</div>}
                        <div className={`${prefixCls}-inner`}>
                            {Children.map(_content, (child, index) => <div key={index}>{child}</div>)}
                        </div>
                        <div className={`${prefixCls}-arrow ${prefixClsPopupPosition}-${_placement}`} />
                    </div>
                </ConditionalWrapper>
            )}
        </>
    );
};

export default Popover;
