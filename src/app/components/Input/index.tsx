"use client";

import React, { ForwardedRef, forwardRef, useState } from "react";
import cc from "classcat";
import "./style.css";

export type InputSize = "small" | "middle" | "large";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	addonBefore?: React.ReactNode;
	addonAfter?: React.ReactNode;
	size?: InputSize;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	disabled?: boolean;
	allowClear?: boolean;
	classNames?: string;
	error?: boolean;
	prefixCls?: string;
	onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input = forwardRef(({
	size = "middle",
	error,
	suffix,
	prefix,
	addonAfter,
	addonBefore,
	onPressEnter,
	disabled = false,
	allowClear = false,
	prefixCls = "xUi",
	className,
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

	const baseCls = `${prefixCls}-input`;

	return (
		<div
			className={cc([
				`${baseCls}-container`,
				{
					[`${baseCls}-error`]: error,
					[`${baseCls}-disabled`]: disabled,
					[`${baseCls}-${size}`]: size,
				},
				className,
			])}
		>
			{addonBefore && <span className={`${baseCls}-addon ${baseCls}-before`}>{addonBefore}</span>}

			<div className={`${baseCls}-wrapper`}>
				{prefix && <span className={`${baseCls}-prefix`}>{prefix}</span>}

				<input
					ref={ref}
					{...props}
					className={cc([baseCls, className])}
					value={isControlled ? props.value : internalValue}
					disabled={disabled}
					onChange={handleChange}
					onKeyDown={(e) => {
						if (e.key === "Enter" && onPressEnter) {
							onPressEnter(e);
						}
					}}
				/>

				{allowClear && (isControlled ? props.value : internalValue) && (
					<span className={`${baseCls}-clear`} onClick={handleClear}>
						&#x2715;
					</span>
				)}

				{suffix && <span className={`${baseCls}-suffix`}>{suffix}</span>}
			</div>

			{addonAfter && <span className={`${baseCls}-addon ${baseCls}-after`}>{addonAfter}</span>}
		</div>
	);
}
);

Input.displayName = "Input";

export { Input };
