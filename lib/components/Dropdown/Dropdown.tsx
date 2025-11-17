import React, {
    useEffect,
    useRef,
    useState,
    forwardRef,
    CSSProperties
} from 'react';
import {
    DropdownProps,
    DropdownMenuInnerProps
} from '../../types/dropdown';
import { prefixClsDropdown } from '../../utils';
import "./style.css";
import { clsx } from '@/helpers';

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
    children,
    menu,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    trigger = "hover",
    placement = "bottomLeft",
    overlayClassName = "",
    overlayStyle,
    getPopupContainer,
    destroyOnHidden = false,
    disabled = false,
    arrow = false,
    autoFocus = false,
    popupRender,
    className = "",
    prefixCls = prefixClsDropdown,
}, ref) => {
    const [open, setOpen] = useState<boolean>(controlledOpen ?? defaultOpen);
    const isControlled = controlledOpen !== undefined;

    const triggerRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        if (isControlled) {
            setOpen(Boolean(controlledOpen));
        }
    }, [controlledOpen]);

    useEffect(() => {
        if (open && autoFocus) {
            requestAnimationFrame(() => {
                const first = menuRef.current?.querySelector(
                    '[role="menuitem"]:not([aria-disabled="true"])'
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

        onOpenChange?.(next);
    };

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!open) {
                return;
            }

            const target = e.target as Node;

            if (
                containerRef.current &&
                !containerRef.current.contains(target) &&
                !popupRef.current?.contains(target)
            ) {
                setOpenInternal(false);
            }
        };

        document.addEventListener("mousedown", handleClick);

        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const triggers = Array.isArray(trigger) ? trigger : [trigger];

    const onTriggerClick = () => {
        if (triggers.includes("click")) setOpenInternal(!open);
    };

    const onTriggerMouseEnter = () => {
        if (triggers.includes("hover")) setOpenInternal(true);
    };

    const onTriggerMouseLeave = () => {
        if (triggers.includes("hover")) setOpenInternal(false);
    };

    const computePopupStyle = (): CSSProperties => {
        const base: CSSProperties = { position: "absolute" };
        if (!triggerRef.current) {
            return base;
        }

        const rect = triggerRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY;
        const scrollLeft = window.scrollX;

        switch (placement) {
            case "top":
            case "topLeft":
            case "topRight":
                base.left = rect.left + scrollLeft;
                base.top = rect.top + scrollTop - 12;
                break;
            case "right":
                base.left = rect.right + scrollLeft + 12;
                base.top = rect.top + scrollTop;
                break;
            case "left":
                base.left = rect.left + scrollLeft - 12;
                base.top = rect.top + scrollTop;
                break;
            default:
                base.left = rect.left + scrollLeft;
                base.top = rect.bottom + scrollTop + 12;
        }

        return base;
    };

    const popup = (
        <div
            ref={popupRef}
            className={`${prefixCls}-overlay ${overlayClassName}`}
            style={{ ...computePopupStyle(), ...overlayStyle }}
        >
            {arrow && <div className={`${prefixCls}-arrow`} />}

            {popupRender ? (
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
    );

    return (
        <div
            ref={(n) => {
                containerRef.current = n;

                if (typeof ref === "function") {
                    ref(n!);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLDivElement | null>).current = n;
                }
            }}
            className={className}
        >
            <div
                ref={(n) => (triggerRef.current = n as HTMLDivElement) as HTMLDivElement}
                onClick={onTriggerClick}
                onMouseEnter={onTriggerMouseEnter}
                onMouseLeave={onTriggerMouseLeave}
                tabIndex={disabled ? -1 : 0}
                aria-haspopup="menu"
                aria-expanded={open}
            >
                {children}
            </div>

            {open && popup}
            {!open && !destroyOnHidden && null}
        </div>
    );
});

function MenuInner({
    items,
    menuRef,
    onClose,
    prefixCls
}: DropdownMenuInnerProps) {
    return (
        <ul className={`${prefixCls}-menu`} ref={menuRef} role="menu">
            {items.map((it) => (
                <li
                    key={it.key}
                    role="menuitem"
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
                            "disabled": it.disabled,
                            "danger": it.danger
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
