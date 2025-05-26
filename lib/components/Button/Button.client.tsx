'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Button from './Button';
import { ButtonProps } from '../../types/button';
import { prefixClsButton } from '../../utils';

const ButtonClient = (props: ButtonProps) => {
  const {
    loading = false,
    icon,
    prefixCls = prefixClsButton,
  } = props;

  const [innerLoading, setInnerLoading] = useState(false);

  useEffect(() => {
    if (typeof loading === 'boolean') {
      setInnerLoading(loading);
    } else if (typeof loading === 'object' && loading.delay) {
      const timeout = setTimeout(() => setInnerLoading(true), loading.delay);
      return () => clearTimeout(timeout);
    } else {
      setInnerLoading(!!loading);
    }
  }, [loading]);

  const iconNode = useMemo(() => {
    return innerLoading
      ? (typeof loading === 'object' && loading.icon) || (
          <span className={`${prefixCls}-spinner`}></span>
        )
      : icon;
  }, [icon, innerLoading, loading, prefixCls]);

  return <Button {...props} isLoading={innerLoading} iconNode={iconNode} />;
};

export default ButtonClient;
