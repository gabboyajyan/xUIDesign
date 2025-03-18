"use client";

import { ForwardedRef, forwardRef, KeyboardEvent, MouseEvent, useState } from "react";
import { prefixClsInput } from "@/utils";
import { SyntheticBaseEvent, TargetProps } from "@/types";
import { InputProps } from "@/types/input";
import { Textarea } from "./Textarea";
import cc from "classcat";
import "./style.css";

const InputComponent = forwardRef(({
	size = 'large',
	error,
	suffix,
	prefix,
	addonAfter,
	addonBefore,
	onPressEnter,
	disabled = false,
	allowClear = false,
	prefixCls = prefixClsInput,
	className = '',
	value = undefined,
	...props
}: InputProps,
	ref: ForwardedRef<HTMLInputElement>
) => {
	const [internalValue, setInternalValue] = useState(value ?? '');

	const handleChange = (e: SyntheticBaseEvent) => {
		setInternalValue(e.target.value as string);

		props.onChange?.({
			target: e?.target,
			currentTarget: e.currentTarget
		});
	};

	const handleClear = (e: MouseEvent<HTMLSpanElement> & TargetProps) => {
		setInternalValue("");

		e.target.value = ''

		props.onChange?.({
			target: e?.target,
			currentTarget: e.currentTarget
		});
	};

	const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && onPressEnter) {
			onPressEnter(e);
		}
	}

	return (
		<div
			className={cc([
				`${prefixCls}-container`,
				{
					[`${prefixCls}-error`]: error,
					[`${prefixCls}-disabled`]: disabled,
					[`${prefixCls}-${size}`]: size,
				},
				className
			])}
			style={props.style}
		>
			{addonBefore && <span className={`${prefixCls}-addon ${prefixCls}-before`}>{addonBefore}</span>}

			<div className={`${prefixCls}-wrapper`}>
				{prefix && <span className={`${prefixCls}-prefix`}>{prefix}</span>}

				<input
					ref={ref}
					{...props}
					disabled={disabled}
					value={internalValue}
					onChange={handleChange}
					onKeyDown={handleOnKeyDown}
					className={cc([prefixCls, className])}
				/>

				{allowClear && (internalValue) && (
					<span className={`${prefixCls}-clear`} onClick={handleClear}>
						&#x2715;
					</span>
				)}

				{suffix && <span className={`${prefixCls}-suffix`}>{suffix}</span>}
			</div>

			{addonAfter && <span className={`${prefixCls}-addon ${prefixCls}-after`}>{addonAfter}</span>}
		</div>
	);
});

InputComponent.displayName = "Input";

const Input = InputComponent as typeof InputComponent & {
	TextArea: typeof Textarea;
};

Input.TextArea = Textarea;

export { Input };
