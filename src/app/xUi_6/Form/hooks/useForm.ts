"use client";

import { useRef, useState } from "react";
import type { RuleObject, FormInstance, RuleType, FieldData, FieldError } from "../types";

const useForm = (
  initialValues: Record<string, RuleType> = {},
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void,
  onValuesChange?: (changedValues: Record<string, RuleType>, allValues: Record<string, RuleType>) => void
): FormInstance => {
  const touchedFieldsRef = useRef<Set<string>>(new Set());
  const rulesRef = useRef<Record<string, RuleObject[]>>({});
  const warningsRef = useRef<Record<string, string[]>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const formRef = useRef<Record<string, RuleType>>({ ...initialValues });

  const getFieldValue = (name: string) => formRef.current[name];

  const getFieldsValue = (nameList?: string[]) => {
    if (nameList?.length) {
      return nameList.reduce((acc, key) => {
        acc[key] = formRef.current[key];
        return acc;
      }, {} as Record<string, RuleType>);
    }
    return formRef.current;
  };

  const getFieldError = (name: string): string[] => errors[name] || [];

  const getFieldsError = (): Pick<FieldError, 'errors' | 'name'>[] =>
    Object.entries(errors).map(([name]) => ({ name, errors: getFieldError(name) }));

  const getFieldWarning = (name: string): string[] => warningsRef.current[name] || [];

  const setFieldValue = (name: string, value: RuleType) => {
    formRef.current[name] = value;
    touchedFieldsRef.current.add(name);
    validateField(name);

    if (onFieldsChange) {
      onFieldsChange([{ name, value }], Object.entries(formRef.current).map(([name, value]) => ({ name, value })));
    }

    if (onValuesChange) {
      const changedValues = { [name]: value };
      const allValues = getFieldsValue();
      onValuesChange(changedValues, allValues);
    }
  };

  const setFieldsValue = (values: Partial<Record<string, RuleType>>) => {
    Object.entries(values).forEach(([name, value]) => setFieldValue(name, value));

    if (onValuesChange) {
      const changedValues = values;
      const allValues = getFieldsValue();
      onValuesChange(changedValues, allValues);
    }
  };

  const setFields = (fields: FieldData[]) => {
    fields.forEach(({ name, value }) => setFieldValue(name, value));

    if (onValuesChange) {
      const changedValues = fields.reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc;
      }, {} as Record<string, RuleType>);
      const allValues = getFieldsValue();
      onValuesChange(changedValues, allValues);
    }
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
      if (rule.required && (value === undefined || value === null || value === "")) {
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
      formRef.current[name] = initialValues[name] || "";
    }
    rulesRef.current[name] = rules;
  };

  const resetFields = () => {
    formRef.current = { ...initialValues };
    touchedFieldsRef.current.clear();
    warningsRef.current = {};
    setErrors({});
  };

  const submit = async () => {
    if (await validateFields()) {
      return formRef.current;
    }
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
    onFieldsChange,
    onValuesChange,
  };
};

export { useForm };
