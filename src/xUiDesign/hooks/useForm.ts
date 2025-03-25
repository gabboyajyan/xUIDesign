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
  const formInstance = {
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

  const touchedFieldsRef = useRef<Set<string>>(new Set());
  const rulesRef = useRef<Record<string, RuleObject[] | RuleRender>>({});
  const warningsRef = useRef<Record<string, string[]>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const formRef = useRef<Record<string, RuleTypes>>({ ...initialValues });
  const fieldInstancesRef = useRef<Record<string, FieldInstancesRef>>({});

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
    if (nameList?.length) {
      return nameList.reduce((acc, key) => {
        acc[key] = formRef.current[key];

        return acc;
      }, {} as Record<string, RuleTypes>);
    }

    return formRef.current;
  }

  function getFieldError(name: string): string[] {
    return errors[name] || [];
  }

  function getFieldsError(): Pick<FieldError, 'errors' | 'name'>[] {
    return Object.entries(errors).map(([name]) => ({
      name,
      errors: getFieldError(name)
    }));
  }

  function getFieldWarning(name: string): string[] {
    return warningsRef.current[name] || [];
  }

  function setFieldValue(name: string, value: RuleTypes) {
    if (value === undefined) {
      return;
    }

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
  }

  function setFieldsValue(values: Partial<Record<string, RuleTypes>>) {
    Object.entries(values).forEach(([name, value]) =>
      setFieldValue(name, value as RuleTypes)
    );
  }

  function setFields(fields: FieldData[]) {
    fields.forEach(({ name, value }) => setFieldValue(name, value));
  }

  function isFieldTouched(name: string): boolean {
    return touchedFieldsRef.current.has(name);
  }

  function isFieldsTouched(
    nameList?: string[],
    allFieldsTouched = false
  ): boolean {
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

  async function validateField(name: string) {
    let value = formRef.current[name];
    const rules = rulesRef.current[name] || [];
    const fieldErrors: string[] = [];
    const fieldWarnings: string[] = [];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    for (let rule of rules) {
      rule = typeof rule === 'function' ? rule(formInstance) : rule;

      console.log({ name, value });
      
      if (
        rule.required &&
        (value === undefined ||
          value === null ||
          value === '' ||
          value === false ||
          (Array.isArray(value) && !value.length))
      ) {
        fieldErrors.push(rule.message || 'This field is required');
      }

      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        Array.isArray(value)
      ) {
        if (typeof value === 'number') {
          value = `${value}`;
        }

        if (rule.min !== undefined && value.length < rule.min) {
          fieldErrors.push(
            rule.message || `Must be at least ${rule.min} characters`
          );
        }

        if (rule.max !== undefined && value.length > rule.max) {
          fieldErrors.push(
            rule.message || `Must be at most ${rule.max} characters`
          );
        }
      }

      if (rule.pattern && !rule.pattern.test(String(value))) {
        fieldErrors.push(rule.message || 'Invalid format');
      }

      if (rule.warningPattern && !rule.warningPattern.test(String(value))) {
        fieldWarnings.push(rule.warningMessage || 'Invalid format');
      }

      if (rule.validator) {
        try {
          await rule.validator(rule, value, (error: string) => {
            if (error) {
              fieldErrors.push(error);
            }
          });
        } catch (error) {
          fieldErrors.push(
            error instanceof Error ? error.message : String(error)
          );
        }
      }
    }

    setErrors(prev => ({ ...prev, [name]: fieldErrors }));
    warningsRef.current[name] = fieldWarnings;

    return fieldErrors.length === 0;
  }

  async function validateFields(nameList?: string[]) {
    let isValid = true;

    for (const name of Object.keys(formRef.current)) {
      if (nameList?.length) {
        if (nameList.includes(name) && !(await validateField(name))) {
          isValid = false;
        }
      } else {
        if (!(await validateField(name))) {
          isValid = false;
        }
      }
    }

    return isValid;
  }

  function registerField(name: string, rules: RuleObject[] = [], fieldRef?: FieldInstancesRef) {
    if (!(name in formRef.current)) {
      formRef.current[name] = initialValues[name];
    }

    rulesRef.current[name] = rules;

    if (fieldRef) {
      fieldInstancesRef.current[name] = fieldRef;
    }
  }

  function resetFields() {
    formRef.current = { ...initialValues };
    touchedFieldsRef.current.clear();
    warningsRef.current = {};
    setErrors({});
    formSubscribers.current.forEach(callback => callback(getFieldsValue()));
  }

  async function submit() {
    if (await validateFields()) {
      return formRef.current;
    }
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

  return formInstance;
};

export { useForm };
