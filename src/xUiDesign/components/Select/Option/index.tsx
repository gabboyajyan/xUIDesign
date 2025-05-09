import { FC, MouseEventHandler } from 'react';
import cc from 'classcat';
import { OptionProps } from '@/xUiDesign/types/select';
import { prefixClsSelect } from '@/xUiDesign/utils';
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
  selected
}) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = e => {
    if (disabled) {
      return;
    }

    onClick?.(e);
  };

  return (
    <div
      className={cc([
        `${prefixCls}-option ${className} `,
        {
          selected: selected,
          disabled: disabled
        }
      ])}
      style={style}
      onClick={handleClick}
    >
      {render ? render(value as string) : children || value}
    </div>
  );
};

export { Option };
