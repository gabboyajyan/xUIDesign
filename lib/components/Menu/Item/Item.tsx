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
    className = '',
    prefixCls = prefixClsMenu,
    onClick,
    style
}) => {
    const menuContext = useContext(MenuContext);

    if (!menuContext) {
        throw new Error('MenuItem must be used within a Menu');
    }

    const handleClick = (e: MouseEvent) => {
        if (disabled) {
            return;
        }

        onClick?.({ 
            key: itemKey as string, 
            keyPath: [itemKey as string], 
            domEvent: e as MouseEvent 
        });

        menuContext?.onItemClick(itemKey as string, e);
    };

    return (
        <li
            style={style}
            role="menuitem"
            title={title as string}
            onClick={handleClick}
            className={clsx([
                `${prefixCls}-item ${className}`,
                {
                    [`${prefixCls}-item-disabled`]: disabled,
                    [`${prefixCls}-item-selected`]: selected,
                    [`${prefixCls}-item-danger`]: danger,
                }
            ])}
        >
            {icon && <span className={`${prefixCls}-item-icon`}>{icon}</span>}
            <span className={`${prefixCls}-item-label`}>{label}</span>
            {extra && <span className={`${prefixCls}-item-extra`}>{extra}</span>}
        </li>
    );
};

export default MenuItem;
