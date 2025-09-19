import { RuleTypes } from '../types';
import type { FieldData, FieldError, FormInstance } from '../types/form';
declare const useForm: ({ initialValues, onFieldsChange, onValuesChange, scrollToFirstError, onFinish, onFinishFailed }: {
    initialValues?: Record<string, RuleTypes>;
    onFieldsChange?: (changedFields: FieldData[]) => void;
    onValuesChange?: (changedValues: Record<string, RuleTypes>, allValues: Record<string, RuleTypes>) => void;
    scrollToFirstError?: boolean;
    onFinish?: ((values: Record<string, RuleTypes>) => void) | undefined;
    onFinishFailed?: (errorInfo: {
        values: Record<string, RuleTypes>;
        errorFields: Pick<FieldError, "errors" | "name">[];
    }) => void;
}) => FormInstance;
export { useForm };
