import React, { ChangeEvent } from 'react';
import { RadioProps } from '@/app/types/radio';
import { TargetProps } from '@/app/types';
import { prefixClsRadio } from '@/app/utils';
import './style.css';

const Radio = ({
    prefixCls = prefixClsRadio,
    value = '', 
    onChange, 
    disabled ,
    children,
    name
}: RadioProps) => {
    return (
        <label className={`${prefixCls}-label ${disabled ? 'disabled' : ''}`}>
            <input
                type='radio'
                value={value}
                disabled={disabled}
                name={name || prefixClsRadio}
                onChange={(e: ChangeEvent<HTMLInputElement> & TargetProps) => {
                    if (!disabled) {
                        e.target.valueAnyType = value

                        onChange?.(e)
                    }
                }}
            />
            <span className={prefixCls} />
            {children}
        </label>
    );
};

export { Radio };