'use client'

import { createContext, SyntheticEvent, ReactNode, FC } from "react";
import { UseFormReturn } from "./hooks/useForm";
import './style.css'

interface FormProps {
    children: ReactNode;
    form: UseFormReturn;
    initialValues?: Record<string, unknown>;
    onFinish: (values: Record<string, unknown>) => void;
    onReset?: () => void;
}

export const FormContext = createContext<UseFormReturn | null>(null);

export const Form: FC<FormProps> = ({ children, form, onFinish, onReset }) => {
    const formInstance = form;

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const isValid = await formInstance.validateFields();
        if (isValid) {
            onFinish(formInstance.getFieldsValue());
        }
    };

    return (
        <FormContext.Provider value={formInstance}>
            <form onSubmit={handleSubmit} onReset={onReset || formInstance.resetFields}>{children}</form>
        </FormContext.Provider>
    );
};
