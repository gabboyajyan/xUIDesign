export type RuleType = string | number | boolean | null | undefined;

export interface RuleObject {
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
    warningPattern?: RegExp;
    warningMessage?: string;
    validator?: (rule: RuleObject, value: RuleType, callback: (error?: string) => void) => Promise<void> | void;
}

export interface FieldData {
    name: string;
    value: RuleType;
}

export interface FieldError {
    name: string;
    errors: string[];
}

export interface FormInstance {
    submit: () => Promise<Record<string, RuleType> | undefined>;
    setFields: (fields: FieldData[]) => void;
    resetFields: () => void;
    getFieldError: (name: string) => string[];
    registerField: (name: string, rules?: RuleObject[]) => void;
    setFieldValue: (name: string, value: RuleType) => void;
    getFieldValue: (name: string) => RuleType;
    validateFields: () => Promise<boolean>;
    setFieldsValue: (values: Partial<Record<string, RuleType>>) => void;
    getFieldsValue: (nameList?: string[]) => Record<string, RuleType>;
    isFieldTouched: (name: string) => boolean;
    getFieldsError: () => Pick<FieldError, 'errors' | 'name'>[];
    isFieldsTouched: (nameList?: string[], allFieldsTouched?: boolean) => boolean;
    getFieldWarning: (name: string) => string[];
    isFieldValidating: (name: string) => boolean;
}
