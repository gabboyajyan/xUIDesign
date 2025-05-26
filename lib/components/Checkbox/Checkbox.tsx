import { prefixClsCheckbox } from '@/utils';
import { CheckboxProps } from '../../types/checkbox';
import React, { Dispatch, ForwardedRef, forwardRef, ReactElement, SetStateAction } from 'react';
import { clsx } from '../../helpers';
import './style.css';

const Checkbox = forwardRef<HTMLDivElement, CheckboxProps & {
  internalChecked: boolean,
  setInternalChecked?: Dispatch<SetStateAction<boolean>>
}>(
  (
    {
      prefixCls = prefixClsCheckbox,
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
      internalChecked,
      required = false,
      noStyle
    },
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
  return <div className={`${prefixCls}-wrapper`}>
        <div
          ref={ref}
          style={style}
          onClick={(e) => {
            onClick?.(e)
          }}
          className={clsx([
            prefixCls,
            className,
            {
              noStyle: noStyle,
              [`${prefixCls}-disabled`]: disabled,
              [`${prefixCls}-checked`]: internalChecked
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
              style={{ opacity: Number(internalChecked) }}
            />
          </span>
        </div>

        {children && <span className={`${prefixCls}-label`}>{children}</span>}
      </div>
})

Checkbox.displayName = "Checkbox";

export default Checkbox;
