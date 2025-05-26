'use strict';

var React = require('react');

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

var css_248z$2 = ":root{--xui-color-hover:#f5f5f5;--xui-color-disabled:#e6e6e6;--xui-primary-color:#1677ff;--xui-primary-color-light:#40a9ff;--xui-text-color:rgba(0,0,0,.88);--xui-text-color-light:rgba(0,0,0,.5);--xui-error-color:#ff4d4f;--xui-error-color-light:#ff6668;--xui-success-color:#52c41a;--xui-background-color:#fff;--xui-font-size-xs:12px;--xui-font-size-sm:14px;--xui-font-size-md:14px;--xui-font-size-lg:16px;--xui-border-radius-sm:4px;--xui-border-radius-md:4px;--xui-border-radius-lg:6px;--xui-border-color:#d9d9d9;--xui-select-primary-color:var(--xui-primary-color);--xui-select-background-color:var(--xui-background-color)}html{font-family:sans-serif}.globalEllipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
styleInject(css_248z$2);

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

const prefixClsCheckbox = 'xUi-checkbox';
const prefixClsButton = 'xUi-button';

var css_248z$1 = ".xUi-button{border:1px solid transparent;border-radius:6px;cursor:pointer;font-weight:400;line-height:1.5715;transition:all .3s ease;user-select:none;vertical-align:middle;white-space:nowrap}.xUi-button,.xUi-button-content,.xUi-button-icon{align-items:center;display:inline-flex;justify-content:center}.xUi-button-icon{line-height:0;margin-right:.5em}.xUi-button-icon:last-child{margin-left:.5em;margin-right:0}.xUi-button-spinner{animation:xUi-spin 1s linear infinite;border:1px solid transparent;border-radius:50%;border-top:1px solid var(--xui-text-color);height:1em;width:1em}@keyframes xUi-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.xUi-button-size-small{font-size:12px;height:24px;padding:4px 12px}.xUi-button-size-middle{font-size:14px;height:32px;padding:0 16px}.xUi-button-size-large{font-size:16px;height:40px;padding:8px 20px}.xUi-button-circle{border-radius:50%;justify-content:center;padding:0}.xUi-button-circle.xUi-button-size-small{height:24px;width:24px}.xUi-button-circle.xUi-button-size-large{height:40px;width:40px}.xUi-button-round{border-radius:9999px}.xUi-button-default{background-color:#fff;border-color:var(--xui-border-color);color:rgba(0,0,0,.85)}.xUi-button-default:hover{border-color:var(--xui-primary-color);color:var(--xui-primary-color)}.xUi-button-primary{background-color:var(--xui-primary-color);border-color:var(--xui-primary-color);color:#fff}.xUi-button-primary:hover{background-color:var(--xui-primary-color-light);border-color:var(--xui-primary-color-light);color:#fff}.xUi-button-dashed{background-color:#fff;border-color:var(--xui-border-color);border-style:dashed;color:rgba(0,0,0,.85)}.xUi-button-dashed:hover{border-color:var(--xui-primary-color);color:var(--xui-primary-color)}.xUi-button-text{background-color:transparent;border-color:transparent!important;color:rgba(0,0,0,.88)}.xUi-button-text:hover{background-color:rgba(0,0,0,.04);border-color:transparent;color:rgba(0,0,0,.88)}.xUi-button-link{background-color:transparent;border-color:transparent!important;color:var(--xui-primary-color)}.xUi-button-link:hover{border-color:transparent;color:var(--xui-primary-color-light)}.xUi-button-outlined{color:#fff}.xUi-button-filled,.xUi-button-outlined{background-color:transparent;border-color:var(--xui-border-color)}.xUi-button-filled{color:var(--xui-text-color)}.xUi-button-danger{background-color:transparent;border-color:var(--xui-error-color);color:var(--xui-error-color)}.xUi-button-danger:hover{border-color:var(--xui-error-color-light);color:var(--xui-error-color-light)}.xUi-button-ghost{opacity:0}.xUi-button-ghost:hover{opacity:1}.xUi-button-block{display:flex;width:100%}.xUi-button-disabled,.xUi-button-loading{background-color:var(--xui-color-disabled);border-color:var(--xui-border-color);color:var(--xui-text-color);cursor:not-allowed;opacity:.5;pointer-events:none}.xUi-button-loading{background-color:transparent}";
styleInject(css_248z$1);

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
}) => {
  const classes = clsx(prefixCls, rootClassName, `${prefixCls}-${type}`, `${prefixCls}-${variant}`, `${prefixCls}-${color}`, `${prefixCls}-${shape}`, `${prefixCls}-size-${size}`, {
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-ghost`]: ghost,
    [`${prefixCls}-danger`]: danger,
    [`${prefixCls}-loading`]: isLoading,
    [`${prefixCls}-disabled`]: disabled
  }, className);
  const mergedDisabled = disabled || isLoading;
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, iconNode && iconPosition === 'start' && /*#__PURE__*/React.createElement("span", {
    className: clsx(`${prefixCls}-icon`, customClassNames.icon),
    style: styles.icon
  }, iconNode), /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-content`
  }, children), iconNode && iconPosition === 'end' && /*#__PURE__*/React.createElement("span", {
    className: clsx(`${prefixCls}-icon`, customClassNames.icon),
    style: styles.icon
  }, iconNode));
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

