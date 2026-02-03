import React, {
  MouseEvent,
  ReactElement,
  useEffect,
  useRef,
  useState
} from 'react';
import { clsx } from '../../../lib/helpers';
import { SyntheticBaseEvent } from '../../types';
import { CheckboxProps } from '../../types/checkbox';
import { prefixClsCheckbox, prefixClsCheckboxV3 } from '../../../lib/utils';
import './style.css';

const Checkbox = ({
  prefixCls = prefixClsCheckbox,
  prefixClsV3 = prefixClsCheckboxV3,
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
  titleClick,
  ref,
  controlled = false
}: CheckboxProps,
): ReactElement => {
  const isChecked = checked !== undefined ? checked : defaultChecked || value;
  const [internalChecked, setInternalChecked] = useState(isChecked);

  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (
    e: MouseEvent<HTMLInputElement> & SyntheticBaseEvent
  ) => {
    if (disabled) {
      e.stopPropagation();

      return;
    }

    if (checkboxRef.current) {
      if (!controlled) {
        e.target.value = !internalChecked;
        setInternalChecked(!internalChecked);
        checkboxRef.current.checked = !internalChecked
      } else {
        e.target.value = !checked;
        checkboxRef.current.checked = !checked
      }
    }

    onClick?.(e);
    onChange?.(e);
  };

  useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  return (
    <div className={`${prefixCls}-wrapper ${prefixClsV3}-wrapper`}>
      <div
        ref={ref}
        tabIndex={0}
        role="button"
        style={style}
        onClick={handleClick}
        className={clsx([
          prefixCls,
          prefixClsV3,
          className,
          {
            noStyle: noStyle,
            [`${prefixCls}-disabled ${prefixClsV3}-disabled`]: disabled,
            [`${prefixCls}-checked ${prefixClsV3}-checked`]: internalChecked
          }
        ])}
      >
        <input
          id={id}
          type={type}
          name={name}
          ref={checkboxRef}
          disabled={disabled}
          tabIndex={tabIndex}
          required={required}
          autoFocus={autoFocus}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />

        <span className={`${prefixCls}-box ${prefixClsV3}-box`}>
          <span
            className={`${prefixCls}-check ${prefixClsV3}-check`}
            style={{ opacity: internalChecked ? 1 : 0 }}
          />
        </span>
      </div>

      {titleClick
        ? <div onClick={handleClick}>{children}</div>
        : children && <span className={`${prefixCls}-label ${prefixClsV3}-label`}>{children}</span>
      }
    </div>
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
