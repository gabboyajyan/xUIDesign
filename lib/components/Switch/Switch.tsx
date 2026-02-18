import React, { MouseEvent, useEffect, useState } from 'react';
import { SyntheticBaseEvent } from '../../types';
import { SwitchProps } from '../../types/switch';
import { prefixClsSwitch, prefixClsSwitchV3 } from '../../utils';
import './index.css';

const Switch = ({
  prefixCls = prefixClsSwitch,
  prefixClsV3 = prefixClsSwitchV3,
  checked,
  onChange,
  onClick,
  disabled = false,
  className = '',
  style = {},
  defaultChecked,
  value,
  controlled = false,
  icons,
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

    if (!controlled) {
      setInternalChecked(!internalChecked);
      e.target.value = !internalChecked;
    } else {
      e.target.value = !checked;
    }

    onClick?.(e.target.value);
    onChange?.(e.target.value);
  };

  useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  return (
    <div
      tabIndex={0}
      role="button"
      className={`${prefixCls}-wrapper ${prefixClsV3}-wrapper ${className} ${disabled ? `${prefixCls}__disabled ${prefixClsV3}__disabled` : ''}`}
      style={style}
    >
      <div
        className={`${prefixCls} ${prefixClsV3} ${internalChecked ? `${prefixCls}__checked ${prefixClsV3}__checked` : ''}`}
        onClick={handleClick}
      >
        <div className={`${prefixCls}__icon ${prefixClsV3}__icon ${internalChecked ? `${prefixCls}__icon-checked ${prefixClsV3}__icon-checked` : `${prefixCls}__icon-unchecked ${prefixClsV3}__icon-unchecked`}`}>
          {internalChecked ? icons.checked : icons.unchecked}
        </div>
        <div className={`${prefixCls}__slider ${prefixClsV3}__slider`}></div>
      </div>
    </div>
  );
};

Switch.displayName = 'Switch';

export default Switch