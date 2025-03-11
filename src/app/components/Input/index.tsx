"use client";

import { ChangeEvent, ForwardedRef, forwardRef, InputHTMLAttributes, KeyboardEvent, MouseEvent, ReactNode, useState } from "react";
import cc from "classcat";
import "./style.css";
import { prefixClsInput } from "@/src/app/utils";
import { RuleType } from "@/src/app/types/form";

export type InputSize = "small" | "middle" | "large";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	addonBefore?: ReactNode;
	addonAfter?: ReactNode;
	size?: InputSize;
	prefix?: ReactNode;
	suffix?: ReactNode;
	disabled?: boolean;
	allowClear?: boolean;
	classNames?: string;
	error?: boolean;
	prefixCls?: string;
	onChange?: (event: ChangeEvent & { target: { value: RuleType } }) => void,
	onPressEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
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
	prefixCls = prefixClsInput,
	classNames = '',
	value = undefined,
	...props
}: InputProps,
	ref: ForwardedRef<HTMLInputElement>
) => {
	const [internalValue, setInternalValue] = useState(value ?? '');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInternalValue(e.target.value);

		props.onChange?.(e);
	};

	const handleClear = (e: MouseEvent<HTMLSpanElement> & { target: { value: RuleType } }) => {
		setInternalValue("");

		e.target.value = ''

		props.onChange?.(e as unknown as ChangeEvent<HTMLInputElement> & { target: { value: RuleType } });
	};

	return (
		<div
			className={cc([
				`${prefixCls}-container`,
				{
					[`${prefixCls}-error`]: error,
					[`${prefixCls}-disabled`]: disabled,
					[`${prefixCls}-${size}`]: size,
				},
				classNames
			])}
			style={props.style}
		>
			{addonBefore && <span className={`${prefixCls}-addon ${prefixCls}-before`}>{addonBefore}</span>}

			<div className={`${prefixCls}-wrapper`}>
				{prefix && <span className={`${prefixCls}-prefix`}>{prefix}</span>}

				<input
					ref={ref}
					{...props}
					className={cc([prefixCls, classNames])}
					value={internalValue}
					disabled={disabled}
					onChange={handleChange}
					onKeyDown={(e) => {
						if (e.key === "Enter" && onPressEnter) {
							onPressEnter(e);
						}
					}}
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

Input.displayName = "Input";

export { Input };
