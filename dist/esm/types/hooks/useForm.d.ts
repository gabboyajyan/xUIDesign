import { RuleTypes } from 'lib/types';
import type { FieldData, FormInstance } from 'lib/types/form';
declare const useForm: (initialValues?: Record<string, RuleTypes>, onFieldsChange?: (changedFields: FieldData[]) => void, onValuesChange?: (changedValues: Record<string, RuleTypes>, allValues: Record<string, RuleTypes>) => void) => FormInstance;
export { useForm };
