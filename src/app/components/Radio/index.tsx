import React, { ChangeEvent } from 'react';
import { RadioProps } from '@/app/types/radio';
import { TargetProps } from '@/app/types';
import { prefixClsRadio } from '@/app/utils';
import './style.css';

type RadioValueType = string | number | readonly string[] | undefined

const Radio = ({
    prefixCls = prefixClsRadio,
    value,
    onChange,
    disabled,
    children,
    name,
    title
}: RadioProps) => {
    const handleOnChange = (e: ChangeEvent<HTMLInputElement> & TargetProps) => {
        if (!disabled) {
            e.target.valueAnyType = e.target.value

            onChange?.(e)
        }
    }

    return (
        <label title={title} className={`${prefixCls}-label ${disabled ? 'disabled' : ''}`}>
            <input
                type='radio'
                disabled={disabled}
                onChange={handleOnChange}
                name={name || prefixClsRadio}
                value={value as RadioValueType}
            />
            <span className={prefixCls} />
            <span className={`${prefixCls}-title`}>{children}</span>
        </label>
    );
};

export { Radio };