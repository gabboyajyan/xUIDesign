import { RadioProps, RadioValueType } from '@/xUiDesign/types/radio';
import { SyntheticBaseEvent } from '@/xUiDesign/types';
import { prefixClsRadio } from '@/xUiDesign/utils';
import { parseValue } from '@/xUiDesign/helpers';
import { RadioGroup } from './Group';
import { ForwardedRef, forwardRef } from 'react';
import { RadioButton } from './Button';
import cc from 'classcat';
import './style.css';

const RadioComponent = forwardRef<HTMLLabelElement, RadioProps>(({
    prefixCls = prefixClsRadio,
    className = '',
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
}, ref: ForwardedRef<HTMLLabelElement>) => {
    const handleChange = (e: SyntheticBaseEvent) => {
        if (!disabled) {
            e.target.value = parseValue(e.target.value);

            onChange?.(e);
        }
    };

    return (
        <label
            ref={ref}
            title={title}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={cc([`${prefixCls}-label`, {
                disabled,
                [className]: className
            }])}
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
});

RadioComponent.displayName = "Radio";
const Radio = Object.assign(RadioComponent, {
    Group: RadioGroup,
    Button: RadioButton
});

export { Radio };