import React, { useState, useEffect, FC, MouseEvent } from "react";
import { CheckboxProps } from "@/app/types/checkbox";
import { prefixClsCheckbox } from "@/app/utils";
import { TargetProps } from "@/app/types";
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
    const [internalChecked, setInternalChecked] = useState(defaultChecked || value);
    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleClick = (e: MouseEvent<HTMLInputElement> & TargetProps) => {
        e.stopPropagation()
        
        if (disabled) {
            return;
        }

        const newChecked = !isChecked;

        if (checked === undefined) {
            setInternalChecked(newChecked);
        }

        e.target.valueAnyType = newChecked;

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
                    [`${prefixCls}-checked`]: isChecked
                }])}
        >
            <input
                id={id}
                type={type}
                name={name}
                onClick={onClick}
                disabled={disabled}
                tabIndex={tabIndex}
                required={required}
                autoFocus={autoFocus}
                onKeyDown={onKeyDown}
                onKeyPress={onKeyPress}
                checked={internalChecked}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />

            <span className={`${prefixCls}-box`}>
                <span 
                    className={`${prefixCls}-check`} 
                    style={{ opacity: Number(isChecked) }}/>
            </span>

            {children && <span className={`${prefixCls}-label`}>{children}</span>}
        </div>
    );
};

export { Checkbox };
