'use client'

import React, {
  FC,
  useMemo,
  useState,
  ReactNode,
  useCallback,
  createContext,
  MouseEvent,
  useRef
} from "react";
import { MenuMode, MenuProps } from "../../types/menu";
import MenuItem from "./Item/Item";
import SubMenu from "./SubMenu/SubMenu";
import { prefixClsMenu } from "../../utils";
import "./index.css";

export const MenuContext = createContext<{
  mode: MenuMode;
  inlineIndent: number;
  inlineCollapsed: boolean;
  selectedKeys: string[];
  openKeys: string[];
  toggleOpen: (key: string, level?: "1" | "2") => void;
  onItemClick: (key: string, domEvent?: MouseEvent) => void;
  triggerSubMenuAction?: "hover" | "click";
} | null>(null);

const Menu: FC<MenuProps> & {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
} = ({
  prefixCls = prefixClsMenu,
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
    const hasInteracted = useRef(false);

    const [openKeys, setOpenKeys] = useState<string[]>(openKeysProp ?? defaultOpenKeys);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(selectedKeysProp ?? defaultSelectedKeys);

    const _triggerSubMenuActionClick = useMemo(() => {
      if (mode === 'inline') {
        return "click";
      }

      return triggerSubMenuAction
    }, [triggerSubMenuAction, mode]);

    const toggleOpen = useCallback(
      (key: string, level?: "1" | "2") => {
        setOpenKeys((_openKeys) => {
          const isOpen = _openKeys?.includes(key);

          const openKeysData = level
            ? [...(_triggerSubMenuActionClick === 'click' ? level === "2" ? [..._openKeys] : [] : _openKeys), key]
            : [key];

          const next = [...new Set(isOpen
            ? _openKeys.filter((k) => k !== key)
            : openKeysData)];

          if (openKeysProp === undefined) {
            _openKeys = next;
          }

          onOpenChange?.(next);

          return _openKeys
        })
      },
      [openKeysProp, hasInteracted, _triggerSubMenuActionClick]
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

    const menuContext = useMemo(
      () => ({
        mode,
        inlineIndent,
        inlineCollapsed,
        selectedKeys: selectedKeys || [],
        openKeys: openKeys || [],
        toggleOpen,
        onItemClick,
        triggerSubMenuAction: _triggerSubMenuActionClick,
      }),
      [
        mode,
        inlineIndent,
        inlineCollapsed,
        selectedKeys,
        openKeys,
        toggleOpen,
        onItemClick,
        _triggerSubMenuActionClick
      ]
    );

    return (
      <MenuContext.Provider value={menuContext}>
        <ul
          role="menu"
          style={style}
          className={`${prefixCls}-${mode} ${prefixCls || ''} ${className || ''}`}
        >
          {items
            ? items.map((it, index) => {
              if (it.type === 'divider') {
                return (
                  <span
                    key={`${it.key}_${index}_divider`}
                    className={`${prefixCls}-divider`}
                  />
                )
              }

              if (it.type === 'group') {
                return (
                  <div key={index + it.key}>
                    <MenuItem
                      key={`${it.key}_${index}_${it.label}_menu-item`}
                      itemKey={it.key}
                      label={it.label}
                      icon={it.icon}
                      className={`${prefixCls}-item-disabled`}
                    />

                    {(it.children || []).map((c, i) => (
                      <MenuItem
                        key={`${c.key}_${i}_menu-item`}
                        itemKey={c.key}
                        label={c.label}
                        icon={c.icon}
                        className={`${prefixCls}-item-group`}
                      />
                    ))}
                  </div>
                )
              }

              return it.children ? (
                <SubMenu
                  key={`${it.key}_${it.label}_${index}_sub_menu`}
                  itemKey={it.key}
                  title={it.label}
                  icon={it.icon}
                  level="1"
                >
                  {it.children.map((c, idx) => {
                    if (c.type === 'group') {
                      return (
                        <div key={c.key + idx}>
                          <MenuItem
                            key={`${c.key}_${idx}_menu-item`}
                            itemKey={c.key}
                            label={c.label}
                            icon={c.icon}
                            className={`${prefixCls}-item-disabled`}
                          />

                          {(c.children || []).map((c, _i) => (
                            <MenuItem
                              key={`${c.key}_${_i}_menu-item`}
                              itemKey={c.key}
                              label={c.label}
                              icon={c.icon}
                              className={`${prefixCls}-item-group`}
                            />
                          ))}
                        </div>
                      )
                    }

                    return c.children ? <SubMenu
                      key={`${c.key}_${c.label}_${idx}_sub_menu`}
                      className={`${prefixCls}-sub-list-sub`}
                      itemKey={c.key}
                      title={c.label}
                      icon={c.icon}
                      level="2"
                    >
                      {c.children.map((c, _idx) => (
                        <MenuItem
                          key={`${c.key}_${_idx}_${c.label}_menu-item`}
                          itemKey={c.key}
                          label={c.label}
                          icon={c.icon} 
                        />
                      ))}
                    </SubMenu> :
                      <MenuItem
                        key={`${index}_${c.key}_${c.label}_menu-item`}
                        itemKey={c.key}
                        label={c.label}
                        icon={c.icon} />
                  })}
                </SubMenu>
              ) : (
                <MenuItem
                  key={`${index}_${it.key}_menu-item`}
                  itemKey={it.key}
                  label={it.label}
                  icon={it.icon}
                />
              )
            })
            : children}
        </ul>
      </MenuContext.Provider>
    );
  };

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;

export default Menu;
