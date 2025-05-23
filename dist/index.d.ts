import * as react_jsx_runtime from 'react/jsx-runtime';
import { EmptyContentProps } from 'lib/types/empty';
import { ReactNode, ReactElement } from 'react';
import { ButtonProps } from 'lib/types/button';
import { CheckboxProps } from 'lib/types/checkbox';
import { RuleTypes, RuleType } from 'lib/types';
import { FieldData, FormInstance } from 'lib/types/form';

declare const EmptyContent: ({ icon, style, className, title, description, prefixCls }: EmptyContentProps) => react_jsx_runtime.JSX.Element;

declare const Button: ({ type, variant, color, shape, size, htmlType, className, rootClassName, classNames: customClassNames, styles, prefixCls, iconPosition, disabled, ghost, danger, block, children, href, iconNode, isLoading, ...restProps }: ButtonProps & {
    iconNode?: ReactNode;
    isLoading?: boolean;
}) => ReactElement;

declare const Checkbox: {
    ({ prefixCls, className, defaultChecked, checked, style, disabled, onChange, onClick, onMouseEnter, onMouseLeave, onKeyPress, onKeyDown, tabIndex, name, children, id, autoFocus, type, value, required, noStyle }: CheckboxProps): ReactElement;
    displayName: string;
};

declare const useForm: (initialValues?: Record<string, RuleTypes>, onFieldsChange?: (changedFields: FieldData[]) => void, onValuesChange?: (changedValues: Record<string, RuleTypes>, allValues: Record<string, RuleTypes>) => void) => FormInstance;

type UseWatchProps = {
    name?: string;
    defaultValue?: RuleType;
    form?: FormInstance;
};
declare const useWatch: ({ name, defaultValue, form }: UseWatchProps) => any;

export { Button, Checkbox, EmptyContent as Empty, useForm, useWatch };
