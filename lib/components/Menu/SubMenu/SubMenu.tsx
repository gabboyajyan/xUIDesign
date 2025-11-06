'use client'

import React, { FC, useContext } from "react";
import { MenuContext } from "../Menu";
import { clsx } from "../../../helpers";
import { SubMenuItem } from "../../../types/menu";
import { ArrowIcon } from "@/components/Icons";

const SubMenu: FC<SubMenuItem> = ({
    itemKey,
    title,
    icon,
    children
}) => {
    const ctx = useContext(MenuContext);

    if (!ctx) {
        return null;
    }

    const { prefixCls, openKeys, toggleOpen, triggerSubMenuAction } = ctx;

    const isOpen = openKeys.includes(itemKey);

    const handleClick = () => {
        if (triggerSubMenuAction === "click") {
            toggleOpen(itemKey);
        }
    };

    const handleHover = (open: boolean) => {
        if (triggerSubMenuAction === "hover") {
            toggleOpen(itemKey);
        }
    };

    return (
        <li
            className={clsx([
                `${prefixCls}-sub`,
                {
                    [`${prefixCls}-sub-open`]: isOpen
                },
            ])}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
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

            <ul className={clsx([
                `${prefixCls}-sub-list`,
                { [`${prefixCls}-sub-list-open`]: isOpen }
            ])}>
                {children}
            </ul>
        </li>
    );
};

export default SubMenu;