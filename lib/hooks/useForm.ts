'use client';

import { useRef, useState } from 'react';
import { RuleTypes } from 'lib/types';
import type {
  FieldData,
  FieldError,
  FieldInstancesRef,
  FormInstance,
  RuleObject,
  RuleRender
} from 'lib/types/form';

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

  const formRef = useRef<Record<string, RuleTypes>>({ ...initialValues });
  const fieldInstancesRef = useRef<Record<string, FieldInstancesRef>>({});

  const [isReseting, setIsReseting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

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

  function setFieldValue(
    name: string,
    value: RuleTypes,
    errors?: string[],
    reset?: boolean
  ) {
    if (
      !reset &&
      ([undefined, null].includes(value) || formRef.current[name] === value)
    ) {
      return;
    }

    formRef.current[name] = value;
    touchedFieldsRef.current.add(name);

    if (!errors?.length) {
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
    } else {
      setErrors({ [name]: errors });
    }
  }

  function setFieldsValue(values: Partial<Record<string, RuleTypes>>) {
    Object.entries(values).forEach(([name, value]) =>
      setFieldValue(name, value as RuleTypes)
    );
  }

  function setFields(fields: FieldData[]) {
    fields.forEach(({ name, value, errors }) =>
      setFieldValue(Array.isArray(name) ? name[0] : name, value, errors)
    );
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

  function registerField(name: string, rules: RuleObject[] = []) {
    if (!(name in formRef.current)) {
      formRef.current[name] = initialValues?.[name];
    }

    rulesRef.current[name] = rules;
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

  function resetFields(nameList?: string[]) {
    if (nameList?.length) {
      nameList.forEach((name: string) => {
        formRef.current[name] = initialValues[name];
        touchedFieldsRef.current.delete(name);
        delete warningsRef.current[name];
        setErrors(prev => ({ ...prev, [name]: [] }));
        setFieldValue(name, initialValues[name], undefined, true);
      });
    } else {
      touchedFieldsRef.current.clear();
      warningsRef.current = {};

      Object.keys(formRef.current).forEach(name => {
        setFieldValue(name, initialValues[name], undefined, true);
      });
    }

    formSubscribers.current.forEach(callback => callback(getFieldsValue()));
    setIsReseting(prev => !prev);
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

  function subscribeToFields(
    names: string[],
    callback: (values: Record<string, RuleTypes>) => void
  ) {
    const fieldCallbacks = names.map(name =>
      subscribeToField(name, () => {
        const updatedValues = getFieldsValue(names);
        callback(updatedValues);
      })
    );

    return () => {
      fieldCallbacks.forEach(unsubscribe => unsubscribe());
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
    getFieldInstance,
    subscribeToFields,
    isReseting
  };

  return formInstance;
};

export { useForm };
