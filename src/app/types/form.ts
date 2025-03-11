import { RuleTypes } from ".";

export type RuleType = (string | number | boolean | null | undefined) | (string | number | boolean | null | undefined[]);

export interface RuleObject {
	required?: boolean;
	message?: string;
	pattern?: RegExp;
	min?: number;
	max?: number;
	warningPattern?: RegExp;
	warningMessage?: string;
	validator?: (rule: RuleObject, value: RuleTypes, callback: (error?: string) => void) => Promise<void> | void;
}

export interface FieldData {
	name: string;
	value: RuleTypes;
}

export interface FieldError {
	name: string;
	errors: string[];
}

export interface FormInstance {
  submit: () => Promise<Record<string, RuleTypes> | undefined>;
  setFields: (fields: FieldData[]) => void;
  resetFields: () => void;
  getFieldError: (name: string) => string[];
  registerField: (name: string, rules?: RuleObject[]) => void;
  setFieldValue: (name: string, value: RuleTypes) => void;
  getFieldValue: (name: string) => RuleTypes;
  validateFields: () => Promise<boolean>;
  setFieldsValue: (values: Partial<Record<string, RuleTypes>>) => void;
  getFieldsValue: (nameList?: string[]) => Record<string, RuleTypes>;
  isFieldTouched: (name: string) => boolean;
  getFieldsError: () => Pick<FieldError, 'errors' | 'name'>[];
  isFieldsTouched: (nameList?: string[], allFieldsTouched?: boolean) => boolean;
  getFieldWarning: (name: string) => string[];
  subscribeToField: (name: string, callback: (value: RuleTypes) => void) => () => void,
  subscribeToForm: (callback: (values: Record<string, RuleTypes>) => void) => () => void,
  isFieldValidating: (name: string) => boolean;
  onFieldsChange?: (changedFields: FieldData[]) => void;
  onValuesChange?: (changedValues: Record<string, RuleTypes>, allValues: Record<string, RuleTypes>) => void;
}
