import React, {
    SyntheticEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    DropdownProps,
    DropdownMenuInnerProps
} from '../../types/dropdown';
import { prefixClsDropdown, prefixClsPopupPosition } from '../../utils';
import { clsx } from '../../helpers';
import { ConditionalWrapper } from '../ConditionalWrapper';
import { createPortal } from 'react-dom';
import { usePopupPosition } from '../../hooks/usePopupPosition';
import './style.css';

const Dropdown = ({
    children,
    menu,
    open: controlledOpen,
    defaultOpen = false,
    onVisibleChange,
    trigger = 'hover',
    placement = 'bottomLeft',
    overlayClassName = '',
    overlayStyle,
    getPopupContainer,
    destroyOnHidden = false,
    disabled = false,
    arrow = false,
    autoFocus = false,
    popupRender,
    className = '',
    overlay,
    prefixCls = prefixClsDropdown,
}: DropdownProps) => {
    const [open, setOpen] = useState<boolean>(controlledOpen ?? defaultOpen);
    const isControlled = controlledOpen !== undefined;

    const targetRef = useRef<HTMLDivElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLUListElement | null>(null);

    const { popupStyle } = usePopupPosition({
        open,
        targetRef,
        popupRef,
        placement,
        setOpen,
        inBody: getPopupContainer?.(targetRef.current as HTMLElement)?.tagName === 'BODY'
    })

    useEffect(() => {
        if (isControlled) {
            setOpen(Boolean(controlledOpen));
            onVisibleChange?.(Boolean(controlledOpen))
        }
    }, [controlledOpen]);

    useEffect(() => {
        if (open && autoFocus) {
            requestAnimationFrame(() => {
                const first = menuRef.current?.querySelector(
                    "[role='menuitem']:not([aria-disabled='true'])"
                ) as HTMLElement | null;

                first?.focus();
            });
        }
    }, [open]);

    const setOpenInternal = (next: boolean) => {
        if (disabled) {
            return;
        }

        if (!isControlled) {
            setOpen(next);
        }

        onVisibleChange?.(next);
        onVisibleChange?.(next)
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(e.target as Node) &&
                targetRef.current &&
                !targetRef.current.contains(e.target as Node)
            ) {
                setOpenInternal(false);
                onVisibleChange?.(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const triggers = Array.isArray(trigger) ? trigger : [trigger];

    const onTriggerClick = (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (triggers.includes('click') && targetRef.current &&
            (!open && targetRef.current?.contains(e.target as Node))) {
            setOpenInternal(!open);
        }
    };

    const onTriggerMouseEnter = () => {
        if (triggers.includes('hover')) {
            setOpenInternal(true);
        }
    };

    const onTriggerMouseLeave = () => {
        if (triggers.includes('hover')) {
            setOpenInternal(false);
        }
    };

    const popup = (
        <ConditionalWrapper
            condition={!!getPopupContainer}
            wrapper={(element) => getPopupContainer
                ? createPortal(element, getPopupContainer(targetRef.current as HTMLElement) as HTMLElement)
                : <>{element}</>
            }>
            <>
                <div
                    ref={popupRef}
                    className={`${prefixCls}-overlay ${prefixClsPopupPosition} ${overlayClassName}`}
                    style={{
                        ...overlayStyle,
                        ...popupStyle
                    }}
                >
                    {arrow && <div className={`${prefixCls}-arrow ${prefixClsPopupPosition}-${placement}`} />}

                    {overlay ? typeof overlay === 'function' ? overlay() : overlay : popupRender ? (
                        popupRender(
                            menu ? (
                                <MenuInner
                                    prefixCls={prefixCls}
                                    items={menu.items}
                                    menuRef={menuRef}
                                    onClose={() => setOpenInternal(false)}
                                />
                            ) : (
                                <div style={{ padding: 8 }}>Empty menu</div>
                            )
                        )
                    ) : menu ? (
                        <MenuInner
                            prefixCls={prefixCls}
                            items={menu.items}
                            menuRef={menuRef}
                            onClose={() => setOpenInternal(false)}
                        />
                    ) : (
                        <div style={{ padding: 8 }}>Empty menu</div>
                    )}
                </div>
            </>
        </ConditionalWrapper>
    );

    return (
        <div
            ref={targetRef}
            className={className}
            onClick={onTriggerClick}
            onMouseEnter={onTriggerMouseEnter}
            onMouseLeave={onTriggerMouseLeave}
            tabIndex={disabled ? -1 : 0}
            aria-haspopup='menu'
            style={{ width: 'fit-content', height: 'fit-content' }}
            aria-expanded={open}
        >
            {children}

            {open && popup}
            {!open && !destroyOnHidden && null}
        </div>
    );
};

function MenuInner({
    items,
    menuRef,
    onClose,
    prefixCls,
}: DropdownMenuInnerProps) {
    return (
        <ul className={`${prefixCls}-menu`} ref={menuRef} role='menu'>
            {items.map((it) => (
                <li
                    key={it.key}
                    role='menuitem'
                    tabIndex={it.disabled ? -1 : 0}
                    aria-disabled={it.disabled ?? false}
                    onClick={(e) => {
                        if (it.disabled) {
                            return;
                        }

                        it.onClick?.(e as any);
                        onClose();
                    }}
                    className={clsx([
                        `${prefixCls}-item`,
                        {
                            'disabled': it.disabled,
                            'danger': it.danger
                        }
                    ])}
                >
                    {it.label ?? it.key}
                </li>
            ))}
        </ul>
    );
}

export default Dropdown;
