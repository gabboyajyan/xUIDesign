'use client';

import {
  Children,
  createContext,
  FC,
  Fragment,
  isValidElement,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { useForm } from '@/hooks/useForm';
import { FormInstance, FormItemProps, FormProps } from '@/types/form';
import { prefixClsForm } from '@/utils';
import FormItem from './Item';

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
        {Children.map(childrenList, child => {
          if (isValidElement(child) && child.type !== Fragment) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const { ...childProps } = child.props;

            return (
              <child.type
                {...childProps}
                child={child}
                size={childProps.size || rest.size}
                layout={childProps.layout || layout}
              />
            );
          }

          return child;
        })}
      </form>
    </FormContext.Provider>
  );
};

Form.Item = FormItem;

export default Form;
