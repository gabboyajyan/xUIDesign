import {
  Children,
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

interface FormChildComponentProps {
  child: React.ReactElement;
  layout?: 'vertical' | 'horizontal'
}

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

  const childrenList = useMemo(
    () => (Array.isArray(children) ? children : [children]).filter(Boolean),
    [children]
  );

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
        {Children.map(childrenList, (child) => {
          if (isValidElement(child)) {
            const { ...childProps } = child.props;

            return <FormChildComponent
              {...childProps}
              child={child}
              size={childProps.size || rest.size}
              layout={childProps.layout || layout}
            />
          }

          return child
        })}
      </form>
    </FormContext.Provider>
  );
};

const FormChildComponent = ({
  child,
  layout,
  ...props
}: FormChildComponentProps) => {
  return (
    <child.type
      {...props}
      layout={layout}
    />
  );
};

Form.Item = FormItem;

export { Form };
