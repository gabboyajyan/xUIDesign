import { FC } from 'react';
import { FormInstance, FormItemProps, FormProps } from '@/types/form';
export declare const FormContext: import("react").Context<FormInstance | null>;
declare const Form: FC<FormProps> & {
    Item: FC<FormItemProps>;
};
export default Form;
