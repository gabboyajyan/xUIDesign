import { ComponentClass, FC, FormEvent, ReactElement, ReactNode } from 'react';
import {
  DefaultProps,
  RuleType,
  RuleTypes,
  SizeType,
  SyntheticBaseEvent
} from '.';
import { OptionProps } from './select';

export type RuleRender = (form: FormInstance) => RuleObject;

export type RuleObject =
  | RuleRender
  | {
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
    validateBooleanFalse?: boolean;
    warningPattern?: RegExp;
    warningMessage?: string;
    validator?: (
      rule: RuleObject,
      value: RuleTypes,
      callback: (error?: string) => void
    ) => Promise<void> | void;
  };

export interface FieldData {
  name: string | string[];
  value?: RuleTypes;
  errors?: string[];
}

export type FieldInstancesInputRef = HTMLInputElement | null;
export type FieldInstancesRef = {
  input?: FieldInstancesInputRef;
};

export interface FieldError {
  name: string;
  errors: string[];
}

export type FormLayoutTypes = 'horizontal' | 'vertical' | 'inline';

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
  scrollToFirstError?: boolean;
};

export type FormItemProps = DefaultProps & {
  name: string;
  label?: string | ReactNode;
  rules?: RuleObject[];
  initialValue?: RuleType;
  children:
  | (ReactElement & { props: { value: RuleTypes } })
  | (ReactElement & { props: { value: RuleTypes } })[];
  layout?: FormLayoutTypes;
  dependencies?: string[];
  normalize?: (
    value: RuleType,
    prevValue: RuleType,
    allValues: RuleType
  ) => RuleType;
  feedbackIcons?: boolean;
  extra?: ReactNode;
  removeErrorMessageHeight?: boolean;
};

export interface FormItemChildComponentProps {
  child: ReactElement;
  name: string;
  error: boolean;
  fieldValue: RuleTypes;
  value: RuleType;
  setFieldValue: (
    name: string,
    value: RuleType,
    errors?: string[],
    reset?: boolean | null | undefined,
    touch?: boolean) => void;
  onChange?: (e: SyntheticBaseEvent, option?: OptionProps) => void;
  size?: SizeType;
  normalize?: (
    value: RuleType,
    prevValue: RuleType,
    allValues: RuleType
  ) => RuleType;
  noStyle?: boolean;
  feedbackIcons?: boolean;
}

export interface FormInstance {
  submit: () => Promise<Record<string, RuleTypes> | undefined>;
  setFields: (fields: FieldData[]) => void;
  resetFields: (nameList?: string[], showError?: boolean | null) => void;
  getFieldError: (name: string) => string[];
  registerField: (name: string, rules?: RuleObject[]) => void;
  setFieldValue: (name: string, value: RuleTypes, errors?: string[],
    reset?: boolean | null | undefined,
    touch?: boolean) => void;
  getFieldValue: (name: string) => RuleTypes;
  validateFields: (nameList?: string[]) => Promise<boolean>;
  setFieldsValue: (
    values: Partial<Record<string, RuleTypes>>,
    reset?: boolean | null | undefined
  ) => void;
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
  subscribeToFields: (
    names: string[],
    callback: (values: Record<string, RuleTypes>) => void
  ) => () => void;
  isFieldValidating: (name: string) => boolean;
  onFieldsChange?: (changedFields: FieldData[]) => void;
  onValuesChange?: (
    changedValues: Record<string, RuleTypes>,
    allValues: Record<string, RuleTypes>
  ) => void;
  getFieldInstance: (fieldName: string) => FieldInstancesRef;
  setScrollToFirstError: (value: boolean) => void;
  scrollToFirstError?: boolean;
  isReseting: boolean;
  setOnFieldsChange?: (
    onFieldsChange?: (changedFields: FieldData[]) => void
  ) => void;
  setOnFinish?: (onFinish?: ((values: Record<string, RuleTypes>) => void) | undefined) => void,
  setOnValuesChange?: (
    onValuesChange?: (
      changedValues: Record<string, RuleTypes>,
      allValues: Record<string, RuleTypes>
    ) => void
  ) => void;
}
