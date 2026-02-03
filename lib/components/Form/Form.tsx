import React, {
  Children,
  createContext,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { useForm } from '../../hooks/useForm';
import { FormInstance, FormItemProps, FormLayoutTypes, FormProps } from '../../types/form';
import { prefixClsForm, prefixClsFormV3 } from '../../utils';
import FormItem from './Item/Item';
import { flattenChildren } from '../../helpers/flatten';
import { SizeType } from '../../types';

export const FormContext = createContext<FormInstance | null>(null);

const Form: FC<FormProps> & { Item: FC<FormItemProps> } = ({
  children,
  form,
  style = {},
  prefixCls = prefixClsForm,
  prefixClsV3 = prefixClsFormV3,
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
  const internalForm = useForm({ initialValues, onFieldsChange, onValuesChange, onFinishFailed });
  const formRef = useRef<HTMLFormElement>(null);

  const formInstance = useMemo(() => {
    const _form = form || internalForm;

    if (_form && Object.keys(initialValues).length) {
      Object.keys(initialValues).forEach((name) => {
        if (_form.getFieldValue(name) === undefined) {
          _form.setFieldValue(name, initialValues[name]);
        }
      });
    }

    return _form;
  }, [form, internalForm, initialValues]);
  const childrenList = useMemo(() => flattenChildren(children), [children])

  const handleSubmit = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await formInstance.submit();
  }, []);

  useEffect(() => {
    if (onFinish) { formInstance.setOnFinish?.(onFinish) }
    if (onFieldsChange) { formInstance.setOnFieldsChange?.(onFieldsChange) }
    if (onValuesChange) { formInstance.setOnValuesChange?.(onValuesChange) }
    if (onFinishFailed) { formInstance.setOnFinishFailed?.(onFinishFailed) }

    if (scrollToFirstError) { formInstance.setScrollToFirstError(scrollToFirstError) }
  }, [formInstance, onFieldsChange, onValuesChange, onFinishFailed, onFinish, scrollToFirstError]);

  const injectPropsIntoFinalLeaf = useCallback((child: ReactNode): ReactNode => {
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
        <child.type {...childProps}>
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
  }, [rest.size, layout]);

  return (
    <FormContext.Provider value={formInstance}>
      <form
        style={style}
        ref={formRef}
        onSubmit={handleSubmit}
        className={`${prefixCls} ${prefixClsV3} ${className}`}
      >
        {Children.map(childrenList, injectPropsIntoFinalLeaf)}
      </form>
    </FormContext.Provider>
  );
};

Form.Item = FormItem;

export default Form;
