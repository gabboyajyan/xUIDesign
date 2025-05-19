import { useState, useEffect, useMemo } from 'react';

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

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

var css_248z = ".style_xUi-button__He3BD {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: 400;\n    white-space: nowrap;\n    vertical-align: middle;\n    user-select: none;\n    border: 1px solid transparent;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    border-radius: 6px;\n    line-height: 1.5715;\n}\n\n.style_xUi-button-content__VHPLX {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.style_xUi-button-icon__KMMw- {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    line-height: 0;\n    margin-right: 0.5em;\n}\n\n.style_xUi-button-icon__KMMw-:last-child {\n    margin-right: 0;\n    margin-left: 0.5em;\n}\n\n.style_xUi-button-spinner__qwvoJ {\n    width: 1em;\n    height: 1em;\n    border: 1px solid transparent;\n    border-top-color: var(--xui-text-color);\n    border-radius: 50%;\n    animation: style_xUi-spin__42i7y 1s linear infinite;\n}\n\n@keyframes style_xUi-spin__42i7y {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\n\n.style_xUi-button-size-small__sFKdz {\n    padding: 4px 12px;\n    font-size: 12px;\n    height: 24px;\n}\n\n.style_xUi-button-size-middle__1LAB4 {\n    padding: 0 16px;\n    font-size: 14px;\n    height: 32px;\n}\n\n.style_xUi-button-size-large__kEqUs {\n    padding: 8px 20px;\n    font-size: 16px;\n    height: 40px;\n}\n\n.style_xUi-button-circle__rXsQE {\n    padding: 0;\n    border-radius: 50%;\n    justify-content: center;\n}\n\n.style_xUi-button-circle__rXsQE.style_xUi-button-size-small__sFKdz {\n    width: 24px;\n    height: 24px;\n}\n\n.style_xUi-button-circle__rXsQE.style_xUi-button-size-large__kEqUs {\n    width: 40px;\n    height: 40px;\n}\n\n.style_xUi-button-round__bPJ5d {\n    border-radius: 9999px;\n}\n\n.style_xUi-button-default__jquWr {\n    background-color: #fff;\n    border-color: var(--xui-border-color);\n    color: rgba(0, 0, 0, 0.85);\n}\n\n.style_xUi-button-default__jquWr:hover {\n    border-color: var(--xui-primary-color);\n    color: var(--xui-primary-color);\n}\n\n.style_xUi-button-primary__5B32L {\n    background-color: var(--xui-primary-color);\n    border-color: var(--xui-primary-color);\n    color: #fff;\n}\n\n.style_xUi-button-primary__5B32L:hover {\n    background-color: var(--xui-primary-color-light);\n    border-color: var(--xui-primary-color-light);\n    color: #fff;\n}\n\n.style_xUi-button-dashed__eo6t6 {\n    border-style: dashed;\n    background-color: #fff;\n    color: rgba(0, 0, 0, 0.85);\n    border-color: var(--xui-border-color);\n}\n\n.style_xUi-button-dashed__eo6t6:hover {\n    border-color: var(--xui-primary-color);\n    color: var(--xui-primary-color);\n}\n\n.style_xUi-button-text__cdwR2 {\n    background-color: transparent;\n    border-color: transparent !important;\n    color: rgba(0, 0, 0, 0.88);\n}\n\n.style_xUi-button-text__cdwR2:hover {\n    color: rgba(0, 0, 0, 0.88);\n    border-color: transparent;\n    background-color: rgba(0, 0, 0, 0.04);\n}\n\n.style_xUi-button-link__56eDf {\n    background-color: transparent;\n    border-color: transparent !important;\n    color: var(--xui-primary-color);\n}\n\n.style_xUi-button-link__56eDf:hover {\n    border-color: transparent;\n    color: var(--xui-primary-color-light);\n}\n\n.style_xUi-button-outlined__soRkh {\n    background-color: transparent;\n    border-color: var(--xui-border-color);\n    color: #fff;\n}\n\n.style_xUi-button-filled__TIZ8- {\n    background-color: transparent;\n    color: var(--xui-text-color);\n    border-color: var(--xui-border-color);\n}\n\n.style_xUi-button-danger__VaYGc {\n    background-color: transparent;\n    border-color: var(--xui-error-color);\n    color: var(--xui-error-color);\n}\n\n.style_xUi-button-danger__VaYGc:hover {\n    color: var(--xui-error-color-light);\n    border-color: var(--xui-error-color-light);\n}\n\n.style_xUi-button-ghost__yuT29 {\n    opacity: 0;\n}\n\n.style_xUi-button-ghost__yuT29:hover {\n    opacity: 1;\n}\n\n.style_xUi-button-block__Fm2wb {\n    display: flex;\n    width: 100%;\n}\n\n.style_xUi-button-disabled__lpRBf,\n.style_xUi-button-loading__X1L9j {\n    cursor: not-allowed;\n    opacity: 0.5;\n    color: var(--xui-text-color);\n    border-color: var(--xui-border-color);\n    background-color: var(--xui-color-disabled);\n    pointer-events: none;\n}\n\n.style_xUi-button-loading__X1L9j {\n    background-color: transparent\n}";
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
    return innerLoading ? typeof loading === 'object' && loading.icon || /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-spinner`
    }) : icon;
  }, [icon, innerLoading, loading, prefixCls]);
  const content = useMemo(() => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, iconNode && iconPosition === 'start' && /*#__PURE__*/React.createElement("span", {
      className: clsx(`${prefixCls}-icon`, customClassNames.icon),
      style: styles.icon
    }, iconNode), /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-content`
    }, children), iconNode && iconPosition === 'end' && /*#__PURE__*/React.createElement("span", {
      className: clsx(`${prefixCls}-icon`, customClassNames.icon),
      style: styles.icon
    }, iconNode));
  }, [children, customClassNames.icon, iconNode, iconPosition, prefixCls, styles.icon]);
  const mergedDisabled = disabled || innerLoading;
  if (href) {
    return /*#__PURE__*/React.createElement("a", {
      className: classes,
      href: mergedDisabled ? undefined : href,
      "aria-disabled": mergedDisabled
    }, content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: htmlType,
    className: classes,
    disabled: mergedDisabled
  }, restProps), content);
};

export { ButtonComponent as Button };
//# sourceMappingURL=index.esm.js.map
