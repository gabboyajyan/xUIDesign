import { RuleTypes } from '../types';
import type { FieldData, FormInstance } from '../types/form';
declare const useForm: (initialValues?: Record<string, RuleTypes>, onFieldsChange?: (changedFields: FieldData[]) => void, onValuesChange?: (changedValues: Record<string, RuleTypes>, allValues: Record<string, RuleTypes>) => void, scrollToFirstError?: boolean, onFinish?: ((values: Record<string, RuleTypes>) => void) | undefined) => FormInstance;
export { useForm };
