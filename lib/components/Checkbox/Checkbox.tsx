import React, { ForwardedRef, ReactElement } from 'react';
import { CheckboxProps } from '../../types/checkbox';
import { prefixClsCheckbox } from '../../utils';
import { clsx } from '../../helpers';

const Checkbox = ({
  prefixCls = prefixClsCheckbox,
  className = '',
  defaultChecked = false,
  checked,
  style,
  disabled = false,
  onChange,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onKeyPress,
  onKeyDown,
  tabIndex,
  name,
  children,
  id,
  autoFocus,
  type = 'checkbox',
  value = false,
  required = false,
  noStyle,
  ref
}: CheckboxProps & {
  ref?: ForwardedRef<HTMLDivElement>
}): ReactElement => {
  const isChecked = checked !== undefined ? checked : defaultChecked || value;

  return (
    <div className={`${prefixCls}-wrapper`}>
      <div
        ref={ref}
        style={style}
        onClick={onChange}
        className={clsx([
          prefixCls,
          className,
          {
            noStyle: noStyle,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-checked`]: isChecked
          }
        ])}
      >
        <input
          id={id}
          type={type}
          name={name}
          checked={isChecked}
          disabled={disabled}
          tabIndex={tabIndex}
          required={required}
          autoFocus={autoFocus}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />

        <span className={`${prefixCls}-box`}>
          <span
            className={`${prefixCls}-check`}
            style={{ opacity: Number(isChecked) }}
          />
        </span>
      </div>

      {children && <span className={`${prefixCls}-label`}>{children}</span>}
    </div>
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;