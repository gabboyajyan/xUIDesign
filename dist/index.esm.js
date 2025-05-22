import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';

function clsx(...args) {
  return args.flatMap(arg => {
    if (!arg) {
      return [];
    }
    if (typeof arg === 'string') {
      return [arg];
    }
    if (typeof arg === 'number') {
      return [String(arg)];
    }
    if (Array.isArray(arg)) {
      return clsx(...arg).split(' ');
    }
    if (typeof arg === 'object') {
      return Object.entries(arg).filter(([, value]) => Boolean(value)).map(([key]) => key);
    }
    return [];
  }).filter(Boolean).join(' ');
}

const prefixClsButton = 'xUi-button';

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
  const classes = clsx(prefixCls, rootClassName, `${prefixCls}-${type}`, `${prefixCls}-${variant}`, `${prefixCls}-${color}`, `${prefixCls}-${shape}`, `${prefixCls}-size-${size}`, {
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-ghost`]: ghost,
    [`${prefixCls}-danger`]: danger,
    [`${prefixCls}-loading`]: innerLoading,
    [`${prefixCls}-disabled`]: disabled
  }, className);
  const iconNode = useMemo(() => {
    return innerLoading ? typeof loading === 'object' && loading.icon || jsx("span", {
      className: `${prefixCls}-spinner`
    }) : icon;
  }, [icon, innerLoading, loading, prefixCls]);
  const content = useMemo(() => {
    return jsxs(Fragment, {
      children: [iconNode && iconPosition === 'start' && jsx("span", {
        className: clsx(`${prefixCls}-icon`, customClassNames.icon),
        style: styles.icon,
        children: iconNode
      }), jsx("span", {
        className: `${prefixCls}-content`,
        children: children
      }), iconNode && iconPosition === 'end' && jsx("span", {
        className: clsx(`${prefixCls}-icon`, customClassNames.icon),
        style: styles.icon,
        children: iconNode
      })]
    });
  }, [children, customClassNames.icon, iconNode, iconPosition, prefixCls, styles.icon]);
  const mergedDisabled = disabled || innerLoading;
  if (href) {
    return jsx("a", {
      className: classes,
      href: mergedDisabled ? undefined : href,
      "aria-disabled": mergedDisabled,
      children: content
    });
  }
  return jsx("button", {
    type: htmlType,
    className: classes,
    disabled: mergedDisabled,
    ...restProps,
    children: content
  });
};

export { ButtonComponent as Button };
//# sourceMappingURL=index.esm.js.map
