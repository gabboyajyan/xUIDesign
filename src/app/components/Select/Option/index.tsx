import { CSSProperties, FC, MouseEventHandler, ReactNode } from 'react';
import './style.css'
import { prefixClsSelect } from '@/app/utils';

export interface OptionProps {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  render?: (label: string) => ReactNode;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  prefixCls?: string;
}

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
