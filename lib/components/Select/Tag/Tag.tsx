import React, { FC, MouseEvent } from 'react';
import { TargetProps } from '../../../types';
import { CustomTagProps } from '../../../types/select';
import { prefixClsSelect } from '../../../utils';
import './style.css';

const Tag: FC<CustomTagProps> = ({
  prefixCls = prefixClsSelect,
  style = {},
  onClose,
  value,
  label,
  closable,
  color,
  icon,
  className = ''
}) => {
  const handleOnClick = (e: MouseEvent<HTMLSpanElement> & TargetProps) => {
    e.preventDefault();
    e.stopPropagation();

    e.target.value = value;

    onClose?.(e);
  };

  return (
    <div
      style={{ ...style, backgroundColor: color }}
      className={`${prefixCls}-tag ${className}`}
    >
      <span>{label !== undefined ? label : value}</span>

      {closable && (
        <span className={`${prefixCls}-tag-close-icon`} onClick={handleOnClick}>
          {icon || <>&#x2715;</>}
        </span>
      )}
    </div>
  );
};

export default Tag;
