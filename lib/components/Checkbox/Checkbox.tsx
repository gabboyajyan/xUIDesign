import { ReactElement } from 'react';
import { CheckboxProps } from '../../types/checkbox';
import { prefixClsCheckbox } from '../../../lib/utils';
import CheckboxClient from './Checkbox.client';

const Checkbox = ({
  prefixCls = prefixClsCheckbox,
  className = '',
  defaultChecked = false,
  checked,
  style,
  disabled = false,
  onChange,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onKeyPress,
  onKeyDown,
  tabIndex,
  name,
  children,
  id,
  autoFocus,
  type = 'checkbox',
  value = false,
  required = false,
  noStyle
}: CheckboxProps): ReactElement => {
  return (
    <CheckboxClient
      prefixCls={prefixCls}
      className={className}
      defaultChecked={defaultChecked}
      checked={checked}
      style={style}
      disabled={disabled}
      onChange={onChange}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      name={name}
      id={id}
      autoFocus={autoFocus}
      type={type}
      value={value}
      required={required}
      noStyle={noStyle}
    >
      {children}
    </CheckboxClient>
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;