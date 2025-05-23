import React, { createContext, FC } from 'react';
import { FormInstance, FormItemProps, FormProps } from '../../types/form';
import { prefixClsForm } from '../../utils';
import FormItem from './Item/FormItem';
import FormClient from './Form.client';

export const FormContext = createContext<FormInstance | null>(null);

const Form: FC<FormProps> & { Item: FC<FormItemProps> } = ({
  children,
  style = {},
  prefixCls = prefixClsForm,
  className = '',
  layout = 'horizontal',
  ...rest
}) => {
  return (
    <FormClient
      style={style}
      prefixCls={prefixCls}
      className={className}
      layout={layout}
      {...rest}
    >
      {children}
    </FormClient>
  );
};

Form.Item = FormItem;

export default Form;