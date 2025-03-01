
"use client";

import {
    useRef,
    useState
} from "react";

// Form validation rule interface
export interface Rule {
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    validator?: (rules: Rule[], value: unknown) => Promise<void> | void;
}

export type TFieldValue = unknown;

export interface UseFormReturn {
    registerField: (name: string, rules?: Rule[]) => void;
    setFieldValue: (name: string, value: TFieldValue) => void;
    getFieldValue: (name: string) => TFieldValue;
    validateField: (rules: Rule[], name: string) => Promise<boolean>;
    validateAll: () => Promise<boolean>;
    errors: Record<string, string>;
    values: Record<string, TFieldValue>;
    resetFields: () => void;
}

const useForm = (initialValues: Record<string, TFieldValue> = {}): UseFormReturn => {
    const formRef = useRef<Record<string, TFieldValue>>({ ...initialValues });
    const rulesRef = useRef<Record<string, Rule[]>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const registerField = (name: string, rules: Rule[] = []) => {
        if (!(name in formRef.current)) {
            formRef.current[name] = initialValues[name] || "";
        }
        rulesRef.current[name] = rules;
    };

    const setFieldValue = (name: string, value: TFieldValue) => {
        formRef.current[name] = value;
        validateField(rulesRef.current[name], name);
    };

    const getFieldValue = (name: string) => formRef.current[name];

    const validateField = async (rules: Rule[] = [], name: string) => {
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
                    console.log(error);

                    setErrors((prev) => ({
                        ...prev,
                        [name]: error instanceof Error ? error.message : typeof error === "string" ? String(error) : "Validation failed"
                    }));
                    return false;
                }
            }
        }
        setErrors((prev) => ({ ...prev, [name]: "" }));
        return true;
    };

    const validateAll = async () => {
        let isValid = true;
        for (const name of Object.keys(rulesRef.current)) {
            if (!(await validateField(rulesRef.current[name], name))) {
                isValid = false;
            }
        }
        return isValid;
    };

    const resetFields = () => {
        formRef.current = { ...initialValues };
        setErrors({});
    };

    return { registerField, setFieldValue, getFieldValue, validateField, validateAll, errors, values: formRef.current, resetFields };
};

export { useForm };

