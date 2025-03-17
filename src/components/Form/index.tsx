import { Children, cloneElement, createContext, FC, isValidElement, SyntheticEvent, useEffect, useRef } from 'react';
import { FormInstance, FormItemProps, FormProps } from '@/types/form';
import { useForm } from '@/hooks/useForm';
import { FormItem } from './Item';
import { prefixClsForm } from '@/utils';

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
  layout = 'horizontal',
  ...rest
}) => {
  const internalForm = useForm(initialValues, onFieldsChange, onValuesChange);
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

  useEffect(() => {

  }, [])

  return (
    <FormContext.Provider value={formInstance}>
      <form style={style} className={`${prefixCls} ${className}`} ref={formRef} onSubmit={handleSubmit} {...rest}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              ...rest,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              layout: child.props.layout || layout
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