import React, { useState, useEffect, FC, MouseEvent } from "react";
import { CheckboxProps } from "@/types/checkbox";
import { prefixClsCheckbox } from "@/utils";
import { SyntheticBaseEvent } from "@/types";
import cc from "classcat";
import "./style.css";

const Checkbox: FC<CheckboxProps> = ({
    prefixCls = prefixClsCheckbox,
    className = "",
    defaultChecked = false,
    checked,
    style,
    disabled = false,
    onChange,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyPress,
    onKeyDown,
    tabIndex,
    name,
    children,
    id,
    autoFocus,
    type = "checkbox",
    value = false,
    required = false
}) => {
    const isChecked = checked !== undefined ? checked : defaultChecked || value;
    const [internalChecked, setInternalChecked] = useState(isChecked);

    const handleClick = (e: MouseEvent<HTMLInputElement> & SyntheticBaseEvent) => {
        e.stopPropagation()
        
        if (disabled) {
            return;
        }

        setInternalChecked(!internalChecked);
        e.target.value = !internalChecked;

        onClick?.(e);
        onChange?.(e);
    };

    useEffect(() => {
        if (checked !== undefined) {
            setInternalChecked(checked);
        }
    }, [checked]);

    return (
        <div
            style={style}
            onClick={handleClick}
            className={cc([
                prefixCls,
                className,
                {
                    [`${prefixCls}-disabled`]: disabled,
                    [`${prefixCls}-checked`]: internalChecked
                }])}
        >
            <input
                id={id}
                type={type}
                name={name}
                disabled={disabled}
                tabIndex={tabIndex}
                required={required}
                autoFocus={autoFocus}
                onKeyDown={onKeyDown}
                onKeyPress={onKeyPress}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />

            <span className={`${prefixCls}-box`}>
                <span 
                    className={`${prefixCls}-check`} 
                    style={{ opacity: Number(internalChecked) }}/>
            </span>

            {children && <span className={`${prefixCls}-label`}>{children}</span>}
        </div>
    );
};

export { Checkbox };
