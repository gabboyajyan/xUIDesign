"use client";
import { useRef, useState } from "react";

export interface Rule {
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    validator?: (rules: Rule[], value: unknown) => Promise<void> | void;
}

type TFieldValue = unknown;

export interface UseFormReturn {
    setFieldValue: (name: string, value: TFieldValue) => void;
    getFieldValue: (name: string) => TFieldValue;
    validateField: (rules: Rule[], name: string) => Promise<boolean>;
    getFieldsValue: () => Record<string, TFieldValue>;
    errors: Record<string, string>;
    resetFields: () => void;
    validateFields: () => Promise<boolean>;
}

const useForm = (initialValues: Record<string, TFieldValue> = {}): UseFormReturn => {
    const formRef = useRef<Record<string, TFieldValue>>({ ...initialValues });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const setFieldValue = (name: string, value: TFieldValue) => {
        formRef.current[name] = value;
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const getFieldValue = (name: string) => formRef.current[name];

    const getFieldsValue = () => formRef.current;

    const validateField = async (rules: Rule[], name: string) => {
        const value = formRef.current[name];
        for (const rule of rules) {
            if (rule.required && !value) {
                setErrors((prev) => ({ ...prev, [name]: rule.message || "This field is required" }));
                return false;
            }
            if (rule.pattern && !rule.pattern.test(String(value))) {
                setErrors((prev) => ({ ...prev, [name]: rule.message || "Invalid format" }));
                return false;
            }
            if (rule.validator) {
                try {
                    await rule.validator(rules, value);
                } catch (error) {
                    setErrors((prev) => ({
                        ...prev,
                        [name]: error instanceof Error ? error.message : typeof error === "string" ? error : "Validation failed",
                    }));
                    return false;
                }
            }
        }
        return true;
    };

    const validateFields = async () => {
        let isValid = true;
        for (const name of Object.keys(formRef.current)) {
            if (!(await validateField([], name))) {
                isValid = false;
            }
        }
        return isValid;
    };

    const resetFields = () => {
        formRef.current = { ...initialValues };
        setErrors({});
    };

    return {
        setFieldValue,
        getFieldValue,
        validateField,
        getFieldsValue,
        errors,
        resetFields,
        validateFields,
    };
};

export default useForm;
