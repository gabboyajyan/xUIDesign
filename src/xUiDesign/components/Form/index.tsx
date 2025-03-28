import {
  createContext,
  FC,
  SyntheticEvent,
  useEffect,
  useRef
} from 'react';
import { useForm } from '@/xUiDesign/hooks/useForm';
import { FormInstance, FormItemProps, FormProps } from '@/xUiDesign/types/form';
import { prefixClsForm } from '@/xUiDesign/utils';
import { FormItem } from './Item';

export const FormContext = createContext<FormInstance | null>(null);

const Form: FC<FormProps> & { Item: FC<FormItemProps> } = ({
  children,
  form,
  style = {},
  prefixCls = prefixClsForm,
  className = '',
  onFinish,
  onFinishFailed,
  initialValues = {},
  onValuesChange,
  onFieldsChange,
  layout,
  ...rest
}) => {
  const internalForm = useForm(
    {
      initialValues,
      layout: layout || 'vertical',
      children,
      style,
      className,
      onFinish,
      onFinishFailed,
      ...rest
    },
    onFieldsChange,
    onValuesChange
  );

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
      formInstance.onFieldsChange = onFieldsChange;
    }

    if (onValuesChange) {
      formInstance.onValuesChange = onValuesChange;
    }
  }, [formInstance, onFieldsChange, onValuesChange]);

  return (
    <FormContext.Provider value={formInstance}>
      <form
        style={style}
        ref={formRef}
        onSubmit={handleSubmit}
        className={`${prefixCls} ${className}`}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Item = FormItem;

export { Form };
