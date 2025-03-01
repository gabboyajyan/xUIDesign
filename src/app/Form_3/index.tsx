import { createContext, FC, ReactNode, SyntheticEvent } from "react";
import { TFieldValue, useForm, UseFormReturn } from "./hooks/useForm";
import "./style.css";

export const FormContext = createContext<UseFormReturn | null>(null);

interface FormProps {
    children: ReactNode;
    form?: UseFormReturn;
    onFinish: (values: Record<string, TFieldValue>) => void;
}

export const Form: FC<FormProps> = ({ children, form, onFinish }) => {
    const internalForm = useForm();
    const formInstance = form || internalForm;

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (await formInstance.validateAll()) {
            onFinish(formInstance.values);
        }
    };

    return (
        <FormContext.Provider value={formInstance}>
            <form onSubmit={handleSubmit}>{children}</form>
        </FormContext.Provider>
    );
};