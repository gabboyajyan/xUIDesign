import { Children, cloneElement, createContext, FC, isValidElement, ReactNode, SyntheticEvent, useEffect, useRef } from 'react';
import { FormInstance, RuleType, FieldData, FieldError } from '@/app/types/form';
import { useForm } from '@/app/hooks/useForm';
import { InputSize } from '@/app/components/Input';
import { FormItem, FormItemProps } from './Item';

export const FormContext = createContext<FormInstance | null>(null);

interface FormProps {
  prefixCls?: string;
  colon?: boolean;
  name?: string;
  layout?: 'horizontal' | 'vertical' | 'inline';
  form?: FormInstance;
  size?: InputSize;
  initialValues?: Record<string, RuleType>;
  children?: ReactNode;
  component?: false | string | React.FC<ReactNode> | React.ComponentClass<ReactNode>;
  fields?: FieldData[];
  onValuesChange?: (changedValues: Record<string, RuleType>, allValues: Record<string, RuleType>) => void;
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;
  onFinish?: (values: Record<string, RuleType>) => void;
  onFinishFailed?: (errorInfo: { values: Record<string, RuleType>; errorFields: Pick<FieldError, "errors" | "name">[] }) => void;
}

const Form: FC<FormProps> & { Item: FC<FormItemProps> } = ({
  children,
  form,
  onFinish,
  onFinishFailed,
  initialValues = {},
  onValuesChange,
  onFieldsChange,
  layout = 'horizontal',
  ...rest
}) => {
  const internalForm = useForm(initialValues);
  const formInstance = form || internalForm;
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (await formInstance.validateFields()) {
      onFinish?.(formInstance.getFieldsValue());
    } else if (onFinishFailed) {
      const errorFields = formInstance.getFieldsError();
      onFinishFailed({ values: formInstance.getFieldsValue(), errorFields });
    }
  };

  useEffect(() => {
    if (onFieldsChange) {
      formInstance.onFieldsChange = (changedFields, allFields) => {
        onFieldsChange(changedFields, allFields);
      };
    }

    if (onValuesChange) {
      formInstance.onValuesChange = (changedValues, allValues) => {
        onValuesChange(changedValues, allValues);
      };
    }
  }, [formInstance, onFieldsChange, onValuesChange]);

  return (
    <FormContext.Provider value={formInstance}>
      <form ref={formRef} onSubmit={handleSubmit} {...rest}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              layout,
              ...rest
            });
          }

          return child;
        })}
      </form>
    </FormContext.Provider>
  );
};

Form.Item = FormItem

export { Form };