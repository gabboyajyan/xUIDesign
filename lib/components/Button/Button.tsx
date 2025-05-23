import { ReactElement, ReactNode } from 'react';
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
  iconPosition = 'start',
  disabled = false,
  ghost = false,
  danger = false,
  block = false,
  children,
  href,
  iconNode,
  isLoading = false,
  ...restProps
}: ButtonProps & {
  iconNode?: ReactNode;
  isLoading?: boolean;
}): ReactElement => {
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
      [`${prefixCls}-loading`]: isLoading,
      [`${prefixCls}-disabled`]: disabled
    },
    className
  );

  const mergedDisabled = disabled || isLoading;

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
