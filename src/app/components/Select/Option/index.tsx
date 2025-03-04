import React, { MouseEventHandler } from 'react';

export interface OptionProps {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  render?: (label: string) => React.ReactNode;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
}

const Option: React.FC<OptionProps> = ({
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

export { Option};
