import {
    ReactElement,
    Children,
    isValidElement,
    cloneElement,
    useMemo
} from 'react';
import { RadioGroupProps } from '@/app/types/radio';
import { prefixClsRadio } from '@/app/utils';
import { Radio } from '../';
import cc from 'classcat';

const RadioGroup = ({
    defaultValue,
    value,
    onChange,
    size,
    disabled,
    onMouseEnter,
    onMouseLeave,
    name,
    id,
    style = {},
    buttonStyle = 'outline',
    onFocus,
    onBlur,
    block,
    prefixCls = prefixClsRadio,
    className = '',
    options = [],
    children,
    // optionType = 'default',
}: RadioGroupProps) => {
    const selectedValue = useMemo(() => value !== undefined ? value : defaultValue, [value, defaultValue]);

    const renderChildren = () => {
        if (options.length > 0) {
            return options.map((option, key) => {
                const optionValue = typeof option === 'object' ? option.value : option;
                const optionLabel = typeof option === 'object' ? option.label : option;
                return (
                    <Radio
                        name={name}
                        value={optionValue}
                        onChange={onChange}
                        key={`${key}_${optionValue}`}
                        checked={selectedValue === optionValue}
                        disabled={disabled || (typeof option === 'object' && option.disabled)}
                    >
                        {optionLabel}
                    </Radio>
                );
            });
        }

        return Children.map(children, (child) => {
            if (isValidElement(child) && child.type === Radio) {
                return cloneElement(child as ReactElement, {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    disabled: disabled || child.props.disabled,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    checked: selectedValue === child?.props?.value,
                    name: name ?? prefixClsRadio,
                    onChange,
                });
            }

            return child;
        });
    };

    return (
        <div
            style={style}
            onBlur={onBlur}
            onFocus={onFocus}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={cc([
                `${prefixCls}-group`,
                {
                    block,
                    className,
                    [`${prefixCls}-group-${size}`]: size,
                    [`${prefixCls}-group-solid`]: buttonStyle === 'solid'
                }])}
            id={id}
        >
            {renderChildren()}
        </div>
    );
};

export { RadioGroup };
