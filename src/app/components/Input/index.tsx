"use client"

import React, { ForwardedRef, forwardRef, useState } from "react";
import cc from 'classcat';
import './style.css'

export type InputSize = "small" | "middle" | "large";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	addonBefore?: React.ReactNode;
	addonAfter?: React.ReactNode;
	size?: InputSize;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	disabled?: boolean;
	allowClear?: boolean;
	onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	classNames?: string;
	error?: boolean;
};

const Input = forwardRef((
	{
		size,
		error,
		suffix,
		prefix,
		addonAfter,
		addonBefore,
		onPressEnter,
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
			'xUi__inputContainer',
			{
				'xUi__error__field': error,
				[size || 'middle']: size || 'middle',
				'xUi__inputContainer__disabled': disabled
			}
		])}>
			{addonBefore && <span className="xUi__inputContainer__addon xUi__inputContainer__before">{addonBefore}</span>}
			<div className="xUi__inputContainer__inputWrapper">
				{prefix && <span className="xUi__inputContainer__prefix">{prefix}</span>}
				<input
					ref={ref}
					{...props}
					{...(error ? { error } : {})}
					className={`xUi__input ${props.className || ''}`}
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
					<span className="xUi__inputContainer__clearBtn" onClick={handleClear}>
						&#x2715;
					</span>
				)}
				{suffix && <span className="xUi__inputContainer__suffix">{suffix}</span>}
			</div>
			{addonAfter && <span className="xUi__inputContainer__addon xUi__inputContainer__after">{addonAfter}</span>}
		</div>
	);
});

Input.displayName = "Input";

export { Input }
