import React, {
  Children,
  isValidElement,
  useMemo
} from 'react';
import { clsx } from '../../../helpers';
import { RuleType } from '../../../types';
import { RadioGroupProps } from '../../../types/radio';
import { prefixClsRadio, prefixClsRadioV3 } from '../../../utils';
import Radio from '../Radio';
import RadioButton from '../Button/Button';
import './style.css';

const RadioGroup = ({
  defaultValue,
  value,
  size = 'large',
  disabled,
  name,
  id,
  style = {},
  buttonStyle = 'outline',
  block,
  prefixCls = prefixClsRadio,
  prefixClsV3 = prefixClsRadioV3,
  className = '',
  options = [],
  children,
  ...props
}: RadioGroupProps) => {
  const selectedValue = useMemo(
    () => (value !== undefined ? value : defaultValue),
    [value, defaultValue]
  );

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
            disabled={
              disabled || (typeof option === 'object' && option.disabled)
            }
            {...props}
          >
            {optionLabel}
          </Radio>
        );
      });
    }

    return Children.map(children, child => {
      if (
        isValidElement(child) &&
        (child.type === Radio || child.type === RadioButton)
      ) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          const { ...childProps } = child.props;

          return (
            <child.type
              {...props}
              {...childProps}
              {...(child.type === RadioButton ? { size, buttonStyle } : {})}
              defaultValue={defaultValue}
              disabled={disabled ?? (child.props as { disabled: boolean }).disabled}
              checked={selectedValue === (child.props as { value: RuleType }).value}
              name={name ?? prefixClsRadio}
            />
          );
        }

        return child;
    });
  };

  return (
    <div
      id={id}
      style={style}
      className={clsx([
        `${prefixCls}-group ${prefixClsV3}-group`,
        {
          block,
          className,
          [`${prefixCls}-group-${size} ${prefixClsV3}-group-${size}`]: size,
          [`${prefixCls}-group-solid ${prefixClsV3}-group-solid`]: buttonStyle === 'solid'
        }
      ])}
    >
      {renderChildren()}
    </div>
  );
};

export default RadioGroup;
