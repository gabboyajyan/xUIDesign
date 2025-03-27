'use client';

import { useRef, useState } from 'react';
import { RuleTypes } from '@/xUiDesign/types';
import type {
  FieldData,
  FieldError,
  FieldInstancesRef,
  FormInstance,
  RuleObject,
  RuleRender
} from '@/xUiDesign/types/form';

const useForm = (
  initialValues: Record<string, RuleTypes> = {},
  onFieldsChange?: (changedFields: FieldData[]) => void,
  onValuesChange?: (
    changedValues: Record<string, RuleTypes>,
    allValues: Record<string, RuleTypes>
  ) => void
): FormInstance => {
  const touchedFieldsRef = useRef(new Set<string>());
  const rulesRef = useRef<Record<string, RuleObject[] | RuleRender>>({});
  const warningsRef = useRef<Record<string, string[]>>({});
  const fieldInstancesRef = useRef<Record<string, FieldInstancesRef>>({});

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const formRef = useRef<Record<string, RuleTypes>>({ ...initialValues });

  const fieldSubscribers = useRef<
    Record<string, ((value: RuleTypes) => void)[]>
  >({});

  const formSubscribers = useRef<
    ((values: Record<string, RuleTypes>) => void)[]
  >([]);

  function getFieldInstance(name: string): FieldInstancesRef {
    return fieldInstancesRef.current[name] || null;
  }

  function getFieldValue(name: string) {
    return formRef.current[name];
  }

  function getFieldsValue(nameList?: string[]) {
    if (!nameList) {
      return { ...formRef.current };
    }

    return nameList.reduce((acc, key) => {
      acc[key] = formRef.current[key];

      return acc;
    }, {} as Record<string, RuleTypes>);
  }

  function getFieldError(name: string) {
    return errors[name] || [];
  }

  function getFieldWarning(name: string): string[] {
    return warningsRef.current[name] || [];
  }

  function getFieldsError(): Pick<FieldError, 'errors' | 'name'>[] {
    return Object.entries(errors).map(([name, err]) => ({ name, errors: err }));
  }

  function setFieldValue(name: string, value: RuleTypes) {
    if (value === undefined || formRef.current[name] === value) {
      return;
    }

    formRef.current[name] = value;
    touchedFieldsRef.current.add(name);

    validateField(name).then(() => {
      const allValues = getFieldsValue();
      fieldSubscribers.current[name]?.forEach(callback => callback(value));
      formSubscribers.current.forEach(callback => callback(allValues));

      if (onValuesChange) {
        onValuesChange({ [name]: value }, allValues);
      }

      if (onFieldsChange) {
        onFieldsChange([{ name, value }]);
      }
    });
  }

  function setFieldsValue(values: Partial<Record<string, RuleTypes>>) {
    Object.entries(values).forEach(([name, value]) =>
      setFieldValue(name, value as RuleTypes)
    );
  }

  function setFields(fields: FieldData[]) {
    fields.forEach(({ name, value }) => setFieldValue(name, value));
  }

  function isFieldTouched(name: string) {
    return touchedFieldsRef.current.has(name);
  }

  function isFieldsTouched(nameList?: string[], allFieldsTouched = false) {
    if (!nameList) {
      return touchedFieldsRef.current.size > 0;
    }

    return allFieldsTouched
      ? nameList.every(name => touchedFieldsRef.current.has(name))
      : nameList.some(name => touchedFieldsRef.current.has(name));
  }

  function isFieldValidating(name: string): boolean {
    return !!name;
  }

  function registerField(
    name: string,
    rules: RuleObject[] = [],
    fieldRef?: FieldInstancesRef
  ) {
    if (!(name in formRef.current)) {
      formRef.current[name] = initialValues[name];
    }

    rulesRef.current[name] = rules;

    if (fieldRef) {
      fieldInstancesRef.current[name] = fieldRef;
    }
  }

  async function validateField(name: string) {
    const value = formRef.current[name];
    const rules = rulesRef.current[name] || [];
    const fieldErrors: string[] = [];
    const fieldWarnings: string[] = [];

    await Promise.all(
      [rules].flat(1).map(async (rule: RuleTypes) => {
        rule = typeof rule === 'function' ? rule(formInstance) : rule;

        if (
          rule.required &&
          (value === undefined ||
            value === null ||
            value === '' ||
            (Array.isArray(value) && !value.length))
        ) {
          fieldErrors.push(rule.message || 'This field is required');
        }

        if (
          (typeof value === 'string' ||
            typeof value === 'number' ||
            Array.isArray(value)) &&
          rule.min !== undefined &&
          String(value).length < rule.min
        ) {
          fieldErrors.push(
            rule.message || `Must be at least ${rule.min} characters`
          );
        }

        if (
          (typeof value === 'string' ||
            typeof value === 'number' ||
            Array.isArray(value)) &&
          rule.max !== undefined &&
          String(value).length > rule.max
        ) {
          fieldErrors.push(
            rule.message || `Must be at most ${rule.max} characters`
          );
        }

        if (rule.pattern && !rule.pattern.test(String(value))) {
          fieldErrors.push(rule.message || 'Invalid format');
        }

        if (rule.warningPattern && !rule.warningPattern.test(String(value))) {
          fieldWarnings.push(rule.warningMessage || 'Invalid format');
        }

        if (rule.validator) {
          try {
            await rule.validator(
              rule,
              value,
              (error?: string) => error && fieldErrors.push(error)
            );
          } catch (error) {
            fieldErrors.push(
              error instanceof Error ? error.message : String(error)
            );
          }
        }
      })
    );

    setErrors(prev => ({ ...prev, [name]: fieldErrors }));
    warningsRef.current[name] = fieldWarnings;

    return fieldErrors.length === 0;
  }

  async function validateFields(nameList?: string[]) {
    const fieldsToValidate = nameList || Object.keys(formRef.current);
    const results = await Promise.all(
      fieldsToValidate.map(name => validateField(name))
    );

    return results.every(valid => valid);
  }

  function resetFields() {
    formRef.current = { ...initialValues };
    touchedFieldsRef.current.clear();
    warningsRef.current = {};
    setErrors({});
    formSubscribers.current.forEach(callback => callback(getFieldsValue()));
  }

  async function submit() {
    return (await validateFields()) ? formRef.current : undefined;
  }

  function subscribeToField(
    name: string,
    callback: (value: RuleTypes) => void
  ) {
    if (!fieldSubscribers.current[name]) {
      fieldSubscribers.current[name] = [];
    }

    fieldSubscribers.current[name].push(callback);

    return () => {
      fieldSubscribers.current[name] = fieldSubscribers.current[name].filter(
        cb => cb !== callback
      );
    };
  }

  function subscribeToForm(
    callback: (values: Record<string, RuleTypes>) => void
  ) {
    formSubscribers.current.push(callback);

    return () => {
      formSubscribers.current = formSubscribers.current.filter(
        cb => cb !== callback
      );
    };
  }

  const formInstance: FormInstance = {
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
    getFieldInstance
  };

  return formInstance;
};

export { useForm };
