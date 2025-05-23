import { FormInstance, FormItemProps, FormProps } from '../../types/form';
import { FC } from 'react';
export declare const FormContext: import("react").Context<FormInstance | null>;
declare const Form: FC<FormProps> & {
    Item: FC<FormItemProps>;
};
export default Form;
