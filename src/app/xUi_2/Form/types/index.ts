import type { ReactElement } from 'react';

export type InternalNamePath = (string | number)[];
export type Store = Record<string, RuleType>;

export interface Meta {
    touched: boolean;
    validating: boolean;
    errors: string[];
    warnings: string[];
    name: InternalNamePath;
}

export interface InternalFieldData extends Meta {
    value: RuleType;
}

export interface FieldData extends Partial<Omit<InternalFieldData, 'name'>> {
    name: string;
}

export type RuleType = string | number | boolean | object;

export type Validator = (rule: RuleObject, value: RuleType, callback: (error?: string) => void) => Promise<void | RuleType> | void;

export type RuleRender = (form: FormInstance) => RuleObject;

export interface ValidatorRule {
    warningOnly?: boolean;
    message?: string | ReactElement;
    validator: Validator;
}

interface BaseRule {
    warningOnly?: boolean;
    enum?: RuleType[];
    len?: number;
    max?: number;
    message?: string;
    min?: number;
    pattern?: RegExp;
    required?: boolean;
    transform?: (value: RuleType) => RuleType;
    type?: RuleType;
    whitespace?: boolean;
    validateTrigger?: string | string[];
}

type AggregationRule = BaseRule & Partial<ValidatorRule>;

interface ArrayRule extends Omit<AggregationRule, 'type'> {
    type: 'array';
    defaultField?: RuleObject;
}

export type RuleObject = AggregationRule | ArrayRule;
export type Rule = RuleObject | RuleRender;

export interface FieldError {
    name: InternalNamePath;
    errors: string[];
    warnings: string[];
}

export interface FormInstance<Values = RuleType> {
    getFieldValue: (name: string) => RuleType;
    getFieldsValue: (nameList?: string[]) => Record<string, RuleType>;
    getFieldError: (name: string) => string[];
    getFieldsError: (nameList?: string[]) => FieldError[];
    isFieldsTouched: (allFieldsTouched?: boolean) => boolean;
    isFieldTouched: (name: string) => boolean;
    isFieldValidating: (name: string) => boolean;
    resetFields: (fields?: string[]) => void;
    setFields: (fields: FieldData[]) => void;
    setFieldsValue: (values: Partial<Values>) => void;
    validateFields: (rules?: RuleObject[]) => Promise<boolean>;
    setFieldValue: (name: string, value: RuleType) => void;
    registerField: (name: string, rules?: RuleObject[]) => void;
    submit: () => void;
}
