import { FC, MouseEventHandler } from 'react';
import { prefixClsSelect } from '@/src/app/utils';
import { OptionProps } from '@/src/app/types/select';
import './style.css'

const Option: FC<OptionProps> = ({
  value,
  children,
  disabled,
  className = '',
  style,
  onClick,
  render,
  prefixCls = prefixClsSelect
}) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;
    onClick?.(e);
  };

  return (
    <div
      className={`${prefixCls}-option ${className} ${disabled ? 'disabled' : ''}`}
      style={style}
      onClick={handleClick}
    >
      {render ? render(value) : children || value}
    </div>
  );
};

export { Option };
