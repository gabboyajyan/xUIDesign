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
    onOpenChange,
    getPopupContainer
}: PopoverProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const [innerOpen, setInnerOpen] = useState(false);
    const isOpen = open !== undefined ? open : innerOpen;

    const { dropdownPosition, shouldShowAbove } = usePosition({
        isOpen,
        addTop: 4,
        popupRef,
        placement,
        triggerRef,
        getPopupContainer: getPopupContainer?.(triggerRef.current as HTMLElement)
    });

    const toggle = () => {
        const next = !isOpen;
        onOpenChange ? onOpenChange(next) : setInnerOpen(next);
    };

    const show = () => {
        if (trigger === "hover") {
            onOpenChange ? onOpenChange(true) : setInnerOpen(true);
        }
    };

    const hide = () => {
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
            <div ref={triggerRef} {...childProps}>
                {children}

                {isOpen && (
                    <ConditionalWrapper
                        condition={getPopupContainer !== undefined}
                        wrapper={(element) => getPopupContainer ? createPortal(element, getPopupContainer(popupRef.current as HTMLElement)) : <>{element}</>}>

                        <div
                            ref={popupRef}
                            className={clsx(prefixCls, `${prefixCls}-${placement}`, {
                                [`${prefixCls}-show-above`]: shouldShowAbove
                            })}
                            style={{ position: "absolute", ...dropdownPosition }}
                        >
                            <div className={`${prefixCls}-inner`}>{content}</div>
                            <div className={`${prefixCls}-arrow`} />
                        </div>
                    </ConditionalWrapper>
                )}
            </div>

        </div>
    );
};

export default Popover;