'use client';

import React, {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactElement,
  useEffect,
  useState
} from 'react';
import { SyntheticBaseEvent } from '../../types';
import { CheckboxProps } from '../../types/checkbox';
import { clsx } from '../../helpers';
import { prefixClsCheckbox } from '../../utils';
import './style.css';

const CheckboxClient = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
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
      noStyle
    },
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(
      isControlled ? checked : defaultChecked || value
    );

    const currentChecked = isControlled ? checked : internalChecked;

    const handleClick = (
      e: MouseEvent<HTMLInputElement> & SyntheticBaseEvent
    ) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      if (!isControlled) {
        setInternalChecked(!currentChecked);
      }

      e.target.value = !currentChecked;

      onClick?.(e);
      onChange?.(e);
    };

    useEffect(() => {
      if (isControlled) {
        setInternalChecked(checked);
      }
    }, [checked, isControlled]);

    return (
      <div className={`${prefixCls}-wrapper`}>
        <div
          ref={ref}
          style={style}
          onClick={(e) => {

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            handleClick(e);
          }}
          className={clsx([
            prefixCls,
            className,
            {
              noStyle: noStyle,
              [`${prefixCls}-disabled`]: disabled,
              [`${prefixCls}-checked`]: currentChecked
            }
          ])}
        >
          <input
            id={id}
            type={type}
            name={name}
            disabled={disabled}
            checked={currentChecked}
            tabIndex={tabIndex}
            required={required}
            autoFocus={autoFocus}
            onKeyDown={onKeyDown}
            onKeyPress={onKeyPress}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            readOnly
          />

          <span className={`${prefixCls}-box`}>
            <span
              className={`${prefixCls}-check`}
              style={{ opacity: Number(currentChecked) }}
            />
          </span>
        </div>

        {children && <span className={`${prefixCls}-label`}>{children}</span>}
      </div>
    );
  }
);

CheckboxClient.displayName = 'CheckboxClient';

export default CheckboxClient;