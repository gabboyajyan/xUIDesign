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
import { clsx } from '../../helpers';
import { usePossition } from '../../hooks/usePossition';
import { ConditionalWrapper } from '../ConditionalWrapper';
import { createPortal } from 'react-dom';
import './style.css';

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
    children,
    menu,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
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
    onVisibleChange
}, ref) => {
    const [open, setOpen] = useState<boolean>(controlledOpen ?? defaultOpen);
    const [_hover, setHover] = useState<boolean>(controlledOpen ?? defaultOpen);
    const isControlled = controlledOpen !== undefined;

    const containerRef = useRef<HTMLDivElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLUListElement | null>(null);

    const { shouldShowAbove, dropdownPosition } = usePossition({
        popupRef,
        placement,
        addTop: 8,
        isOpen: open,
        containerRef,
        getPopupContainer
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
        
        onOpenChange?.(next);
        onVisibleChange?.(next)
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

        document.addEventListener('mousedown', handleClick);

        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    const triggers = Array.isArray(trigger) ? trigger : [trigger];

    const onTriggerClick = () => {
        if (triggers.includes('click')) {
            setOpenInternal(!open);
        }
    };

    const onTriggerMouseEnter = () => {
        setHover(true);

        if (triggers.includes('hover')) {
            setOpenInternal(true);
        }
    };

    const onTriggerMouseLeave = () => {
        setHover(false);

        if (triggers.includes('hover')) {
            setOpenInternal(false);
        }
    };

    const popup = (
        <ConditionalWrapper
            condition={getPopupContainer !== undefined}
            wrapper={(element) => getPopupContainer ? createPortal(element, getPopupContainer(popupRef.current as HTMLElement)) : <>{element}</>}>

            <div
                ref={popupRef}
                className={`${prefixCls}-overlay ${overlayClassName}`}
                style={{
                    zIndex: _hover ? 1 : 0,
                    ...overlayStyle,
                    ...dropdownPosition,
                    opacity: Object.keys(dropdownPosition).length ? 1 : 0
                }}
            >
                {arrow && <div className={`${prefixCls}-arrow ${shouldShowAbove ? 'bottom' : ''}`} />}

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
        </ConditionalWrapper>
    );

    return (
        <div
            ref={(n) => {
                containerRef.current = n;

                if (typeof ref === 'function') {
                    ref(n!);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLDivElement | null>).current = n;
                }
            }}
            className={className}
        >
            <div
                onClick={onTriggerClick}
                onMouseEnter={onTriggerMouseEnter}
                onMouseLeave={onTriggerMouseLeave}
                tabIndex={disabled ? -1 : 0}
                aria-haspopup='menu'
                style={{ width: 'fit-content' }}
                aria-expanded={open}
            >
                {children}

                {open && popup}
                {!open && !destroyOnHidden && null}
            </div>
        </div>
    );
});

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
