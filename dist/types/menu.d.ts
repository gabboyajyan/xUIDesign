import { CSSProperties, MouseEvent, ReactNode } from "react";
import { DefaultProps } from ".";
export type MenuMode = "vertical" | "horizontal" | "inline";
export type ItemType = DefaultProps & {
    danger?: boolean;
    disabled?: boolean;
    extra?: ReactNode;
    icon?: ReactNode;
    key: string;
    label?: ReactNode;
    title?: ReactNode;
    children?: ItemType[];
    type?: string;
    selected?: boolean;
    itemKey?: string;
    onClick?: (info: {
        key: string;
        keyPath: string[];
        domEvent?: MouseEvent;
    }) => void;
};
export type SubMenuItem = DefaultProps & {
    key: string;
    title?: ReactNode;
    icon?: ReactNode;
    children?: ReactNode;
    itemKey: string;
    level: "1" | "2";
};
export interface MenuProps {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    defaultOpenKeys?: string[];
    defaultSelectedKeys?: string[];
    expandIcon?: ReactNode;
    forceSubMenuRender?: boolean;
    inlineCollapsed?: boolean;
    inlineIndent?: number;
    items?: ItemType[];
    mode?: MenuMode;
    multiple?: boolean;
    openKeys?: string[];
    overflowedIndicator?: ReactNode;
    selectable?: boolean;
    selectedKeys?: string[];
    subMenuCloseDelay?: number;
    subMenuOpenDelay?: number;
    triggerSubMenuAction?: "hover" | "click";
    onClick?: (info: {
        key: string;
        keyPath: string[];
        domEvent?: MouseEvent;
    }) => void;
    onDeselect?: (info: {
        key: string;
        keyPath: string[];
    }) => void;
    onOpenChange?: (openKeys: string[]) => void;
    onSelect?: (info: {
        key: string;
        keyPath: string[];
        selectedKeys: string[];
    }) => void;
    children?: ReactNode;
}
