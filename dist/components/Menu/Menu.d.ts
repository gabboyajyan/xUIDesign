import React, { FC, MouseEvent } from "react";
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
    toggleOpen: (key: string, level?: "1" | "2") => void;
    onItemClick: (key: string, domEvent?: MouseEvent) => void;
    triggerSubMenuAction?: "hover" | "click";
} | null>;
declare const Menu: FC<MenuProps> & {
    Item: typeof MenuItem;
    SubMenu: typeof SubMenu;
};
export default Menu;
