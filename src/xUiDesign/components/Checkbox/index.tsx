import {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactElement,
  useEffect,
  useState
} from 'react';
import cc from 'classcat';
import { SyntheticBaseEvent } from '@/xUiDesign/types';
import { CheckboxProps } from '@/xUiDesign/types/checkbox';
import { prefixClsCheckbox } from '@/xUiDesign/utils';
import './style.css';

const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(({
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
  required = false
}, ref: ForwardedRef<HTMLDivElement>): ReactElement => {
  const isChecked = checked !== undefined ? checked : defaultChecked || value;
  const [internalChecked, setInternalChecked] = useState(isChecked);

  const handleClick = (
    e: MouseEvent<HTMLInputElement> & SyntheticBaseEvent
  ) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    setInternalChecked(!internalChecked);
    e.target.value = !internalChecked;

    onClick?.(e);
    onChange?.(e);
  };

  useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  return (
    <div className={`${prefixCls}-wrapper`}>
      <div
        ref={ref}
        style={style}
        onClick={handleClick}
        className={cc([
          prefixCls,
          className,
          {
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
  );
});

Checkbox.displayName = "Checkbox"

export { Checkbox };
