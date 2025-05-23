'use client';

import React, {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  ReactElement,
  useEffect,
  useState
} from 'react';
import { SyntheticBaseEvent } from '../../types';
import { CheckboxProps } from '../../types/checkbox';
import Checkbox from './Checkbox';
import './style.css';

const CheckboxClient = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      defaultChecked = false,
      checked,
      disabled = false,
      onChange,
      onClick,
      value = false,
      ...props
    },
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    const isChecked = checked !== undefined ? checked : defaultChecked || value;
    const [internalChecked, setInternalChecked] = useState(isChecked);

    const handleClick = (
      e: MouseEvent<HTMLInputElement> & SyntheticBaseEvent
    ) => {
      console.log(e);
      
      e.stopPropagation();

      if (disabled) {
        return;
      }

      setInternalChecked(!internalChecked);
      e.target.value = !internalChecked;

      onClick?.(e);
      onChange?.(e);
    };

    useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    return (
      <Checkbox
        ref={ref}
        {...props}
        onClick={handleClick}
        checked={internalChecked}
      />
    )
  }
);

CheckboxClient.displayName = 'CheckboxClient';

export default CheckboxClient;