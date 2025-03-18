import {
  Children,
  cloneElement,
  createContext,
  FC,
  isValidElement,
  SyntheticEvent,
  useEffect,
  useMemo,
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
  layout = 'vertical',
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

  const childrenList = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  return (
    <FormContext.Provider value={formInstance}>
      <form
        style={style}
        className={`${prefixCls} ${className}`}
        ref={formRef}
        onSubmit={handleSubmit}
        {...rest}
      >
        {Children.map(childrenList, child => {
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

Form.Item = FormItem;

export { Form };
