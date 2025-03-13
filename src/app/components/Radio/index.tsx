import { RadioProps, RadioValueType } from '@/app/types/radio';
import { RadioGroup } from './Group';
import { SyntheticBaseEvent } from '@/app/types';
import { prefixClsRadio } from '@/app/utils';
import { parseValue } from '@/app/helpers';
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
    const handleChange = (e: SyntheticBaseEvent) => {
        if (!disabled) {
            e.target.value = parseValue(e.target.value);

            onChange?.(e);
        }
    };

    return (
        <label
            title={title}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={cc([`${prefixCls}-label`, { disabled }])}
        >
            <input
                name={name}
                type='radio'
                onClick={onClick}
                disabled={disabled}
                onChange={handleChange}
                onBlur={(e) => onBlur?.(e)}
                onFocus={(e) => onFocus?.(e)}
                value={value as RadioValueType}
                checked={defaultChecked ?? checked}
            />
            <span className={`${prefixCls} ${prefixCls}-${disabled ? 'disabled' : 'enabled'}`} />
            <span className={`${prefixCls}-title`}>{children ?? title ?? value}</span>
        </label>
    );
};

Radio.Group = RadioGroup;

export { Radio };