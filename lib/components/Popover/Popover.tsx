import React, { useRef, useState } from "react";
import { usePosition } from "../../hooks/usePosition";
import { clsx } from '../../helpers';
import { PopoverProps } from "../../types/popover";
import { ConditionalWrapper } from '../ConditionalWrapper';
import { createPortal } from 'react-dom';
import { prefixClsPopover } from "../../utils";
import './style.css';

const Popover = ({
    prefixCls = prefixClsPopover,
    content,
    children,
    trigger = "click",
    placement = "bottom",
    open,
    overlayStyle = {},
    onOpenChange,
    getPopupContainer
}: PopoverProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const [innerOpen, setInnerOpen] = useState(false);
    
    const isOpen = open !== undefined ? open : innerOpen;
    
    const [_hover, setHover] = useState<boolean>(isOpen);

    const { dropdownPosition, shouldShowAbove } = usePosition({
        isOpen,
        offset: 10,
        popupRef,
        placement,
        triggerRef,
        getPopupContainer: getPopupContainer?.(triggerRef.current as HTMLElement)
    });

    const toggle = () => {
        onOpenChange ? onOpenChange(!isOpen) : setInnerOpen(!isOpen);
    };

    const show = () => {
        setHover(true);

        if (trigger === "hover") {
            onOpenChange ? onOpenChange(true) : setInnerOpen(true);
        }
    };

    const hide = () => {
        setHover(false);

        if (trigger === "hover") {
            onOpenChange ? onOpenChange(false) : setInnerOpen(false);
        }
    };

    const childProps =
        trigger === "click"
            ? { onClick: toggle }
            : { onMouseEnter: show, onMouseLeave: hide };

    return (
        <div className={`${prefixCls}-wrapper`}>
            <div ref={triggerRef}>
                <div className={`${prefixCls}-wrapper-content`} {...childProps}>{children}</div>

                {isOpen && (
                    <ConditionalWrapper
                        condition={getPopupContainer !== undefined}
                        wrapper={(element) => getPopupContainer ? createPortal(element, getPopupContainer(popupRef.current as HTMLElement)) : <>{element}</>}>

                        <div
                            ref={popupRef}
                            className={clsx(prefixCls, `${prefixCls}-${placement}`)}
                            style={{
                                zIndex: _hover ? 1000 : 1,
                                ...overlayStyle,
                                position: "absolute",
                                ...dropdownPosition
                            }}
                        >
                            <div className={`${prefixCls}-inner`}>{content}</div>
                            <div className={`${prefixCls}-arrow ${shouldShowAbove ? 'bottom' : ''}`} />
                        </div>
                    </ConditionalWrapper>
                )}
            </div>

        </div>
    );
};

export default Popover;