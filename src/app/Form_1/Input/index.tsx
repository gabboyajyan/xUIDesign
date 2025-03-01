import React, { ForwardedRef, forwardRef } from "react";
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
    return (
        <div className={`custom-input-container ${size || 'middle'} ${disabled ? "disabled" : ""} ${props.error ? 'error-field' : ''}`}>
            {addonBefore && <span className="addon before">{addonBefore}</span>}
            <div className="input-wrapper">
                {prefix && <span className="prefix">{prefix}</span>}
                <input
                    ref={ref}
                    {...props}
                    disabled={disabled}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && onPressEnter) {
                            onPressEnter(e);
                        }
                    }}
                />
                {allowClear && props.value && (
                    <span className="clear-btn" onClick={() => props.onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}>
                        ✖
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
