import { useContext, useEffect, ReactElement, FC, cloneElement } from "react";
import { FormContext } from ".";
import './style.css'

interface Rule {
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    validator?: (rules: Rule[], value: unknown) => Promise<void> | void;
}

interface FormItemProps {
    name: string;
    label: string;
    rules?: Rule[];
    children: ReactElement;
    classNames?: string;
    disabled?: boolean;
}

export const FormItem: FC<FormItemProps> = ({ name, label, rules = [], children, classNames, ...props }) => {
    const formContext = useContext(FormContext);
    if (!formContext) {
        throw new Error("FormItem must be used within a Form");
    }

    const { setFieldValue, getFieldValue, validateField, errors } = formContext;

    useEffect(() => {
        setFieldValue(name, getFieldValue(name) || "");
    }, []);

    return (
        <div className="form-item">
            <label htmlFor={name} title={label}>
                {label} {rules.some((rule) => rule.required) && <span className="required-marker">*</span>}
            </label>

            {cloneElement(children, {
                value: getFieldValue(name),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(name, e.target.value),
                onBlur: () => validateField(rules, name),
                className: classNames,
                error: errors[name],
                ...props,
            })}

            {!props.disabled && errors[name] && <span className="error">{errors[name]}</span>}
        </div>
    );
};
