import React, { useRef, useState, cloneElement, isValidElement, Children, useEffect, useMemo, useCallback } from "react";
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
    visible,
    title,
    style = {},
    overlayClassName = '',
    overlayStyle = {},
    onVisibleChange,
    getPopupContainer
}: PopoverProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const [innerOpen, setInnerOpen] = useState(false);

    const isOpen = visible !== undefined ? visible : open !== undefined ? open : innerOpen;
    
    const { dropdownPosition, showPlacement } = usePosition({
        isOpen,
        offset: 10,
        popupRef,
        placement,
        triggerRef,
        getPopupContainer: getPopupContainer?.(triggerRef.current as HTMLElement)
    });

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                setInnerOpen(false);
                onVisibleChange?.(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOnClick = useCallback(() => {
        const newState = !isOpen;

        onVisibleChange?.(newState);
        setInnerOpen(newState);
    }, [isOpen, trigger]);

    const handleOnMouseEnter = useCallback(() => {
        if (trigger === "hover") {
            onVisibleChange?.(true);
            setInnerOpen(true);
        }
    }, [trigger]);

    const handleOnMouseLeave = useCallback(() => {
        if (trigger === "hover") {
            onVisibleChange?.(false);
            setInnerOpen(false);
        }
    }, [trigger]);

    const childProps = useMemo(() => trigger === "click"
        ? { onClick: handleOnClick }
        : { onMouseEnter: handleOnMouseEnter, onMouseLeave: handleOnMouseLeave },
        [trigger]);

    const _children = useMemo(() => {
        if (Children.count(children) > 1) {
            return <div>{children}</div>
        }

        return children;
    }, [children])

    return (
        <>
            {Children.map(_children, (child, index) => {
                if (!isValidElement(child)) {
                    child = <div>{child}</div>
                }
                
                return cloneElement(child, {
                    key: index,
                    ...{
                        style,
                        ...childProps,
                        ref: triggerRef,
                        className: `${prefixCls}-wrapper-content`,
                    },
                })
            })}

            {isOpen && (
                <ConditionalWrapper
                    condition={!!getPopupContainer}
                    wrapper={(element) =>
                        getPopupContainer
                            ? createPortal(element, getPopupContainer(popupRef.current as HTMLElement))
                            : <>{element}</>
                    }
                >
                    <div
                        ref={popupRef}
                        {...childProps}
                        className={clsx(prefixCls, `${prefixCls}-${placement}`, overlayClassName)}
                        style={{
                            zIndex: 1000,
                            position: "absolute",
                            ...overlayStyle,
                            ...dropdownPosition
                        }}
                    >
                        {title && <div className={`${prefixCls}-title`}>{title}</div>}
                        <div className={`${prefixCls}-inner`}>{content}</div>
                        <div className={`${prefixCls}-arrow ${showPlacement}`} />
                    </div>
                </ConditionalWrapper>
            )}
        </>
    );
};

export default Popover;
