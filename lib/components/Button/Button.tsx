import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { clsx } from '../../helpers';
import { ButtonProps } from '../../types/button';
import { prefixClsButton, prefixClsButtonV3 } from '../../utils';
import './style.css';

const ButtonComponent = ({
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
  prefixClsV3 = prefixClsButtonV3,
  icon,
  iconPosition = 'start',
  loading = false,
  disabled = false,
  ghost = false,
  danger = false,
  block = false,
  children,
  href,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __injected,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  child,
  ...restProps
}: ButtonProps): ReactElement => {
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

  const classes = useMemo(() => {
    return clsx([...new Set([
      prefixCls,
      prefixClsV3,
      rootClassName,
      `${prefixCls}-${type}`,
      `${prefixCls}-variant-${variant}`,
      `${prefixCls}-color-${color}`,
      `${prefixCls}-shape-${shape}`,
      `${prefixCls}-size-${size}`,
      `${prefixClsV3}-${type}`,
      `${prefixClsV3}-variant-${variant}`,
      `${prefixClsV3}-color-${color}`,
      `${prefixClsV3}-shape-${shape}`,
      `${prefixClsV3}-size-${size}`,
      {
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-ghost`]: ghost,
        [`${prefixCls}-danger`]: danger,
        [`${prefixCls}-loading`]: innerLoading,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixClsV3}-block`]: block,
        [`${prefixClsV3}-ghost`]: ghost,
        [`${prefixClsV3}-danger`]: danger,
        [`${prefixClsV3}-loading`]: innerLoading,
        [`${prefixClsV3}-disabled`]: disabled
      },
      className
    ])])
  }, [block, className, color, danger, disabled, ghost, innerLoading, prefixCls, prefixClsV3, rootClassName, shape, size, type, variant]);

  const iconNode = innerLoading
    ? (typeof loading === 'object' && loading.icon) || (
      <span className={`${prefixCls}-spinner ${prefixClsV3}-spinner`} />
    )
    : icon;

  const content = (
    <>
      {iconNode && iconPosition === 'start' && (
        <span
          className={clsx(`${prefixCls}-icon ${prefixClsV3}-icon`, customClassNames.icon)}
          style={styles.icon}
        >
          {iconNode}
        </span>
      )}
      <span className={`${prefixCls}-content ${prefixClsV3}-content`}>{children}</span>
      {iconNode && iconPosition === 'end' && (
        <span
          className={clsx(`${prefixCls}-icon ${prefixClsV3}-icon`, customClassNames.icon)}
          style={styles.icon}
        >
          {iconNode}
        </span>
      )}
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

export default ButtonComponent