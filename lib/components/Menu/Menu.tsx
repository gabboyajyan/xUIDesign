'use client'

import React, {
  FC,
  useMemo,
  useState,
  ReactNode,
  useContext,
  useCallback,
  createContext,
  MouseEvent,
} from "react";
import { MenuMode, MenuProps } from "../../types/menu";
import MenuItem from "./Item/Item";
import SubMenu from "./SubMenu/SubMenu";
import "./index.css";

export const MenuContext = createContext<{
  mode: MenuMode;
  inlineIndent: number;
  inlineCollapsed: boolean;
  selectedKeys: string[];
  openKeys: string[];
  toggleOpen: (key: string) => void;
  onItemClick: (key: string, domEvent?: MouseEvent) => void;
  triggerSubMenuAction?: "hover" | "click";
  prefixCls: string;
} | null>(null);

const ItemGroup: FC<{
  title?: ReactNode;
  children?: ReactNode
}> = ({
  title,
  children
}) => {
    const ctx = useContext(MenuContext);
    const prefix = ctx?.prefixCls ?? "xUi-menu";

    return (
      <li className={`${prefix}-group`}>
        {title && <div className={`${prefix}-group-title`}>{title}</div>}
        <ul className={`${prefix}-group-list`}>{children}</ul>
      </li>
    );
  };

const Menu: FC<MenuProps> & {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
  ItemGroup: typeof ItemGroup;
} = ({
  prefixCls = "xUi-menu",
  className = "",
  style,
  defaultOpenKeys = [],
  defaultSelectedKeys = [],
  openKeys: openKeysProp,
  selectedKeys: selectedKeysProp,
  mode = "vertical",
  multiple = false,
  inlineCollapsed = false,
  inlineIndent = 24,
  triggerSubMenuAction = "hover",
  onClick,
  onSelect,
  onDeselect,
  onOpenChange,
  selectable = true,
  children,
  items
}) => {
    const [openKeys, setOpenKeys] = useState<string[]>(openKeysProp ?? defaultOpenKeys);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(selectedKeysProp ?? defaultSelectedKeys);

    const toggleOpen = useCallback(
      (key: string) => {
        setOpenKeys((_openKeys) => {
          const isOpen = _openKeys?.includes(key);
          const next = isOpen
            ? _openKeys.filter((k) => k !== key)
            : triggerSubMenuAction === "click"
              ? _openKeys.includes(key) ? [] : [key]
              : [..._openKeys, key];

          if (openKeysProp === undefined) {
            _openKeys = next;
          }

          onOpenChange?.(next);

          return _openKeys
        })
      },
      [onOpenChange, openKeysProp]
    );

    const onItemClick = useCallback(
      (key: string, domEvent?: MouseEvent) => {
        if (!selectable) {
          return;
        }

        let nextSelected = [...(selectedKeys || [])];
        const already = nextSelected.includes(key);

        if (multiple) {
          nextSelected = already ? nextSelected.filter((k) => k !== key) : [...nextSelected, key];
        } else {
          nextSelected = [key];
        }

        if (selectedKeysProp === undefined) {
          setSelectedKeys(nextSelected);
        }

        onSelect?.({ key, keyPath: [key], selectedKeys: nextSelected });
        onClick?.({ key, keyPath: [key], domEvent: domEvent as MouseEvent });

        if (already && multiple) {
          onDeselect?.({ key, keyPath: [key] });
        }
      },
      [multiple, onClick, onSelect, onDeselect, selectedKeys, selectable, selectedKeysProp]
    );

    const ctxValue = useMemo(
      () => ({
        mode,
        inlineIndent,
        inlineCollapsed,
        selectedKeys: selectedKeys || [],
        openKeys: openKeys || [],
        toggleOpen,
        onItemClick,
        triggerSubMenuAction,
        prefixCls,
      }),
      [
        mode,
        inlineIndent,
        inlineCollapsed,
        selectedKeys,
        openKeys,
        toggleOpen,
        onItemClick,
        triggerSubMenuAction,
        prefixCls]
    );

    return (
      <MenuContext.Provider value={ctxValue}>
        <ul
          role="menu"
          style={style}
          className={`${prefixCls}-${mode} ${prefixCls || ''} ${className || ''}`}
        >
          {items
            ? items.map((it, index) =>
              it.children ? (
                <SubMenu
                  key={`${it.key}_${it.label}_${index}`}
                  itemKey={it.key}
                  title={it.label}
                  icon={it.icon}
                >
                  {it.children.map((c) => (
                    <MenuItem
                      key={`${index}_${c.label}_${c.key}`}
                      itemKey={c.key}
                      label={c.label}
                      icon={c.icon} />
                  ))}
                </SubMenu>
              ) : it.type === 'divider'
                ? <span
                  key={`${it.key}_${index}_${it.label}`}
                  className={`${prefixCls}-divider`}
                />
                : <MenuItem
                  key={`${it.key}_${index}_${it.label}`}
                  itemKey={it.key}
                  label={it.label}
                  icon={it.icon}
                />
            )
            : children}
        </ul>
      </MenuContext.Provider>
    );
  };

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;

export default Menu;
