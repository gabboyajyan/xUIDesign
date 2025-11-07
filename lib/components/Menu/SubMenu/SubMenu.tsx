'use client'

import React, { FC, useCallback, useContext } from "react";
import { MenuContext } from "../Menu";
import { SubMenuItem } from "../../../types/menu";
import { ArrowIcon } from "@/components/Icons";

const SubMenu: FC<SubMenuItem> = ({
    itemKey,
    title,
    icon,
    children,
    className = '',
    level
}) => {
    const ctx = useContext(MenuContext);

    if (!ctx) {
        return null;
    }

    const { prefixCls, openKeys, toggleOpen, triggerSubMenuAction } = ctx;

    const isOpen = openKeys.includes(itemKey);

    const handleClick = useCallback(() => {
        if (triggerSubMenuAction === "click") {
            toggleOpen(itemKey, level);
        }
    }, [itemKey, level]);

    const handleHover = useCallback((_: boolean) => {
        if (triggerSubMenuAction === "hover") {
            toggleOpen(itemKey, level);
        }
    }, [itemKey, level]);

    return (
        <li
            className={`${prefixCls}-sub ${className}`}
            {
                ...(triggerSubMenuAction === "hover" ? {
                    onMouseEnter: () => handleHover(true),
                    onMouseLeave: () => handleHover(false)
                } : {})
            }
        >
            <div className={`${prefixCls}-sub-title`} onClick={handleClick}>
                {icon && <span className={`${prefixCls}-sub-icon`}>
                    {icon}
                </span>}&nbsp;
                <span className={`${prefixCls}-sub-label`}>{title}</span>
                <span className={`${prefixCls}-sub-arrow`}>
                    {<ArrowIcon isOpen={isOpen} />}
                </span>
            </div>

            {!isOpen ? null :
                <ul className={`${prefixCls}-sub-list`}>
                    {children}
                </ul>}
        </li>
    );
};

export default SubMenu;