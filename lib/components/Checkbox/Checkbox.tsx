import React, { ForwardedRef } from 'react';
import { CheckboxProps } from '../../types/checkbox';
import { clsx } from '../../helpers';

const Checkbox = ({
  prefixCls,
  className = '',
  style,
  disabled = false,
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
  required = false,
  noStyle,
  checked,
  ref
}: CheckboxProps & { ref: ForwardedRef<HTMLDivElement> }) => {
  return (
    (
      <div className={`${prefixCls}-wrapper`}>
        <div
          ref={ref}
          style={style}
          onClick={onClick}
          className={clsx([
            prefixCls,
            className,
            {
              noStyle: noStyle,
              [`${prefixCls}-disabled`]: disabled,
              [`${prefixCls}-checked`]: checked
            }
          ])}
        >
          <input
            id={id}
            type={type}
            name={name}
            disabled={disabled}
            tabIndex={tabIndex}
            required={required}
            autoFocus={autoFocus}
            onKeyDown={onKeyDown}
            onKeyPress={onKeyPress}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />

          <span className={`${prefixCls}-box`}>
            <span
              className={`${prefixCls}-check`}
              style={{ opacity: Number(checked) }}
            />
          </span>
        </div>

        {children && <span className={`${prefixCls}-label`}>{children}</span>}
      </div>
    )
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;