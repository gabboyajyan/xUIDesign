import { ComponentClass, FC, FormEvent, ReactElement, ReactNode } from 'react';
import { DefaultProps, RuleTypes, SizeType } from '.';

export interface RuleObject {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  warningPattern?: RegExp;
  warningMessage?: string;
  validator?: (
    rule: RuleObject,
    value: RuleTypes,
    callback: (error?: string) => void
  ) => Promise<void> | void;
}

export interface FieldData {
  name: string;
  value: RuleTypes;
}

export interface FieldError {
  name: string;
  errors: string[];
}

type FormLayoutTypes = 'horizontal' | 'vertical' | 'inline';

export type FormProps = DefaultProps & {
  colon?: boolean;
  name?: string;
  layout?: FormLayoutTypes;
  form?: FormInstance;
  size?: SizeType;
  initialValues?: Record<string, RuleTypes>;
  children?: ReactNode;
  component?: false | string | FC<ReactNode> | ComponentClass<ReactNode>;
  fields?: FieldData[];
  onChange?: (e: FormEvent<HTMLFormElement>) => void;
  onFieldsChange?: (changedFields: FieldData[]) => void;
  onSubmitCapture?: (changedFields: FieldData[]) => void;
  onValuesChange?: (
    changedValues: Record<string, RuleTypes>,
    allValues: Record<string, RuleTypes>
  ) => void;
  onFinish?: (values: Record<string, RuleTypes>) => void;
  onFinishFailed?: (errorInfo: {
    values: Record<string, RuleTypes>;
    errorFields: Pick<FieldError, 'errors' | 'name'>[];
  }) => void;
};

export type FormItemProps = DefaultProps & {
  name: string;
  label?: string | ReactNode;
  rules?: RuleObject[];
  children:
    | (ReactElement & { props: { value: RuleTypes } })
    | (ReactElement & { props: { value: RuleTypes } })[];
  layout?: FormLayoutTypes;
};

export interface FormInstance {
  submit: () => Promise<Record<string, RuleTypes> | undefined>;
  setFields: (fields: FieldData[]) => void;
  resetFields: () => void;
  getFieldError: (name: string) => string[];
  registerField: (name: string, rules?: RuleObject[]) => void;
  setFieldValue: (name: string, value: RuleTypes) => void;
  getFieldValue: (name: string) => RuleTypes;
  validateFields: (nameList?: string[]) => Promise<boolean>;
  setFieldsValue: (values: Partial<Record<string, RuleTypes>>) => void;
  getFieldsValue: (nameList?: string[]) => Record<string, RuleTypes>;
  isFieldTouched: (name: string) => boolean;
  getFieldsError: () => Pick<FieldError, 'errors' | 'name'>[];
  isFieldsTouched: (nameList?: string[], allFieldsTouched?: boolean) => boolean;
  getFieldWarning: (name: string) => string[];
  subscribeToField: (
    name: string,
    callback: (value: RuleTypes) => void
  ) => () => void;
  subscribeToForm: (
    callback: (values: Record<string, RuleTypes>) => void
  ) => () => void;
  isFieldValidating: (name: string) => boolean;
  onFieldsChange?: (changedFields: FieldData[]) => void;
  onValuesChange?: (
    changedValues: Record<string, RuleTypes>,
    allValues: Record<string, RuleTypes>
  ) => void;
}
