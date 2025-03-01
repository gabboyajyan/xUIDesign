"use client";

import { useRef, useState } from "react";
import type { RuleObject, FormInstance, RuleType, FieldData, FieldError } from "../types";

const useForm = (initialValues: Record<string, RuleType> = {}): FormInstance => {
    const rulesRef = useRef<Record<string, RuleObject[]>>({});
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const formRef = useRef<Record<string, RuleType>>({ ...initialValues });

    const getFieldValue = (name: string) => formRef.current[name];

    const getFieldsValue = (nameList?: string[]) => {
        if (nameList?.length) {
            const nameFieldsList: Record<string, RuleType> = {};

            nameList.forEach(key => {
                nameFieldsList[key] = formRef.current[key]
            })

            return nameFieldsList
        }

        return formRef.current
    }

    const getFieldError = (name: string) => errors[name] || [];

    const getFieldsError = (nameList?: string[]): FieldError[] => {
        console.log(nameList);

        return []
    }

    const setFieldValue = (name: string, value: RuleType) => {
        formRef.current[name] = value;

        validateField(name);
    };

    const setFieldsValue = (values: Partial<RuleType>) => {
        Object.entries(values).forEach(([name, value]) => setFieldValue(name, value));
    }

    const setFields = (fields: FieldData[]) => {
        console.log(fields);
    }

    const isFieldTouched = (name: string): boolean => {
        console.log(name);

        return true
    };

    const isFieldsTouched = (allFieldsTouched?: boolean): boolean => {
        return !!allFieldsTouched
    }

    const isFieldValidating = (name: string): boolean => {
        console.log(name);

        return true
    }

    const validateField = async (name: string) => {
        const value = formRef.current[name];
        const rules = rulesRef.current[name] || [];
        const fieldErrors: string[] = [];

        for (const rule of rules) {
            if (rule.required && !value) {
                fieldErrors.push(rule.message || "This field is required");
            }
            if (rule.pattern && !rule.pattern.test(String(value))) {
                fieldErrors.push(rule.message || "Invalid format");
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
        setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
        return fieldErrors.length === 0;
    };

    const validateFields = async (rules?: RuleObject[]) => {
        let isValid = true;

        for (const name of Object.keys(rules || formRef.current)) {
            if (!(await validateField(name))) {
                isValid = false;
            }
        }

        return isValid;
    };

    const registerField = (name: string, rules: RuleObject[] = []) => {
        if (!(name in formRef.current)) {
            formRef.current[name] = initialValues[name] || "";
        }
        rulesRef.current[name] = rules;
    };

    const resetFields = () => {
        formRef.current = { ...initialValues };
        setErrors({});
    };

    const submit = async () => {
        if (await validateFields()) {
            return formRef.current;
        }
    }

    return {
        submit,
        resetFields,
        registerField,
        setFieldValue,
        getFieldValue,
        validateFields,
        setFieldsValue,
        getFieldError,
        getFieldsValue,

        // need create
        setFields,
        getFieldsError,
        isFieldTouched,
        isFieldsTouched,
        isFieldValidating
    };
};

export { useForm };
