import { FC, MouseEventHandler } from 'react';
import { clsx } from '@/helpers';
import { OptionProps } from '@/types/select';
import { prefixClsSelect } from '@/utils';
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
        `${prefixCls}-option ${className} `,
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
