import { MouseEvent, useEffect, useState } from 'react';
import { SyntheticBaseEvent } from '../../types';
import { SwitchProps } from '../../types/switch';
import { prefixClsSwitch } from '@/utils';
import './index.css';

const Switch = ({
  prefixCls = prefixClsSwitch,
  checked = false,
  onChange,
  onClick,
  disabled = false,
  className = '',
  style = {},
  defaultChecked,
  value
}: SwitchProps) => {
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
    <div
      className={`${prefixCls} ${className}  ${disabled ? `${prefixCls}__disabled` : ''}`}
      style={style}
    >
      <div
        className={`${prefixCls} ${internalChecked ? `${prefixCls}__checked` : ''}`}
        onClick={handleClick}
      >
        <div className={`${prefixCls}__slider`}></div>
      </div>
    </div>
  );
};

Switch.displayName = 'Switch';

export default Switch