import React, { useState, useEffect } from 'react';
import {
  ButtonProps
} from '@/xUiDesign/types/button';
import { clsx } from '@/xUiDesign/helpers';
import { prefixClsButton } from '@/xUiDesign/utils';
import './style.css'

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  variant = 'solid',
  color = 'default',
  shape = 'default',
  size = 'middle',
  htmlType = 'button',
  className,
  rootClassName,
  classNames: customClassNames = {},
  styles = {},
  prefixCls = prefixClsButton,
  icon,
  iconPosition = 'start',
  loading = false,
  disabled = false,
  ghost = false,
  danger = false,
  block = false,
  children,
  href,
  ...restProps
}) => {
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

  const classes = clsx(
    prefixCls,
    rootClassName,
    `${prefixCls}-${type}`,
    `${prefixCls}-${variant}`,
    `${prefixCls}-${color}`,
    `${prefixCls}-${shape}`,
    `${prefixCls}-size-${size}`,
    {
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-ghost`]: ghost,
      [`${prefixCls}-danger`]: danger,
      [`${prefixCls}-loading`]: innerLoading,
      [`${prefixCls}-disabled`]: disabled,
    },
    className
  );

  const iconNode = innerLoading
    ? (typeof loading === 'object' && loading.icon) || <span className={`${prefixCls}-spinner`} />
    : icon;

  const content = (
    <>
      {iconNode && iconPosition === 'start' &&
        <span
          className={clsx(`${prefixCls}-icon`, customClassNames.icon)}
          style={styles.icon}>
          {iconNode}
        </span>}
      <span className={`${prefixCls}-content`}>
        {children}
      </span>
      {iconNode && iconPosition === 'end' &&
        <span
          className={clsx(`${prefixCls}-icon`, customClassNames.icon)}
          style={styles.icon}>
          {iconNode}
        </span>}
    </>
  );

  const mergedDisabled = disabled || innerLoading;

  if (href) {
    return (
      <a
        className={classes}
        href={mergedDisabled ? undefined : href}
        aria-disabled={mergedDisabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={htmlType}
      className={classes}
      disabled={mergedDisabled}
      {...restProps}
    >
      {content}
    </button>
  );
};

export default Button;
