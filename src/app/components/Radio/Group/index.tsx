import {
    ReactElement,
    Children,
    isValidElement,
    cloneElement,
    useMemo,
} from 'react';
import { RadioGroupProps } from '@/app/types/radio';
import { prefixClsRadio } from '@/app/utils';
import { Radio } from '../';
import cc from 'classcat';
import { RuleType } from '@/app/types';

const RadioGroup = ({
    defaultValue,
    value,
    size,
    disabled,
    name,
    id,
    style = {},
    buttonStyle = 'outline',
    block,
    prefixCls = prefixClsRadio,
    className = '',
    options = [],
    children,
    ...props
}: RadioGroupProps) => {
    const selectedValue = useMemo(() => value !== undefined ? value : defaultValue, [value, defaultValue]);

    const renderChildren = () => {
        if (options.length > 0) {
            return options.map((option, key) => {
                const optionValue = typeof option === 'object' ? option.value : option;
                const optionLabel = typeof option === 'object' ? option.label : option;

                return (
                    <Radio
                        value={optionValue}
                        key={`${key}_${optionValue}`}
                        checked={selectedValue === optionValue}
                        disabled={disabled || (typeof option === 'object' && option.disabled)}
                        {...props}
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
                    disabled: disabled ?? (child.props as { disabled: boolean }).disabled,
                    checked: selectedValue === (child.props as { value: RuleType }).value,
                    name: name ?? prefixClsRadio,
                    ...props
                });
            }
            return child;
        });
    };

    return (
        <div
            style={style}
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
