import React, { useState, useEffect, FC, ChangeEvent } from "react";
import { CheckboxProps } from "@/app/types/checkbox";
import { prefixClsCheckbox } from "@/app/utils";
import cc from "classcat";
import "./style.css";
import { RuleType } from "@/app/types/form";

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
    // skipGroup,
    // required
}) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked || value);
    const isChecked = checked !== undefined ? checked : internalChecked;

    const handleChange = (e: ChangeEvent<HTMLInputElement> & { target: { valueAnyType: RuleType } }) => {
        if (disabled) {
            return;
        }

        console.log();

        const newChecked = !isChecked;

        if (checked === undefined) {
            setInternalChecked(newChecked);
        }

        e.target.valueAnyType = e.target.checked;

        onChange?.(e);
    };

    useEffect(() => {
        if (checked !== undefined) {
            setInternalChecked(checked);
        }
    }, [checked]);

    return (
        <label className={cc([
            prefixCls,
            className,
            {
                [`${prefixCls}-disabled`]: disabled,
                [`${prefixCls}-checked`]: isChecked
            }])} style={style}
        >
            <input
                id={id}
                type={type}
                name={name}
                onClick={onClick}
                checked={isChecked}
                disabled={disabled}
                tabIndex={tabIndex}
                autoFocus={autoFocus}
                onKeyDown={onKeyDown}
                onChange={handleChange}
                onKeyPress={onKeyPress}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />

            <span className={`${prefixCls}-box`}>
                <span className={`${prefixCls}-check`} style={{ opacity: Number(isChecked) }}></span>
            </span>

            {children && <span className={`${prefixCls}-label`}>{children}</span>}
        </label>
    );
};

export { Checkbox };
