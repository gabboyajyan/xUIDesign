import React, { FC, ReactNode, MouseEvent } from "react";
import { MenuMode, MenuProps } from "../../types/menu";
import MenuItem from "./Item/Item";
import SubMenu from "./SubMenu/SubMenu";
import "./index.css";
export declare const MenuContext: React.Context<{
    mode: MenuMode;
    inlineIndent: number;
    inlineCollapsed: boolean;
    selectedKeys: string[];
    openKeys: string[];
    toggleOpen: (key: string) => void;
    onItemClick: (key: string, domEvent?: MouseEvent) => void;
    triggerSubMenuAction?: "hover" | "click";
    prefixCls: string;
} | null>;
declare const ItemGroup: FC<{
    title?: ReactNode;
    children?: ReactNode;
}>;
declare const Menu: FC<MenuProps> & {
    Item: typeof MenuItem;
    SubMenu: typeof SubMenu;
    ItemGroup: typeof ItemGroup;
};
export default Menu;
