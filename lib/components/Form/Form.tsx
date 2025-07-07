'use client';

import React, {
  Children,
  createContext,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { useForm } from '../../hooks/useForm';
import { FormInstance, FormItemProps, FormLayoutTypes, FormProps } from '../../types/form';
import { prefixClsForm } from '../../utils';
import FormItem from './Item/Item';
import { flattenChildren } from '@/helpers/flatten';
import { SizeType } from '../../types';

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
  scrollToFirstError = false,
  ...rest
}) => {
  const internalForm = useForm(initialValues, onFieldsChange, onValuesChange);
  const formInstance = form || internalForm;
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    formInstance.setScrollToFirstError(scrollToFirstError);

    if (await formInstance.validateFields()) {
      onFinish?.(formInstance.getFieldsValue());
    } else if (onFinishFailed) {
      const errorFields = formInstance.getFieldsError();
      onFinishFailed({ values: formInstance.getFieldsValue(), errorFields });
    }
  };

  const childrenList = useMemo(() => flattenChildren(children), [children]);

  useEffect(() => {
    if (onFieldsChange) {
      formInstance.onFieldsChange = onFieldsChange;
    }

    if (onValuesChange) {
      formInstance.onValuesChange = onValuesChange;
    }
  }, [formInstance, onFieldsChange, onValuesChange]);

  const injectPropsIntoFinalLeaf = (child: ReactNode, key: number): ReactNode => {
    if (!isValidElement(child)) {
      return child;
    }

    const childProps = child.props as ReactElement & {
      children: ReactElement[],
      __injected: boolean;
      size?: SizeType;
      layout?: FormLayoutTypes;
    }

    const isWrapper =
      typeof child.type === 'string' &&
      !('dangerouslySetInnerHTML' in childProps) &&
      ['div', 'span', 'label'].includes(child.type);

    if (isWrapper) {
      return (
        <child.type {...childProps} data-item={key == 0 ? 'first-content' : ''}>
          {Children.map(flattenChildren(childProps.children), injectPropsIntoFinalLeaf)}
        </child.type>
      )
    }

    if (childProps?.__injected) {
      return child;
    }

    return <child.type
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      {...child.props}
      child={child}
      size={childProps.size || rest.size}
      layout={childProps.layout || layout}
    />
  };

  return (
    <FormContext.Provider value={formInstance}>
      <form
        style={style}
        ref={formRef}
        onSubmit={handleSubmit}
        className={`${prefixCls} ${className}`}
      >
        {Children.map(childrenList, (child, key) => injectPropsIntoFinalLeaf(child, key))}
      </form>
    </FormContext.Provider>
  );
};

Form.Item = FormItem;

export default Form;
