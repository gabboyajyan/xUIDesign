import { ReactElement } from 'react';
import { clsx } from '../../helpers';
import { ButtonProps } from '../../types/button';
import { prefixClsButton } from '../../utils';
import './style.css';

const Button = ({
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
}: ButtonProps): ReactElement => {
  const innerLoading = typeof loading === 'object' ? !!loading : Boolean(loading);

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
      [`${prefixCls}-disabled`]: disabled
    },
    className
  );

  const iconNode = innerLoading
    ? (typeof loading === 'object' && loading.icon) || (
        <span className={`${prefixCls}-spinner`}></span>
      )
    : icon;

  const content = (
    <>
      {iconNode && iconPosition === 'start' && (
        <span
          className={clsx(`${prefixCls}-icon`, customClassNames.icon)}
          style={styles.icon}
        >
          {iconNode}
        </span>
      )}
      <span className={`${prefixCls}-content`}>{children}</span>
      {iconNode && iconPosition === 'end' && (
        <span
          className={clsx(`${prefixCls}-icon`, customClassNames.icon)}
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

export default Button;