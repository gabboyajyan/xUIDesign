import { cloneElement, FC, ReactElement, useContext, useEffect } from "react";
import { Rule } from "../hooks/useForm";
import { FormContext } from "..";
import "./style.css";

interface FormItemProps {
    name: string;
    label: string;
    rules?: Rule[];
    children: ReactElement;
    className?: string;
}

export const FormItem: FC<FormItemProps> = ({ name, label, rules = [], children, className }) => {
    const formContext = useContext(FormContext);
    if (!formContext) {
        throw new Error("FormItem must be used within a Form");
    }

    const { registerField, setFieldValue, getFieldValue, validateField, errors } = formContext;

    useEffect(() => {
        registerField(name, rules);
    }, [name, registerField, rules]);

    return (
        <div className={"xFormItem " + className}>
            <label className="xInputLabel" htmlFor={name}>{label}</label>
            {cloneElement(children, {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                value: getFieldValue(name),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(name, e.target.value),
                onBlur: () => validateField(rules, name),
                error: errors[name]
            })}
            {errors[name] && <span className="xError">{errors[name]}</span>}
        </div>
    );
};