var css_248z = ".xUi-checkbox-wrapper{align-items:center;color:var(--xui-main-color);cursor:pointer;display:inline-flex;font-size:var(--xui-font-size-md);margin:16px 0}.xUi-checkbox{background-color:transparent;border:1px solid var(--xui-border-color);border-radius:var(--xui-border-radius-sm);display:inline-block;height:14px;position:relative;transition:all .3s;width:14px}.xUi-checkbox.xUi-checkbox-checked{background-color:#f0f5ff;border-color:var(--xui-primary-color)}.xUi-checkbox input{cursor:pointer;inset:0;opacity:0;position:absolute}.xUi-checkbox-inner{border-left:0;border-top:0;border:2px solid var(--xui-background-color);height:6px;left:50%;position:absolute;top:50%;transform:rotate(45deg) scale(0);transition:transform .2s ease-in-out;width:10px}.xUi-checkbox-check{background-color:var(--xui-primary-color);border-color:var(--xui-primary-color);display:block;height:100%;position:relative;transition:.1s ease;width:100%}.xUi-checkbox-check:after{border:solid #fff;border-width:0 2px 2px 0;content:\"\";height:8px;left:3px;position:absolute;top:1px;transform:rotate(45deg);width:5px}.xUi-checkbox-disabled,.xUi-checkbox-disabled .xUi-checkbox-check{background-color:var(--xui-color-disabled);border-color:var(--xui-border-color)!important;cursor:not-allowed;opacity:.5}.xUi-checkbox-label{font-size:14px;margin-left:8px;user-select:none}.xUi-checkbox:focus:not(.disabled),.xUi-checkbox:hover:not(.disabled){border-color:var(--xui-primary-color);cursor:pointer}.xUi-checkbox.disabled{cursor:not-allowed;opacity:.5}";
styleInject(css_248z);

const Checkbox = /*#__PURE__*/React.forwardRef(({
  prefixCls = prefixClsCheckbox,
  className = '',
  style,
  disabled = false,
  onClick,
  onChange,
  onMouseEnter,
  onMouseLeave,
  onKeyPress,
  onKeyDown,
  tabIndex,
  name,
  children,
  id,
  autoFocus,
  type = 'checkbox',
  internalChecked,
  required = false,
  noStyle,
  setInternalChecked
}, ref) => {
  const handleClick = e => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    setInternalChecked?.(!internalChecked);
    e.target.value = !internalChecked;
    onClick?.(e);
    onChange?.(e);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-wrapper`
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: style,
    onClick: e => handleClick(e),
    className: clsx([prefixCls, className, {
      noStyle: noStyle,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-checked`]: internalChecked
    }])
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    type: type,
    name: name,
    disabled: disabled,
    tabIndex: tabIndex,
    required: required,
    autoFocus: autoFocus,
    onKeyDown: onKeyDown,
    onKeyPress: onKeyPress,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }), /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-box`
  }, /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-check`,
    style: {
      opacity: Number(internalChecked)
    }
  }))), children && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-label`
  }, children));
});
Checkbox.displayName = "Checkbox";

exports.Button = Button;
exports.Checkbox = Checkbox;
//# sourceMappingURL=index.js.map
