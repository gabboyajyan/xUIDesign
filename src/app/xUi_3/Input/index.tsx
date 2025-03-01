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
        if (!isControlled) {
            setInternalValue(e.target.value);
        }

        props.onChange?.(e);
    };

    const handleClear = () => {
        if (!isControlled) {
            setInternalValue("");
        }

        props.onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className={cc([
            'xInputContainer',
            {
                'xError__field': props.error?.length,
                [size || 'middle']: size || 'middle',
                'xInputContainer__disabled': disabled
            }
        ])}>
            {addonBefore && <span className="xInputContainer__addon xInputContainer__before">{addonBefore}</span>}
            <div className="xInputContainer__inputWrapper">
                {prefix && <span className="xInputContainer__prefix">{prefix}</span>}
                <input
                    ref={ref}
                    {...props}
                    className={`xInput ${props.className}`}
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
                    <span className="xInputContainer__clearBtn" onClick={handleClear}>
                        &#x2715;
                    </span>
                )}
                {suffix && <span className="xInputContainer__suffix">{suffix}</span>}
            </div>
            {addonAfter && <span className="xInputContainer__addon xInputContainer__after">{addonAfter}</span>}
        </div>
    );
});

Input.displayName = "Input";

export { Input }
