"use client"

import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useEffect,
  useState
} from 'react';
import { CheckboxProps } from '../../types/checkbox';
import Checkbox from './Checkbox';

const CheckboxClient = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      defaultChecked = false,
      checked,
      value = false,
      ...props
    },
    ref: ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    const isChecked = checked !== undefined ? checked : defaultChecked || value;
    const [internalChecked, setInternalChecked] = useState(isChecked);

    useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    return (
      <Checkbox
        ref={ref}
        {...props}
        internalChecked={internalChecked}
        setInternalChecked={setInternalChecked}
      />
    )
  }
);

CheckboxClient.displayName = 'CheckboxClient';

export default Checkbox;
