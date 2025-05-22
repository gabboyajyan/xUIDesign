'use strict';

var jsxRuntime = require('react/jsx-runtime');

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

const ButtonBase = ({
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
}) => {
  const classes = clsx(prefixCls, rootClassName, `${prefixCls}-${type}`, `${prefixCls}-${variant}`, `${prefixCls}-${color}`, `${prefixCls}-${shape}`, `${prefixCls}-size-${size}`, {
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-ghost`]: ghost,
    [`${prefixCls}-danger`]: danger,
    [`${prefixCls}-loading`]: isLoading,
    [`${prefixCls}-disabled`]: disabled
  }, className);
  const mergedDisabled = disabled || isLoading;
  const content = jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [iconNode && iconPosition === 'start' && jsxRuntime.jsx("span", {
      className: clsx(`${prefixCls}-icon`, customClassNames.icon),
      style: styles.icon,
      children: iconNode
    }), jsxRuntime.jsx("span", {
      className: `${prefixCls}-content`,
      children: children
    }), iconNode && iconPosition === 'end' && jsxRuntime.jsx("span", {
      className: clsx(`${prefixCls}-icon`, customClassNames.icon),
      style: styles.icon,
      children: iconNode
    })]
  });
  if (href) {
    return jsxRuntime.jsx("a", {
      className: classes,
      href: mergedDisabled ? undefined : href,
      "aria-disabled": mergedDisabled,
      children: content
    });
  }
  return jsxRuntime.jsx("button", {
    type: htmlType,
    className: classes,
    disabled: mergedDisabled,
    ...restProps,
    children: content
  });
};

exports.Button = ButtonBase;
//# sourceMappingURL=index.js.map
