import { MouseEvent } from 'react';
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
    disabled,
    children,
    name,
    title,
    defaultChecked,
    checked
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

    const handleOnClick = (e: MouseEvent<HTMLLabelElement> & TargetProps) => {
        const isRadioChecked = parseValue(e.target.value) 

        e.target.valueAnyType = isRadioChecked

        if (!disabled) {
            onChange?.(e)
        }
    }

    return (
        <label
            title={title}
            onClick={handleOnClick}
            className={cc([
                `${prefixCls}-label`,
                { disabled }
            ])}
        >
            <input
                name={name}
                type='radio'
                onChange={() => {}}
                disabled={disabled}
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