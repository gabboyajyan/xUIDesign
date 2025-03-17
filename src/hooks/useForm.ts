"use client";

import { useRef, useState } from "react";
import type { RuleObject, FormInstance, FieldData, FieldError } from '@/types/form';
import { RuleTypes } from "../types";

const useForm = (
	initialValues: Record<string, RuleTypes> = {},
	onFieldsChange?: (changedFields: FieldData[]) => void,
	onValuesChange?: (changedValues: Record<string, RuleTypes>, allValues: Record<string, RuleTypes>) => void
): FormInstance => {
	const touchedFieldsRef = useRef<Set<string>>(new Set());
	const rulesRef = useRef<Record<string, RuleObject[]>>({});
	const warningsRef = useRef<Record<string, string[]>>({});
	const [errors, setErrors] = useState<Record<string, string[]>>({});
	const formRef = useRef<Record<string, RuleTypes>>({ ...initialValues });

	const fieldSubscribers = useRef<Record<string, ((value: RuleTypes) => void)[]>>({});
	const formSubscribers = useRef<((values: Record<string, RuleTypes>) => void)[]>([]);

	const getFieldValue = (name: string) => formRef.current[name];

	const getFieldsValue = (nameList?: string[]) => {
		if (nameList?.length) {
			return nameList.reduce((acc, key) => {
				acc[key] = formRef.current[key];
				return acc;
			}, {} as Record<string, RuleTypes>);
		}
		return formRef.current;
	};

	const getFieldError = (name: string): string[] => errors[name] || [];

	const getFieldsError = (): Pick<FieldError, 'errors' | 'name'>[] =>
		Object.entries(errors).map(([name]) => ({ name, errors: getFieldError(name) }));

	const getFieldWarning = (name: string): string[] => warningsRef.current[name] || [];

	const setFieldValue = (name: string, value: RuleTypes) => {
		formRef.current[name] = value;
		touchedFieldsRef.current.add(name);
		validateField(name);

		const allValues = getFieldsValue();

		fieldSubscribers.current[name]?.forEach(callback => callback(value));
		formSubscribers.current.forEach(callback => callback(allValues));

		if (onValuesChange) {
			const changedValues = { [name]: value };
			onValuesChange(changedValues, allValues);
		}

		if (onFieldsChange) {
			onFieldsChange([{ name, value }]);
		}
	};

	const setFieldsValue = (values: Partial<Record<string, RuleTypes>>) => {
		Object.entries(values).forEach(([name, value]) => setFieldValue(name, value));
	};

	const setFields = (fields: FieldData[]) => {
		fields.forEach(({ name, value }) => setFieldValue(name, value));
	};

	const isFieldTouched = (name: string): boolean => touchedFieldsRef.current.has(name);

	const isFieldsTouched = (nameList?: string[], allFieldsTouched: boolean = false): boolean => {
		if (!nameList) return touchedFieldsRef.current.size > 0;
		return allFieldsTouched
			? nameList.every(name => touchedFieldsRef.current.has(name))
			: nameList.some(name => touchedFieldsRef.current.has(name));
	};

	const isFieldValidating = (name: string): boolean => !!name;

	const validateField = async (name: string) => {
		let value = formRef.current[name];
		const rules = rulesRef.current[name] || [];
		const fieldErrors: string[] = [];
		const fieldWarnings: string[] = [];

		for (const rule of rules) {
			if (rule.required && (value === undefined || value === null || value === "" || value === false || (Array.isArray(value) && !value.length))) {
				fieldErrors.push(rule.message || "This field is required");
			}

			if (typeof value === "string" || typeof value === "number" || Array.isArray(value)) {
				if (typeof value === "number") {
					value = `${value}`;
				}

				if (rule.min !== undefined && value.length < rule.min) {
					fieldErrors.push(rule.message || `Must be at least ${rule.min} characters`);
				}

				if (rule.max !== undefined && value.length > rule.max) {
					fieldErrors.push(rule.message || `Must be at most ${rule.max} characters`);
				}
			}

			if (rule.pattern && !rule.pattern.test(String(value))) {
				fieldErrors.push(rule.message || "Invalid format");
			}

			if (rule.warningPattern && !rule.warningPattern.test(String(value))) {
				fieldWarnings.push(rule.warningMessage || "Invalid format");
			}

			if (rule.validator) {
				try {
					await rule.validator(rule, value, (error) => {
						if (error) fieldErrors.push(error);
					});
				} catch (error) {
					fieldErrors.push(error instanceof Error ? error.message : String(error));
				}
			}
		}

		setErrors(prev => ({ ...prev, [name]: fieldErrors }));
		warningsRef.current[name] = fieldWarnings;
		return fieldErrors.length === 0;
	};

	const validateFields = async () => {
		let isValid = true;

		for (const name of Object.keys(formRef.current)) {
			if (!(await validateField(name))) {
				isValid = false;
			}
		}

		return isValid;
	};

	const registerField = (name: string, rules: RuleObject[] = []) => {
		if (!(name in formRef.current)) {
			formRef.current[name] = initialValues[name];
		}
		rulesRef.current[name] = rules;
	};

	const resetFields = () => {
		formRef.current = { ...initialValues };
		touchedFieldsRef.current.clear();
		warningsRef.current = {};
		setErrors({});
		formSubscribers.current.forEach(callback => callback(getFieldsValue()));
	};

	const submit = async () => {
		if (await validateFields()) {
			return formRef.current;
		}
	};

	const subscribeToField = (name: string, callback: (value: RuleTypes) => void) => {
		if (!fieldSubscribers.current[name]) {
			fieldSubscribers.current[name] = [];
		}

		fieldSubscribers.current[name].push(callback);

		return () => {
			fieldSubscribers.current[name] = fieldSubscribers.current[name].filter(cb => cb !== callback);
		};
	};

	const subscribeToForm = (callback: (values: Record<string, RuleTypes>) => void) => {
		formSubscribers.current.push(callback);

		return () => {
			formSubscribers.current = formSubscribers.current.filter(cb => cb !== callback);
		};
	};

	return {
		submit,
		setFields,
		resetFields,
		getFieldError,
		registerField,
		setFieldValue,
		getFieldValue,
		validateFields,
		setFieldsValue,
		getFieldsValue,
		isFieldTouched,
		getFieldsError,
		isFieldsTouched,
		getFieldWarning,
		isFieldValidating,
		subscribeToField,
		subscribeToForm,
		onFieldsChange,
		onValuesChange,
	};
};

export { useForm };
