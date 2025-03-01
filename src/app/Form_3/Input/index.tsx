"use client"

import React, { ForwardedRef, forwardRef, useState } from "react";
import cc from 'classcat';
import './style.css'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    size?: "small" | "middle" | "large";
    disabled?: boolean;
    allowClear?: boolean;
    onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    classNames?: string;
    error?: string;
};

const Input = forwardRef((
    {
        suffix,
        prefix,
        addonAfter,
        addonBefore,
        onPressEnter,
        size,
        disabled = false,
        allowClear = false,
        ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
) => {
    const [internalValue, setInternalValue] = useState(props.value ?? "");

  const isControlled = props.value !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    props.onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    props.onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };
    
    return (
        <div className={cc([
            'custom-input-container',
            {
                disabled,
                [size || 'middle']: size || 'middle',
                'error-field': props.error
            }
        ])}>
            {addonBefore && <span className="addon before">{addonBefore}</span>}
            <div className="input-wrapper">
                {prefix && <span className="prefix">{prefix}</span>}
                <input
                    ref={ref}
                    {...props}
                    value={isControlled ? props.value : internalValue}
                    disabled={disabled}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && onPressEnter) {
                            onPressEnter(e);
                        }
                    }}
                />
                {allowClear && props.value && (
                    <span className="clear-btn" onClick={handleClear}>
                        &#x2715;
                    </span>
                )}
                {suffix && <span className="suffix">{suffix}</span>}
            </div>
            {addonAfter && <span className="addon after">{addonAfter}</span>}
        </div>
    );
});

Input.displayName = "Input";

export { Input }
