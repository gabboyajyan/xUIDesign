import { FormItemProps } from '../../../types/form';
import { prefixClsFormItem } from '../../../utils';
import FormItemClient from './FormItem.client';

const FormItem = ({
  prefixCls = prefixClsFormItem,
  name,
  label,
  rules = [],
  children,
  className = '',
  layout = 'vertical',
  style = {},
  valuePropName,
  dependencies = [],
  initialValue,
  feedbackIcons,
  ...props
}: FormItemProps) => {
  return (
    <FormItemClient
      prefixCls={prefixCls}
      name={name}
      label={label}
      rules={rules}
      className={className}
      layout={layout}
      style={style}
      valuePropName={valuePropName}
      dependencies={dependencies}
      initialValue={initialValue}
      feedbackIcons={feedbackIcons}
      {...props}
    >
      {children}
    </FormItemClient>
  );
};

FormItem.displayName = 'FormItem';

export default FormItem;