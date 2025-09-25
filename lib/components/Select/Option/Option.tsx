import React, { FC, MouseEventHandler } from 'react';
import { clsx } from '../../../helpers';
import { OptionProps } from '../../../types/select';
import { prefixClsSelect, prefixClsSelectV3 } from '../../../utils';
import './style.css';

const Option: FC<OptionProps> = ({
  value,
  children,
  disabled,
  className = '',
  style,
  onClick,
  render,
  prefixCls = prefixClsSelect,
  prefixClsV3 = prefixClsSelectV3,
  selected,
  title
}) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = e => {
    if (disabled) {
      return;
    }

    onClick?.(e);
  };

  return (
    <div
      className={clsx([
        `${prefixCls}-option ${prefixClsV3}-option ${className} `,
        {
          selected: selected,
          disabled: disabled
        }
      ])}
      style={style}
      onClick={handleClick}
      {...(title ? { title } : {})}
    >
      {render ? render(value as string) : children || value}
    </div>
  );
};

export default Option;
