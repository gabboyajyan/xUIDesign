import { ChangeEvent } from 'react';
import { RadioProps, RadioValueType } from '@/app/types/radio';
import { RuleType, TargetProps } from '@/app/types';
import { prefixClsRadio } from '@/app/utils';
import { RadioGroup } from './Group';
import cc from 'classcat';
import './style.css';

const Radio = ({
    prefixCls = prefixClsRadio,
    value,
    onChange,
    onClick,
    disabled,
    children,
    name,
    title,
    defaultChecked,
    checked,
    onBlur,
    onFocus,
    onMouseEnter,
    onMouseLeave
}: RadioProps) => {
    const parseValue = (value: RuleType): RuleType => {
        if (value === 'true') {
            return true;
        }

        if (value === 'false') {
            return false;
        }

        if (!isNaN(Number(value))) {
            return Number(value);
        }

        return value;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement> & TargetProps) => {
        if (!disabled) {
            e.target.valueAnyType = parseValue(e.target.value);

            onChange?.(e)
        }
    }

    return (
        <label
            title={title}
            tabIndex={-1}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={cc([`${prefixCls}-label`, { disabled }])}
        >
            <input
                name={name}
                type='radio'
                onBlur={(e) => {
                    console.log("Radio blurred", e);
                    onBlur?.(e);
                }}
                onFocus={(e) => {
                    console.log("Radio focused", e);
                    onFocus?.(e);
                }}
                onClick={onClick}
                disabled={disabled}
                onChange={handleChange}
                value={value as RadioValueType}
                checked={defaultChecked || checked}
            />

            <span className={prefixCls} />
            <span className={`${prefixCls}-title`}>{children}</span>
        </label>
    );
};

Radio.Group = RadioGroup

export { Radio };