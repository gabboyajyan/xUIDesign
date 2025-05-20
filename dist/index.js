'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

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

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".style_xUi-button__edKfw {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: 400;\n    white-space: nowrap;\n    vertical-align: middle;\n    user-select: none;\n    border: 1px solid transparent;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    border-radius: 6px;\n    line-height: 1.5715;\n}\n\n.style_xUi-button-content__46byE {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.style_xUi-button-icon__oIgui {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    line-height: 0;\n    margin-right: 0.5em;\n}\n\n.style_xUi-button-icon__oIgui:last-child {\n    margin-right: 0;\n    margin-left: 0.5em;\n}\n\n.style_xUi-button-spinner__Q-QET {\n    width: 1em;\n    height: 1em;\n    border: 1px solid transparent;\n    border-top-color: var(--xui-text-color);\n    border-radius: 50%;\n    animation: style_xUi-spin__vKmxN 1s linear infinite;\n}\n\n@keyframes style_xUi-spin__vKmxN {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n.style_xUi-button-size-small__51-1n {\n    padding: 4px 12px;\n    font-size: 12px;\n    height: 24px;\n}\n\n.style_xUi-button-size-middle__UT-p3 {\n    padding: 0 16px;\n    font-size: 14px;\n    height: 32px;\n}\n\n.style_xUi-button-size-large__wo8-O {\n    padding: 8px 20px;\n    font-size: 16px;\n    height: 40px;\n}\n\n.style_xUi-button-circle__nWwng {\n    padding: 0;\n    border-radius: 50%;\n    justify-content: center;\n}\n\n.style_xUi-button-circle__nWwng.style_xUi-button-size-small__51-1n {\n    width: 24px;\n    height: 24px;\n}\n\n.style_xUi-button-circle__nWwng.style_xUi-button-size-large__wo8-O {\n    width: 40px;\n    height: 40px;\n}\n\n.style_xUi-button-round__uPTiJ {\n    border-radius: 9999px;\n}\n\n.style_xUi-button-default__8uctI {\n    background-color: #fff;\n    border-color: var(--xui-border-color);\n    color: rgba(0, 0, 0, 0.85);\n}\n\n.style_xUi-button-default__8uctI:hover {\n    border-color: var(--xui-primary-color);\n    color: var(--xui-primary-color);\n}\n\n.style_xUi-button-primary__-qJaX {\n    background-color: var(--xui-primary-color);\n    border-color: var(--xui-primary-color);\n    color: #fff;\n}\n\n.style_xUi-button-primary__-qJaX:hover {\n    background-color: var(--xui-primary-color-light);\n    border-color: var(--xui-primary-color-light);\n    color: #fff;\n}\n\n.style_xUi-button-dashed__8fdyy {\n    border-style: dashed;\n    background-color: #fff;\n    color: rgba(0, 0, 0, 0.85);\n    border-color: var(--xui-border-color);\n}\n\n.style_xUi-button-dashed__8fdyy:hover {\n    border-color: var(--xui-primary-color);\n    color: var(--xui-primary-color);\n}\n\n.style_xUi-button-text__NPqnZ {\n    background-color: transparent;\n    border-color: transparent !important;\n    color: rgba(0, 0, 0, 0.88);\n}\n\n.style_xUi-button-text__NPqnZ:hover {\n    color: rgba(0, 0, 0, 0.88);\n    border-color: transparent;\n    background-color: rgba(0, 0, 0, 0.04);\n}\n\n.style_xUi-button-link__KzTUL {\n    background-color: transparent;\n    border-color: transparent !important;\n    color: var(--xui-primary-color);\n}\n\n.style_xUi-button-link__KzTUL:hover {\n    border-color: transparent;\n    color: var(--xui-primary-color-light);\n}\n\n.style_xUi-button-outlined__oBIa6 {\n    background-color: transparent;\n    border-color: var(--xui-border-color);\n    color: #fff;\n}\n\n.style_xUi-button-filled__wEzVC {\n    background-color: transparent;\n    color: var(--xui-text-color);\n    border-color: var(--xui-border-color);\n}\n\n.style_xUi-button-danger__iGDQj {\n    background-color: transparent;\n    border-color: var(--xui-error-color);\n    color: var(--xui-error-color);\n}\n\n.style_xUi-button-danger__iGDQj:hover {\n    color: var(--xui-error-color-light);\n    border-color: var(--xui-error-color-light);\n}\n\n.style_xUi-button-ghost__jiw2N {\n    opacity: 0;\n}\n\n.style_xUi-button-ghost__jiw2N:hover {\n    opacity: 1;\n}\n\n.style_xUi-button-block__r9QnP {\n    display: flex;\n    width: 100%;\n}\n\n.style_xUi-button-disabled__1VyFK,\n.style_xUi-button-loading__h8HrL {\n    cursor: not-allowed;\n    opacity: 0.5;\n    color: var(--xui-text-color);\n    border-color: var(--xui-border-color);\n    background-color: var(--xui-color-disabled);\n    pointer-events: none;\n}\n\n.style_xUi-button-loading__h8HrL {\n    background-color: transparent\n}";
styleInject(css_248z);

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
  const [innerLoading, setInnerLoading] = react.useState(false);
  react.useEffect(() => {
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
  const iconNode = react.useMemo(() => {
    return innerLoading ? typeof loading === 'object' && loading.icon || jsxRuntime.jsx("span", {
      className: `${prefixCls}-spinner`
    }) : icon;
  }, [icon, innerLoading, loading, prefixCls]);
  const content = react.useMemo(() => {
    return jsxRuntime.jsxs(jsxRuntime.Fragment, {
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
  }, [children, customClassNames.icon, iconNode, iconPosition, prefixCls, styles.icon]);
  const mergedDisabled = disabled || innerLoading;
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

exports.Button = ButtonComponent;
//# sourceMappingURL=index.js.map
