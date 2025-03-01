import { createContext, FC, ReactNode, SyntheticEvent } from "react";
import { useForm } from "./hooks/useForm";
import { FormInstance, RuleType } from "./types";

export const FormContext = createContext<FormInstance | null>(null);

interface FormProps {
    children: ReactNode;
    form?: FormInstance;
    onFinish: (values: Record<string, RuleType>) => void;
}

export const Form: FC<FormProps> = ({ children, form, onFinish }) => {
    const internalForm = useForm();
    const formInstance = form || internalForm;

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        
        if (await formInstance.validateFields()) {
            onFinish(formInstance.getFieldsValue());
        }
    };

    return (
        <FormContext.Provider value={formInstance}>
            <form onSubmit={handleSubmit}>{children}</form>
        </FormContext.Provider>
    );
};