import { CSSProperties, FC, MouseEventHandler, ReactNode } from 'react';
import './style.css'

export interface OptionProps {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  render?: (label: string) => ReactNode;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
}

const Option: FC<OptionProps> = ({
  value,
  children,
  disabled,
  className = '',
  style,
  onClick,
  render,
}) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;
    onClick?.(e);
  };

  return (
    <div
      className={`custom-select-option ${className} ${disabled ? 'disabled' : ''}`}
      style={style}
      onClick={handleClick}
    >
      {render ? render(value) : children || value}
    </div>
  );
};

export { Option };
