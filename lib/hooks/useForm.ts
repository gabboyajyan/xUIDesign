'use client';

import { useRef, useState } from 'react';
import { RuleType, RuleTypes } from '../types';
import type {
  FieldData,
  FieldError,
  FieldInstancesRef,
  FormInstance,
  RuleObject,
  RuleRender
} from '../types/form';

const useForm = (
  initialValues: Record<string, RuleTypes> = {},
  onFieldsChange?: (changedFields: FieldData[]) => void,
  onValuesChange?: (
    changedValues: Record<string, RuleTypes>,
    allValues: Record<string, RuleTypes>
  ) => void,
  scrollToFirstError?: boolean,
  onFinish?: ((values: Record<string, RuleTypes>) => void) | undefined,
  onFinishFailed?: (errorInfo: {
      values: Record<string, RuleTypes>;
      errorFields: Pick<FieldError, 'errors' | 'name'>[];
    }) => void
): FormInstance => {
  const touchedFieldsRef = useRef(new Set<string>());
  const rulesRef = useRef<Record<string, RuleObject[] | RuleRender>>({});
  const warningsRef = useRef<Record<string, string[]>>({});
  const _scrollToFirstError = useRef<boolean>(scrollToFirstError);
  const stepRef = useRef<number>(0);
  const formHandlersRef = useRef<{
    onFinish?: ((values: Record<string, RuleTypes>) => void) | undefined,
    onValuesChange?: (
      changedValues: Record<string, RuleTypes>,
      allValues: Record<string, RuleTypes>
    ) => void
    onFieldsChange?: (changedFields: FieldData[]) => void;
    onFinishFailed?: (errorInfo: {
      values: Record<string, RuleTypes>;
      errorFields: Pick<FieldError, 'errors' | 'name'>[];
    }) => void;
  }>({
    onFinish,
    onValuesChange,
    onFieldsChange,
    onFinishFailed
  })

  const formRef = useRef<Record<number, Record<string, RuleTypes>>>({ [stepRef.current]: { ...initialValues } });
  const trashFormRef = useRef<Record<string, RuleTypes>>({ ...initialValues });
  const fieldInstancesRef = useRef<Record<string, FieldInstancesRef | null>>({});

  const [isReseting, setIsReseting] = useState(false);
  
  const errorsRef = useRef<Record<string, string[]>>({});
  const errorSubscribers = useRef<
    Record<string, ((errors: string[]) => void)[]>
  >({});

  const fieldSubscribers = useRef<
    Record<string, ((value: RuleTypes) => void)[]>
  >({});

  const formSubscribers = useRef<
    ((values: Record<string, RuleTypes>) => void)[]
  >([]);

  function getFormFields() {
    return Object.assign({}, ...Object.values(formRef.current));
  }

  function getFieldInstance(name?: string) {
    return name ? fieldInstancesRef.current[name] : fieldInstancesRef.current;
  }

  function getFieldValue(name: string) {
    const formData = getFormFields();

    return formData[name]
  }

  function getFieldsValue(nameList?: string[]) {
    const formData = getFormFields();
    
    if (!nameList) {
      return formData;
    }

    return nameList.reduce((acc, key) => {
      acc[key] = formData[key];

      return acc;
    }, {} as Record<string, RuleTypes>);
  }

  function getFieldError(name: string) {
    return errorsRef.current[name] || [];
  }

  function getFieldWarning(name: string): string[] {
    return warningsRef.current[name] || [];
  }

  function getFieldsError(): Pick<FieldError, 'errors' | 'name'>[] {
    return Object.entries(errorsRef.current).map(([name, err]) => ({ name, errors: err }));
  }

  function setFieldValue(
    name: string,
    value: RuleTypes,
    errors?: string[],
    reset: boolean | null | undefined = undefined,
    touch?: boolean
  ) {
    if (
      !reset && reset !== null &&
      ([undefined, null].includes(value) || formRef.current[stepRef.current][name] === value)
    ) {
      return;
    }

    let isFieldExist = false;

    Object.values(formRef.current).forEach((_, step) => {
      if (formRef.current[step].hasOwnProperty(name)) {
        formRef.current[step][name] = value;

        isFieldExist = true;

        return;
      }
    })
 
    if (!isFieldExist) {
      formRef.current[stepRef.current][name] = value;
    }

    if (touch) {
      touchedFieldsRef.current.add(name);
    }

    if (reset === null) {
      errorsRef.current[name] = []
      notifyErrorSubscribers(name);

      return
    }

    if (!errors?.length) {
      validateField(name).then(() => {
        const allValues = getFieldsValue();
        fieldSubscribers.current[name]?.forEach(callback => callback(value));
        formSubscribers.current.forEach(callback => callback(allValues));

        if (formHandlersRef.current.onValuesChange) {
          formHandlersRef.current.onValuesChange({ [name]: value }, allValues);
        }

        if (formHandlersRef.current.onFieldsChange) {
          formHandlersRef.current.onFieldsChange([{ name, value }]);
        }
      });
    } else {
      errorsRef.current[name] = errors;
    }
  }

  function setFieldsValue(values: Partial<Record<string, RuleTypes>>, reset?: boolean | null | undefined) {
    Object.entries(values).forEach(([name, value]) =>
      setFieldValue(name, value as RuleTypes, undefined, reset)
    );
  }

  function setFields(fields: FieldData[]) {
    fields.forEach(({ name, value, errors }) =>
      setFieldValue(Array.isArray(name) ? name[0] : name, value, errors)
    );
  }

  function setFieldInstance(fieldName: string, fieldRef: FieldInstancesRef | null) {
    fieldInstancesRef.current[fieldName] = fieldRef;
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

  function registerField(name: string, rules: RuleObject[] = [], remove: boolean = false) {
    if (remove) {
      trashFormRef.current[name] = formRef.current[stepRef.current]?.[name];

      delete formRef.current[stepRef.current]?.[name];
      delete rulesRef.current[name];
      delete fieldInstancesRef.current[name];
    } else {
      if (!(name in formRef.current[stepRef.current])) {
        if (trashFormRef.current.hasOwnProperty(name)) {
          formRef.current[stepRef.current][name] = trashFormRef.current[name];

          delete trashFormRef.current[name];
        } else {
          const existFields: Record<string, RuleType> = {};

          Object.values(formRef.current).forEach((_, step) => {
            if (formRef.current[step].hasOwnProperty(name)) {
              existFields[name] = formRef.current[step][name]

              delete formRef.current[step][name];
            }
          })
          
          formRef.current[stepRef.current][name] = initialValues?.[name];

          if (Object.keys(existFields).length) {
            Object.entries(existFields).forEach(([_key, _value]) => {
              formRef.current[stepRef.current][_key] = _value
            })
          }
        }
      }

      rulesRef.current[name] = rules;
    }
  }

  async function validateField(name: string) {
    const value = formRef.current[stepRef.current][name];
    const rules = rulesRef.current[name] || [];
    const fieldErrors: string[] = [];
    const fieldWarnings: string[] = [];

    await Promise.all(
      [rules].flat(1).map(async (rule: RuleTypes) => {
        rule = typeof rule === 'function' ? rule(formInstance) : rule;

        if (
          rule.required &&
          ((rule.validateBooleanFalse && !value) ||
            value === undefined ||
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

        if (value !== undefined && rule.pattern && !rule.pattern.test(String(value))) {
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
    
    errorsRef.current[name] = fieldErrors
    warningsRef.current[name] = fieldWarnings;

    notifyErrorSubscribers(name);

    return fieldErrors.length === 0;
  }

  async function validateFields(nameList?: string[]) {
    const fieldsToValidate = nameList || Object.keys(formRef.current[stepRef.current]);

    const results = await Promise.all(
      fieldsToValidate.map(name => validateField(name))
    );

    const errorFields = formInstance.getFieldsError().filter(e => e.errors.length);

    if (errorFields.length) {
      formHandlersRef.current.onFinishFailed?.({ values: formInstance.getFieldsValue(), errorFields })
    }

    if (_scrollToFirstError.current) {
      const firstErrorContent = document.querySelectorAll('.xUi-form-item-has-error')?.[0];

      if (firstErrorContent) {
        firstErrorContent.closest('.xUi-form-item')?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }

    fieldsToValidate.forEach(name => notifyErrorSubscribers(name));

    return results.every(valid => valid);
  }

  function resetFields(nameList?: string[], showError: boolean | null = true) {
    const formData = getFormFields();

    if (nameList?.length) {
      nameList.forEach((name: string) => {
        formData[name] = initialValues[name];
        trashFormRef.current[name] = initialValues[name]

        touchedFieldsRef.current.delete(name);
        delete warningsRef.current[name];

        errorsRef.current[name] = [];
        notifyErrorSubscribers(name);

        setFieldValue(name, initialValues[name], undefined, showError);
      });
    } else {
      touchedFieldsRef.current.clear();
      warningsRef.current = {};

      Object.keys({
        ...formData,
      }).forEach(name => {
        setFieldValue(name, initialValues[name], undefined, showError);
      });
    }

    formSubscribers.current.forEach(callback => callback(getFieldsValue()));
    setIsReseting(prev => !prev);
  }

  async function submit() {
    const formData = getFormFields();

    return (await validateFields()) ? (() => {
      formHandlersRef.current.onFinish?.(formData)

      return formData
    })() : undefined;
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

  function subscribeToError(name: string, callback: (errors: string[]) => void) {
    if (!errorSubscribers.current[name]) {
      errorSubscribers.current[name] = [];
    }

    errorSubscribers.current[name].push(callback);

    return () => {
      errorSubscribers.current[name] = errorSubscribers.current[name].filter(
        cb => cb !== callback
      );
    };
  }

  function notifyErrorSubscribers(name: string) {
    const errors = getFieldError(name);
    errorSubscribers.current[name]?.forEach(cb => cb(errors));
  }

  function setScrollToFirstError(value: boolean) {
    _scrollToFirstError.current = value;
  }

  function setOnFieldsChange(
    onFieldsChange?: (changedFields: FieldData[]) => void
  ) {
    formHandlersRef.current.onFieldsChange = onFieldsChange
  }

  function setOnValuesChange(
    onValuesChange?: (changedValues: Record<string, RuleTypes>, allValues: Record<string, RuleTypes>) => void
  ) {
    formHandlersRef.current.onValuesChange = onValuesChange
  }

  function setOnFinish(
    onFinish?: ((values: Record<string, RuleTypes>) => void) | undefined
  ) {
    formHandlersRef.current.onFinish = onFinish;
  }

  function setOnFinishFailed(
    onFinishFailed?: ((errorInfo: {
      values: Record<string, RuleType>;
      errorFields: Pick<FieldError, "errors" | "name">[];
    }) => void) | undefined
  ) {
    formHandlersRef.current.onFinishFailed = onFinishFailed
  }

  function changeStep(step: number) {
    stepRef.current = step ?? 0;

    if (!formRef.current[stepRef.current]) {
      formRef.current[stepRef.current] = {};
    }
  }

  const formInstanceRef = useRef<FormInstance>(null);
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
    setOnFinishFailed,
    isFieldsTouched,
    getFieldWarning,
    isFieldValidating,
    subscribeToField,
    subscribeToForm,
    onFieldsChange,
    onValuesChange,
    getFieldInstance,
    setFieldInstance,
    subscribeToFields,
    setScrollToFirstError,
    subscribeToError,
    scrollToFirstError,
    isReseting,
    setOnFinish,
    setOnFieldsChange,
    setOnValuesChange,
    changeStep,
  };

  if (formInstanceRef.current) {
    return formInstanceRef.current
  } else {
    formInstanceRef.current = formInstance;

    return formInstanceRef.current
  }
};

export { useForm };
