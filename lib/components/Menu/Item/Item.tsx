'use client'

import React, { FC, MouseEvent, useContext } from "react";
import { MenuContext } from "../Menu";
import { clsx } from "../../../helpers";
import { ItemType } from "../../../types/menu";
import { prefixClsMenu } from "../../../utils";

const MenuItem: FC<ItemType> = ({
    itemKey,
    label,
    icon,
    title,
    disabled,
    danger,
    extra,
    selected,
    className = ''
}) => {
    const ctx = useContext(MenuContext);
    const prefix = ctx?.prefixCls ?? prefixClsMenu;

    const handleClick = (e: MouseEvent) => {
        if (disabled) {
            return;
        }

        ctx?.onItemClick(itemKey as string, e);
    };

    return (
        <li
            role="menuitem"
            title={title as string}
            onClick={handleClick}
            className={clsx([
                `${prefix}-item ${className}`,
                {
                    [`${prefix}-item-disabled`]: disabled,
                    [`${prefix}-item-selected`]: selected,
                    [`${prefix}-item-danger`]: danger,
                }
            ])}
        >
            {icon && <span className={`${prefix}-item-icon`}>{icon}</span>}
            <span className={`${prefix}-item-label`}>{label}</span>
            {extra && <span className={`${prefix}-item-extra`}>{extra}</span>}
        </li>
    );
};

export default MenuItem;
