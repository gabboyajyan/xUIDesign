'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var reactDom = require('react-dom');
var ReactDOMServer = require('react-dom/server');

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

var css_248z$q = ":root{--xui-color-hover:#f5f5f5;--xui-color-disabled:#e6e6e6;--xui-primary-color:#1677ff;--xui-primary-color-light:#40a9ff;--xui-text-color:rgba(0,0,0,.88);--xui-text-color-light:rgba(0,0,0,.5);--xui-error-color:#ff4d4f;--xui-error-color-light:#ff6668;--xui-success-color:#52c41a;--xui-background-color:#fff;--xui-font-size-xs:12px;--xui-font-size-sm:14px;--xui-font-size-md:14px;--xui-font-size-lg:16px;--xui-border-radius-sm:4px;--xui-border-radius-md:4px;--xui-border-radius-lg:6px;--xui-border-color:#d9d9d9;--xui-select-primary-color:var(--xui-primary-color);--xui-select-background-color:var(--xui-background-color);--xui-menu-inline-bg:rgba(0,0,0,.02);--xui-result-bg:#fff;--xui-result-color:rgba(0,0,0,.85);--xui-subtle-color:rgba(0,0,0,.45);--xui-padding:24px;--xui-gap:16px;--xui-icon-size:72px;--xui-max-width:560px;--xui-font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial}html{font-family:sans-serif}.globalEllipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
styleInject(css_248z$q);

const parseValue = value => {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  if (!isNaN(Number(value))) {
    return Number(value);
  }
  return value;
};
function createArray(length) {
  return Array.from({
    length
  }, (_, index) => index);
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

const prefixClsForm = 'xUi-form';
const prefixClsFormItem = 'xUi-form-item';
const prefixClsEmpty = 'xUi-empty';
const prefixClsInput = 'xUi-input';
const prefixClsSelect = 'xUi-select';
const prefixClsCheckbox = 'xUi-checkbox';
const prefixClsSwitch = 'xUi-switch';
const prefixClsRadio = 'xUi-radio';
const prefixClsTextArea = 'xUi-textarea';
const prefixClsUpload = 'xUi-upload';
const prefixClsDatePicker = 'xUi-datepicker';
const prefixClsRangePicker = 'xUi-rangepicker';
const prefixClsTimePicker = 'xUi-timepicker';
const prefixClsButton = 'xUi-button';
const prefixClsSkeleton = 'xUi-skeleton';
const prefixClsMenu = 'xUi-menu';
const prefixClsDropdown = 'xUi-dropdown';
const prefixClsPopover = 'xUi-popover';
const prefixClsResult = 'xUi-result';
const prefixClsFormV3 = 'v3-form';
const prefixClsFormItemV3 = 'v3-form-item';
const prefixClsEmptyV3 = 'v3-empty';
const prefixClsInputV3 = 'v3-input';
const prefixClsSelectV3 = 'v3-select';
const prefixClsCheckboxV3 = 'v3-checkbox-input';
const prefixClsSwitchV3 = 'v3-switch';
const prefixClsRadioV3 = 'v3-radio';
const prefixClsButtonV3 = 'v3-btn';
const prefixClsUploadV3 = 'v3-upload';

var css_248z$p = "html .xUi-button{border:1px solid transparent;border-radius:6px;cursor:pointer;font-weight:400;line-height:1.5715;transition:all .3s ease;user-select:none;vertical-align:middle;white-space:nowrap}html .xUi-button,html .xUi-button-content,html .xUi-button-icon{align-items:center;display:inline-flex;justify-content:center}html .xUi-button-icon{line-height:0;margin-right:.5em}html .xUi-button-icon:last-child{margin-left:.5em;margin-right:0}html .xUi-button-spinner{animation:xUi-spin 1s linear infinite;border:1px solid transparent;border-radius:50%;border-top:1px solid var(--xui-text-color);height:1em;width:1em}@keyframes xUi-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}html .xUi-button-size-small{font-size:12px;height:24px;padding:4px 12px}html .xUi-button-size-middle{font-size:14px;height:32px;padding:0 16px}html .xUi-button-size-large{font-size:16px;height:44px;padding:8px 20px}html .xUi-button-shape-circle{border-radius:50%;justify-content:center;padding:0}html .xUi-button-shape-circle .xUi-button-size-small{height:24px;width:24px}html .xUi-button-shape-circle .xUi-button-size-large{height:44px;width:44px}html .xUi-button-shape-round{border-radius:9999px}html .xUi-button-default{background-color:#fff;border-color:var(--xui-border-color);color:rgba(0,0,0,.85)}html .xUi-button-default:hover{border-color:var(--xui-primary-color);color:var(--xui-primary-color)}html .xUi-button-primary{background-color:var(--xui-primary-color);border-color:var(--xui-primary-color);color:#fff}html .xUi-button-primary:hover{background-color:var(--xui-primary-color-hover);border-color:var(--xui-primary-color-hover);color:#fff}html .xUi-button-variant-dashed{background-color:#fff;border-color:var(--xui-border-color);border-style:dashed;color:rgba(0,0,0,.85)}html .xUi-button-variant-dashed:hover{border-color:var(--xui-primary-color);color:var(--xui-primary-color)}html .xUi-button-variant-text{background-color:transparent;border-color:transparent!important;color:rgba(0,0,0,.88)}html .xUi-button-variant-text:hover{background-color:rgba(0,0,0,.04);border-color:transparent;color:rgba(0,0,0,.88)}html .xUi-button-variant-link{background-color:transparent;border-color:transparent!important;color:var(--xui-primary-color)}html .xUi-button-variant-link:hover{border-color:transparent;color:var(--xui-primary-color-light)}html .xUi-button-variant-outlined{background-color:transparent;border-color:var(--xui-border-color);color:#fff}html .xUi-button-variant-filled{background-color:transparent;border-color:var(--xui-border-color);color:var(--xui-text-color)}html .xUi-button-danger{background-color:transparent;border-color:var(--xui-error-color);color:var(--xui-error-color)}html .xUi-button-danger:hover{border-color:var(--xui-error-color-light);color:var(--xui-error-color-light)}html .xUi-button-ghost{opacity:0}html .xUi-button-ghost:hover{opacity:1}html .xUi-button-block{display:flex;width:100%}html .xUi-button-disabled,html .xUi-button-loading{background-color:var(--xui-color-disabled);border-color:var(--xui-border-color);color:var(--xui-text-color);cursor:not-allowed;opacity:.5;pointer-events:none}html .xUi-button-loading{background-color:transparent}";
styleInject(css_248z$p);

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
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __injected,
  child,
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
  const classes = react.useMemo(() => {
    return clsx([...new Set([prefixCls, prefixClsV3, rootClassName, `${prefixCls}-${type}`, `${prefixCls}-variant-${variant}`, `${prefixCls}-color-${color}`, `${prefixCls}-shape-${shape}`, `${prefixCls}-size-${size}`, `${prefixClsV3}-${type}`, `${prefixClsV3}-variant-${variant}`, `${prefixClsV3}-color-${color}`, `${prefixClsV3}-shape-${shape}`, `${prefixClsV3}-size-${size}`, {
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
    }, className])]);
  }, [block, className, color, danger, disabled, ghost, innerLoading, prefixCls, prefixClsV3, rootClassName, shape, size, type, variant]);
  const iconNode = innerLoading ? typeof loading === 'object' && loading.icon || jsxRuntime.jsx("span", {
    className: `${prefixCls}-spinner ${prefixClsV3}-spinner`
  }) : icon;
  const content = jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [iconNode && iconPosition === 'start' && jsxRuntime.jsx("span", {
      className: clsx(`${prefixCls}-icon ${prefixClsV3}-icon`, customClassNames.icon),
      style: styles.icon,
      children: iconNode
    }), jsxRuntime.jsx("span", {
      className: `${prefixCls}-content ${prefixClsV3}-content`,
      children: children
    }), iconNode && iconPosition === 'end' && jsxRuntime.jsx("span", {
      className: clsx(`${prefixCls}-icon ${prefixClsV3}-icon`, customClassNames.icon),
      style: styles.icon,
      children: iconNode
    })]
  });
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

var css_248z$o = ".xUi-checkbox-wrapper{align-items:center;color:var(--xui-main-color);cursor:pointer;display:inline-flex;font-size:var(--xui-font-size-md);margin:16px 0;&:has([tabindex=\"0\"]:focus-visible){border-color:var(--xui-primary-color)}}.xUi-checkbox{background-color:transparent;border:1px solid var(--xui-border-color);border-radius:var(--xui-border-radius-sm);display:inline-block;height:14px;position:relative;transition:all .3s;width:14px}.xUi-checkbox.xUi-checkbox-checked{background-color:#f0f5ff;border-color:var(--xui-primary-color)}.xUi-checkbox input{cursor:pointer;inset:0;opacity:0;position:absolute}.xUi-checkbox-inner{border-left:0;border-top:0;border:2px solid var(--xui-background-color);height:6px;left:50%;position:absolute;top:50%;transform:rotate(45deg) scale(0);transition:transform .2s ease-in-out;width:10px}.xUi-checkbox-check{background-color:var(--xui-primary-color);border-color:var(--xui-primary-color);display:block;height:100%;position:relative;transition:.1s ease;width:100%}.xUi-checkbox-check:after{border:solid #fff;border-width:0 2px 2px 0;content:\"\";height:8px;left:3px;position:absolute;top:1px;transform:rotate(45deg);width:5px}.xUi-checkbox-disabled,.xUi-checkbox-disabled .xUi-checkbox-check{background-color:var(--xui-color-disabled);border-color:var(--xui-border-color)!important;cursor:not-allowed;opacity:.5}.xUi-checkbox-label{font-size:14px;margin-left:8px;user-select:none}.xUi-checkbox:focus:not(.disabled),.xUi-checkbox:hover:not(.disabled){border-color:var(--xui-primary-color);cursor:pointer}.xUi-checkbox.disabled{cursor:not-allowed;opacity:.5}";
styleInject(css_248z$o);

const Checkbox = ({
  prefixCls = prefixClsCheckbox,
  prefixClsV3 = prefixClsCheckboxV3,
  className = '',
  defaultChecked = false,
  checked,
  style,
  disabled = false,
  onChange,
  onClick,
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
  value = false,
  required = false,
  noStyle,
  titleClick,
  ref,
  controlled = false
}) => {
  const isChecked = checked !== undefined ? checked : defaultChecked || value;
  const [internalChecked, setInternalChecked] = react.useState(isChecked);
  const checkboxRef = react.useRef(null);
  const handleClick = e => {
    if (disabled) {
      e.stopPropagation();
      return;
    }
    if (checkboxRef.current) {
      if (!controlled) {
        e.target.value = !internalChecked;
        setInternalChecked(!internalChecked);
        checkboxRef.current.checked = !internalChecked;
      } else {
        e.target.value = !checked;
        checkboxRef.current.checked = !checked;
      }
    }
    onClick?.(e);
    onChange?.(e);
  };
  react.useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);
  return jsxRuntime.jsxs("div", {
    className: `${prefixCls}-wrapper ${prefixClsV3}-wrapper`,
    children: [jsxRuntime.jsxs("div", {
      ref: ref,
      tabIndex: 0,
      role: "button",
      style: style,
      onClick: handleClick,
      className: clsx([prefixCls, prefixClsV3, className, {
        noStyle: noStyle,
        [`${prefixCls}-disabled ${prefixClsV3}-disabled`]: disabled,
        [`${prefixCls}-checked ${prefixClsV3}-checked`]: internalChecked
      }]),
      children: [jsxRuntime.jsx("input", {
        id: id,
        type: type,
        name: name,
        ref: checkboxRef,
        disabled: disabled,
        tabIndex: tabIndex,
        required: required,
        autoFocus: autoFocus,
        onKeyDown: onKeyDown,
        onKeyPress: onKeyPress,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave
      }), jsxRuntime.jsx("span", {
        className: `${prefixCls}-box ${prefixClsV3}-box`,
        children: jsxRuntime.jsx("span", {
          className: `${prefixCls}-check ${prefixClsV3}-check`,
          style: {
            opacity: internalChecked ? 1 : 0
          }
        })
      })]
    }), titleClick ? jsxRuntime.jsx("div", {
      onClick: handleClick,
      children: children
    }) : children && jsxRuntime.jsx("span", {
      className: `${prefixCls}-label ${prefixClsV3}-label`,
      children: children
    })]
  });
};
Checkbox.displayName = 'Checkbox';

var css_248z$n = ".xUi-switch{background-color:var(--xui-color-disabled);border:0;border-radius:100px;box-sizing:border-box;color:#000000d9;cursor:pointer;display:inline-block;font-size:14px;font-variant:tabular-nums;height:22px;list-style:none;margin:0;min-width:44px;padding:0;position:relative;transition:all .2s;user-select:none;vertical-align:middle}.xUi-switch-wrapper{&:has([tabindex=\"0\"]:focus-visible){border-color:var(--xui-primary-color)}}.xUi-switch.xUi-switch__disabled{opacity:.5;pointer-events:none}.xUi-switch .xUi-switch__slider{background-color:#fff;border-radius:50%;height:18px;left:2px;position:absolute;top:2px;transition:transform .3s;width:18px}.xUi-switch__checked .xUi-switch__slider{transform:translateX(21px)}.xUi-switch__checked{background-color:var(--xui-primary-color)}";
styleInject(css_248z$n);

const Switch = ({
  prefixCls = prefixClsSwitch,
  prefixClsV3 = prefixClsSwitchV3,
  checked,
  onChange,
  onClick,
  disabled = false,
  className = '',
  style = {},
  defaultChecked,
  value,
  controlled = false
}) => {
  const isChecked = checked !== undefined ? checked : defaultChecked || value;
  const [internalChecked, setInternalChecked] = react.useState(isChecked);
  const handleClick = e => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    if (!controlled) {
      setInternalChecked(!internalChecked);
      e.target.value = !internalChecked;
    } else {
      e.target.value = !checked;
    }
    onClick?.(e.target.value);
    onChange?.(e.target.value);
  };
  react.useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);
  return jsxRuntime.jsx("div", {
    className: `${prefixCls}-wrapper ${prefixClsV3}-wrapper ${className} ${disabled ? `${prefixCls}__disabled ${prefixClsV3}__disabled` : ''}`,
    style: style,
    children: jsxRuntime.jsx("div", {
      tabIndex: 0,
      role: "button",
      className: `${prefixCls} ${prefixClsV3} ${internalChecked ? `${prefixCls}__checked ${prefixClsV3}__checked` : ''}`,
      onClick: handleClick,
      children: jsxRuntime.jsx("div", {
        className: `${prefixCls}__slider ${prefixClsV3}__slider`
      })
    })
  });
};
Switch.displayName = 'Switch';

var css_248z$m = ".xUi-empty{align-items:center;display:grid;gap:4px;justify-content:center;padding:14px}.xUi-empty-description{color:var(--xui-text-color);font-size:var(--xui-font-size-md);text-align:center}";
styleInject(css_248z$m);

const EmptyContent = ({
  icon,
  style = {},
  className = '',
  title = 'No Data',
  description = 'No data',
  prefixCls = prefixClsEmpty,
  prefixClsV3 = prefixClsEmptyV3
}) => jsxRuntime.jsxs("div", {
  style: style,
  className: `${prefixCls} ${prefixClsV3} ${prefixCls}-normal ${prefixClsV3}--normal ${prefixCls}-small ${prefixClsV3}-small ${className}`,
  children: [jsxRuntime.jsx("div", {
    className: `${prefixCls}-image`,
    children: icon || jsxRuntime.jsxs("svg", {
      width: "64",
      height: "41",
      viewBox: "0 0 64 41",
      xmlns: "http://www.w3.org/2000/svg",
      children: [jsxRuntime.jsx("title", {
        children: title
      }), jsxRuntime.jsxs("g", {
        transform: "translate(0 1)",
        fill: "none",
        children: [jsxRuntime.jsx("ellipse", {
          fill: "#f5f5f5",
          cx: "32",
          cy: "33",
          rx: "32",
          ry: "7"
        }), jsxRuntime.jsxs("g", {
          stroke: "#d9d9d9",
          children: [jsxRuntime.jsx("path", {
            d: "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
          }), jsxRuntime.jsx("path", {
            d: "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
            fill: "#fafafa"
          })]
        })]
      })]
    })
  }), jsxRuntime.jsx("div", {
    className: `${prefixCls}-description`,
    children: description
  })]
});

var css_248z$l = ".xUi-upload-wrapper{font-family:Arial,sans-serif;width:100%}.xUi-upload{align-items:center;border-radius:6px;color:#666;cursor:pointer;display:flex;justify-content:flex-start;text-align:center;transition:all .3s}.xUi-upload:hover{border-color:var(--xui-primary-color,var(--xui-primary-color));color:var(--xui-primary-color,var(--xui-primary-color))}.xUi-upload-disabled{cursor:not-allowed;opacity:.6}.xUi-upload-disabled .xUi-upload-picture button{cursor:not-allowed}.xUi-upload-input{display:none}.xUi-upload-list{list-style:none;margin:0;padding:0}.xUi-upload-list-picture .xUi-upload-item{border:1px dashed var(--xui-border-color);line-height:unset;margin-top:8px;padding:8px}.xUi-upload-list-picture .xUi-upload-item-done{border:1px solid var(--xui-border-color)}.xUi-upload-list-picture .xUi-upload-item-error{border:1px solid var(--xui-error-color)}.xUi-upload-list-picture .xUi-upload-item-error .xUi-upload-item-title{color:var(--xui-error-color)}.xUi-upload-item{align-items:center;border-radius:8px;color:#333;display:flex;font-size:14px;gap:8px;line-height:35px;margin:0;transition:background .3s}.xUi-upload-item.uploading{color:var(--xui-primary-color)}.xUi-upload-item.done{color:var(--xui-success-color)}.xUi-upload-item.error{color:var(--xui-error-color)}.xUi-upload-remove{color:rgba(0,0,0,.45)}.xUi-upload-item-title{align-items:center;color:var(--xui-text-color);display:flex;justify-content:space-between}.xUi-upload-item-title svg{color:var(--xui-error-color)}.xUi-upload-list-picture-card{display:flex;flex-wrap:wrap;gap:8px}.xUi-upload-list-picture-card .xUi-upload-item{align-items:center;border-radius:4px;display:flex;flex-direction:column;height:104px;justify-content:center;position:relative;width:104px}.xUi-upload-list-picture-card .xUi-upload-item img{max-height:100%;max-width:100%;object-fit:cover}.xUi-upload-list-picture-card .xUi-upload-remove{border-radius:50%;color:#fff;font-size:12px;line-height:1;padding:2px 6px;position:absolute;right:4px;top:4px}.xUi-upload-item-thumbnail{border-radius:4px;height:44px;object-fit:cover;width:44px}.xUi-upload-item-progress-line{border:1px solid var(--xui-border-color);height:0;width:calc(100% - 8px)}.xUi-upload-item-progress-line-percent{border:1px solid red;height:0;position:relative;top:-2px}";
styleInject(css_248z$l);

const ClearIcon = () => jsxRuntime.jsx("svg", {
  width: "10",
  height: "10",
  viewBox: "0 0 14 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: jsxRuntime.jsx("path", {
    d: "M1 1L13 13M13 1L1 13",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })
});
const ArrowIcon = ({
  isOpen
}) => jsxRuntime.jsx("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: jsxRuntime.jsx("path", {
    d: "M7 10L12 15L17 10",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    transform: isOpen ? 'rotate(180, 12, 12)' : ''
  })
});
const LoadingIcon = () => jsxRuntime.jsx("svg", {
  viewBox: "0 0 1024 1024",
  focusable: "false",
  "data-icon": "loading",
  width: "12",
  height: "12",
  fill: "currentColor",
  "aria-hidden": "true",
  children: jsxRuntime.jsx("path", {
    d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
  })
});
const CheckIcon = () => jsxRuntime.jsx("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "check",
  width: "12",
  height: "12",
  fill: "currentColor",
  "aria-hidden": "true",
  children: jsxRuntime.jsx("path", {
    d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
  })
});
const SearchIcon = () => jsxRuntime.jsx("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "search",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  children: jsxRuntime.jsx("path", {
    d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
  })
});
const CalendarIcon = () => jsxRuntime.jsx("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "calendar",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  children: jsxRuntime.jsx("path", {
    d: "M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"
  })
});
const SuccessIcon = () => jsxRuntime.jsx("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "check-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  children: jsxRuntime.jsx("path", {
    d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
  })
});
const ErrorIcon = () => jsxRuntime.jsx("svg", {
  className: "error-svg-icon",
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "close-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  children: jsxRuntime.jsx("path", {
    d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"
  })
});
const DateDistanceIcon = () => jsxRuntime.jsx("svg", {
  viewBox: "0 0 1024 1024",
  focusable: "false",
  "data-icon": "swap-right",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  children: jsxRuntime.jsx("path", {
    d: "M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"
  })
});
const TimeIcon = () => jsxRuntime.jsxs("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "clock-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  children: [jsxRuntime.jsx("path", {
    d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
  }), jsxRuntime.jsx("path", {
    d: "M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
  })]
});
const StampleIcon = () => jsxRuntime.jsx("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "paper-clip",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  children: jsxRuntime.jsx("path", {
    d: "M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z"
  })
});
const TrashIcon = () => jsxRuntime.jsx("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "delete",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  children: jsxRuntime.jsx("path", {
    d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
  })
});
const SpinerIcon = () => jsxRuntime.jsx("svg", {
  viewBox: "0 0 1024 1024",
  focusable: "false",
  "data-icon": "loading",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  children: jsxRuntime.jsx("path", {
    d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
  })
});
const renderDefaultIcon = status => {
  switch (status) {
    case "success":
      return jsxRuntime.jsxs("svg", {
        width: "64",
        height: "64",
        viewBox: "0 0 64 64",
        fill: "none",
        children: [jsxRuntime.jsx("circle", {
          cx: "32",
          cy: "32",
          r: "32",
          fill: "#52c41a"
        }), jsxRuntime.jsx("path", {
          d: "M20 34L28 42L44 26",
          stroke: "white",
          strokeWidth: "4",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })]
      });
    case "error":
      return jsxRuntime.jsxs("svg", {
        width: "64",
        height: "64",
        viewBox: "0 0 64 64",
        fill: "none",
        children: [jsxRuntime.jsx("circle", {
          cx: "32",
          cy: "32",
          r: "32",
          fill: "#ff4d4f"
        }), jsxRuntime.jsx("path", {
          d: "M20 20L44 44M44 20L20 44",
          stroke: "white",
          strokeWidth: "4",
          strokeLinecap: "round"
        })]
      });
    case "warning":
      return jsxRuntime.jsxs("svg", {
        width: "64",
        height: "64",
        viewBox: "0 0 64 64",
        fill: "none",
        children: [jsxRuntime.jsx("circle", {
          cx: "32",
          cy: "32",
          r: "32",
          fill: "#faad14"
        }), jsxRuntime.jsx("path", {
          d: "M32 18V38M32 46H32.01",
          stroke: "white",
          strokeWidth: "4",
          strokeLinecap: "round"
        })]
      });
    case "info":
      return jsxRuntime.jsxs("svg", {
        width: "64",
        height: "64",
        viewBox: "0 0 64 64",
        fill: "none",
        children: [jsxRuntime.jsx("circle", {
          cx: "32",
          cy: "32",
          r: "32",
          fill: "#1890ff"
        }), jsxRuntime.jsx("path", {
          d: "M32 28V44M32 20H32.01",
          stroke: "white",
          strokeWidth: "4",
          strokeLinecap: "round"
        })]
      });
    case "403":
      return jsxRuntime.jsxs("svg", {
        width: "251",
        height: "294",
        children: [jsxRuntime.jsx("title", {
          children: "Unauthorized"
        }), jsxRuntime.jsxs("g", {
          fill: "none",
          children: [jsxRuntime.jsx("path", {
            fill: "#E4EBF7",
            d: "M0 129v-2C0 58.3 55.6 2.7 124.2 2.7h2c68.6 0 124.2 55.6 124.2 124.1v2.1c0 68.6-55.6 124.2-124.1 124.2h-2.1A124.2 124.2 0 0 1 0 129"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M41.4 133a8.2 8.2 0 1 1-16.4-1.7 8.2 8.2 0 0 1 16.4 1.6"
          }), jsxRuntime.jsx("path", {
            stroke: "#FFF",
            d: "m38.7 136.4 10.4 5.9m.9 6.2-12.6 10.7"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M41.5 161.3a5.6 5.6 0 1 1-11.2-1.2 5.6 5.6 0 0 1 11.2 1.2m17.7-16a5.7 5.7 0 1 1-11.3-1.2 5.7 5.7 0 0 1 11.3 1.2m41.2-115.8H130a4.6 4.6 0 1 0 0-9.1h-29.6a4.6 4.6 0 0 0 0 9.1m11.3 18.3h29.7a4.6 4.6 0 1 0 0-9.2h-29.7a4.6 4.6 0 1 0 0 9.2"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M114 29.5h15.8a4.6 4.6 0 1 0 0 9.1H114a4.6 4.6 0 0 0 0-9.1m71.3 108.2a10 10 0 1 1-19.8-2 10 10 0 0 1 19.8 2"
          }), jsxRuntime.jsx("path", {
            stroke: "#FFF",
            d: "m180.2 143.8 12.5 7.1m1.1 7.5-15.1 13"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M185.6 172a6.8 6.8 0 1 1-13.6-1.4 6.8 6.8 0 0 1 13.5 1.3m18.6-16.6a6.8 6.8 0 1 1-13.6-1.4 6.8 6.8 0 0 1 13.6 1.4"
          }), jsxRuntime.jsx("path", {
            stroke: "#FFF",
            d: "M153 194a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm73-75.8a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.4 0zm-9 34.9a2.2 2.2 0 1 1-4.3 0 2.2 2.2 0 0 1 4.4 0zm-39.2-43.3a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm18.3-15.3a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm6.7 88a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0z"
          }), jsxRuntime.jsx("path", {
            stroke: "#FFF",
            d: "m215.1 155.3-1.9 20-10.8 6m-27.8-4.7-6.3 9.8H157l-4.5 6.4m23.4-65.5v-15.7m45.6 7.8-12.8 7.9-15.2-7.9V96.7"
          }), jsxRuntime.jsx("path", {
            fill: "#A26EF4",
            d: "M180.7 29.3a29.3 29.3 0 1 1 58.6 0 29.3 29.3 0 0 1-58.6 0"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "m221.4 41.7-21.5-.1a1.7 1.7 0 0 1-1.7-1.8V27.6a1.7 1.7 0 0 1 1.8-1.7h21.5c1 0 1.8.9 1.8 1.8l-.1 12.3a1.7 1.7 0 0 1-1.7 1.7"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M215.1 29.2c0 2.6-2 4.6-4.5 4.6a4.6 4.6 0 0 1-4.5-4.7v-6.9c0-2.6 2-4.6 4.6-4.6 2.5 0 4.5 2 4.4 4.7v6.9zm-4.5-14a6.9 6.9 0 0 0-7 6.8v7.3a6.9 6.9 0 0 0 13.8.1V22a6.9 6.9 0 0 0-6.8-6.9zm-43 53.2h-4a4.7 4.7 0 0 1-4.7-4.8 4.7 4.7 0 0 1 4.7-4.7h4a4.7 4.7 0 0 1 4.7 4.8 4.7 4.7 0 0 1-4.7 4.7"
          }), jsxRuntime.jsx("path", {
            fill: "#5BA02E",
            d: "M168.2 248.8a6.6 6.6 0 0 1-6.6-6.6v-66a6.6 6.6 0 0 1 13.2 0v66a6.6 6.6 0 0 1-6.6 6.6"
          }), jsxRuntime.jsx("path", {
            fill: "#92C110",
            d: "M176.1 248.2a6.6 6.6 0 0 1-6.6-6.6v-33a6.6 6.6 0 1 1 13.3 0v33a6.6 6.6 0 0 1-6.7 6.6"
          }), jsxRuntime.jsx("path", {
            fill: "#F2D7AD",
            d: "M186 293.9h-27.4a3.2 3.2 0 0 1-3.2-3.2v-45.9a3.2 3.2 0 0 1 3.2-3.1H186a3.2 3.2 0 0 1 3.2 3.1v46a3.2 3.2 0 0 1-3.2 3"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M82 147.7s6.3-1 17.5-1.3c11.8-.4 17.6 1 17.6 1s3.7-3.8 1-8.3c1.3-12.1 6-32.9.3-48.3-1.1-1.4-3.7-1.5-7.5-.6-1.4.3-7.2-.2-8-.1l-15.3-.4-8-.5c-1.6-.1-4.3-1.7-5.5-.3-.4.4-2.4 5.6-2 16l8.7 35.7s-3.2 3.6 1.2 7"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "m75.8 73.3-1-6.4 12-6.5s7.4-.1 8 1.2c.8 1.3-5.5 1-5.5 1s-1.9 1.4-2.6 2.5c-1.7 2.4-1 6.5-8.4 6-1.7.3-2.5 2.2-2.5 2.2"
          }), jsxRuntime.jsx("path", {
            fill: "#FFB594",
            d: "M52.4 77.7S66.7 87 77.4 92c1 .5-2 16.2-11.9 11.8-7.4-3.3-20.1-8.4-21.5-14.5-.7-3.2 2.6-7.6 8.4-11.7M142 80s-6.7 3-13.9 6.9c-3.9 2.1-10.1 4.7-12.3 8-6.2 9.3 3.5 11.2 13 7.5 6.6-2.7 29-12.1 13.2-22.4"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "m76.2 66.4 3 3.8S76.4 73 73 76c-7 6.2-12.8 14.3-16 16.4-4 2.7-9.7 3.3-12.2 0-3.5-5.1.5-14.7 31.5-26"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M64.7 85.1s-2.4 8.4-9 14.5c.7.5 18.6 10.5 22.2 10 5.2-.6 6.4-19 1.2-20.5-.8-.2-6-1.3-8.9-2.2-.9-.2-1.6-1.7-3.5-1l-2-.8zm63.7.7s5.3 2 7.3 13.8c-.6.2-17.6 12.3-21.8 7.8-6.6-7-.8-17.4 4.2-18.6 4.7-1.2 5-1.4 10.3-3"
          }), jsxRuntime.jsx("path", {
            stroke: "#E4EBF7",
            d: "M78.2 94.7s.9 7.4-5 13"
          }), jsxRuntime.jsx("path", {
            stroke: "#E4EBF7",
            d: "M87.4 94.7s3.1 2.6 10.3 2.6c7.1 0 9-3.5 9-3.5"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "m117.2 68.6-6.8-6.1s-5.4-4.4-9.2-1c-3.9 3.5 4.4 2.2 5.6 4.2 1.2 2.1.9 1.2-2 .5-5.7-1.4-2.1.9 3 5.3 2 1.9 7 1 7 1l2.4-3.9z"
          }), jsxRuntime.jsx("path", {
            fill: "#FFB594",
            d: "m105.3 91.3-.3-11H89l-.5 10.5c0 .4.2.8.6 1 2 1.3 9.3 5 15.8.4.2-.2.4-.5.4-.9"
          }), jsxRuntime.jsx("path", {
            fill: "#5C2552",
            d: "M107.6 74.2c.8-1.1 1-9 1-11.9a1 1 0 0 0-1-1l-4.6-.4c-7.7-1-17 .6-18.3 6.3-5.4 5.9-.4 13.3-.4 13.3s2 3.5 4.3 6.8c.8 1 .4-3.8 3-6a47.9 47.9 0 0 1 16-7"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "M88.4 83.2s2.7 6.2 11.6 6.5c7.8.3 9-7 7.5-17.5l-1-5.5c-6-2.9-15.4.6-15.4.6s-.6 2-.2 5.5c-2.3 2-1.8 5.6-1.8 5.6s-1-2-2-2.3c-.9-.3-2 0-2.3 2-1 4.6 3.6 5.1 3.6 5.1"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "m100.8 77.1 1.7-1-1-4.3.7-1.4"
          }), jsxRuntime.jsx("path", {
            fill: "#552950",
            d: "M105.5 74c0 .8-.4 1.4-1 1.4-.4 0-.8-.7-.8-1.4s.5-1.2 1-1.2.9.6.8 1.3m-8 .2c0 .8-.4 1.3-.9 1.3s-.9-.6-.9-1.3c0-.7.5-1.3 1-1.3s1 .6.9 1.3"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "M91.1 86.8s5.3 5 12.7 2.3"
          }), jsxRuntime.jsx("path", {
            fill: "#DB836E",
            d: "M99.8 81.9s-3.6.2-1.5-2.8c1.6-1.5 5-.4 5-.4s1 3.9-3.5 3.2"
          }), jsxRuntime.jsx("path", {
            stroke: "#5C2552",
            d: "M102.9 70.6s2.5.8 3.4.7m-12.4.7s2.5-1.2 4.8-1.1"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "M86.3 77.4s1 .9 1.5 2c-.4.6-1 1.2-.3 1.9m11.8 2.4s2 .2 2.5-.2"
          }), jsxRuntime.jsx("path", {
            stroke: "#E4EBF7",
            d: "m87.8 115.8 15.7-3m-3.3 3 10-2m-43.7-27s-1.6 8.8-6.7 14M128.3 88s3 4 4 11.7"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "M64 84.8s-6 10-13.5 10"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "m112.4 66-.2 5.2 12 9.2c4.5 3.6 8.9 7.5 11 8.7 4.8 2.8 8.9 3.3 11 1.8 4.1-2.9 4.4-9.9-8.1-15.3-4.3-1.8-16.1-6.3-25.7-9.7"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "M130.5 85.5s4.6 5.7 11.7 6.2"
          }), jsxRuntime.jsx("path", {
            stroke: "#E4EBF7",
            d: "M121.7 105.7s-.4 8.6-1.3 13.6"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M115.8 161.5s-3.6-1.5-2.7-7.1"
          }), jsxRuntime.jsx("path", {
            fill: "#CBD1D1",
            d: "M101.5 290.2s4.3 2.1 7.4 1c2.9-.9 4.6.7 7.2 1.3 2.5.5 6.9 1 11.7-1.3 0-5.6-7-4-12-6.8-2.6-1.4-3.8-4.7-3.6-8.8h-9.5s-1.4 10.6-1.2 14.6"
          }), jsxRuntime.jsx("path", {
            fill: "#2B0849",
            d: "M101.5 290s2.4 1.4 6.8.7c3-.4 3.7.5 7.5 1 3.7.6 10.8 0 11.9-.8.4 1-.4 2-.4 2s-1.5.7-4.8.9c-2 .1-5.8.3-7.7-.5-1.8-1.4-5.2-2-5.7-.3-4 1-7.4-.3-7.4-.3l-.2-2.6z"
          }), jsxRuntime.jsx("path", {
            fill: "#A4AABA",
            d: "M108.8 276.2h3.1s0 6.7 4.6 8.6c-4.7.6-8.6-2.3-7.7-8.6"
          }), jsxRuntime.jsx("path", {
            fill: "#CBD1D1",
            d: "M57.6 272.5s-2 7.5-4.5 12.4c-1.8 3.7-4.2 7.6 5.5 7.6 6.7 0 9-.5 7.5-6.7-1.5-6.1.3-13.3.3-13.3h-8.8z"
          }), jsxRuntime.jsx("path", {
            fill: "#2B0849",
            d: "M51.5 290s2.2 1.2 6.7 1.2c6.1 0 8.3-1.6 8.3-1.6s.6 1-.6 2.1c-1 .9-3.6 1.6-7.4 1.6-4.2 0-6-.6-6.8-1.2-.9-.5-.7-1.6-.2-2"
          }), jsxRuntime.jsx("path", {
            fill: "#A4AABA",
            d: "M58.5 274.4s0 1.6-.3 3-1 3.1-1.1 4.2c0 1.1 4.5 1.5 5.2 0 .6-1.6 1.3-6.5 1.9-7.3.6-.8-5-2.1-5.7.1"
          }), jsxRuntime.jsx("path", {
            fill: "#7BB2F9",
            d: "m100.9 277 13.3.1s1.3-54.2 1.8-64c.6-9.9 3.8-43.2 1-62.8l-12.4-.7-22.8.8-1.2 10c0 .4-.6.8-.7 1.3 0 .6.4 1.3.3 2-2.3 14-6.3 32.9-8.7 46.4-.1.6-1.2 1-1.4 2.6 0 .3.2 1.6 0 1.8-6.8 18.7-10.8 47.6-14.1 61.6h14.5s2.2-8.6 4-17a3984 3984 0 0 1 23-84.5l3-.5 1 46.1s-.2 1.2.4 2c.5.8-.6 1.1-.4 2.3l.4 1.7-1 11.9c-.4 4.6 0 39 0 39"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M77.4 220.4c1.2.1 4-2 7-4.9m23.1 8.4s2.8-1 6.1-3.8"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M108.5 221s2.7-1.2 6-4"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M76.1 223.6s2.6-.6 6.5-3.4m4.7-69.4c-.2 3.1.3 8.5-4.3 9m21.8-10.7s.1 14-1.3 15c-2.2 1.6-3 1.9-3 1.9m.5-16.4s0 12.8-1.2 24.3m-4.9 1s7.2-1.6 9.4-1.6m-28.6 31.5-1 4.5s-1.5 1.8-1 3.7c.4 2-1 2-5 15.3-1.7 5.6-4.4 18.5-6.3 27.5l-4 18.4M77 196.7a313.3 313.3 0 0 1-.8 4.8m7.7-50-1.2 10.3s-1 .2-.5 2.3c.1 1.3-2.6 15.6-5.1 30.2M57.6 273h13.2"
          }), jsxRuntime.jsx("path", {
            fill: "#192064",
            d: "M117.4 147.4s-17-3-35.7.2v4.2s14.6-2.9 35.5-.4l.2-4"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M107.5 150.4v-5a.8.8 0 0 0-.8-.7H99a.8.8 0 0 0-.7.8v4.8c0 .5.3.9.8.8a140.8 140.8 0 0 1 7.7 0 .8.8 0 0 0 .8-.7"
          }), jsxRuntime.jsx("path", {
            fill: "#192064",
            d: "M106.4 149.4v-3a.6.6 0 0 0-.6-.7 94.1 94.1 0 0 0-5.8 0 .6.6 0 0 0-.7.7v3c0 .4.3.7.7.7h5.7c.4 0 .7-.3.7-.7"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M101.5 274h12.3m-11.1-5v6.5m0-12.4v4.3m-.5-93.4.9 44.4s.7 1.6-.2 2.7c-1 1.1 2.4.7.9 2.2-1.6 1.6.9 1.1 0 3.4-.6 1.5-1 21-1.1 35"
          })]
        })]
      });
    case "404":
      return jsxRuntime.jsxs("svg", {
        width: "252",
        height: "294",
        children: [jsxRuntime.jsx("title", {
          children: "No Found"
        }), jsxRuntime.jsxs("g", {
          fill: "none",
          children: [jsxRuntime.jsx("circle", {
            cx: "126.75",
            cy: "128.1",
            r: "126",
            fill: "#E4EBF7"
          }), jsxRuntime.jsx("circle", {
            cx: "31.55",
            cy: "130.8",
            r: "8.3",
            fill: "#FFF"
          }), jsxRuntime.jsx("path", {
            stroke: "#FFF",
            d: "m37 134.3 10.5 6m.9 6.2-12.7 10.8"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M39.9 159.4a5.7 5.7 0 1 1-11.3-1.2 5.7 5.7 0 0 1 11.3 1.2m17.7-16.2a5.7 5.7 0 1 1-11.4-1.1 5.7 5.7 0 0 1 11.4 1.1M99 27h29.8a4.6 4.6 0 1 0 0-9.2H99a4.6 4.6 0 1 0 0 9.2m11.4 18.3h29.8a4.6 4.6 0 0 0 0-9.2h-29.8a4.6 4.6 0 1 0 0 9.2"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M112.8 26.9h15.8a4.6 4.6 0 1 0 0 9.1h-15.8a4.6 4.6 0 0 0 0-9.1m71.7 108.8a10 10 0 1 1-19.8-2 10 10 0 0 1 19.8 2"
          }), jsxRuntime.jsx("path", {
            stroke: "#FFF",
            d: "m179.3 141.8 12.6 7.1m1.1 7.6-15.2 13"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M184.7 170a6.8 6.8 0 1 1-13.6-1.3 6.8 6.8 0 0 1 13.6 1.4m18.6-16.8a6.9 6.9 0 1 1-13.7-1.4 6.9 6.9 0 0 1 13.7 1.4"
          }), jsxRuntime.jsx("path", {
            stroke: "#FFF",
            d: "M152 192.3a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.4 0zm73.3-76.2a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.5 0zm-9 35a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.5 0zM177 107.6a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm18.4-15.4a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.5 0zm6.8 88.5a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.5 0z"
          }), jsxRuntime.jsx("path", {
            stroke: "#FFF",
            d: "m214.4 153.3-2 20.2-10.8 6m-28-4.7-6.3 9.8H156l-4.5 6.5m23.5-66v-15.7m46 7.8-13 8-15.2-8V94.4"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M166.6 66h-4a4.8 4.8 0 0 1-4.7-4.8 4.8 4.8 0 0 1 4.7-4.7h4a4.8 4.8 0 0 1 4.7 4.7 4.8 4.8 0 0 1-4.7 4.7"
          }), jsxRuntime.jsx("circle", {
            cx: "204.3",
            cy: "30",
            r: "29.5",
            fill: "#1677ff"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M206 38.4c.5.5.7 1.1.7 2s-.2 1.4-.7 1.9a3 3 0 0 1-2 .7c-.8 0-1.5-.3-2-.8s-.8-1.1-.8-1.9.3-1.4.8-2c.5-.4 1.2-.7 2-.7.7 0 1.4.3 2 .8m4.2-19.5c1.5 1.3 2.2 3 2.2 5.2a7.2 7.2 0 0 1-1.5 4.5l-3 2.7a5 5 0 0 0-1.3 1.7 5.2 5.2 0 0 0-.6 2.4v.5h-4v-.5c0-1.4.1-2.5.6-3.5s1.9-2.5 4.2-4.5l.4-.5a4 4 0 0 0 1-2.6c0-1.2-.4-2-1-2.8-.7-.6-1.6-1-2.9-1-1.5 0-2.6.5-3.3 1.5-.4.5-.6 1-.8 1.9a2 2 0 0 1-2 1.6 2 2 0 0 1-2-2.4c.4-1.6 1-2.8 2.1-3.8a8.5 8.5 0 0 1 6.3-2.3c2.3 0 4.2.6 5.6 2"
          }), jsxRuntime.jsx("path", {
            fill: "#FFB594",
            d: "M52 76.1s21.8 5.4 27.3 16c5.6 10.7-6.3 9.2-15.7 5C52.8 92 39 85 52 76"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "m90.5 67.5-.5 2.9c-.7.5-4.7-2.7-4.7-2.7l-1.7.8-1.3-5.7s6.8-4.6 9-5c2.4-.5 9.8 1 10.6 2.3 0 0 1.3.4-2.2.6-3.6.3-5 .5-6.8 3.2l-2.4 3.6"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M128 111.4a36.7 36.7 0 0 0-8.9-15.5c-3.5-3-9.3-2.2-11.3-4.2-1.3-1.2-3.2-1.2-3.2-1.2L87.7 87c-2.3-.4-2.1-.7-6-1.4-1.6-1.9-3-1.1-3-1.1l-7-1.4c-1-1.5-2.5-1-2.5-1l-2.4-.9C65 91.2 59 95 59 95c1.8 1.1 15.7 8.3 15.7 8.3l5.1 37.1s-3.3 5.7 1.4 9.1c0 0 19.9-3.7 34.9-.3 0 0 3-2.6 1-8.8.5-3 1.4-8.3 1.7-11.6.4.7 2 1.9 3.1 3.4 0 0 9.4-7.3 11-14a17 17 0 0 1-2.2-2.4c-.5-.8-.3-2-.7-2.8-.7-1-1.8-1.3-2-1.6"
          }), jsxRuntime.jsx("path", {
            fill: "#CBD1D1",
            d: "M101 290s4.4 2 7.4 1c2.9-1 4.6.7 7.1 1.2 2.6.5 6.9 1.1 11.7-1.3 0-5.5-6.9-4-12-6.7-2.5-1.4-3.7-4.7-3.5-8.8h-9.5s-1.2 10.6-1 14.6"
          }), jsxRuntime.jsx("path", {
            fill: "#2B0849",
            d: "M101 289.8s2.5 1.3 6.8.7c3-.5 3.7.5 7.4 1 3.8.6 10.8 0 11.9-.9.4 1.1-.4 2-.4 2s-1.5.7-4.8.9c-2 .1-5.8.3-7.6-.5-1.8-1.4-5.2-1.9-5.7-.2-4 1-7.4-.3-7.4-.3l-.1-2.7z"
          }), jsxRuntime.jsx("path", {
            fill: "#A4AABA",
            d: "M108.3 276h3.1s0 6.7 4.6 8.6c-4.7.6-8.6-2.3-7.7-8.6"
          }), jsxRuntime.jsx("path", {
            fill: "#CBD1D1",
            d: "M57.5 272.4s-2 7.4-4.4 12.3c-1.8 3.7-4.3 7.5 5.4 7.5 6.7 0 9-.5 7.4-6.6-1.5-6.1.3-13.2.3-13.2h-8.7z"
          }), jsxRuntime.jsx("path", {
            fill: "#2B0849",
            d: "M51.5 289.8s2 1.2 6.6 1.2c6 0 8.3-1.7 8.3-1.7s.6 1.1-.7 2.2c-1 .8-3.6 1.6-7.4 1.5-4.1 0-5.8-.5-6.7-1.1-.8-.6-.7-1.6-.1-2.1"
          }), jsxRuntime.jsx("path", {
            fill: "#A4AABA",
            d: "M58.4 274.3s0 1.5-.3 3c-.3 1.4-1 3-1.1 4 0 1.2 4.5 1.7 5.1.1.6-1.5 1.3-6.4 2-7.2.6-.9-5-2.2-5.7.1"
          }), jsxRuntime.jsx("path", {
            fill: "#7BB2F9",
            d: "m99.7 278.5 13.3.1s1.3-54.5 1.9-64.4c.5-9.9 3.8-43.4 1-63.1l-12.6-.7-22.8.8-1.2 10c0 .5-.7.8-.7 1.4-.1.5.4 1.3.3 2-2.4 14-6.4 33-8.8 46.6 0 .7-1.2 1-1.4 2.7 0 .3.2 1.5 0 1.8-6.8 18.7-10.9 47.8-14.2 61.9h14.6s2.2-8.6 4-17c2.9-12.9 23.2-85 23.2-85l3-.5 1 46.3s-.2 1.2.4 2c.5.8-.6 1.1-.4 2.3l.4 1.8-1 11.8c-.4 4.8 0 39.2 0 39.2"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M76 221.6c1.2.1 4.1-2 7-5m23.4 8.5s2.7-1 6-3.8"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M107.3 222.1s2.7-1.1 6-3.9"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M74.7 224.8s2.7-.6 6.5-3.4m4.8-69.8c-.2 3.1.3 8.6-4.3 9.2m22-11s0 14-1.4 15.1a15 15 0 0 1-3 2m.5-16.5s0 13-1.2 24.4m-5 1.1s7.3-1.7 9.5-1.7M74.3 206a212 212 0 0 1-1 4.5s-1.4 1.9-1 3.8c.5 2-1 2-5 15.4A353 353 0 0 0 61 257l-.2 1.2m14.9-60.5a321 321 0 0 1-.9 4.8m7.8-50.4-1.2 10.5s-1.1.1-.5 2.2c.1 1.4-2.7 15.8-5.2 30.5m-19.6 79h13.3"
          }), jsxRuntime.jsx("path", {
            fill: "#192064",
            d: "M116.2 148.2s-17-3-35.9.2c.2 2.5 0 4.2 0 4.2s14.7-2.8 35.7-.3c.3-2.4.2-4 .2-4"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M106.3 151.2v-5a.8.8 0 0 0-.8-.8h-7.8a.8.8 0 0 0-.8.8v5a.8.8 0 0 0 .8.8h7.8a.8.8 0 0 0 .8-.8"
          }), jsxRuntime.jsx("path", {
            fill: "#192064",
            d: "M105.2 150.2v-3a.6.6 0 0 0-.6-.7 94.3 94.3 0 0 0-5.9 0 .7.7 0 0 0-.6.6v3.1a.6.6 0 0 0 .6.7 121.1 121.1 0 0 1 5.8 0c.4 0 .7-.3.7-.7"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M100.3 275.4h12.3m-11.2-4.9.1 6.5m0-12.5a915.8 915.8 0 0 0 0 4.4m-.5-94 .9 44.7s.7 1.6-.2 2.7c-1 1.1 2.4.7.9 2.2-1.6 1.6.9 1.2 0 3.4-.6 1.5-1 21.1-1.1 35.2"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "M46.9 83.4s-.5 6 7.2 5.6c11.2-.7 9.2-9.4 31.5-21.7-.7-2.7-2.4-4.7-2.4-4.7s-11 3-22.6 8c-6.8 3-13.4 6.4-13.7 12.8m57.6 7.7.9-5.4-8.9-11.4-5 5.3-1.8 7.9a.3.3 0 0 0 .1.3c1 .8 6.5 5 14.4 3.5a.3.3 0 0 0 .3-.2"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "M94 79.4s-4.6-2.9-2.5-6.9c1.6-3 4.5 1.2 4.5 1.2s.5-3.7 3.1-3.7c.6-1 1.6-4.1 1.6-4.1l13.5 3c0 5.3-2.3 19.5-7.8 20-8.9.6-12.5-9.5-12.5-9.5"
          }), jsxRuntime.jsx("path", {
            fill: "#520038",
            d: "M113.9 73.4c2.6-2 3.4-9.7 3.4-9.7s-2.4-.5-6.6-2c-4.7-2.1-12.8-4.8-17.5 1-9.6 3.2-2 19.8-2 19.8l2.7-3s-4-3.3-2-6.3c2-3.5 3.8 1 3.8 1s.7-2.3 3.6-3.3c.4-.7 1-2.6 1.4-3.8a1 1 0 0 1 1.3-.7l11.4 2.6c.5.2.8.7.8 1.2l-.3 3.2z"
          }), jsxRuntime.jsx("path", {
            fill: "#552950",
            d: "M105 76c-.1.7-.6 1.1-1 1-.6 0-.9-.6-.8-1.2.1-.6.6-1 1-1 .6 0 .9.7.8 1.3m7.1 1.6c0 .6-.5 1-1 1-.5-.1-.8-.7-.7-1.3 0-.6.5-1 1-1 .5.1.8.7.7 1.3"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "m110.1 74.8-.9 1.7-.3 4.3h-2.2"
          }), jsxRuntime.jsx("path", {
            stroke: "#5C2552",
            d: "M110.8 74.5s1.8-.7 2.6.5"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "M92.4 74.3s.5-1.1 1.1-.7c.6.4 1.3 1.4.6 2-.8.5.1 1.6.1 1.6"
          }), jsxRuntime.jsx("path", {
            stroke: "#5C2552",
            d: "M103.3 73s1.8 1 4.1.9"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "M103.7 81.8s2.2 1.2 4.4 1.2m-3.5 1.3s1 .4 1.6.3m-11.5-3.4s2.3 7.4 10.4 7.6"
          }), jsxRuntime.jsx("path", {
            stroke: "#E4EBF7",
            d: "M81.5 89.4s.4 5.6-5 12.8M69 82.7s-.7 9.2-8.2 14.2m68.6 26s-5.3 7.4-9.4 10.7m-.7-26.3s.5 4.4-2.1 32"
          }), jsxRuntime.jsx("path", {
            fill: "#F2D7AD",
            d: "M150 151.2h-49.8a1 1 0 0 1-1-1v-31.7c0-.5.4-1 1-1H150c.6 0 1 .5 1 1v31.7a1 1 0 0 1-1 1"
          }), jsxRuntime.jsx("path", {
            fill: "#F4D19D",
            d: "M150.3 151.2h-19.9v-33.7h20.8v32.8a1 1 0 0 1-1 1"
          }), jsxRuntime.jsx("path", {
            fill: "#F2D7AD",
            d: "M123.6 127.9H92.9a.5.5 0 0 1-.4-.8l6.4-9.1c.2-.3.5-.5.8-.5h31.1l-7.2 10.4z"
          }), jsxRuntime.jsx("path", {
            fill: "#CC9B6E",
            d: "M123.7 128.4H99.2v-.5h24.2l7.2-10.2.4.3z"
          }), jsxRuntime.jsx("path", {
            fill: "#F4D19D",
            d: "M158.3 127.9h-18.7a2 2 0 0 1-1.6-.8l-7.2-9.6h20c.5 0 1 .3 1.2.6l6.7 9a.5.5 0 0 1-.4.8"
          }), jsxRuntime.jsx("path", {
            fill: "#CC9B6E",
            d: "M157.8 128.5h-19.3l-7.9-10.5.4-.3 7.7 10.3h19.1zm-27.2 22.2v-8.2h.4v8.2zm-.1-10.9v-21.4h.4l.1 21.4zm-18.6 1.1-.5-.1 1.5-5.2.5.2zm-3.5.2-2.6-3 2.6-3.4.4.3-2.4 3.1 2.4 2.6zm8.2 0-.4-.4 2.4-2.6-2.4-3 .4-.4 2.7 3.4z"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "m154.3 131.9-3.1-2v3.5l-1 .1a85 85 0 0 1-4.8.3c-1.9 0-2.7 2.2 2.2 2.6l-2.6-.6s-2.2 1.3.5 2.3c0 0-1.6 1.2.6 2.6-.6 3.5 5.2 4 7 3.6a6.1 6.1 0 0 0 4.6-5.2 8 8 0 0 0-3.4-7.2"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "M153.7 133.6s-6.5.4-8.4.3c-1.8 0-1.9 2.2 2.4 2.3 3.7.2 5.4 0 5.4 0"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "M145.2 135.9c-1.9 1.3.5 2.3.5 2.3s3.5 1 6.8.6m-.6 2.9s-6.3.1-6.7-2.1c-.3-1.4.4-1.4.4-1.4m.5 2.7s-1 3.1 5.5 3.5m-.4-14.5v3.5M52.8 89.3a18 18 0 0 0 13.6-7.8"
          }), jsxRuntime.jsx("path", {
            fill: "#5BA02E",
            d: "M168.6 248.3a6.6 6.6 0 0 1-6.7-6.6v-66.5a6.6 6.6 0 1 1 13.3 0v66.5a6.6 6.6 0 0 1-6.6 6.6"
          }), jsxRuntime.jsx("path", {
            fill: "#92C110",
            d: "M176.5 247.7a6.6 6.6 0 0 1-6.6-6.7v-33.2a6.6 6.6 0 1 1 13.3 0V241a6.6 6.6 0 0 1-6.7 6.7"
          }), jsxRuntime.jsx("path", {
            fill: "#F2D7AD",
            d: "M186.4 293.6H159a3.2 3.2 0 0 1-3.2-3.2v-46.1a3.2 3.2 0 0 1 3.2-3.2h27.5a3.2 3.2 0 0 1 3.2 3.2v46.1a3.2 3.2 0 0 1-3.2 3.2"
          }), jsxRuntime.jsx("path", {
            stroke: "#E4EBF7",
            d: "M89 89.5s7.8 5.4 16.6 2.8"
          })]
        })]
      });
    case "500":
      return jsxRuntime.jsxs("svg", {
        width: "254",
        height: "294",
        children: [jsxRuntime.jsx("title", {
          children: "Server Error"
        }), jsxRuntime.jsxs("g", {
          fill: "none",
          children: [jsxRuntime.jsx("path", {
            fill: "#E4EBF7",
            d: "M0 128.1v-2C0 56.5 56.3.2 125.7.2h2.1C197.2.3 253.5 56.6 253.5 126v2.1c0 69.5-56.3 125.7-125.7 125.7h-2.1A125.7 125.7 0 0 1 0 128.1"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M40 132.1a8.3 8.3 0 1 1-16.6-1.7 8.3 8.3 0 0 1 16.6 1.7"
          }), jsxRuntime.jsx("path", {
            stroke: "#FFF",
            d: "m37.2 135.6 10.5 6m1 6.3-12.8 10.8"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M40.1 160.8a5.7 5.7 0 1 1-11.3-1.1 5.7 5.7 0 0 1 11.3 1.1M58 144.6a5.7 5.7 0 1 1-11.4-1.2 5.7 5.7 0 0 1 11.4 1.2M99.7 27.4h30a4.6 4.6 0 1 0 0-9.2h-30a4.6 4.6 0 0 0 0 9.2M111 46h30a4.6 4.6 0 1 0 0-9.3h-30a4.6 4.6 0 1 0 0 9.3m2.5-18.6h16a4.6 4.6 0 1 0 0 9.3h-16a4.6 4.6 0 0 0 0-9.3m36.7 42.7h-4a4.8 4.8 0 0 1-4.8-4.8 4.8 4.8 0 0 1 4.8-4.8h4a4.8 4.8 0 0 1 4.7 4.8 4.8 4.8 0 0 1-4.7 4.8"
          }), jsxRuntime.jsx("circle", {
            cx: "201.35",
            cy: "30.2",
            r: "29.7",
            fill: "#FF603B"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "m203.6 19.4-.7 15a1.5 1.5 0 0 1-3 0l-.7-15a2.2 2.2 0 1 1 4.4 0m-.3 19.4c.5.5.8 1.1.8 1.9s-.3 1.4-.8 1.9a3 3 0 0 1-2 .7 2.5 2.5 0 0 1-1.8-.7c-.6-.6-.8-1.2-.8-2 0-.7.2-1.3.8-1.8.5-.5 1.1-.7 1.8-.7.8 0 1.5.2 2 .7"
          }), jsxRuntime.jsx("path", {
            fill: "#FFB594",
            d: "M119.3 133.3c4.4-.6 3.6-1.2 4-4.8.8-5.2-3-17-8.2-25.1-1-10.7-12.6-11.3-12.6-11.3s4.3 5 4.2 16.2c1.4 5.3.8 14.5.8 14.5s5.3 11.4 11.8 10.5"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M101 91.6s1.4-.6 3.2.6c8 1.4 10.3 6.7 11.3 11.4 1.8 1.2 1.8 2.3 1.8 3.5l1.5 3s-7.2 1.7-11 6.7c-1.3-6.4-6.9-25.2-6.9-25.2"
          }), jsxRuntime.jsx("path", {
            fill: "#FFB594",
            d: "m94 90.5 1-5.8-9.2-11.9-5.2 5.6-2.6 9.9s8.4 5 16 2.2"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "M83 78.2s-4.6-2.9-2.5-6.9c1.6-3 4.5 1.2 4.5 1.2s.5-3.7 3.2-3.7c.5-1 1.5-4.2 1.5-4.2l13.6 3.2c0 5.2-2.3 19.5-7.9 20-8.9.6-12.5-9.6-12.5-9.6"
          }), jsxRuntime.jsx("path", {
            fill: "#520038",
            d: "M103 72.2c2.6-2 3.5-9.7 3.5-9.7s-2.5-.5-6.7-2c-4.7-2.2-12.9-4.9-17.6.9-9.5 4.4-2 20-2 20l2.7-3.1s-4-3.3-2.1-6.3c2.2-3.5 4 1 4 1s.6-2.3 3.5-3.3c.4-.7 1-2.7 1.5-3.8A1 1 0 0 1 91 65l11.5 2.7c.5.1.8.6.8 1.2l-.3 3.2z"
          }), jsxRuntime.jsx("path", {
            fill: "#552950",
            d: "M101.2 76.5c0 .6-.6 1-1 1-.5-.1-.9-.7-.8-1.3.1-.6.6-1 1.1-1 .5.1.8.7.7 1.3m-7-1.4c0 .6-.5 1-1 1-.5-.1-.8-.7-.7-1.3 0-.6.6-1 1-1 .5.1.9.7.8 1.3"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "m99.2 73.6-.9 1.7-.3 4.3h-2.2"
          }), jsxRuntime.jsx("path", {
            stroke: "#5C2552",
            d: "M100 73.3s1.7-.7 2.4.5"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "M81.4 73s.4-1 1-.6c.7.4 1.4 1.4.6 2s.2 1.6.2 1.6"
          }), jsxRuntime.jsx("path", {
            stroke: "#5C2552",
            d: "M92.3 71.7s1.9 1.1 4.2 1"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "M92.7 80.6s2.3 1.2 4.4 1.2m-3.4 1.4s1 .4 1.5.3M83.7 80s1.8 6.6 9.2 8"
          }), jsxRuntime.jsx("path", {
            stroke: "#E4EBF7",
            d: "M95.5 91.7s-1 2.8-8.2 2c-7.3-.6-10.3-5-10.3-5"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M78.1 87.5s6.6 5 16.5 2.5c0 0 9.6 1 11.5 5.3 5.4 11.8.6 36.8 0 40 3.5 4-.4 8.4-.4 8.4-15.7-3.5-35.8-.6-35.8-.6-4.9-3.5-1.3-9-1.3-9l-6.2-23.8c-2.5-15.2.8-19.8 3.5-20.7 3-1 8-1.3 8-1.3.6 0 1.1 0 1.4-.2 2.4-1.3 2.8-.6 2.8-.6"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "M65.8 89.8s-6.8.5-7.6 8.2c-.4 8.8 3 11 3 11s6.1 22 16.9 22.9c8.4-2.2 4.7-6.7 4.6-11.4-.2-11.3-7-17-7-17s-4.3-13.7-9.9-13.7"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "M71.7 124.2s.9 11.3 9.8 6.5c4.8-2.5 7.6-13.8 9.8-22.6A201 201 0 0 0 94 96l-5-1.7s-2.4 5.6-7.7 12.3c-4.4 5.5-9.2 11.1-9.5 17.7"
          }), jsxRuntime.jsx("path", {
            stroke: "#E4EBF7",
            d: "M108.5 105.2s1.7 2.7-2.4 30.5c2.4 2.2 1 6-.2 7.5"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "M123.3 131.5s-.5 2.8-11.8 2c-15.2-1-25.3-3.2-25.3-3.2l.9-5.8s.7.2 9.7-.1c11.9-.4 18.7-6 25-1 4 3.2 1.5 8.1 1.5 8.1"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M70.2 91s-5.6-4.8-11 2.7c-3.3 7.2.5 15.2 2.6 19.5-.3 3.8 2.4 4.3 2.4 4.3s0 1 1.5 2.7c4-7 6.7-9.1 13.7-12.5-.3-.7-1.9-3.3-1.8-3.8.2-1.7-1.3-2.6-1.3-2.6s-.3-.2-1.2-2.8c-.8-2.3-2-5.1-4.9-7.5"
          }), jsxRuntime.jsx("path", {
            fill: "#CBD1D1",
            d: "M90.2 288s4.9 2.3 8.3 1.2c3.2-1 5.2.7 8 1.3a20 20 0 0 0 13.3-1.4c-.2-6.2-7.8-4.5-13.6-7.6-2.9-1.6-4.2-5.3-4-10H91.5s-1.5 12-1.3 16.5"
          }), jsxRuntime.jsx("path", {
            fill: "#2B0849",
            d: "M90.2 287.8s2.8 1.5 7.6.8c3.5-.5 3.3.6 7.5 1.3 4.2.6 13-.2 14.3-1.2.5 1.3-.4 2.4-.4 2.4s-1.7.6-5.4.9c-2.3.1-8.1.3-10.2-.6-2-1.6-4.9-1.5-6-.3-4.5 1.1-7.2-.3-7.2-.3l-.2-3z"
          }), jsxRuntime.jsx("path", {
            fill: "#A4AABA",
            d: "M98.4 272.3h3.5s0 7.5 5.2 9.6c-5.3.7-9.7-2.6-8.7-9.6"
          }), jsxRuntime.jsx("path", {
            fill: "#CBD1D1",
            d: "M44.4 272s-2.2 7.8-4.7 13c-1.9 3.8-4.4 7.8 5.8 7.8 7 0 9.3-.5 7.7-7-1.6-6.3.3-13.8.3-13.8h-9z"
          }), jsxRuntime.jsx("path", {
            fill: "#2B0849",
            d: "M38 290.3s2.3 1.2 7 1.2c6.4 0 8.7-1.7 8.7-1.7s.6 1.1-.7 2.2c-1 1-3.8 1.7-7.7 1.7-4.4 0-6.1-.6-7-1.3-1-.5-.8-1.6-.2-2.1"
          }), jsxRuntime.jsx("path", {
            fill: "#A4AABA",
            d: "M45.3 274s0 1.6-.3 3.1-1.1 3.3-1.2 4.4c0 1.2 4.8 1.6 5.4 0 .7-1.6 1.4-6.8 2-7.6.7-.9-5.1-2.2-5.9.1"
          }), jsxRuntime.jsx("path", {
            fill: "#7BB2F9",
            d: "M89.5 277.6h13.9s1.3-56.6 1.9-66.8c.6-10.3 4-45.1 1-65.6l-13-.7-23.7.8-1.3 10.4c0 .5-.7.9-.8 1.4 0 .6.5 1.4.4 2L59.6 206c-.1.7-1.3 1-1.5 2.8 0 .3.2 1.6.1 1.8-7.1 19.5-12.2 52.6-15.6 67.2h15.1L62 259c3-13.3 24-88.3 24-88.3l3.2-1-.2 48.6s-.2 1.3.4 2.1c.5.8-.6 1.2-.4 2.4l.4 1.8-1 12.4c-.4 4.9 1.2 40.7 1.2 40.7"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M64.6 218.9c1.2 0 4.2-2.1 7.2-5.1m24.2 8.7s3-1.1 6.4-4"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M97 219.4s2.9-1.2 6.3-4"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M63.2 222.1s2.7-.6 6.7-3.5m5-72.4c-.3 3.2.3 8.8-4.5 9.4m22.8-11.3s.1 14.6-1.4 15.7c-2.3 1.7-3 2-3 2m.4-17s.3 13-1 25m-4.7.7s6.8-1 9.1-1M46 270l-.9 4.6m1.8-11.3-.8 4.1m16.6-64.9c-.3 1.6 0 2-.4 3.4 0 0-2.8 2-2.3 4s-.3 3.4-4.5 17.2c-1.8 5.8-4.3 19-6.2 28.3l-1.1 5.8m16-67-1 4.9m8.1-52.3-1.2 10.9s-1.2.1-.5 2.3c0 1.4-2.8 16.4-5.4 31.6m-20 82.1h13.9"
          }), jsxRuntime.jsx("path", {
            fill: "#192064",
            d: "M106.2 142.1c-3-.5-18.8-2.7-36.2.2a.6.6 0 0 0-.6.7v3a.6.6 0 0 0 .8.6c3.3-.5 17-2.4 35.6-.3.4 0 .7-.2.7-.5.2-1.4.2-2.5.2-3a.6.6 0 0 0-.5-.7"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M96.4 145.3v-5.1a.8.8 0 0 0-.8-.9 114.1 114.1 0 0 0-8.1 0 .8.8 0 0 0-.9.8v5.1c0 .5.4.9.9.9h8a.8.8 0 0 0 .9-.8"
          }), jsxRuntime.jsx("path", {
            fill: "#192064",
            d: "M95.2 144.3v-3.2a.7.7 0 0 0-.6-.7h-6.1a.7.7 0 0 0-.6.7v3.2c0 .4.3.7.6.7h6c.4 0 .7-.3.7-.7"
          }), jsxRuntime.jsx("path", {
            stroke: "#648BD8",
            d: "M90.1 273.5h12.8m-11.7-3.7v6.3m-.3-12.6v4.5m-.5-97.6 1 46.4s.7 1.6-.3 2.8c-.9 1.1 2.6.7 1 2.3-1.7 1.6.9 1.2 0 3.5-.6 1.6-1 22-1.2 36.5"
          }), jsxRuntime.jsx("path", {
            stroke: "#E4EBF7",
            d: "M73.7 98.7 76 103s2 .8 1.8 2.7l.8 2.2m-14.3 8.7c.2-1 2.2-7.1 12.6-10.5m.7-16s7.7 6 16.5 2.7"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "M92 87s5.5-.9 7.5-4.6c1.3-.3.8 2.2-.3 3.7l-1 1.5s.2.3.2.9c0 .6-.2.6-.3 1v1l-.4 1c-.1.2 0 .6-.2.9-.2.4-1.6 1.8-2.6 2.8-3.8 3.6-5 1.7-6-.4-1-1.8-.7-5.1-.9-6.9-.3-2.9-2.6-3-2-4.4.4-.7 3 .7 3.4 1.8.7 2 2.9 1.8 2.6 1.7"
          }), jsxRuntime.jsx("path", {
            stroke: "#DB836E",
            d: "M99.8 82.4c-.5.1-.3.3-1 1.3-.6 1-4.8 2.9-6.4 3.2-2.5.5-2.2-1.6-4.2-2.9-1.7-1-3.6-.6-1.4 1.4 1 1 1 1.1 1.4 3.2.3 1.5-.7 3.7.7 5.6"
          }), jsxRuntime.jsx("path", {
            stroke: "#E59788",
            d: "M79.5 108.7c-2 2.9-4.2 6.1-5.5 8.7"
          }), jsxRuntime.jsx("path", {
            fill: "#FFC6A0",
            d: "M87.7 124.8s-2-2-5.1-2.8c-3-.7-3.6-.1-5.5.1-2 .3-4-.9-3.7.7.3 1.7 5 1 5.2 2.1.2 1.1-6.3 2.8-8.3 2.2-.8.8.5 1.9 2 2.2.3 1.5 2.3 1.5 2.3 1.5s.7 1 2.6 1.1c2.5 1.3 9-.7 11-1.5 2-.9-.5-5.6-.5-5.6"
          }), jsxRuntime.jsx("path", {
            stroke: "#E59788",
            d: "M73.4 122.8s.7 1.2 3.2 1.4c2.3.3 2.6.6 2.6.6s-2.6 3-9.1 2.3m2.3 2.2s3.8 0 5-.7m-2.4 2.2s2 0 3.3-.6m-1 1.7s1.7 0 2.8-.5m-6.8-9s-.6-1.1 1.3-.5c1.7.5 2.8 0 5.1.1 1.4.1 3-.2 4 .2 1.6.8 3.6 2.2 3.6 2.2s10.6 1.2 19-1.1M79 108s-8.4 2.8-13.2 12.1"
          }), jsxRuntime.jsx("path", {
            stroke: "#E4EBF7",
            d: "M109.3 112.5s3.4-3.6 7.6-4.6"
          }), jsxRuntime.jsx("path", {
            stroke: "#E59788",
            d: "M107.4 123s9.7-2.7 11.4-.9"
          }), jsxRuntime.jsx("path", {
            stroke: "#BFCDDD",
            d: "m194.6 83.7 4-4M187.2 91l3.7-3.6m.9-3-4.5-4.7m11.2 11.5-4.2-4.3m-65 76.3 3.7-3.7M122.3 170l3.5-3.5m.8-2.9-4.3-4.2M133 170l-4-4"
          }), jsxRuntime.jsx("path", {
            fill: "#A3B4C6",
            d: "M190.2 211.8h-1.6a4 4 0 0 1-4-4v-32.1a4 4 0 0 1 4-4h1.6a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4"
          }), jsxRuntime.jsx("path", {
            fill: "#A3B4C6",
            d: "M237.8 213a4.8 4.8 0 0 1-4.8 4.8h-86.6a4.8 4.8 0 0 1 0-9.6H233a4.8 4.8 0 0 1 4.8 4.8"
          }), jsxRuntime.jsx("path", {
            fill: "#A3B4C6",
            d: "M154.1 190.1h70.5v-84.6h-70.5z"
          }), jsxRuntime.jsx("path", {
            fill: "#BFCDDD",
            d: "M225 190.1h-71.2a3.2 3.2 0 0 1-3.2-3.2v-19a3.2 3.2 0 0 1 3.2-3.2h71.1a3.2 3.2 0 0 1 3.2 3.2v19a3.2 3.2 0 0 1-3.2 3.2m0-59.3h-71.1a3.2 3.2 0 0 1-3.2-3.2v-19a3.2 3.2 0 0 1 3.2-3.2h71.1a3.2 3.2 0 0 1 3.2 3.3v19a3.2 3.2 0 0 1-3.2 3.1"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M159.6 120.5a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m48.1 0h-22.4a.8.8 0 0 1-.8-.8v-3.2c0-.4.3-.8.8-.8h22.4c.5 0 .8.4.8.8v3.2c0 .5-.3.8-.8.8"
          }), jsxRuntime.jsx("path", {
            fill: "#BFCDDD",
            d: "M225 160.5h-71.2a3.2 3.2 0 0 1-3.2-3.2v-19a3.2 3.2 0 0 1 3.2-3.2h71.1a3.2 3.2 0 0 1 3.2 3.2v19a3.2 3.2 0 0 1-3.2 3.2"
          }), jsxRuntime.jsx("path", {
            stroke: "#7C90A5",
            d: "M173.5 130.8h49.3m-57.8 0h6m-15 0h6.7m11.1 29.8h49.3m-57.7 0h6m-15.8 0h6.7"
          }), jsxRuntime.jsx("path", {
            fill: "#FFF",
            d: "M159.6 151a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m48.1 0h-22.4a.8.8 0 0 1-.8-.8V147c0-.4.3-.8.8-.8h22.4c.5 0 .8.4.8.8v3.2c0 .5-.3.8-.8.8m-63 29a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.5 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m48.1 0h-22.4a.8.8 0 0 1-.8-.8V176c0-.5.3-.8.8-.8h22.4c.5 0 .8.3.8.8v3.2c0 .4-.3.8-.8.8"
          }), jsxRuntime.jsx("path", {
            fill: "#BFCDDD",
            d: "M203 221.1h-27.3a2.4 2.4 0 0 1-2.4-2.4v-11.4a2.4 2.4 0 0 1 2.4-2.5H203a2.4 2.4 0 0 1 2.4 2.5v11.4a2.4 2.4 0 0 1-2.4 2.4"
          }), jsxRuntime.jsx("path", {
            stroke: "#A3B4C6",
            d: "M177.3 207.2v11.5m23.8-11.5v11.5"
          }), jsxRuntime.jsx("path", {
            fill: "#5BA02E",
            d: "M162.9 267.9a9.4 9.4 0 0 1-9.4-9.4v-14.8a9.4 9.4 0 0 1 18.8 0v14.8a9.4 9.4 0 0 1-9.4 9.4"
          }), jsxRuntime.jsx("path", {
            fill: "#92C110",
            d: "M171.2 267.8a9.4 9.4 0 0 1-9.4-9.4V255a9.4 9.4 0 0 1 18.8 0v3.4a9.4 9.4 0 0 1-9.4 9.4"
          }), jsxRuntime.jsx("path", {
            fill: "#F2D7AD",
            d: "M181.3 293.7h-27.7a3.2 3.2 0 0 1-3.2-3.2v-20.7a3.2 3.2 0 0 1 3.2-3.2h27.7a3.2 3.2 0 0 1 3.2 3.2v20.7a3.2 3.2 0 0 1-3.2 3.2"
          })]
        })]
      });
    default:
      return null;
  }
};

const IMAGE_SIZE = 40;
const IMAGE_PROGRESS_PERCENT = 100;
const Upload = ({
  prefixCls = prefixClsUpload,
  prefixClsV3 = prefixClsUploadV3,
  multiple = false,
  style,
  className,
  onChange,
  action,
  name = 'file',
  method = 'POST',
  headers,
  directory,
  beforeUpload,
  rootClassName,
  onRemove,
  disabled,
  withCredentials,
  openFileDialogOnClick = true,
  maxCount,
  fileList: controlledFileList,
  customRequest,
  accept,
  listType = 'text',
  showUploadList = true,
  children,
  noStyle,
  defaultFileList
}) => {
  const uploadRef = react.useRef(null);
  const [fileList, setFileList] = react.useState(() => (controlledFileList || defaultFileList || []).map((file, idx) => ({
    ...file,
    uid: file.uid || `${Date.now()}-${idx}`,
    status: file.status || 'done',
    percent: file.percent || IMAGE_PROGRESS_PERCENT
  })));
  const updateFileList = newList => {
    setFileList(newList);
    if (onChange) {
      onChange({
        fileList: newList,
        file: newList[0] || {}
      });
    }
  };
  const handleFileChange = async event => {
    const rawFiles = Array.from(event.target.files || []);
    let uploadFiles = rawFiles.map((file, i) => ({
      uid: `${Date.now()}-${i}`,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      percent: 0,
      originFileObj: file
    }));
    if (beforeUpload) {
      const filtered = [];
      for (let i = 0; i < uploadFiles.length; i++) {
        const file = uploadFiles[i].originFileObj;
        const result = await beforeUpload(file, rawFiles);
        if (result === false) {
          continue;
        }
        filtered.push(uploadFiles[i]);
      }
      uploadFiles = filtered;
    }
    const newList = (multiple ? [...fileList, ...uploadFiles] : uploadFiles).slice(0, maxCount);
    updateFileList(newList);
    uploadFiles.forEach(file => {
      const rcFile = file.originFileObj;
      const updateProgress = percent => {
        file.percent = percent;
        updateFileList([...newList]);
      };
      const markSuccess = () => {
        file.status = 'done';
        file.percent = 100;
        updateFileList([...newList]);
      };
      const markError = () => {
        file.status = 'error';
        updateFileList([...newList]);
      };
      if (customRequest) {
        customRequest({
          file: rcFile,
          onSuccess: markSuccess,
          onError: markError,
          onProgress: event => {
            const percent = Math.round(event.loaded / (event.total || event.loaded) * IMAGE_PROGRESS_PERCENT);
            updateProgress(percent);
          }
        });
      } else if (typeof action === 'string') {
        const formData = new FormData();
        formData.append(name, rcFile);
        fetch(action, {
          method,
          body: formData,
          headers,
          credentials: withCredentials ? 'include' : 'same-origin'
        }).then(res => {
          if (!res.ok) {
            throw new Error('Upload failed');
          }
          return res.json();
        }).then(markSuccess).catch(markError);
      } else if (typeof action === 'function') {
        action(rcFile);
        markSuccess();
      } else {
        markSuccess();
      }
    });
    if (uploadRef.current) {
      uploadRef.current.value = '';
    }
  };
  const handleRemove = uid => {
    const filtered = [];
    let removedFile = undefined;
    fileList.forEach(file => {
      if (file.uid !== uid) {
        filtered.push(file);
      } else {
        removedFile = file;
      }
    });
    updateFileList(filtered);
    if (removedFile) {
      onRemove?.(removedFile);
    }
  };
  const handleClick = () => {
    if (!disabled && openFileDialogOnClick && uploadRef.current) {
      uploadRef.current.click();
    }
  };
  return jsxRuntime.jsxs("div", {
    className: clsx([`${prefixCls}-wrapper ${prefixClsV3}-wrapper`, className, rootClassName, {
      noStyle: noStyle,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixClsV3}-disabled`]: disabled
    }]),
    style: style,
    children: [jsxRuntime.jsxs("span", {
      className: clsx([`${prefixCls}`, `${prefixCls}-${listType}`, `${prefixClsV3}`, `${prefixClsV3}-${listType}`]),
      onClick: handleClick,
      children: [children, jsxRuntime.jsx("input", {
        type: "file",
        ref: uploadRef,
        accept: accept,
        multiple: multiple,
        onChange: handleFileChange,
        className: `${prefixCls}-input ${prefixClsV3}-input`,
        disabled: disabled,
        ...(directory ? {
          directory: true,
          webkitdirectory: true
        } : {})
      })]
    }), showUploadList && fileList.length > 0 && jsxRuntime.jsx("ul", {
      className: `${prefixCls}-list ${prefixCls}-list-${listType} ${prefixClsV3}-list ${prefixClsV3}-list-${listType}`,
      children: fileList.map(file => jsxRuntime.jsxs("li", {
        className: `${prefixCls}-item ${prefixCls}-item-${file.status} ${prefixClsV3}-item ${prefixClsV3}-item-${file.status}`,
        children: [jsxRuntime.jsx("span", {
          className: `${prefixCls}-remove ${prefixClsV3}-remove`,
          onClick: () => handleRemove(file.uid),
          children: listType === 'picture' && (file.originFileObj || file.url) ? jsxRuntime.jsx("img", {
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            alt: file.name,
            src: file.url || URL.createObjectURL(file.originFileObj),
            className: `${prefixCls}-item-thumbnail ${prefixClsV3}-item-thumbnail`
          }) : jsxRuntime.jsx(StampleIcon, {})
        }), jsxRuntime.jsxs("div", {
          style: {
            width: '100%'
          },
          children: [jsxRuntime.jsx("div", {
            className: `${prefixCls}-item-title ${prefixClsV3}-item-title`,
            style: {
              ...(file.status === 'uploading' ? {
                marginBottom: 12
              } : {})
            },
            children: jsxRuntime.jsx("span", {
              className: `${prefixCls}-item-remove-icon ${prefixClsV3}-item-remove-icon`,
              onClick: () => handleRemove(file.uid),
              style: {
                cursor: 'pointer',
                marginLeft: 'auto'
              },
              role: "button",
              "aria-label": "Remove file",
              children: jsxRuntime.jsx(TrashIcon, {})
            })
          }), file.status === 'uploading' && jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [jsxRuntime.jsx("div", {
              className: `${prefixCls}-item-progress-line ${prefixClsV3}-item-progress-line`
            }), jsxRuntime.jsx("div", {
              className: `${prefixCls}-item-progress-line-percent ${prefixClsV3}-item-progress-line-percent`,
              style: {
                width: `${file.percent}%`
              }
            })]
          })]
        })]
      }, file.uid))
    })]
  });
};

const ConditionalWrapper = ({
  condition,
  wrapper,
  children
}) => condition ? wrapper(children) : children;

function getScrollParent(el, includeSelf = false) {
  if (!el) return null;
  let current = includeSelf ? el : el.parentElement;
  while (current) {
    const style = getComputedStyle(current);
    const overflowY = style.overflowY;
    const overflowX = style.overflowX;
    const canScroll = overflowY === 'auto' || overflowY === 'scroll' || overflowX === 'auto' || overflowX === 'scroll';
    if (canScroll) {
      return current;
    }
    current = current.parentElement;
  }
  return document.scrollingElement;
}
const clampWithinContainer = (left, popupWidth, containerRect) => {
  const minLeft = containerRect.left + document.documentElement.scrollLeft;
  const maxLeft = containerRect.right + document.documentElement.scrollLeft - popupWidth;
  return {
    minLeft,
    maxLeft,
    leftPosition: Math.min(Math.max(left, minLeft), maxLeft)
  };
};
const usePosition = ({
  isOpen,
  offset = 4,
  popupRef,
  placement,
  triggerRef,
  getPopupContainer
}) => {
  const [showPlacement, setShowPlacement] = react.useState('');
  const [_dropdownPosition, setDropdownPosition] = react.useState({});
  const dropdownPosition = react.useCallback(() => {
    if (!triggerRef.current) {
      return {};
    }
    const inputRect = triggerRef.current?.getBoundingClientRect();
    const dropdownHeight = popupRef.current?.offsetHeight || popupRef.current?.offsetHeight || 0;
    const containerRect = (getPopupContainer || getScrollParent(triggerRef.current, true) || document.body).getBoundingClientRect();
    const spaceAbove = inputRect.top - containerRect.top;
    const spaceBelow = containerRect.bottom - inputRect.bottom;
    const _shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;
    const hasRight = placement?.includes('Right');
    if (getPopupContainer) {
      const {
        minLeft,
        maxLeft,
        leftPosition
      } = clampWithinContainer(hasRight ? (inputRect.left || 0) + (triggerRef.current?.offsetWidth || 0) - (popupRef.current?.offsetWidth || 0) : (inputRect.left || 0) + document.documentElement.scrollLeft, popupRef.current?.offsetWidth || 0, containerRect);
      const _center = minLeft + maxLeft < (popupRef.current?.offsetWidth || 0) ? 'center' : '';
      setShowPlacement(_shouldShowAbove ? `bottom ${_center}` : `${_center}`);
      const _top = (inputRect.top || 0) + document.documentElement.scrollTop;
      if (_shouldShowAbove) {
        setDropdownPosition({
          top: _top - (popupRef.current?.offsetHeight || 0) + 4 - (offset !== 4 ? offset * 2 : 0),
          left: leftPosition
        });
      } else {
        setDropdownPosition({
          top: _top + (triggerRef.current?.offsetHeight || 0) + offset,
          left: leftPosition
        });
      }
    } else {
      setDropdownPosition({
        top: (_shouldShowAbove ? triggerRef.current.offsetTop - (popupRef.current?.offsetHeight || dropdownHeight) - offset * 2 : triggerRef.current.offsetTop + triggerRef.current?.offsetHeight) + offset,
        ...(hasRight ? {
          left: (() => {
            const {
              minLeft,
              maxLeft,
              leftPosition
            } = clampWithinContainer(triggerRef.current.offsetLeft + (triggerRef.current?.offsetWidth || 0) - (popupRef.current?.offsetWidth || dropdownHeight), popupRef.current?.offsetWidth || dropdownHeight, containerRect);
            const _center = minLeft + maxLeft < (popupRef.current?.offsetWidth || 0) ? 'center' : '';
            setShowPlacement(_shouldShowAbove ? `bottom ${_center}` : `${_center}`);
            return leftPosition;
          })()
        } : {
          left: (() => {
            const {
              minLeft,
              maxLeft,
              leftPosition
            } = clampWithinContainer(triggerRef.current.offsetLeft, popupRef.current?.offsetWidth || dropdownHeight, containerRect);
            const _center = minLeft + maxLeft < (popupRef.current?.offsetWidth || 0) ? 'center' : '';
            setShowPlacement(_shouldShowAbove ? `bottom ${_center}` : `${_center}`);
            return leftPosition;
          })()
        })
      });
    }
  }, [offset, popupRef, placement, triggerRef, getPopupContainer]);
  react.useEffect(() => {
    if (!isOpen) return;
    const _dropdownPosition = () => dropdownPosition();
    _dropdownPosition();
    const controller = new AbortController();
    const scrollableParents = getScrollParent(triggerRef.current, true);
    scrollableParents?.addEventListener('scroll', _dropdownPosition, {
      passive: true,
      signal: controller.signal
    });
    window.addEventListener('scroll', _dropdownPosition, {
      passive: true,
      signal: controller.signal
    });
    window.addEventListener('resize', _dropdownPosition, {
      signal: controller.signal
    });
    return () => {
      controller.abort();
    };
  }, [isOpen, triggerRef, getPopupContainer, dropdownPosition]);
  return {
    showPlacement,
    dropdownPosition: {
      ..._dropdownPosition,
      opacity: Object.keys(_dropdownPosition).length ? 1 : 0
    }
  };
};

var css_248z$k = ".xUi-datepicker-container{font-family:Arial,sans-serif;height:max-content;position:relative}.xUi-datepicker-input{align-items:center;background-color:transparent;border:1px solid var(--xui-border-color);border-radius:6px;color:var(--xui-text-color);cursor:pointer;display:flex;gap:8px;justify-content:space-between;padding:3px 7px;transition:all .3s}.xUi-datepicker-input.noBordered{border:none!important}.xUi-datepicker-input input{border:none;color:var(--xui-text-color);font-size:var(--xui-font-size-sm);outline:none;padding:0}.xUi-datepicker-input:placeholder-shown{text-overflow:ellipsis}.xUi-datepicker-input:hover{border-color:var(--xui-primary-color)}.xUi-datepicker-icon{color:var(--xui-text-color);cursor:pointer;height:16px;opacity:.6;transition:.3s ease;width:16px}.xUi-datepicker-icon:hover{color:var(--xui-primary-color);opacity:1}.xUi-datepicker-selected-date{border:none;color:var(--xui-text-color);font-size:var(--xui-font-size-md);letter-spacing:.8px;outline:none}.xUi-datepicker-disabled{background-color:var(--xui-color-disabled);border-color:var(--xui-border-color)!important;cursor:not-allowed;opacity:.5}.xUi-datepicker-disabled .xUi-datepicker-selected-date{cursor:not-allowed;opacity:.6}.xUi-datepicker-disabled .xUi-datepicker-icon{cursor:not-allowed}.xUi-datepicker-icon{align-items:center;color:#8c8c8c;display:flex;font-size:16px;gap:6px}.xUi-datepicker-error{border-color:var(--xui-error-color)}.xUi-datepicker-error .error-svg-icon,.xUi-datepicker-error .xUi-datepicker-icon,.xUi-datepicker-icon .error-svg-icon{color:var(--xui-error-color)}.xUi-datepicker-input.sm{font-size:var(--xui-font-size-sm);padding:4px 8px}.xUi-datepicker-input.md{font-size:var(--xui-font-size-md);padding:8px 12px}.xUi-datepicker-input.lg{font-size:var(--xui-font-size-lg);padding:10px 16px}.xUi-datepicker-dropdown-wrapper{position:absolute;transition:opacity .3s ease,transform .01s ease;z-index:1000}.xUi-datepicker-dropdown-wrapper.bottomLeft{left:0;margin-top:4px;top:100%}.xUi-datepicker-dropdown-wrapper.bottomRight{margin-top:4px;right:0;top:100%}.xUi-datepicker-dropdown-wrapper.topLeft{bottom:100%;left:0;margin-bottom:4px}.xUi-datepicker-dropdown-wrapper.topRight{bottom:100%;margin-bottom:4px;right:0}.xUi-datepicker-dropdown{background:var(--xui-background-color);border:1px solid var(--xui-border-color);border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.15);min-width:250px;padding:12px}.xUi-datepicker-header{align-items:center;border-bottom:1px solid var(--xui-border-color);display:flex;gap:8px;justify-content:space-between;margin-bottom:8px;padding-bottom:12px}.xUi-datepicker-day-footer{align-items:center;border-top:1px solid var(--xui-border-color);display:flex;justify-content:center;margin-top:8px;padding-top:12px;width:100%}.xUi-datepicker-nav-buttons{display:flex;gap:4px}.xUi-datepicker-nav-buttons button{background:none;border:none;border-radius:4px;color:var(--xui-text-color);cursor:pointer;font-size:20px;opacity:.7;padding:2px 6px;transition:all .3s}.xUi-datepicker-nav-buttons button:not(:disabled):hover{color:var(--xui-primary-color)}.xUi-datepicker-dropdown-selects{align-items:center;display:flex;gap:6px}.xUi-datepicker-dropdown-selects button,.xUi-datepicker-select{background:var(--xui-background-color);border:none;border-radius:4px;color:var(--xui-text-color);cursor:pointer;font-weight:600;padding:4px 8px;transition:all .3s}.xUi-datepicker-dropdown-selects button:hover,.xUi-datepicker-select:not(:disabled):hover{color:var(--xui-primary-color)}.xUi-datepicker-grid{display:grid;gap:2px;grid-template-columns:repeat(3,1fr);text-align:center}.xUi-datepicker-grid.day{grid-template-columns:repeat(7,1fr)}.xUi-datepicker-day-header{color:var(--xui-text-color);font-size:14px;margin:4px 0;user-select:none}.xUi-datepicker-day,.xUi-datepicker-month,.xUi-datepicker-year{background:none;border:none;border-radius:4px;color:var(--xui-text-color);cursor:pointer;height:30px;line-height:30px;min-width:30px;text-align:center;transition:all .2s}.xUi-datepicker-month,.xUi-datepicker-year{margin:7px}.xUi-datepicker-day:disabled,.xUi-datepicker-month:disabled,.xUi-datepicker-select:disabled,.xUi-datepicker-year:disabled{background-color:var(--xui-color-disabled);cursor:not-allowed;opacity:.5}.xUi-datepicker-day:not(:disabled):hover,.xUi-datepicker-month:not(:disabled):hover,.xUi-datepicker-year:not(:disabled):hover{background:var(--xui-primary-color-light);color:#fff}.xUi-datepicker-selected{background:var(--xui-primary-color)!important;color:#fff!important;font-weight:700}.xUi-datepicker-other-month{color:var(--xui-text-color);opacity:.4}.xUi-datepicker-other-month:not(:disabled):hover{background-color:var(--xui-color-hover);color:var(--xui-text-color);user-select:none}.xUi-datepicker-footer{margin-top:12px;text-align:right}.xUi-datepicker-footer-today-btn{background:none;border:1px solid var(--xui-border-color);border-radius:4px;color:var(--xui-primary-color);cursor:pointer;font-size:13px;padding:4px 8px;transition:all .3s}.xUi-datepicker-footer-today-btn:not(:disabled):hover{background-color:var(--xui-primary-color-light);color:#fff}.xUi-datepicker-large .xUi-datepicker-selected-date{font-size:16px}.xUi-datepicker-large .xUi-datepicker-input{padding:11px}.xUi-datepicker-middle .xUi-datepicker-input{padding:6px 11px}";
styleInject(css_248z$k);

const INPUT_SIZE$1 = 12;
const NUMBER_SIX = 6;
const MONTH_LENGTH = 11;
const NEXT_DAYS_COUNT_AS_CURRENT_MUNTH = 35;
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DatePicker = ({
  value,
  onChange,
  onCalendarChange,
  disabled,
  error,
  placeholder = 'Select date',
  prefixCls = prefixClsDatePicker,
  noStyle,
  feedbackIcons,
  locale,
  className = '',
  placement = 'bottomLeft',
  defaultValue,
  size = 'large',
  format = 'YYYY-MM-DD',
  getPopupContainer,
  showToday = true,
  allowClear = false,
  disabledDate,
  suffixIcon,
  picker = 'date',
  prefix,
  defaultOpen = false,
  inputReadOnly = false,
  bordered = true,
  defaultPickerValue
}) => {
  const triggerRef = react.useRef(null);
  const initialDate = value || defaultValue;
  const initialPickerDate = defaultPickerValue || initialDate;
  const popupRef = react.useRef(null);
  const popuptriggerRef = react.useRef(null);
  const DateNow = new Date();
  const [selectedDate, setSelectedDate] = react.useState(initialDate);
  const [selectedDatePlaceholder, setSelectedDatePlaceholder] = react.useState(initialDate ? formatDate(initialDate, format) : undefined);
  const [isOpen, setIsOpen] = react.useState(defaultOpen);
  const [currentYear, setCurrentYear] = react.useState(initialPickerDate ? new Date(initialPickerDate).getFullYear() : DateNow.getFullYear());
  const [currentMonth, setCurrentMonth] = react.useState(initialPickerDate ? new Date(initialPickerDate).getMonth() : DateNow.getMonth());
  const [viewMode, setViewMode] = react.useState(picker === 'month' ? 'month' : picker === 'year' ? 'year' : 'day');
  const localeMonths = locale?.shortMonths || Array.from({
    length: 12
  }, (_, i) => new Date(0, i).toLocaleString(locale?.locale || 'default', {
    month: 'short'
  }));
  const localeWeekdays = locale?.shortWeekDays || ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const {
    dropdownPosition
  } = usePosition({
    isOpen,
    popupRef,
    placement,
    triggerRef,
    getPopupContainer: getPopupContainer?.(triggerRef.current)
  });
  react.useEffect(() => {
    const _date = value || defaultValue;
    setSelectedDate(_date);
    setSelectedDatePlaceholder(_date ? formatDate(_date, format) : undefined);
  }, [value]);
  react.useEffect(() => {
    const handleClickOutside = event => {
      if (popupRef.current && !popupRef.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const controller = new AbortController();
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside, {
        signal: controller.signal
      });
    }
    return () => {
      controller.abort();
    };
  }, [isOpen]);
  react.useEffect(() => {
    if (getPopupContainer && triggerRef.current) {
      popuptriggerRef.current = getPopupContainer(triggerRef.current);
    }
  }, [getPopupContainer]);
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  function formatDate(date, format) {
    if (typeof format === 'function') {
      return format(date);
    }
    if (typeof format === 'string') {
      date = new Date(date);
      return format.replace(/YYYY/, date.getFullYear().toString()).replace(/MMM/, monthNames[date.getMonth()]).replace(/MM/, (date.getMonth() + 1).toString().padStart(2, '0')).replace(/DD/, date.getDate().toString().padStart(2, '0'));
    }
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
  const handleSelect = (day, month, year) => {
    if (disabled) {
      return;
    }
    const date = new Date(year, month, day);
    if (disabledDate?.(date, {
      from: undefined,
      to: undefined
    })) {
      return;
    }
    setCurrentMonth(month);
    setCurrentYear(year);
    setSelectedDate(date);
    const formatted = formatDate(date, format);
    setSelectedDatePlaceholder(formatted);
    onChange?.(date.toUTCString(), formatted);
    onCalendarChange?.(date.toUTCString(), formatted, {
      range: undefined
    });
    setIsOpen(false);
  };
  const clearSelection = () => {
    setSelectedDate(undefined);
    setSelectedDatePlaceholder(undefined);
    onChange?.(null, '');
  };
  const isMonthDisabled = month => {
    const date = new Date(currentYear, month + 1, 1);
    return disabledDate?.(date, {
      from: undefined,
      to: undefined
    });
  };
  const isYearDisabled = year => {
    const date = new Date(year + 1, currentMonth, 1);
    return disabledDate?.(date, {
      from: undefined,
      to: undefined
    });
  };
  const prevMonth = currentMonth === 0 ? MONTH_LENGTH : currentMonth - 1;
  const nextMonth = currentMonth === MONTH_LENGTH ? 0 : currentMonth + 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const nextMonthYear = currentMonth === MONTH_LENGTH ? currentYear + 1 : currentYear;
  const totalDays = daysInMonth(currentYear, currentMonth);
  const firstDay = firstDayOfMonth(currentYear, currentMonth);
  const prevMonthDays = daysInMonth(prevMonthYear, prevMonth);
  const nextDaysCount = NEXT_DAYS_COUNT_AS_CURRENT_MUNTH - (firstDay + totalDays);
  const days = [...Array.from({
    length: firstDay
  }, (_, i) => ({
    day: prevMonthDays - firstDay + i + 1,
    current: false,
    month: prevMonth,
    year: prevMonthYear
  })), ...Array.from({
    length: totalDays
  }, (_, i) => ({
    day: i + 1,
    current: true,
    month: currentMonth,
    year: currentYear
  })), ...Array.from({
    length: nextDaysCount
  }, (_, i) => ({
    day: i + 1,
    current: false,
    month: nextMonth,
    year: nextMonthYear
  }))];
  return jsxRuntime.jsxs("div", {
    className: clsx([`${prefixCls}-container`, {
      noStyle,
      [`${prefixCls}-${size}`]: size
    }]),
    children: [jsxRuntime.jsx("div", {
      className: `${prefixCls}-input-wrapper`,
      ref: triggerRef,
      children: jsxRuntime.jsxs("button", {
        type: "button",
        className: clsx([`${prefixCls}-input ${className}`, {
          noBordered: !bordered,
          [`${prefixCls}-error`]: error,
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-disabled`]: disabled
        }]),
        disabled: disabled,
        onClick: e => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        },
        children: [prefix || null, jsxRuntime.jsx("input", {
          size: INPUT_SIZE$1,
          disabled: disabled,
          readOnly: inputReadOnly,
          className: `${prefixCls}-selected-date globalEllipsis`,
          placeholder: placeholder,
          style: {
            opacity: isOpen ? '0.6' : 1
          },
          defaultValue: selectedDatePlaceholder
        }, selectedDate?.toString()), jsxRuntime.jsxs("span", {
          className: `${prefixCls}-icon`,
          children: [allowClear && selectedDate ? jsxRuntime.jsx("span", {
            className: `${prefixCls}-clear`,
            onClick: clearSelection,
            children: typeof allowClear === 'object' && allowClear.clearIcon ? allowClear.clearIcon : jsxRuntime.jsx(ClearIcon, {})
          }) : suffixIcon || jsxRuntime.jsx(CalendarIcon, {}), error && feedbackIcons ? jsxRuntime.jsx(ErrorIcon, {}) : null]
        })]
      })
    }), isOpen && jsxRuntime.jsx(ConditionalWrapper, {
      condition: getPopupContainer !== undefined,
      wrapper: element => getPopupContainer ? /*#__PURE__*/reactDom.createPortal(element, getPopupContainer(popupRef.current)) : jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: element
      }),
      children: jsxRuntime.jsx("div", {
        ref: popupRef,
        className: `${prefixCls}-dropdown-wrapper`,
        style: dropdownPosition,
        children: jsxRuntime.jsxs("div", {
          className: `${prefixCls}-dropdown`,
          children: [jsxRuntime.jsxs("div", {
            className: `${prefixCls}-header`,
            children: [jsxRuntime.jsxs("div", {
              className: `${prefixCls}-nav-buttons`,
              children: [jsxRuntime.jsx("button", {
                onClick: e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentYear(y => y - 1);
                },
                children: "\u00AB"
              }), jsxRuntime.jsx("button", {
                onClick: e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentMonth(m => m === 0 ? (setCurrentYear(y => y - 1), MONTH_LENGTH) : m - 1);
                },
                children: "\u2039"
              })]
            }), jsxRuntime.jsxs("div", {
              className: `${prefixCls}-dropdown-selects`,
              children: [jsxRuntime.jsx("button", {
                type: "button",
                className: `${prefixCls}-select`,
                onClick: e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setViewMode('year');
                },
                children: currentYear
              }), jsxRuntime.jsx("button", {
                type: "button",
                className: `${prefixCls}-select`,
                onClick: e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setViewMode('month');
                },
                children: localeMonths[currentMonth]
              })]
            }), jsxRuntime.jsxs("div", {
              className: `${prefixCls}-nav-buttons`,
              children: [jsxRuntime.jsx("button", {
                onClick: e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentMonth(m => m === MONTH_LENGTH ? (setCurrentYear(y => y + 1), 0) : m + 1);
                },
                children: "\u203A"
              }), jsxRuntime.jsx("button", {
                onClick: e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentYear(y => y + 1);
                },
                children: "\u00BB"
              })]
            })]
          }), viewMode === 'day' && jsxRuntime.jsxs("div", {
            className: `${prefixCls}-grid day`,
            children: [localeWeekdays.map(day => jsxRuntime.jsx("div", {
              className: `${prefixCls}-day-header`,
              children: day
            }, day)), days.map(({
              day,
              current,
              month,
              year
            }, idx) => {
              const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
              return jsxRuntime.jsx("button", {
                className: clsx([`${prefixCls}-day`, {
                  [`${prefixCls}-selected`]: isSelected,
                  [`${prefixCls}-other-month`]: !current
                }]),
                onClick: e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(day, month, year);
                },
                disabled: disabledDate?.(new Date(year, month, day), {
                  from: undefined,
                  to: undefined
                }),
                children: day
              }, `${year}-${month}-${day}-${idx}`);
            })]
          }), viewMode === 'month' && jsxRuntime.jsx("div", {
            className: `${prefixCls}-grid`,
            children: localeMonths.map((m, i) => jsxRuntime.jsx("button", {
              className: `${prefixCls}-month`,
              onClick: e => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentMonth(i);
                setViewMode('day');
              },
              disabled: isMonthDisabled(i),
              children: m
            }, i))
          }), viewMode === 'year' && jsxRuntime.jsx("div", {
            className: `${prefixCls}-grid`,
            children: Array.from({
              length: 12
            }, (_, i) => {
              const year = currentYear - NUMBER_SIX + i;
              return jsxRuntime.jsx("button", {
                className: `${prefixCls}-year`,
                disabled: isYearDisabled(year),
                onClick: e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentYear(year);
                  setViewMode('month');
                },
                children: year
              }, year);
            })
          }), showToday && jsxRuntime.jsx("div", {
            className: `${prefixCls}-day-footer`,
            style: {
              gridColumn: 'span 7'
            },
            children: jsxRuntime.jsx("button", {
              className: `${prefixCls}-select`,
              disabled: disabledDate?.(new Date(DateNow.getDate(), DateNow.getMonth(), DateNow.getFullYear()), {
                from: undefined,
                to: undefined
              }),
              onClick: e => {
                e.preventDefault();
                e.stopPropagation();
                handleSelect(DateNow.getDate(), DateNow.getMonth(), DateNow.getFullYear());
              },
              children: locale?.today || 'Today'
            })
          })]
        })
      })
    })]
  });
};

var css_248z$j = ".xUi-rangepicker-range-container{font-size:14px;position:relative;user-select:none}.xUi-rangepicker-range-input-wrapper{background-color:#fff;border-radius:6px;display:flex;transition:all .3s;width:100%}.xUi-rangepicker-range-input-wrapper:hover{border-color:#4096ff}.xUi-rangepicker-range-input{align-items:center;border-right:1px solid var(--xui-border-color);cursor:pointer;display:flex;flex:1;padding:4px 11px}.xUi-rangepicker-range-input:last-child{border-right:none}.xUi-rangepicker-range-input input{background:transparent;border:none;color:#000;cursor:pointer;font-size:14px;outline:none;width:100%}.xUi-rangepicker-range-input input::placeholder{color:#bfbfbf}.xUi-rangepicker-range-clear,.xUi-rangepicker-range-icon{align-items:center;display:flex;margin-left:8px;transition:color .3s}.xUi-rangepicker-range-icon{color:rgba(0,0,0,.25)}.xUi-rangepicker-range-clear{color:rgba(0,0,0,.45);cursor:pointer}.xUi-rangepicker-range-clear:hover{color:#000}.xUi-rangepicker-range-dropdown-wrapper{background:#fff;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.15);display:none;left:0;margin-top:4px;min-width:560px;opacity:1;padding:8px;position:absolute;top:100%;transform:translateY(4px);transition:opacity .2s ease,transform .2s ease;z-index:1050}.xUi-rangepicker-range-dropdown-wrapper.show{display:flex}.xUi-rangepicker-dropdown-range,.xUi-rangepicker-range-dropdown{background-color:#fff;border:1px solid var(--xui-border-color);border-radius:6px;display:flex;margin-top:2px;overflow:hidden}.xUi-rangepicker-calendar{background:#fff;border-radius:6px;margin:12px}.xUi-rangepicker-calendar.month,.xUi-rangepicker-calendar.year{width:280px}.xUi-rangepicker-calendar-header{align-items:center;display:flex;font-weight:500;justify-content:space-between}.xUi-rangepicker-month,.xUi-rangepicker-year{background:none;border:none;border-radius:4px;color:var(--xui-text-color);cursor:pointer;height:30px;line-height:30px;margin:7px;min-width:30px;text-align:center;transition:all .2s}.xUi-rangepicker-day:disabled,.xUi-rangepicker-month:disabled,.xUi-rangepicker-select:disabled,.xUi-rangepicker-year:disabled{background-color:var(--xui-color-disabled);cursor:not-allowed;opacity:.5}.xUi-rangepicker-day:not(:disabled):hover,.xUi-rangepicker-month:not(:disabled):hover,.xUi-rangepicker-year:not(:disabled):hover{background:var(--xui-primary-color-light);color:#fff}.xUi-rangepicker-calendar-header button,.xUi-rangepicker-dropdown-selects button,.xUi-rangepicker-nav-buttons button{background:transparent;border:none;color:#595959;cursor:pointer;font-size:14px;font-weight:600;line-height:1;padding:0 6px;transition:color .2s ease}.xUi-rangepicker-nav-buttons button{font-size:20px;font-weight:400}.xUi-rangepicker-calendar-header button:hover,.xUi-rangepicker-dropdown-selects button:hover,.xUi-rangepicker-nav-buttons button:hover{color:var(--xui-primary-color)}.xUi-rangepicker-input{align-items:center;background-color:transparent;border:1px solid var(--xui-border-color);border-radius:6px;color:var(--xui-text-color);cursor:pointer;display:flex;gap:8px;justify-content:space-between;padding:3px 7px;transition:all .3s}.xUi-rangepicker-input.noBordered{border:none!important}.xUi-rangepicker-input input{border:none;color:var(--xui-text-color);font-size:var(--xui-font-size-sm);outline:none;padding:0}.xUi-rangepicker-input:placeholder-shown{text-overflow:ellipsis}.xUi-rangepicker-input:hover{border-color:var(--xui-primary-color)}.xUi-rangepicker-weekday-row{background-color:#fff;box-shadow:0 1px 0 rgba(0,0,0,.1);display:grid;gap:4px;grid-template-columns:repeat(7,1fr);position:sticky;top:0;z-index:1}.xUi-rangepicker-weekday{align-items:center;color:var(--xui-text-color);display:flex;font-size:12px;font-weight:500;font-weight:600;height:30px;justify-content:center;text-align:center}.xUi-rangepicker-days-grid,.xUi-rangepicker-grid{display:grid;gap:2px;grid-template-columns:repeat(3,1fr)}.xUi-rangepicker-days-grid.day{grid-template-columns:repeat(7,0fr)}.xUi-rangepicker-day{background-color:transparent;border:1px solid transparent;border-radius:4px;cursor:pointer;height:30px;line-height:30px;text-align:center;transition:background-color .3s,color .3s;width:30px}.xUi-rangepicker-day:hover{background-color:var(--xui-primary-color);border-radius:4px;color:#fff}.xUi-rangepicker-day.xUi-rangepicker-other-month:hover{background-color:var(--xui-color-disabled)!important;color:var(--xui-text-color)}.xUi-rangepicker-range-end:not(.xUi-rangepicker-other-month),.xUi-rangepicker-range-start:not(.xUi-rangepicker-other-month),.xUi-rangepicker-selected{background-color:var(--xui-primary-color)!important;color:#fff!important;font-weight:600}.xUi-rangepicker-in-range{background-color:#f0f5ff}.xUi-rangepicker-hover-end{background-color:var(--xui-primary-color)!important;color:#fff}.xUi-rangepicker-disabled,.xUi-rangepicker-other-month:not(.xUi-rangepicker-in-range){color:#ccc}.xUi-rangepicker-disabled{cursor:not-allowed}.xUi-rangepicker-footer{display:flex;grid-column:span 7;justify-content:center;padding-top:6px}.xUi-rangepicker-select{background:none;border:none;color:var(--xui-primary-color);cursor:pointer}.xUi-rangepicker-input.sm{font-size:var(--xui-font-size-sm);padding:4px 8px}.xUi-rangepicker-input.md{font-size:var(--xui-font-size-md);padding:8px 12px}.xUi-rangepicker-input.lg{font-size:var(--xui-font-size-lg);padding:10px 16px}.xUi-rangepicker-dropdown-wrapper{opacity:0;pointer-events:none;position:absolute;transform:scale(.95);transition:opacity .2s ease,transform .2s ease;z-index:1000}.xUi-rangepicker-dropdown-wrapper.bottomLeft{left:0;margin-top:4px;top:100%}.xUi-rangepicker-dropdown-wrapper.bottomRight{margin-top:4px;right:0;top:100%}.xUi-rangepicker-dropdown-wrapper.topLeft{bottom:100%;left:0;margin-bottom:4px}.xUi-rangepicker-dropdown-wrapper.topRight{bottom:100%;margin-bottom:4px;right:0}.xUi-rangepicker-dropdown-wrapper.show{opacity:1;pointer-events:auto;transform:scale(1)}.xUi-rangepicker-large .xUi-rangepicker-selected-date{font-size:16px}.xUi-rangepicker-large .xUi-rangepicker-input{padding:11px}.xUi-rangepicker-middle .xUi-rangepicker-input{padding:6px 11px}.xUi-rangepicker-dropdown-trigger{background-color:#fff;border:1px solid var(--xui-border-color);border-radius:2px;cursor:pointer;line-height:32px;padding:0 8px}.xUi-rangepicker-dropdown-menu{background:#fff;border:1px solid var(--xui-border-color);box-shadow:0 2px 8px rgba(0,0,0,.15);max-height:200px;overflow-y:auto;position:absolute;z-index:1000}.xUi-rangepicker-dropdown-item{cursor:pointer;padding:4px 12px}.xUi-rangepicker-dropdown-item:hover{background:#f5f5f5}.xUi-rangepicker-dropdown-item.active{background-color:#e6f7ff;font-weight:700}.xUi-rangepicker-header{align-items:center;border-bottom:1px solid var(--xui-border-color);display:flex;gap:8px;justify-content:space-between;margin-bottom:8px;padding-bottom:12px;width:100%}.xUi-rangepicker-in-hover-range{background-color:#f0f5ff;border:1px dashed var(--xui-primary-color)!important;border-radius:4px!important}";
styleInject(css_248z$j);

const RangePicker = ({
  prefixCls = prefixClsRangePicker,
  value,
  onChange,
  placeholder = ['Start date', 'End date'],
  disabled,
  error,
  format = 'YYYY-MM-DD',
  prefix,
  allowClear = true,
  inputReadOnly = false,
  size = 'large',
  picker = 'date',
  locale,
  disabledDate,
  onVisibleChange,
  onCalendarChange,
  style = {},
  className = '',
  separator,
  defaultValue,
  bordered = true,
  getPopupContainer,
  placement
}) => {
  const triggerRef = react.useRef(null);
  const [isOpen, setIsOpen] = react.useState(false);
  const [selectedDates, setSelectedDates] = react.useState([value?.[0] || defaultValue?.[0] || null, value?.[1] || defaultValue?.[1] || null]);
  react.useEffect(() => {
    setSelectedDates([value?.[0] || defaultValue?.[0] || null, value?.[1] || defaultValue?.[1] || null]);
  }, [value]);
  const popupRef = react.useRef(null);
  const [hoveredDate, setHoveredDate] = react.useState(null);
  const [currentMonth, setCurrentMonth] = react.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = react.useState(new Date().getFullYear());
  const [viewMode, setViewMode] = react.useState(picker === 'month' ? 'month' : picker === 'year' ? 'year' : 'day');
  const {
    dropdownPosition
  } = usePosition({
    isOpen,
    popupRef,
    placement,
    triggerRef,
    getPopupContainer: getPopupContainer?.(triggerRef.current)
  });
  const localeMonths = locale?.shortMonths || Array.from({
    length: 12
  }, (_, i) => new Date(0, i).toLocaleString(locale?.locale || 'default', {
    month: 'short'
  }));
  const localeWeekdays = locale?.shortWeekDays || ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  react.useEffect(() => {
    const handleClickOutside = event => {
      if (popupRef.current && !popupRef.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
        onVisibleChange?.(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const isInHoverRange = date => {
    const [start, end] = selectedDates;
    if (!start || end || !hoveredDate) return false;
    const rangeStart = hoveredDate < start ? hoveredDate : start;
    const rangeEnd = hoveredDate < start ? start : hoveredDate;
    return date > rangeStart && date < rangeEnd;
  };
  const handleSelect = date => {
    if (!selectedDates[0] || selectedDates[0] && selectedDates[1]) {
      setSelectedDates([date, null]);
      onCalendarChange?.([date.toUTCString(), undefined], [formatDate(date)], {});
    } else {
      const start = selectedDates[0];
      const end = date < start ? start : date;
      const begin = date < start ? date : start;
      setSelectedDates([begin, end]);
      onChange?.([begin.toUTCString(), end.toUTCString()], [formatDate(begin), formatDate(end)]);
      onCalendarChange?.([begin.toUTCString(), end.toUTCString()], [formatDate(begin), formatDate(end)], {});
      setIsOpen(false);
      onVisibleChange?.(false);
    }
  };
  const isMonthDisabled = month => {
    const date = new Date(currentYear, month + 1, 1);
    return disabledDate?.(date, {
      from: undefined,
      to: undefined
    });
  };
  const isYearDisabled = year => {
    const date = new Date(year + 1, currentMonth, 1);
    return disabledDate?.(date, {
      from: undefined,
      to: undefined
    });
  };
  const formatDate = date => {
    if (typeof format === 'function') {
      return format(date);
    }
    return `${format}`.replace(/YYYY/, date.getFullYear().toString()).replace(/MM/, (date.getMonth() + 1).toString().padStart(2, '0')).replace(/DD/, date.getDate().toString().padStart(2, '0'));
  };
  const isInRange = date => {
    const [start, end] = selectedDates;
    return start && end && date > start && date < end;
  };
  const renderMonthYearSelector = (monthOffset = 0, all) => {
    const baseYear = currentYear;
    const baseMonth = currentMonth + monthOffset;
    return jsxRuntime.jsxs("div", {
      className: `${prefixCls}-header ${className}`,
      children: [all || !monthOffset ? jsxRuntime.jsxs("div", {
        className: `${prefixCls}-nav-buttons`,
        children: [jsxRuntime.jsx("button", {
          onClick: e => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentYear(y => y - 1);
          },
          children: "\u00AB"
        }), jsxRuntime.jsx("button", {
          onClick: e => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentMonth(m => m === 0 ? (setCurrentYear(y => y - 1), MONTH_LENGTH) : m - 1);
          },
          children: "\u2039"
        })]
      }) : jsxRuntime.jsx("span", {}), jsxRuntime.jsxs("div", {
        className: `${prefixCls}-dropdown-selects`,
        children: [jsxRuntime.jsx("button", {
          type: "button",
          className: `${prefixCls}-select`,
          onClick: e => {
            e.preventDefault();
            e.stopPropagation();
            setViewMode('year');
          },
          children: baseYear
        }), jsxRuntime.jsx("button", {
          type: "button",
          className: `${prefixCls}-select`,
          onClick: e => {
            e.preventDefault();
            e.stopPropagation();
            setViewMode('month');
          },
          children: localeMonths[baseMonth]
        })]
      }), all || monthOffset ? jsxRuntime.jsxs("div", {
        className: `${prefixCls}-nav-buttons`,
        children: [jsxRuntime.jsx("button", {
          onClick: e => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentMonth(m => m === MONTH_LENGTH ? (setCurrentYear(y => y + 1), 0) : m + 1);
          },
          children: "\u203A"
        }), jsxRuntime.jsx("button", {
          onClick: e => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentYear(y => y + 1);
          },
          children: "\u00BB"
        })]
      }) : jsxRuntime.jsx("span", {})]
    });
  };
  const renderCalendar = (monthOffset = 0, all) => {
    const baseDate = new Date(currentYear, currentMonth + monthOffset, 1);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = (() => {
      const prevMonth = new Date(year, month, 0);
      const totalDays = prevMonth.getDate();
      return Array.from({
        length: firstDay
      }, (_, i) => new Date(year, month - 1, totalDays - firstDay + i + 1));
    })();
    const currentMonthDays = Array.from({
      length: daysInMonth
    }, (_, i) => new Date(year, month, i + 1));
    const totalDisplayed = prevMonthDays.length + currentMonthDays.length;
    const remaining = NEXT_DAYS_COUNT_AS_CURRENT_MUNTH - totalDisplayed;
    const nextMonthDays = Array.from({
      length: remaining
    }, (_, i) => new Date(year, month + 1, i + 1));
    const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    return jsxRuntime.jsxs("div", {
      className: `${prefixCls}-calendar ${viewMode}`,
      children: [jsxRuntime.jsx("div", {
        className: `${prefixCls}-calendar-header`,
        children: renderMonthYearSelector(monthOffset, all)
      }), viewMode === 'day' && jsxRuntime.jsxs("div", {
        className: `${prefixCls}-days-grid day`,
        children: [localeWeekdays.map((day, i) => jsxRuntime.jsx("div", {
          className: `${prefixCls}-weekday`,
          children: day
        }, i)), days.map((day, i) => {
          const isSelected = day && selectedDates.some(d => d?.toDateString() === day?.toDateString());
          const inRange = day && isInRange(day);
          const isSameMonth = day?.getMonth() === month;
          return jsxRuntime.jsx("button", {
            disabled: disabledDate?.(day, {
              from: undefined,
              to: undefined
            }),
            onClick: e => {
              e.preventDefault();
              e.stopPropagation();
              day && handleSelect(day);
            },
            onMouseEnter: e => {
              e.preventDefault();
              e.stopPropagation();
              day && setHoveredDate(day);
            },
            className: clsx([`${prefixCls}-day`, {
              [`${prefixCls}-selected`]: isSelected,
              [`${prefixCls}-in-range`]: inRange,
              [`${prefixCls}-hover-end`]: hoveredDate && selectedDates[0] && !selectedDates[1] && hoveredDate > selectedDates[0] && hoveredDate?.toDateString() === day?.toDateString(),
              [`${prefixCls}-other-month`]: !isSameMonth,
              [`${prefixCls}-in-hover-range`]: isInHoverRange(day)
            }]),
            children: day?.getDate()
          }, i);
        })]
      }), viewMode === 'month' && jsxRuntime.jsx("div", {
        className: `${prefixCls}-grid`,
        children: localeMonths.map((m, i) => jsxRuntime.jsx("button", {
          className: `${prefixCls}-month`,
          onClick: e => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentMonth(i);
            setViewMode('day');
          },
          disabled: isMonthDisabled(i),
          children: m
        }, i))
      }), viewMode === 'year' && jsxRuntime.jsx("div", {
        className: `${prefixCls}-grid`,
        children: Array.from({
          length: 12
        }, (_, i) => {
          const year = currentYear - NUMBER_SIX + i;
          return jsxRuntime.jsx("button", {
            className: `${prefixCls}-year`,
            disabled: isYearDisabled(year),
            onClick: e => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentYear(year);
              setViewMode('month');
            },
            children: year
          }, year);
        })
      })]
    });
  };
  const handleClear = () => {
    setSelectedDates([null, null]);
    onChange?.(null, ['', '']);
  };
  return jsxRuntime.jsxs("div", {
    style: style,
    className: clsx([`${prefixCls}-range-container`, {
      [`${prefixCls}-${size}`]: size,
      [className]: className
    }]),
    children: [jsxRuntime.jsx("div", {
      className: `${prefixCls}-range-input-wrapper`,
      ref: triggerRef,
      children: jsxRuntime.jsxs("button", {
        type: "button",
        className: clsx([`${prefixCls}-input`, {
          noBordered: !bordered,
          [`${prefixCls}-error`]: error,
          [`${prefixCls}-disabled`]: disabled
        }]),
        disabled: disabled,
        onClick: e => {
          e.preventDefault();
          e.stopPropagation();
          if (!isOpen) {
            setIsOpen(!isOpen);
            onVisibleChange?.(!isOpen);
          }
        },
        children: [prefix, jsxRuntime.jsx("input", {
          readOnly: inputReadOnly,
          className: `${prefixCls}-selected-date`,
          placeholder: placeholder[0],
          ...{
            [inputReadOnly ? 'value' : 'defaultValue']: selectedDates[0] ? formatDate(selectedDates[0]) : ''
          }
        }, `0_${selectedDates[0]?.toUTCString()}`), jsxRuntime.jsx("span", {
          className: `${prefixCls}-range-separator`,
          children: separator || jsxRuntime.jsx(DateDistanceIcon, {})
        }), jsxRuntime.jsx("input", {
          readOnly: inputReadOnly,
          className: `${prefixCls}-selected-date`,
          placeholder: placeholder[1],
          ...{
            [inputReadOnly ? 'value' : 'defaultValue']: selectedDates[1] ? formatDate(selectedDates[1]) : ''
          }
        }, `1_${selectedDates[1]?.toUTCString()}`), jsxRuntime.jsx("span", {
          className: `${prefixCls}-icon`,
          children: allowClear && (selectedDates[0] || selectedDates[1]) ? jsxRuntime.jsx("span", {
            className: `${prefixCls}-clear`,
            onClick: handleClear,
            children: jsxRuntime.jsx(ClearIcon, {})
          }) : jsxRuntime.jsx(CalendarIcon, {})
        })]
      })
    }), isOpen && jsxRuntime.jsx(ConditionalWrapper, {
      condition: getPopupContainer !== undefined,
      wrapper: element => getPopupContainer ? /*#__PURE__*/reactDom.createPortal(element, getPopupContainer(popupRef.current)) : jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: element
      }),
      children: jsxRuntime.jsx("div", {
        ref: popupRef,
        className: `${prefixCls}-dropdown-wrapper show`,
        style: dropdownPosition,
        children: jsxRuntime.jsxs("div", {
          className: `${prefixCls}-dropdown-range`,
          children: [renderCalendar(0, viewMode !== 'day'), viewMode === 'day' && renderCalendar(1, viewMode !== 'day')]
        })
      })
    })]
  });
};

var css_248z$i = ".xUi-timepicker-wrapper{display:inline-block;font-size:14px;position:relative}.xUi-timepicker-input-wrapper{position:relative;width:100%}.xUi-timepicker-input{border:1px solid var(--xui-border-color);border-radius:6px;box-sizing:border-box;font-size:14px;height:32px;line-height:32px;padding:4px 11px;transition:all .3s;width:100%}.xUi-timepicker-input:focus,.xUi-timepicker-input:hover{border-color:var(--xui-primary-color-light)}.xUi-timepicker-input:focus{outline:none}.xUi-timepicker-input::placeholder{opacity:.6}.xUi-timepicker-clear{color:rgba(0,0,0,.45);cursor:pointer;font-size:12px;position:absolute;right:8px;top:50%;transform:translateY(-50%);z-index:2}.xUi-timepicker-clear:hover{color:rgba(0,0,0,.75)}.xUi-timepicker-popup{background:#fff;border:1px solid var(--xui-border-color);border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.15);display:flex;left:0;min-width:max-content;padding:8px 0;z-index:1}.xUi-timepicker-panel{display:flex;width:100%}.xUi-timepicker-column{align-items:center;display:flex;flex:1;flex-direction:column;margin-bottom:5px;max-height:169px;overflow-x:hidden;overflow-y:auto;padding-left:4px;width:52px}.xUi-timepicker-column::-webkit-scrollbar,.xUi-timepicker-column::-webkit-scrollbar-thumb{width:4px}.xUi-timepicker-column:nth-child(2){border-left:1px solid var(--xui-border-color);border-right:1px solid var(--xui-border-color)}.xUi-timepicker-cell{align-items:center;border-radius:4px;cursor:pointer;display:flex;font-size:14px;justify-content:center;margin-bottom:2px;padding:6px 0;text-align:center;transition:background .3s;width:44px}.xUi-timepicker-cell:hover{background-color:#e6f4ff}.xUi-timepicker-cell-selected{background-color:#e6f4ff;font-weight:500}.xUi-timepicker-cell-disabled{color:rgba(0,0,0,.25);pointer-events:none;user-select:none}.xUi-timepicker-now-btn{color:#4096ff;cursor:pointer;font-weight:500;margin-top:10px;padding:0 0 4px;text-align:center;transition:background .3s}.xUi-timepicker-icons{align-items:center;display:flex;gap:4px;position:absolute;right:8px;top:50%;transform:translateY(-50%)}.xUi-timepicker-suffix{align-items:center;cursor:pointer;display:flex;justify-content:center}.xUi-timepicker-suffix svg{color:#999;height:14px;width:14px}.xUi-timepicker-clear{right:0;top:1px}.xUi-timepicker-actions{align-items:center;border-top:1px solid var(--xui-border-color);display:flex;justify-content:space-between;padding:0 8px}.xUi-timepicker-ok-btn{background-color:var(--xui-primary-color);border:none;border-radius:4px;color:#fff;cursor:pointer;margin-top:7px;outline:none;padding:4px 8px;transition:.3s ease}.xUi-timepicker-ok-btn:disabled{background-color:var(--xui-color-disabled);color:grey;font-size:13px}.xUi-timepicker-ok-btn:not(:disabled):hover{background-color:var(--xui-primary-color-light)}.xUi-timepicker-popup{margin-top:4px;position:absolute;top:100%}";
styleInject(css_248z$i);

const HOURS = 24;
const INPUT_SIZE = 13;
const TIME_OPTION_PADDING = 4;
const MINUTES_AND_SECONDS = 60;
const ADD_EMPTY_SECTION_COUNT = 5;
const pad = num => String(num).padStart(2, '0');
const TimePicker = ({
  prefixCls = prefixClsTimePicker,
  style = {},
  className = '',
  disabledTime,
  inputReadOnly = false,
  format = 'HH:mm:ss',
  defaultValue = null,
  value: propValue = null,
  onChange,
  onBlur,
  onSelect,
  showNow = true,
  clearIcon = jsxRuntime.jsx(ClearIcon, {}),
  suffixIcon = jsxRuntime.jsx(TimeIcon, {}),
  placeholder = 'Select time',
  getPopupContainer,
  placement
}) => {
  const [open, setOpen] = react.useState(false);
  const [innerValue, setInnerValue] = react.useState(propValue || defaultValue ? new Date(propValue || defaultValue) : null);
  const [[showHour, showMinutes, showSeconds]] = react.useState(`${format}`.split(':'));
  const [tempValue, setTempValue] = react.useState(null);
  const inputRef = react.useRef(null);
  const popupRef = react.useRef(null);
  const hourRef = react.useRef(null);
  const minuteRef = react.useRef(null);
  const secondRef = react.useRef(null);
  const {
    dropdownPosition
  } = usePosition({
    popupRef,
    placement,
    isOpen: open,
    triggerRef: inputRef,
    getPopupContainer: getPopupContainer?.(inputRef.current)
  });
  react.useEffect(() => {
    setInnerValue(propValue || defaultValue ? new Date(propValue || defaultValue) : null);
  }, [propValue]);
  react.useEffect(() => {
    const handleClickOutside = e => {
      if (popupRef.current && !popupRef.current.contains(e.target) && inputRef.current && !inputRef.current.contains(e.target)) {
        setOpen(false);
        setTempValue(null);
        if (!innerValue) {
          onChange?.(null, '');
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [innerValue, onChange]);
  react.useEffect(() => {
    if (open) {
      setTempValue(innerValue ? new Date(innerValue) : null);
      const {
        hour = 0,
        minute = 0,
        second = 0
      } = getTimeParts(innerValue);
      scrollToTop(hourRef, hour || 0);
      scrollToTop(minuteRef, minute || 0);
      scrollToTop(secondRef, second || 0);
    }
  }, [open, innerValue]);
  react.useEffect(() => {
    onSelect?.(tempValue);
  }, [tempValue, onSelect]);
  react.useEffect(() => {
    if (open) {
      setTempValue(innerValue ? new Date(innerValue) : null);
    }
  }, [open, innerValue]);
  const formatDate = date => {
    if (!date) {
      return '';
    }
    return `${format}`.replace(/HH|hh/, pad(date.getHours())).replace(/MM|mm/, pad(date.getMinutes())).replace(/SS|ss/, pad(date.getSeconds()));
  };
  const getTimeParts = date => ({
    hour: date?.getHours() ?? null,
    minute: date?.getMinutes() ?? null,
    second: date?.getSeconds() ?? null
  });
  const getDisabled = (type, hour = 0, minute = 0) => {
    const disabled = disabledTime?.(tempValue || new Date());
    if (!disabled) {
      return [];
    }
    if (type === 'hour') {
      return disabled.disabledHours?.() || [];
    }
    if (type === 'minute') {
      return disabled.disabledMinutes?.(hour) || [];
    }
    if (type === 'second') {
      return disabled.disabledSeconds?.(hour, minute) || [];
    }
    return [];
  };
  const scrollToTop = (ref, selectedIndex) => {
    const el = ref.current?.querySelectorAll('div')[selectedIndex];
    if (el && ref.current) {
      ref.current.scrollTo({
        top: el.offsetTop - TIME_OPTION_PADDING * 2,
        behavior: 'smooth'
      });
    }
  };
  const updateTempValue = (hour, minute, second) => {
    const newDate = new Date();
    newDate.setHours(hour, minute, second, 0);
    setTempValue(newDate);
  };
  const onSelectHour = (h, auto) => {
    const {
      minute = 0,
      second = 0
    } = getTimeParts(tempValue);
    if (!auto) {
      if (!minute) {
        onSelectMinute(0, true);
      }
      if (!second) {
        onSelectSecond(0, true);
      }
    }
    updateTempValue(h, minute || 0, second || 0);
    scrollToTop(hourRef, h);
  };
  const onSelectMinute = (m, auto) => {
    const {
      hour = 0,
      second = 0
    } = getTimeParts(tempValue);
    if (!auto) {
      if (!hour) {
        onSelectHour(0, true);
      }
      if (!second) {
        onSelectSecond(0, true);
      }
    }
    updateTempValue(hour || 0, m, second || 0);
    scrollToTop(minuteRef, m);
  };
  const onSelectSecond = (s, auto) => {
    const {
      hour = 0,
      minute = 0
    } = getTimeParts(tempValue);
    if (!auto) {
      if (!hour) {
        onSelectHour(0, true);
      }
      if (!minute) {
        onSelectMinute(0, true);
      }
    }
    updateTempValue(hour || 0, minute || 0, s);
    scrollToTop(secondRef, s);
  };
  const handleClear = e => {
    e?.stopPropagation();
    setInnerValue(null);
    setTempValue(null);
    onChange?.(null, '');
  };
  const handleShowNow = () => {
    const now = new Date();
    setTempValue(now);
    setInnerValue(now);
    onChange?.(now, formatDate(now));
    onSelect?.(now);
    setOpen(false);
  };
  const handleOkButton = () => {
    if (tempValue) {
      setInnerValue(tempValue);
      onChange?.(tempValue, formatDate(tempValue));
      onSelect?.(tempValue);
    }
    setOpen(false);
  };
  const handleOnChange = e => {
    const inputVal = e.target.value.trim();
    const timeRegex = /^(\d{2}):(\d{2}):(\d{2})$/;
    const match = inputVal.match(timeRegex);
    if (match) {
      const [, hStr, mStr, sStr] = match;
      const h = parseInt(hStr, 10);
      const m = parseInt(mStr, 10);
      const s = parseInt(sStr, 10);
      if (h >= 0 && h < HOURS && m >= 0 && m < MINUTES_AND_SECONDS && s >= 0 && s < MINUTES_AND_SECONDS && !getDisabled('hour').includes(h) && !getDisabled('minute', h).includes(m) && !getDisabled('second', h, m).includes(s)) {
        onSelectHour(h);
        onSelectMinute(m);
        onSelectSecond(s);
      }
    }
  };
  const renderOptions = () => {
    const hours = Array.from({
      length: HOURS + ADD_EMPTY_SECTION_COUNT
    }, (_, i) => i < HOURS ? i : false);
    const minutesSeconds = Array.from({
      length: MINUTES_AND_SECONDS + ADD_EMPTY_SECTION_COUNT
    }, (_, i) => i < MINUTES_AND_SECONDS ? i : false);
    const {
      hour: selectedHour,
      minute: selectedMinute,
      second: selectedSecond
    } = getTimeParts(tempValue);
    const currentHour = selectedHour ?? 0;
    const currentMinute = selectedMinute ?? 0;
    return jsxRuntime.jsxs("div", {
      children: [jsxRuntime.jsxs("div", {
        className: `${prefixCls}-panel`,
        children: [showHour ? jsxRuntime.jsx("div", {
          ref: hourRef,
          className: `${prefixCls}-column`,
          children: hours.map((h, index) => h === false ? jsxRuntime.jsx("div", {
            className: `${prefixCls}-cell`,
            style: {
              opacity: 0,
              userSelect: 'none',
              cursor: 'inherit'
            },
            children: "0"
          }, `${h}_${index}`) : jsxRuntime.jsx("div", {
            className: clsx([`${prefixCls}-cell`, {
              [`${prefixCls}-cell-disabled`]: getDisabled('hour').includes(h),
              [`${prefixCls}-cell-selected`]: selectedHour === h
            }]),
            onClick: () => !getDisabled('hour').includes(h) && onSelectHour(h),
            children: pad(h)
          }, h))
        }) : null, showMinutes ? jsxRuntime.jsx("div", {
          ref: minuteRef,
          className: `${prefixCls}-column`,
          children: minutesSeconds.map((m, index) => m === false ? jsxRuntime.jsx("div", {
            className: `${prefixCls}-cell`,
            style: {
              opacity: 0,
              userSelect: 'none',
              cursor: 'inherit'
            },
            children: "0"
          }, `${m}_${index}`) : jsxRuntime.jsx("div", {
            className: clsx([`${prefixCls}-cell`, {
              [`${prefixCls}-cell-disabled`]: getDisabled('minute', currentHour).includes(m),
              [`${prefixCls}-cell-selected`]: selectedMinute === m
            }]),
            onClick: () => !getDisabled('minute', currentHour).includes(m) && onSelectMinute(m),
            children: pad(m)
          }, m))
        }) : null, showSeconds ? jsxRuntime.jsx("div", {
          ref: secondRef,
          className: `${prefixCls}-column`,
          children: minutesSeconds.map((s, index) => s === false ? jsxRuntime.jsx("div", {
            className: `${prefixCls}-cell`,
            style: {
              opacity: 0,
              userSelect: 'none',
              cursor: 'inherit'
            },
            children: "0"
          }, `${s}_${index}`) : jsxRuntime.jsx("div", {
            className: clsx([`${prefixCls}-cell`, {
              [`${prefixCls}-cell-disabled`]: getDisabled('second', currentHour, currentMinute).includes(s),
              [`${prefixCls}-cell-selected`]: selectedSecond === s
            }]),
            onClick: () => !getDisabled('second', currentHour, currentMinute).includes(s) && onSelectSecond(s),
            children: pad(s)
          }, s))
        }) : null]
      }), jsxRuntime.jsxs("div", {
        className: `${prefixCls}-actions`,
        children: [showNow ? jsxRuntime.jsx("div", {
          className: `${prefixCls}-now-btn`,
          onClick: handleShowNow,
          children: "Now"
        }) : jsxRuntime.jsx("span", {}), jsxRuntime.jsx("button", {
          className: `${prefixCls}-ok-btn`,
          disabled: selectedHour === null || selectedMinute === null || selectedSecond === null,
          onClick: handleOkButton,
          children: "OK"
        })]
      })]
    });
  };
  return jsxRuntime.jsxs("div", {
    className: clsx([`${prefixCls}-wrapper`, className]),
    style: style,
    children: [jsxRuntime.jsxs("div", {
      className: `${prefixCls}-input-wrapper`,
      onClick: () => setOpen(true),
      children: [jsxRuntime.jsx("input", {
        ref: inputRef,
        size: INPUT_SIZE,
        placeholder: placeholder,
        className: `${prefixCls}-input`,
        readOnly: inputReadOnly,
        onChange: handleOnChange,
        // {...(open ? {} : { value: formatDate(innerValue) })}
        value: open ? formatDate(tempValue) : formatDate(innerValue) || '',
        onBlur: e => {
          onBlur?.(e, {
            source: 'input'
          });
        }
      }), jsxRuntime.jsx("div", {
        className: `${prefixCls}-icons`,
        children: clearIcon && innerValue ? jsxRuntime.jsx("span", {
          className: `${prefixCls}-clear`,
          onClick: handleClear,
          children: clearIcon
        }) : suffixIcon && jsxRuntime.jsx("span", {
          className: `${prefixCls}-suffix`,
          onClick: e => {
            e.stopPropagation();
            setOpen(true);
          },
          children: suffixIcon
        })
      })]
    }), open && jsxRuntime.jsx(ConditionalWrapper, {
      condition: getPopupContainer !== undefined,
      wrapper: element => getPopupContainer ? /*#__PURE__*/reactDom.createPortal(element, getPopupContainer(popupRef.current)) : jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: element
      }),
      children: jsxRuntime.jsx("div", {
        ref: popupRef,
        style: dropdownPosition,
        className: `${prefixCls}-popup`,
        children: renderOptions()
      })
    })]
  });
};

const useForm = (initialValues = {}, onFieldsChange, onValuesChange, scrollToFirstError, onFinish, onFinishFailed) => {
  const touchedFieldsRef = react.useRef(new Set());
  const rulesRef = react.useRef({});
  const warningsRef = react.useRef({});
  const _scrollToFirstError = react.useRef(scrollToFirstError);
  const stepRef = react.useRef(0);
  const formHandlersRef = react.useRef({
    onFinish,
    onValuesChange,
    onFieldsChange,
    onFinishFailed
  });
  const formRef = react.useRef({
    [stepRef.current]: {
      ...initialValues
    }
  });
  const trashFormRef = react.useRef({
    ...initialValues
  });
  const fieldInstancesRef = react.useRef({});
  const [isReseting, setIsReseting] = react.useState(false);
  const errorsRef = react.useRef({});
  const errorSubscribers = react.useRef({});
  const fieldSubscribers = react.useRef({});
  const formSubscribers = react.useRef([]);
  function getFormFields() {
    return Object.assign({}, ...Object.values(formRef.current));
  }
  function getFieldInstance(name) {
    return name ? fieldInstancesRef.current[name] : fieldInstancesRef.current;
  }
  function getFieldValue(name) {
    const formData = getFormFields();
    return formData[name];
  }
  function getFieldsValue(nameList) {
    const formData = getFormFields();
    if (!nameList) {
      return formData;
    }
    return nameList.reduce((acc, key) => {
      acc[key] = formData[key];
      return acc;
    }, {});
  }
  function getFieldError(name) {
    return errorsRef.current[name] || [];
  }
  function getFieldWarning(name) {
    return warningsRef.current[name] || [];
  }
  function getFieldsError() {
    return Object.entries(errorsRef.current).map(([name, err]) => ({
      name,
      errors: err
    }));
  }
  function setFieldValue(name, value, errors, reset = undefined, touch) {
    if (!reset && reset !== null && ([undefined, null].includes(value) || formRef.current[stepRef.current][name] === value)) {
      return;
    }
    let isFieldExist = false;
    Object.values(formRef.current).forEach((_, step) => {
      if (formRef.current[step].hasOwnProperty(name)) {
        formRef.current[step][name] = value;
        isFieldExist = true;
        return;
      }
    });
    if (!isFieldExist) {
      formRef.current[stepRef.current][name] = value;
    }
    if (touch) {
      touchedFieldsRef.current.add(name);
    }
    if (reset === null) {
      errorsRef.current[name] = [];
      notifyErrorSubscribers(name);
      return;
    }
    if (!errors?.length) {
      validateField(name).then(() => {
        const allValues = getFieldsValue();
        fieldSubscribers.current[name]?.forEach(callback => callback(value));
        formSubscribers.current.forEach(callback => callback(allValues));
        if (formHandlersRef.current.onValuesChange) {
          formHandlersRef.current.onValuesChange({
            [name]: value
          }, allValues);
        }
        if (formHandlersRef.current.onFieldsChange) {
          formHandlersRef.current.onFieldsChange([{
            name,
            value
          }]);
        }
      });
    } else {
      if (reset === -1) {
        setTimeout(() => {
          errorsRef.current[name] = errors;
          notifyErrorSubscribers(name);
        }, 0);
      } else {
        errorsRef.current[name] = errors;
        notifyErrorSubscribers(name);
      }
    }
  }
  function setFieldsValue(values, reset) {
    Object.entries(values).forEach(([name, value]) => setFieldValue(name, value, undefined, reset));
  }
  function setFields(fields) {
    fields.forEach(({
      name,
      value,
      errors
    }) => setFieldValue(Array.isArray(name) ? name[0] : name, value ?? getFieldValue(Array.isArray(name) ? name[0] : name), errors, -1));
  }
  function setFieldInstance(fieldName, fieldRef) {
    fieldInstancesRef.current[fieldName] = fieldRef;
  }
  function isFieldTouched(name) {
    return touchedFieldsRef.current.has(name);
  }
  function isFieldsTouched(nameList, allFieldsTouched = false) {
    if (!nameList) {
      return touchedFieldsRef.current.size > 0;
    }
    return allFieldsTouched ? nameList.every(name => touchedFieldsRef.current.has(name)) : nameList.some(name => touchedFieldsRef.current.has(name));
  }
  function isFieldValidating(name) {
    return !!name;
  }
  function registerField(name, rules = [], remove = false) {
    if (remove) {
      trashFormRef.current[name] = formRef.current[stepRef.current]?.[name];
      delete formRef.current[stepRef.current]?.[name];
      delete rulesRef.current[name];
      delete fieldInstancesRef.current[name];
    } else {
      if (!(name in formRef.current[stepRef.current])) {
        if (trashFormRef.current.hasOwnProperty(name)) {
          formRef.current[stepRef.current][name] = trashFormRef.current[name];
          delete trashFormRef.current[name];
        } else {
          const existFields = {};
          Object.values(formRef.current).forEach((_, step) => {
            if (formRef.current[step].hasOwnProperty(name)) {
              existFields[name] = formRef.current[step][name];
              delete formRef.current[step][name];
            }
          });
          formRef.current[stepRef.current][name] = initialValues?.[name];
          if (Object.keys(existFields).length) {
            Object.entries(existFields).forEach(([_key, _value]) => {
              formRef.current[stepRef.current][_key] = _value;
            });
          }
        }
      }
      rulesRef.current[name] = rules;
    }
  }
  async function validateField(name) {
    const value = formRef.current[stepRef.current][name];
    const rules = rulesRef.current[name] || [];
    const fieldErrors = [];
    const fieldWarnings = [];
    await Promise.all([rules].flat(1).map(async rule => {
      rule = typeof rule === 'function' ? rule(formInstance) : rule;
      if (rule.required && (rule.validateBooleanFalse && !value || value === undefined || value === null || value === '' || Array.isArray(value) && !value.length)) {
        fieldErrors.push(rule.message || 'This field is required');
      }
      if ((typeof value === 'string' || typeof value === 'number' || Array.isArray(value)) && rule.min !== undefined && String(value).length < rule.min) {
        fieldErrors.push(rule.message || `Must be at least ${rule.min} characters`);
      }
      if ((typeof value === 'string' || typeof value === 'number' || Array.isArray(value)) && rule.max !== undefined && String(value).length > rule.max) {
        fieldErrors.push(rule.message || `Must be at most ${rule.max} characters`);
      }
      if (value !== undefined && rule.pattern && !rule.pattern.test(String(value))) {
        fieldErrors.push(rule.message || 'Invalid format');
      }
      if (rule.warningPattern && !rule.warningPattern.test(String(value))) {
        fieldWarnings.push(rule.warningMessage || 'Invalid format');
      }
      if (rule.validator) {
        try {
          await rule.validator(rule, value, error => error && fieldErrors.push(error));
        } catch (error) {
          fieldErrors.push(error instanceof Error ? error.message : String(error));
        }
      }
    }));
    errorsRef.current[name] = fieldErrors;
    warningsRef.current[name] = fieldWarnings;
    notifyErrorSubscribers(name);
    return fieldErrors.length === 0;
  }
  async function validateFields(nameList) {
    const fieldsToValidate = nameList || Object.keys(formRef.current[stepRef.current]);
    const results = await Promise.all(fieldsToValidate.map(name => validateField(name)));
    const errorFields = formInstance.getFieldsError().filter(e => e.errors.length);
    if (errorFields.length) {
      formHandlersRef.current.onFinishFailed?.({
        values: formInstance.getFieldsValue(),
        errorFields
      });
    }
    if (_scrollToFirstError.current) {
      const firstErrorContent = document.querySelectorAll('.xUi-form-item-has-error')?.[0];
      if (firstErrorContent) {
        firstErrorContent.closest('.xUi-form-item')?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
    fieldsToValidate.forEach(name => notifyErrorSubscribers(name));
    return results.every(valid => valid);
  }
  function resetFields(nameList, showError = true) {
    const formData = getFormFields();
    if (nameList?.length) {
      nameList.forEach(name => {
        formData[name] = initialValues[name];
        trashFormRef.current[name] = initialValues[name];
        touchedFieldsRef.current.delete(name);
        delete warningsRef.current[name];
        errorsRef.current[name] = [];
        notifyErrorSubscribers(name);
        setFieldValue(name, initialValues[name], undefined, showError);
      });
    } else {
      touchedFieldsRef.current.clear();
      warningsRef.current = {};
      Object.keys({
        ...formData
      }).forEach(name => {
        setFieldValue(name, initialValues[name], undefined, showError);
      });
    }
    formSubscribers.current.forEach(callback => callback(getFieldsValue()));
    setIsReseting(prev => !prev);
  }
  async function submit() {
    const formData = getFormFields();
    return (await validateFields()) ? (() => {
      formHandlersRef.current.onFinish?.(formData);
      return formData;
    })() : undefined;
  }
  function subscribeToField(name, callback) {
    if (!fieldSubscribers.current[name]) {
      fieldSubscribers.current[name] = [];
    }
    fieldSubscribers.current[name].push(callback);
    return () => {
      fieldSubscribers.current[name] = fieldSubscribers.current[name].filter(cb => cb !== callback);
    };
  }
  function subscribeToForm(callback) {
    formSubscribers.current.push(callback);
    return () => {
      formSubscribers.current = formSubscribers.current.filter(cb => cb !== callback);
    };
  }
  function subscribeToFields(names, callback) {
    const fieldCallbacks = names.map(name => subscribeToField(name, () => {
      const updatedValues = getFieldsValue(names);
      callback(updatedValues);
    }));
    return () => {
      fieldCallbacks.forEach(unsubscribe => unsubscribe());
    };
  }
  function subscribeToError(name, callback) {
    if (!errorSubscribers.current[name]) {
      errorSubscribers.current[name] = [];
    }
    errorSubscribers.current[name].push(callback);
    return () => {
      errorSubscribers.current[name] = errorSubscribers.current[name].filter(cb => cb !== callback);
    };
  }
  function notifyErrorSubscribers(name) {
    const errors = getFieldError(name);
    errorSubscribers.current[name]?.forEach(cb => cb(errors));
  }
  function setScrollToFirstError(value) {
    _scrollToFirstError.current = value;
  }
  function setOnFieldsChange(onFieldsChange) {
    formHandlersRef.current.onFieldsChange = onFieldsChange;
  }
  function setOnValuesChange(onValuesChange) {
    formHandlersRef.current.onValuesChange = onValuesChange;
  }
  function setOnFinish(onFinish) {
    formHandlersRef.current.onFinish = onFinish;
  }
  function setOnFinishFailed(onFinishFailed) {
    formHandlersRef.current.onFinishFailed = onFinishFailed;
  }
  function changeStep(step) {
    stepRef.current = step ?? 0;
    if (!formRef.current[stepRef.current]) {
      formRef.current[stepRef.current] = {};
    }
  }
  const formInstanceRef = react.useRef(null);
  const formInstance = {
    submit,
    setFields,
    resetFields,
    getFieldError,
    registerField,
    setFieldValue,
    getFieldValue,
    validateFields,
    setFieldsValue,
    getFieldsValue,
    isFieldTouched,
    getFieldsError,
    setOnFinishFailed,
    isFieldsTouched,
    getFieldWarning,
    isFieldValidating,
    subscribeToField,
    subscribeToForm,
    onFieldsChange,
    onValuesChange,
    getFieldInstance,
    setFieldInstance,
    subscribeToFields,
    setScrollToFirstError,
    subscribeToError,
    scrollToFirstError,
    isReseting,
    setOnFinish,
    setOnFieldsChange,
    setOnValuesChange,
    changeStep
  };
  if (formInstanceRef.current) {
    return formInstanceRef.current;
  } else {
    formInstanceRef.current = formInstance;
    return formInstanceRef.current;
  }
};

function flattenChildren(children) {
  const result = [];
  react.Children.forEach(children, child => {
    if (! /*#__PURE__*/react.isValidElement(child)) return;
    if (child.type === react.Fragment || child.type === react.Suspense) {
      // @ts-expect-error
      result.push(...flattenChildren(child.props.children));
    } else {
      result.push(child);
    }
  });
  return result;
}

function useWatchError(form, name) {
  const [errors, setErrors] = react.useState(form.getFieldError(name));
  react.useEffect(() => {
    // Subscribe directly to error changes
    const unsubscribe = form.subscribeToError?.(name, newErrors => {
      setErrors(newErrors);
    });
    // Initialize on mount
    setErrors(form.getFieldError(name));
    return unsubscribe;
  }, [form, name]);
  return errors;
}

var css_248z$h = ".xUi-form-item{display:flex;position:relative}.xUi-form-item.noStyle{display:inline-flex;margin-bottom:0}.xUi-form-item-label{align-items:center;color:var(--xui-text-color);display:flex;font-size:var(--xui-font-size-md);font-weight:500;line-height:20px;margin-bottom:4px}.xUi-form-item-error{color:var(--xui-error-color);display:block;font-size:var(--xui-font-size-xs);line-height:16px;margin-bottom:8px;margin-top:4px;min-height:16px;position:relative;right:0;text-align:end;user-select:none}.xUi-form-item-required{color:var(--xui-error-color);display:inline-block;font-size:var(--xui-font-size-md);line-height:1;margin-left:4px;margin-right:4px}.xUi-form-item.horizontal{align-items:center;flex-direction:row;gap:4px}.xUi-form-item.vertical{align-self:flex-start;flex-direction:column}.xUi-form-item .xUi-input-container,.xUi-form-item-content{width:-webkit-fill-available}";
styleInject(css_248z$h);

const FormItem = ({
  prefixCls = prefixClsFormItem,
  prefixClsV3 = prefixClsFormItemV3,
  name,
  label,
  rules = [],
  children,
  className = '',
  layout = 'vertical',
  style = {},
  dependencies = [],
  initialValue,
  feedbackIcons,
  extra,
  hideLabel = false,
  removeErrorMessageHeight = false,
  ...props
}) => {
  const formContext = react.useContext(FormContext);
  const errorRef = react.useRef(null);
  const fieldRef = react.useRef(null);
  if (!formContext) {
    throw new Error('FormItem must be used within a Form');
  }
  const errors = useWatchError(formContext, name)?.[0];
  const {
    isReseting,
    registerField,
    getFieldValue,
    setFieldValue,
    getFieldInstance,
    setFieldInstance,
    subscribeToFields,
    validateFields
  } = formContext;
  const childrenList = react.useMemo(() => flattenChildren(children), [children]);
  react.useEffect(() => {
    if (name && !getFieldInstance(name)) {
      registerField(name, rules);
    }
  }, [name, rules]);
  react.useEffect(() => {
    setFieldInstance(name, fieldRef.current);
  }, [name, fieldRef.current]);
  react.useEffect(() => () => registerField(name, undefined, true), [name]);
  react.useEffect(() => {
    if (initialValue && getFieldValue(name) === undefined) {
      setFieldValue(name, initialValue);
    }
  }, [name]);
  react.useEffect(() => {
    if (name && dependencies.length > 0) {
      const unsubscribe = subscribeToFields(dependencies, () => {
        validateFields([name]);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [dependencies, name]);
  const isRequired = react.useMemo(() => rules.some(rule => rule.required), [rules]);
  return jsxRuntime.jsxs("div", {
    style: style,
    "data-instance": name,
    className: clsx([`${prefixCls} ${prefixClsV3}`, {
      [layout]: layout,
      [className]: className,
      noStyle: props.noStyle
    }]),
    children: [!props.noStyle && (label || name) && !hideLabel && jsxRuntime.jsxs("label", {
      className: `${prefixCls}-label ${prefixClsV3}-label`,
      htmlFor: name,
      children: [label || name, isRequired && jsxRuntime.jsx("span", {
        className: `${prefixCls}-required ${prefixClsV3}-required`,
        children: "*"
      })]
    }), react.Children.map(childrenList, (child, key) => {
      if (/*#__PURE__*/react.isValidElement(child)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const {
          onChange,
          value,
          ...childProps
        } = child.props;
        const fieldValue = value ?? getFieldValue(name) ?? initialValue;
        return jsxRuntime.jsxs("div", {
          className: `${prefixCls}-content`,
          children: [/*#__PURE__*/react.createElement(FormItemChildComponent, {
            ...props,
            key: `${key}_${name}_${isReseting}`,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ref: fieldRef,
            name: name,
            child: child,
            value: value,
            error: !!errors,
            fieldValue: fieldValue,
            setFieldValue: setFieldValue,
            feedbackIcons: feedbackIcons,
            onChange: onChange,
            noStyle: props.noStyle,
            normalize: props.normalize,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            size: childProps.size || props.size
          }), extra ? jsxRuntime.jsx("div", {
            className: `${prefixCls}-extra ${prefixClsV3}-extra`,
            children: extra || ''
          }) : null, !props.noStyle && jsxRuntime.jsx("span", {
            ref: errorRef,
            className: clsx([`${prefixCls}-error ${prefixClsV3}-error`, {
              [`${prefixCls}-has-error ${prefixClsV3}-has-error`]: errors?.length
            }]),
            style: {
              ...(removeErrorMessageHeight ? {
                minHeight: 0
              } : {}),
              ...(extra ? {
                marginBottom: 0
              } : {})
            },
            children: errors || ''
          })]
        });
      }
      return child;
    })]
  });
};
const FormItemChildComponent = ({
  child,
  name,
  error,
  fieldValue,
  setFieldValue,
  onChange,
  normalize,
  noStyle,
  feedbackIcons,
  ref,
  ...props
}) => {
  const formContext = react.useContext(FormContext);
  const [wasNormalize, setWasNormalize] = react.useState(false);
  const {
    getFieldsValue
  } = formContext || {};
  const handleChange = e => {
    let rawValue = e?.target ? e.target.value : e;
    if (normalize) {
      const prevValue = fieldValue ?? props.value;
      const allValues = getFieldsValue?.();
      rawValue = normalize(rawValue, prevValue, allValues);
      if (rawValue === prevValue) {
        e.target.value = rawValue;
        setWasNormalize(prev => !prev);
        const timeout = setTimeout(() => {
          document.querySelector(`[name='${name}']`)?.focus();
          clearTimeout(timeout);
        }, 0);
        return;
      }
    }
    setFieldValue(name, rawValue, undefined, undefined, true);
  };
  const injectPropsIntoFinalLeaf = child => {
    if (! /*#__PURE__*/react.isValidElement(child)) {
      return child;
    }
    const childProps = child.props;
    const isWrapper = typeof child.type === 'string' && !('dangerouslySetInnerHTML' in childProps) && ['div', 'span', 'label'].includes(child.type);
    if (isWrapper) {
      return jsxRuntime.jsx(child.type, {
        ...childProps,
        children: react.Children.map(flattenChildren(childProps.children), injectPropsIntoFinalLeaf)
      });
    }
    const _onChange = react.useCallback((e, option) => {
      handleChange(e);
      childProps?.onChange?.(e, option);
    }, [handleChange, childProps?.onChange]);
    if (childProps?.__injected) {
      return child;
    }
    return /*#__PURE__*/react.createElement(child.type, {
      ...props,
      ref: ref,
      ...child.props,
      name: name,
      child: child,
      onChange: _onChange,
      key: `${name}_${wasNormalize}`,
      value: fieldValue ?? props.value,
      ...('dangerouslySetInnerHTML' in childProps ? {} : {
        __injected: true,
        ...(error ? {
          error
        } : {})
      })
    });
  };
  return injectPropsIntoFinalLeaf(child);
};
FormItem.displayName = 'FormItem';

const FormContext = /*#__PURE__*/react.createContext(null);
const Form = ({
  children,
  form,
  style = {},
  prefixCls = prefixClsForm,
  prefixClsV3 = prefixClsFormV3,
  className = '',
  onFinish,
  onFinishFailed,
  initialValues = {},
  onValuesChange,
  onFieldsChange,
  layout = 'horizontal',
  scrollToFirstError = false,
  ...rest
}) => {
  const internalForm = useForm({
    initialValues,
    onFieldsChange,
    onValuesChange,
    onFinishFailed
  });
  const formRef = react.useRef(null);
  const formInstance = react.useMemo(() => {
    const _form = form || internalForm;
    if (_form && Object.keys(initialValues).length) {
      Object.keys(initialValues).forEach(name => {
        if (_form.getFieldValue(name) === undefined) {
          _form.setFieldValue(name, initialValues[name]);
        }
      });
    }
    return _form;
  }, [form, internalForm, initialValues]);
  const childrenList = react.useMemo(() => flattenChildren(children), [children]);
  const handleSubmit = react.useCallback(async e => {
    e.preventDefault();
    e.stopPropagation();
    await formInstance.submit();
  }, []);
  react.useEffect(() => {
    if (onFinish) {
      formInstance.setOnFinish?.(onFinish);
    }
    if (onFieldsChange) {
      formInstance.setOnFieldsChange?.(onFieldsChange);
    }
    if (onValuesChange) {
      formInstance.setOnValuesChange?.(onValuesChange);
    }
    if (onFinishFailed) {
      formInstance.setOnFinishFailed?.(onFinishFailed);
    }
    if (scrollToFirstError) {
      formInstance.setScrollToFirstError(scrollToFirstError);
    }
  }, [formInstance, onFieldsChange, onValuesChange, onFinishFailed, onFinish, scrollToFirstError]);
  const injectPropsIntoFinalLeaf = react.useCallback(child => {
    if (! /*#__PURE__*/react.isValidElement(child)) {
      return child;
    }
    const childProps = child.props;
    const isWrapper = typeof child.type === 'string' && !('dangerouslySetInnerHTML' in childProps) && ['div', 'span', 'label'].includes(child.type);
    if (isWrapper) {
      return jsxRuntime.jsx(child.type, {
        ...childProps,
        children: react.Children.map(flattenChildren(childProps.children), injectPropsIntoFinalLeaf)
      });
    }
    if (childProps?.__injected) {
      return child;
    }
    return jsxRuntime.jsx(child.type
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    , {
      ...child.props,
      child: child,
      size: childProps.size || rest.size,
      layout: childProps.layout || layout
    });
  }, [rest.size, layout]);
  return jsxRuntime.jsx(FormContext.Provider, {
    value: formInstance,
    children: jsxRuntime.jsx("form", {
      style: style,
      ref: formRef,
      onSubmit: handleSubmit,
      className: `${prefixCls} ${prefixClsV3} ${className}`,
      children: react.Children.map(childrenList, injectPropsIntoFinalLeaf)
    })
  });
};
Form.Item = FormItem;

var css_248z$g = ".xUi-textarea-wrapper{margin-bottom:10px;position:relative;width:100%}.xUi-textarea{border:none;border-radius:6px;box-shadow:none;color:var(--xui-text-color);font-size:14px;min-height:14px;outline:none;padding:8px 12px;resize:vertical;transition:all .3s ease;width:100%}.xUi-textarea:placeholder-shown{font-size:14px;text-overflow:ellipsis}.xUi-textarea::placeholder{color:var(--xui-text-color);opacity:.6}.xUi-textarea-small{font-size:12px;padding:6px 10px}.xUi-textarea-middle{font-size:14px;padding:8px 12px}.xUi-textarea-large{padding:10px}.xUi-textarea-outlined{background:transparent;border:1px solid var(--xui-border-color)}.xUi-textarea-outlined:focus{border-color:var(--xui-primary-color)}.xUi-textarea-borderless{background:transparent;border:none}.xUi-textarea-filled{background:var(--xui-primary-color);border:1px solid var(--xui-border-color)}.xUi-textarea-filled:focus{background:var(--xui-background-color);border-color:var(--xui-primary-color)}.xUi-textarea-underlined{background:transparent;border:none;border-bottom:1px solid var(--xui-border-color)}.xUi-textarea-underlined:focus{border-bottom-color:var(--xui-primary-color)}.xUi-textarea-container:has(.xUi-textarea-bordered){border:1px solid var(--xui-border-color)}.xUi-textarea-container:has(.xUi-textarea-success){border-color:var(--xui-success-color)}.xUi-textarea-wrapper:has(.xUi-textarea-error) textarea,.xUi-textarea-wrapper:has(.xUi-textarea-error) textarea:focus{border:1px solid var(--xui-error-color)}.xUi-textarea-clear{background:transparent;border:none;color:#999;cursor:pointer;position:absolute;right:0;top:15px;transform:translateY(-50%)}.xUi-textarea-clear:hover{color:#333}";
styleInject(css_248z$g);

const Textarea = ({
  prefixCls = prefixClsTextArea,
  prefixClsV3 = prefixClsTextArea,
  value,
  className = '',
  style,
  autoSize,
  onPressEnter,
  onResize,
  styles,
  bordered = true,
  size = 'large',
  status,
  rootClassName,
  variant = 'outlined',
  error,
  allowClear = false,
  ref,
  ...props
}) => {
  const [inputValue, setInputValue] = react.useState(value?.toString() || '');
  const textareaRef = react.useRef(null);
  react.useEffect(() => {
    const textarea = ref?.current || textareaRef.current;
    if (textarea && autoSize) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      if (onResize) {
        onResize({
          width: textarea.clientWidth,
          height: textarea.scrollHeight
        });
      }
    }
  }, [inputValue, autoSize, onResize, ref]);
  const handleChange = e => {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter' && onPressEnter) {
      onPressEnter(e);
    }
  };
  const handleClear = () => {
    setInputValue('');
    if (props.onChange) {
      props.onChange({
        target: {
          value: ''
        }
      });
    }
  };
  return jsxRuntime.jsxs("div", {
    className: `${prefixCls}-wrapper ${prefixClsV3}-wrapper ${rootClassName || ''}`,
    children: [jsxRuntime.jsx("textarea", {
      ...props,
      ref: ref || textareaRef,
      value: inputValue,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      style: {
        ...styles?.textarea,
        ...style
      },
      className: clsx([`${prefixCls} ${prefixClsV3} ${prefixCls}-${size} ${prefixClsV3}-${size} ${prefixClsV3}-${variant} ${prefixCls}-${variant} ${prefixClsV3}-${variant} ${className}`, {
        [`${prefixCls}-bordered ${prefixClsV3}-bordered`]: bordered,
        [`${prefixCls}-success ${prefixClsV3}-success`]: status === 'success',
        [`${prefixCls}-error ${prefixClsV3}-error`]: status === 'error' || error
      }])
    }), allowClear && inputValue && jsxRuntime.jsx("button", {
      className: `${prefixCls}-clear ${prefixClsV3}-clear`,
      onClick: handleClear,
      children: "\u2715"
    })]
  });
};
Textarea.displayName = 'Textarea';

const MASK_CHAR = '_';
const MASK_REGEX = /[^A-Za-z0-9]/g;
function stripMask(value, mask, maskChar = MASK_CHAR) {
  const stripped = [];
  let maskIndex = 0;
  for (let i = 0; i < value.length && maskIndex < mask.length; i++) {
    if (mask[maskIndex] === maskChar) {
      stripped.push(value[i]);
      maskIndex++;
    } else {
      if (value[i] === mask[maskIndex]) {
        maskIndex++;
      } else {
        stripped.push(value[i]);
        continue;
      }
    }
  }
  return stripped.join('');
}
function applyMask(raw, mask, maskChar = MASK_CHAR) {
  let masked = '';
  let rawIndex = 0;
  for (let i = 0; i < mask.length; i++) {
    const mChar = mask[i];
    if (mChar === maskChar) {
      if (rawIndex < raw.length) {
        masked += raw[rawIndex];
        rawIndex++;
      } else {
        masked += maskChar;
      }
    } else {
      masked += mChar;
    }
  }
  return {
    masked,
    rawIndex
  };
}

var css_248z$f = ".xUi-input-container{align-items:center;background-color:transparent;border:1px solid var(--xui-border-color);border-radius:var(--xui-border-radius-sm);display:flex;overflow:hidden}.xUi-input-container:not(.xUi-input-error):not(.xUi-input-disabled):has(.xUi-input):hover,.xUi-input-container:not(.xUi-input-error):not(.xUi-input-disabled):has(.xUi-input:focus){border:1px solid var(--xui-primary-color)}.xUi-input-container.xUi-input-error{border-color:var(--xui-error-color)}.xUi-input-container.xUi-input-error .error-svg-icon,.xUi-input-suffix .error-svg-icon{color:var(--xui-error-color)}.xUi-input-wrapper{align-items:center;display:flex;flex-grow:1;position:relative;transition:border .3s}.xUi-input,.xUi-input-wrapper{background-color:transparent;height:-webkit-fill-available}.xUi-input{border:none;color:var(--xui-text-color);flex:1;outline:none;padding:.1px 7px;width:100%}.xUi-input:placeholder-shown{text-overflow:ellipsis}.xUi-input::placeholder{color:var(--xui-text-color);opacity:.6}.xUi-input-prefix,.xUi-input-suffix{background-color:transparent;gap:4px}.xUi-input-addon,.xUi-input-prefix,.xUi-input-suffix{align-items:center;color:var(--xui-text-color);display:flex;height:-webkit-fill-available;padding:0 7px}.xUi-input-addon.xUi-input-after{border-left:1px solid var(--xui-border-color)}.xUi-input-addon.xUi-input-before{border-right:1px solid var(--xui-border-color)}.xUi-input-large .xUi-input-addon{padding:0 10px}.xUi-input-clear{align-items:center;cursor:pointer;display:flex;margin:0 5px;position:relative;width:16px}.xUi-input-clear svg{color:var(--xui-text-color)}.xUi-input-disabled,.xUi-input-disabled .xUi-input,.xUi-input-disabled .xUi-input-suffix{background-color:var(--xui-color-disabled);cursor:not-allowed}.xUi-input-small{height:22px}.xUi-input-large .xUi-input-clear,.xUi-input-small .xUi-input,.xUi-input-small .xUi-input::placeholder{font-size:var(--xui-font-size-md)}.xUi-input-middle{border-radius:var(--xui-border-radius-md);height:30px}.xUi-input-large .xUi-input-clear,.xUi-input-middle .xUi-input,.xUi-input-middle .xUi-input::placeholder{font-size:var(--xui-font-size-md)}.xUi-input-large{border-radius:var(--xui-border-radius-lg);height:44px}.xUi-input-large .xUi-input,.xUi-input-large .xUi-input-clear,.xUi-input-large .xUi-input::placeholder{font-size:var(--xui-font-size-lg)}";
styleInject(css_248z$f);

const InputComponent = ({
  size = 'large',
  error,
  suffix,
  prefix,
  addonAfter,
  addonBefore,
  onPressEnter,
  disabled = false,
  allowClear = false,
  prefixCls = prefixClsInput,
  prefixClsV3 = prefixClsInputV3,
  className = '',
  value = undefined,
  iconRender,
  noStyle,
  feedbackIcons,
  mask,
  maskChar = MASK_CHAR,
  maskRegex = MASK_REGEX,
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __injected,
  defaultValue,
  child,
  ref,
  ...props
}) => {
  const inputRef = react.useRef(null);
  const lastKeyPressed = react.useRef(null);
  const internalValue = mask ? applyMask(stripMask(`${value ?? ''}`, mask, maskChar), mask, maskChar).masked : value ?? '';
  const [maskValue, setMaskValue] = react.useState(internalValue);
  const [iconRenderVisible, setIconRenderVisible] = react.useState(false);
  const animationRef = react.useRef(null);
  react.useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    input: inputRef.current,
    blur: () => {
      inputRef.current?.blur();
    },
    nativeElement: inputRef.current,
    setSelectionRange: (start, end) => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(start, end);
      }
    }
  }), []);
  react.useEffect(() => {
    setMaskValue(mask ? applyMask(stripMask(`${value ?? ''}`, mask, maskChar), mask, maskChar).masked : value ?? '');
  }, [value, mask, maskChar]);
  const handleChange = e => {
    if (!inputRef.current) return;
    let rawInput = e.target.value;
    const raw = mask ? rawInput.replace(maskRegex, '') : rawInput;
    if (mask) {
      if (!inputRef.current) return;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      const {
        masked,
        rawIndex
      } = applyMask(raw, mask, maskChar);
      rawInput = masked;
      animationRef.current = requestAnimationFrame(() => {
        const isRemove = lastKeyPressed.current === 'Delete' || lastKeyPressed.current === 'Backspace';
        let nextCaret = !isRemove ? rawIndex : inputRef.current?.selectionStart ?? 0;
        while (isRemove ? mask.includes(rawInput[nextCaret - 1]) : maskChar !== rawInput[nextCaret]) {
          if (!isRemove && !rawInput[nextCaret]) {
            break;
          }
          if (isRemove) {
            nextCaret--;
          } else {
            nextCaret++;
          }
        }
        inputRef.current?.setSelectionRange(nextCaret, nextCaret);
      });
    }
    setMaskValue(rawInput);
    const eventWithMaskedValue = {
      ...e,
      target: {
        ...e.target,
        value: rawInput
      }
    };
    props.onChange?.(eventWithMaskedValue);
  };
  const handleClear = e => {
    if (mask) {
      setMaskValue('');
    }
    e.target.value = '';
    props.onChange?.(e);
  };
  const handleOnKeyDown = e => {
    lastKeyPressed.current = e.key;
    if (e.key === 'Enter' && onPressEnter) {
      onPressEnter(e);
    }
  };
  return jsxRuntime.jsxs("div", {
    className: clsx([`${prefixCls}-container ${prefixClsV3}-container`, {
      [`${prefixCls}-error ${prefixClsV3}-error`]: error,
      [`${prefixCls}-disabled ${prefixClsV3}-disabled`]: disabled,
      [`${prefixCls}-${size} ${prefixClsV3}-${size}`]: size,
      noStyle: noStyle
    }, className]),
    style: props.style,
    children: [addonBefore && jsxRuntime.jsx("span", {
      className: `${prefixCls}-addon ${prefixCls}-before ${prefixClsV3}-addon ${prefixClsV3}-before`,
      children: addonBefore
    }), jsxRuntime.jsxs("div", {
      className: `${prefixCls}-wrapper ${prefixClsV3}-wrapper`,
      children: [prefix && jsxRuntime.jsx("span", {
        className: `${prefixCls}-prefix ${prefixClsV3}-prefix`,
        children: prefix
      }), jsxRuntime.jsx("input", {
        ...props,
        ref: inputRef,
        suppressHydrationWarning: true,
        ...(props.type === 'password' && iconRender ? {
          type: iconRenderVisible ? 'text' : 'password'
        } : {}),
        disabled: disabled,
        value: maskValue,
        onChange: handleChange,
        onKeyDown: handleOnKeyDown,
        className: clsx([prefixCls, prefixClsV3, className])
      }), allowClear && internalValue ? jsxRuntime.jsx("span", {
        className: `${prefixCls}-clear ${prefixClsV3}-clear`,
        onClick: handleClear,
        children: jsxRuntime.jsx(ErrorIcon, {})
      }) : null, (suffix || iconRender) && jsxRuntime.jsxs("span", {
        className: `${prefixCls}-suffix ${prefixClsV3}-suffix`,
        ...(iconRender !== undefined ? {
          onClick: () => setIconRenderVisible(icon => !icon)
        } : {}),
        children: [suffix || iconRender?.(iconRenderVisible), error && feedbackIcons ? jsxRuntime.jsx(ErrorIcon, {}) : null]
      })]
    }), addonAfter ? jsxRuntime.jsx("span", {
      className: `${prefixCls}-addon ${prefixCls}-after ${prefixClsV3}-addon ${prefixClsV3}-after`,
      children: addonAfter
    }) : null]
  });
};
InputComponent.displayName = 'Input';
const Input = InputComponent;
Input.TextArea = Textarea;

var css_248z$e = ".xUi-radio-label{align-items:center;cursor:pointer;display:inline-flex;font-size:var(--xui-font-size-md);line-height:1;margin:16px 0;position:relative}.xUi-radio-label input{display:none}.xUi-radio{border:1px solid var(--xui-border-color);border-radius:50%;height:16px;position:relative;transition:all .3s;width:16px;&:has([tabindex=\"0\"]:focus-visible){border-color:var(--xui-primary-color)}}.xUi-radio-error:not(.xUi-radio-disabled){border:1px solid var(--xui-error-color)}.xUi-radio-label input:checked+.xUi-radio-error:not(.xUi-radio-disabled){background:var(--xui-error-color)}.xUi-radio-group{display:flex}.xUi-radio-label .xUi-radio-enabled:not(.xUi-radio-error):hover{border:1px solid var(--xui-primary-color-light)!important}.xUi-radio-disabled{background-color:var(--xui-color-disabled)}.xUi-radio-title{color:var(--xui-text-color);padding-inline-end:8px;padding-inline-start:8px}.xUi-radio-label input:checked+.xUi-radio{background:var(--xui-primary-color)}.xUi-radio-label input:checked+.xUi-radio:after{background-color:#fff;border-radius:50%;content:\"\";height:6px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:6px}.xUi-radio-label.disabled{cursor:not-allowed;opacity:.5}";
styleInject(css_248z$e);

const Radio = ({
  prefixCls = prefixClsRadio,
  className = '',
  value,
  onChange,
  onClick,
  disabled,
  children,
  name,
  title,
  defaultChecked,
  checked,
  onBlur,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  noStyle,
  ref
}) => {
  const handleChange = () => {
    if (!disabled) {
      onClick?.(parseValue(title ?? value));
      onChange?.(parseValue(title ?? value));
    }
  };
  react.useEffect(() => {
    if (defaultChecked ?? checked) {
      onChange?.(parseValue(value));
    }
  }, [defaultChecked, checked]);
  return jsxRuntime.jsxs("label", {
    ref: ref,
    title: title,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    className: clsx([`${prefixCls}-label`, {
      disabled,
      noStyle: noStyle,
      [className]: className
    }]),
    children: [jsxRuntime.jsx("input", {
      name: name,
      type: "radio",
      tabIndex: 0,
      role: "button",
      onClick: onClick,
      disabled: disabled,
      onChange: handleChange,
      onBlur: e => onBlur?.(e),
      onFocus: e => onFocus?.(e),
      checked: checked ?? defaultChecked
    }), jsxRuntime.jsx("span", {
      className: clsx([`${prefixCls} ${prefixCls}-${disabled ? 'disabled' : 'enabled'}`])
    }), jsxRuntime.jsx("span", {
      className: `${prefixCls}-title`,
      children: children ?? title ?? value
    })]
  });
};
Radio.displayName = 'Radio';

var css_248z$d = ".xUi-radio-button{align-items:center;background:var(--xui-background-color);border:1px solid var(--xui-border-color);border-radius:var(--xui-border-radius-sm);cursor:pointer;display:inline-flex;height:-webkit-fill-available;justify-content:center;margin:-1px;padding:8px 16px;transition:all .3s}.xUi-radio-button .xUi-radio{display:none}.xUi-radio-button.xUi-radio-button-middle{border-radius:var(--xui-border-radius-md)}.xUi-radio-button.xUi-radio-button-large{border-radius:var(--xui-border-radius-lg)}.xUi-radio-button-checked{background:var(--xui-primary-color);border-color:var(--xui-primary-color);color:var(--xui-background-color);z-index:1}.xUi-radio-button-content{font-size:14px}.xUi-radio-button.disabled{background:var(--xui-color-disabled);border-color:var(--xui-border-color);color:var(--xui-color-disabled);cursor:not-allowed}";
styleInject(css_248z$d);

const RadioButton = ({
  prefixCls = prefixClsRadio,
  prefixClsV3 = prefixClsRadioV3,
  className = '',
  checked,
  disabled,
  children,
  size = 'large',
  ...props
}) => {
  return jsxRuntime.jsx(Radio, {
    ...props,
    checked: checked,
    disabled: disabled,
    className: clsx([`${prefixCls}-button ${prefixClsV3}-button`, {
      disabled,
      [className]: className,
      [`${prefixCls}-button-${size} ${prefixClsV3}-button-${size}`]: size,
      [`${prefixCls}-button-checked ${prefixClsV3}-button-checked`]: checked
    }]),
    children: jsxRuntime.jsx("span", {
      className: `${prefixCls}-button-content ${prefixClsV3}-button-content`,
      children: children ?? props.value
    })
  });
};

var css_248z$c = ".xUi-radio-group.xUi-radio-group-small{height:24px}.xUi-radio-group.xUi-radio-group-small .xUi-radio-button:first-child{border-radius:var(--xui-border-radius-sm) 0 0 var(--xui-border-radius-sm)}.xUi-radio-group.xUi-radio-group-small .xUi-radio-button:last-child{border-radius:0 var(--xui-border-radius-sm) var(--xui-border-radius-sm) 0}.xUi-radio-group.xUi-radio-group-middle{height:32px}.xUi-radio-group.xUi-radio-group-middle .xUi-radio-button:first-child{border-radius:var(--xui-border-radius-md) 0 0 var(--xui-border-radius-md)}.xUi-radio-group.xUi-radio-group-middle .xUi-radio-button:last-child{border-radius:0 var(--xui-border-radius-md) var(--xui-border-radius-md) 0}.xUi-radio-group.xUi-radio-group-large{height:44px}.xUi-radio-group.xUi-radio-group-large .xUi-radio-button:first-child{border-radius:var(--xui-border-radius-lg) 0 0 var(--xui-border-radius-lg)}.xUi-radio-group.xUi-radio-group-large .xUi-radio-button:last-child{border-radius:0 var(--xui-border-radius-lg) var(--xui-border-radius-lg) 0}.xUi-radio-group .xUi-radio-button:not(:first-child){border-radius:0}.xUi-radio-group.block{display:inline-flex;width:100%}.xUi-radio-group.block .xUi-radio-button{width:100%}.xUi-radio-group:not(.xUi-radio-group-solid) .xUi-radio-button-checked{background-color:var(--xui-background-color);color:var(--xui-primary-color)}";
styleInject(css_248z$c);

const RadioGroup = ({
  defaultValue,
  value,
  size = 'large',
  disabled,
  name,
  id,
  style = {},
  buttonStyle = 'outline',
  block,
  prefixCls = prefixClsRadio,
  prefixClsV3 = prefixClsRadioV3,
  className = '',
  options = [],
  children,
  ...props
}) => {
  const selectedValue = react.useMemo(() => value !== undefined ? value : defaultValue, [value, defaultValue]);
  const renderChildren = () => {
    if (options.length > 0) {
      return options.map((option, key) => {
        const optionValue = typeof option === 'object' ? option.value : option;
        const optionLabel = typeof option === 'object' ? option.label : option;
        return jsxRuntime.jsx(Radio, {
          value: optionValue,
          checked: selectedValue === optionValue,
          disabled: disabled || typeof option === 'object' && option.disabled,
          ...props,
          children: optionLabel
        }, `${key}_${optionValue}`);
      });
    }
    return react.Children.map(children, child => {
      if (/*#__PURE__*/react.isValidElement(child) && (child.type === Radio || child.type === RadioButton)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const {
          ...childProps
        } = child.props;
        return jsxRuntime.jsx(child.type, {
          ...props,
          ...childProps,
          ...(child.type === RadioButton ? {
            size,
            buttonStyle
          } : {}),
          defaultValue: defaultValue,
          disabled: disabled ?? child.props.disabled,
          checked: selectedValue === child.props.value,
          name: name ?? prefixClsRadio
        });
      }
      return child;
    });
  };
  return jsxRuntime.jsx("div", {
    id: id,
    style: style,
    className: clsx([`${prefixCls}-group ${prefixClsV3}-group`, {
      block,
      className,
      [`${prefixCls}-group-${size} ${prefixClsV3}-group-${size}`]: size,
      [`${prefixCls}-group-solid ${prefixClsV3}-group-solid`]: buttonStyle === 'solid'
    }]),
    children: renderChildren()
  });
};

var css_248z$b = ".xUi-select-options{list-style:none;margin:0;padding:4px}.xUi-select-option,.xUi-select-options{border-radius:var(--xui-border-radius-sm)}.xUi-select-option{align-items:center;color:var(--xui-text-color);cursor:pointer;display:flex;font-size:var(--xui-font-size-md);margin-bottom:2px;padding:8px 16px;&[tabindex=\"0\"]:focus-visible{background-color:var(--xui-primary-color);color:var(--xui-background-color)}}.xUi-select-option.xUi-select-focused,.xUi-select-option:hover{background-color:var(--xui-primary-color);color:var(--xui-background-color)}.xUi-select-option.xUi-select-focused{align-items:center;display:flex;font-weight:600;justify-content:space-between}.xUi-select-option.xUi-select-disabled{color:rgba(0,0,0,.25);cursor:not-allowed}.xUi-select-option.selected{background-color:var(--xui-primary-color);color:var(--xui-background-color)}.xUi-select-option.selected:hover{background-color:var(--xui-primary-color-light)}";
styleInject(css_248z$b);

const Option = ({
  value,
  children,
  disabled,
  className = '',
  style,
  onClick,
  render,
  prefixCls = prefixClsSelect,
  prefixClsV3 = prefixClsSelectV3,
  selected,
  title
}) => {
  const handleClick = e => {
    if (disabled) {
      return;
    }
    onClick?.(e);
  };
  return jsxRuntime.jsx("div", {
    tabIndex: 0,
    role: "button",
    className: clsx([`${prefixCls}-option ${prefixClsV3}-option ${className} `, {
      selected: selected,
      disabled: disabled
    }]),
    style: style,
    onClick: handleClick,
    "data-testid": value || children,
    ...(title ? {
      title
    } : {}),
    children: render ? render(value) : children || value
  });
};

var css_248z$a = ".xUi-select .xUi-select-tag-container{display:flex;flex:auto;flex-wrap:wrap;gap:4px;line-height:12px;position:relative}.xUi-select .xUi-select-tag-container-fixHeight{max-height:32px!important;overflow:hidden}.xUi-select.large .xUi-select-tag-container,.xUi-select.middle .xUi-select-tag-container{line-height:22px}.xUi-select .xUi-select-tag{align-items:center;align-self:center;background:rgba(0,0,0,.06);border:1px solid transparent;border-radius:var(--xui-border-radius-sm);box-sizing:border-box;cursor:default;display:flex;flex:none;height:100%;max-width:100%;overflow:hidden;padding:2px;text-overflow:ellipsis;transition:font-size .3s,line-height .3s,height .3s;white-space:nowrap}.xUi-select.middle .xUi-select-tag{padding:4px 8px}.xUi-select.large .xUi-select-tag{font-size:var(--xui-font-size-lg);padding:4px 8px}.xUi-select .xUi-select-tag span{font-size:var(--xui-font-size-sm);margin:0 2px}.xUi-select .xUi-select-tag .xUi-select-tag-close-icon{color:rgba(0,0,0,.5);cursor:pointer;font-size:var(--xui-font-size-xs)}.xUi-select .xUi-select-tag .xUi-select-tag-close-icon:hover{color:var(--xui-text-color)}.xUi-select .xUi-select-tag:has([class=xUi-select-tag-input]){background:transparent;border:none;color:var(--xui-text-color);font-size:var(--xui-font-size-md);outline:none;padding:0}.xUi-select .xUi-select-tag:has([class=xUi-select-tag-input]) input{background-color:transparent;border:none;font-size:var(--xui-font-size-md);height:-webkit-fill-available;padding:0}.xUi-select .xUi-select-tag-input:focus{border:none;box-shadow:none;outline:none}";
styleInject(css_248z$a);

const Tag = ({
  prefixCls = prefixClsSelect,
  style = {},
  onClose,
  value,
  label,
  closable,
  color,
  icon,
  className = ''
}) => {
  const handleOnClick = e => {
    e.preventDefault();
    e.stopPropagation();
    e.target.value = value;
    onClose?.(e);
  };
  return jsxRuntime.jsxs("div", {
    style: {
      ...style,
      backgroundColor: color
    },
    className: `${prefixCls}-tag ${className}`,
    children: [jsxRuntime.jsx("span", {
      children: label !== undefined ? label : value
    }), closable && jsxRuntime.jsx("span", {
      className: `${prefixCls}-tag-close-icon`,
      onClick: handleOnClick,
      children: icon || jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: "\u2715"
      })
    })]
  });
};

var css_248z$9 = "@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.xUi-select{background-color:transparent;border:1px solid var(--xui-border-color);border-radius:var(--xui-border-radius-sm);box-sizing:border-box;color:var(--xui-text-color);display:inline-flex;flex-direction:row-reverse;min-height:24px;padding:2px 8px;position:relative;width:100%;&:has([tabindex=\"0\"]:focus-visible){border-color:var(--xui-primary-color)}}.xUi-select-disabled{background:rgba(0,0,0,.04)}.xUi-select-arrow{align-items:center;color:var(--xui-text-color-light);display:flex;gap:6px;margin:0 4px;pointer-events:all!important}.xUi-select-arrow svg{align-items:center;display:flex;justify-content:center}.xUi-select-loading{animation:spin 1s linear infinite;color:var(--xui-text-color-light);display:inline-block;margin:0 8px}.xUi-select .xUi-select-trigger{align-items:center;background:transparent;border-radius:var(--xui-border-radius-sm);cursor:pointer;display:flex;justify-content:space-between;width:100%}.xUi-select .xUi-select-clear-btn{background:none;border:none;color:#999;cursor:pointer;font-size:var(--xui-font-size-lg);line-height:1;margin:0 8px;padding:0}.xUi-select .xUi-select-clear-btn:hover{color:var(--xui-primary-color)}.xUi-select-dropdown{background-color:var(--xui-select-background-color);border-radius:var(--xui-border-radius-sm);box-shadow:0 4px 12px rgba(0,0,0,.15);left:0;margin-top:5px;max-height:350px;overflow-y:auto;position:absolute;right:unset;top:100%;width:inherit;z-index:10}.xUi-select-dropdown.bottomRight,.xUi-select-dropdown.topRight{left:unset;right:0}.xUi-select .xUi-select-loading-spinner{color:#999;padding:10px;text-align:center}.xUi-select:focus-within{border-color:var(--xui-primary-color-light);box-shadow:none}.xUi-select:hover:not(.xUi-select-disabled){border-color:var(--xui-primary-color)}.xUi-select-disabled,.xUi-select-disabled .xUi-select-input,.xUi-select-disabled .xUi-select-trigger{cursor:not-allowed!important;opacity:.6!important}.xUi-select-selected-icon{color:var(--xui-primary-color-light)}.xUi-select-error{border-color:var(--xui-error-color)}.xUi-select-arrow .error-svg-icon,.xUi-select-error .error-svg-icon{color:var(--xui-error-color)}.xUi-select .xUi-select-input{align-items:center;background:transparent;border:none;color:var(--xui-text-color);cursor:pointer;display:inline-flex;font-size:var(--xui-font-size-md);height:auto;height:-webkit-fit-content;outline:none;padding:0;user-select:none;width:100%}.xUi-select .xUi-select-input:focus{border:none;box-shadow:none;outline:none}.xUi-select.middle{border-radius:var(--xui-border-radius-md);min-height:30px}.xUi-select.middle,.xUi-select.middle input{font-size:var(--xui-font-size-md)}.xUi-select.middle .xUi-select-trigger{border-radius:var(--xui-border-radius-md)}.xUi-select.large{font-size:var(--xui-font-size-lg);min-height:44px}.xUi-select.large,.xUi-select.large .xUi-select-trigger{border-radius:var(--xui-border-radius-lg)}.xUi-select input{font-size:var(--xui-font-size-lg)}";
styleInject(css_248z$9);

const LIST_HEIGHT = 200;
const PADDING_PLACEMENT = 16;
const PADDING_TAG_INPUT = 4;
const FORM_MARGIN_BOTTOM = 20;
function getTextFromNode(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return node.toString();
  }
  if (/*#__PURE__*/react.isValidElement(node)) {
    const html = ReactDOMServer.renderToStaticMarkup(node);
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
  return '';
}
const Select = ({
  prefixCls = prefixClsSelect,
  prefixClsV3 = prefixClsSelectV3,
  id,
  searchValue = '',
  autoClearSearchValue = true,
  filterOption = true,
  optionFilterProp,
  children,
  options = [],
  listHeight = LIST_HEIGHT,
  menuItemSelectedIcon,
  mode = 'default',
  value,
  defaultValue,
  maxCount,
  disabled = false,
  loading = false,
  placeholder = 'Select',
  allowClear = false,
  filterable = false,
  defaultOpen = false,
  size = 'large',
  error = false,
  dropdownClassName = '',
  className = '',
  suffixIcon,
  searchIcon,
  style,
  showSearch = false,
  open = true,
  closeFromParent = false,
  showArrow = true,
  notFoundContent = false,
  noStyle,
  feedbackIcons,
  placement = 'bottomLeft',
  removeIcon,
  maxTagCount,
  iconClickClear,
  onSearch,
  onSelect,
  onDeselect,
  onClear,
  onChange,
  onClose,
  tagRender,
  getPopupContainer,
  dropdownRender,
  onDropdownVisibleChange,
  iconClick,
  ref,
  controlled
}) => {
  const asTag = mode === 'tags';
  const asMultiple = mode === 'multiple';
  const hasMode = asTag || asMultiple;
  const initialValue = react.useMemo(() => value ?? defaultValue ?? '', [value]);
  const checkModeInitialValue = react.useMemo(() => (!Array.isArray(initialValue) ? [initialValue] : initialValue).filter(e => e !== undefined && e !== ''), [initialValue]);
  const [isHover, setIsHover] = react.useState(false);
  const selectRef = react.useRef(null);
  const [searchInputWidth, setSearchInputWidth] = react.useState(0);
  const [isOpen, setIsOpen] = react.useState(defaultOpen);
  const [searchFocused, setSearchFocused] = react.useState(false);
  const [isOpenChecker, setIsOpenChecker] = react.useState(isOpen);
  const [searchQuery, setSearchQuery] = react.useState(searchValue || '');
  const [dropdownPosition, setDropdownPosition] = react.useState({});
  const [lastTagWidth, setLastTagWidth] = react.useState(0);
  const tagtriggerRef = react.useRef(null);
  const searchInputRef = react.useRef(null);
  const [responsiveTagCount, setResponsiveTagCount] = react.useState(null);
  const [selected, setSelected] = react.useState(hasMode ? checkModeInitialValue : initialValue);
  react.useImperativeHandle(ref, () => ({
    focus: () => selectRef.current?.focus(),
    blur: () => selectRef.current?.blur(),
    // @ts-expect-error
    scrollTo: (...args) =>
    // @ts-expect-error
    selectRef.current?.scrollTo(...args),
    nativeElement: selectRef.current
  }), []);
  const handleMouseEnter = react.useCallback(() => !disabled && selected?.length && setIsHover(true), [disabled, selected?.length]);
  const handleMouseLeave = react.useCallback(() => !disabled && setIsHover(false), [disabled]);
  const handleClearInputValue = react.useCallback(() => {
    if (!autoClearSearchValue) {
      return;
    }
    setSearchQuery('');
    let inputContainer = selectRef.current?.querySelector(`[id='${prefixCls}-search-tag-input']`);
    if (!inputContainer) {
      let inputContainer = selectRef.current?.querySelector(`[id='${prefixClsV3}-search-tag-input']`);
      if (!inputContainer) {
        inputContainer = selectRef.current?.querySelector("[content-editable='plaintext-only']");
      }
    }
    if (inputContainer) {
      inputContainer.innerText = '';
    }
  }, [autoClearSearchValue, prefixCls, prefixClsV3]);
  react.useEffect(() => {
    !controlled && setSelected(hasMode ? checkModeInitialValue : initialValue);
  }, [checkModeInitialValue, hasMode, initialValue]);
  const handleClickOutside = react.useCallback(event => {
    if (!selectRef.current) return;
    const dropdown = document.querySelector(`.${prefixCls}-dropdown`) || document.querySelector(`.${prefixClsV3}-dropdown`);
    const clickedInside = selectRef.current.contains(event?.target) || dropdown && dropdown.contains(event?.target);
    if (!clickedInside) {
      setSearchFocused(false);
      setIsOpen(false);
      handleClearInputValue();
      onClose?.();
      onDropdownVisibleChange?.(false, selected);
    }
  }, [selectRef.current, prefixCls, prefixClsV3, selected]);
  react.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
  const updateDropdownPosition = react.useCallback(searchQueryUpdated => {
    if (!selectRef.current) {
      return;
    }
    const triggerNode = selectRef.current?.querySelector(`.${prefixCls}-trigger`) || selectRef.current?.querySelector(`.${prefixClsV3}-trigger`);
    const selectBox = triggerNode.getBoundingClientRect();
    const dropdownHeight = (getPopupContainer ? getPopupContainer(triggerNode) : selectRef.current)?.querySelector(`.${prefixCls}-dropdown`)?.clientHeight || listHeight;
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - selectBox.bottom;
    const spaceAbove = selectBox.top;
    let positionStyle = {
      width: `${triggerNode.offsetWidth + PADDING_PLACEMENT}px`,
      position: 'absolute'
    };
    const shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;
    const shouldShowBelow = spaceAbove < dropdownHeight && spaceBelow > dropdownHeight;
    const inForm = !triggerNode.closest(`.${prefixClsForm}`) ? FORM_MARGIN_BOTTOM : 0;
    if (isOpen && (shouldShowAbove || shouldShowBelow || searchQueryUpdated || !isOpenChecker)) {
      if (getPopupContainer) {
        positionStyle = {
          ...positionStyle,
          top: shouldShowAbove ? `${selectBox.top + document.documentElement.scrollTop - dropdownHeight + PADDING_PLACEMENT / 2 + inForm - triggerNode.offsetHeight}px` : `${selectBox.top + document.documentElement.scrollTop + triggerNode.offsetHeight}px`,
          left: `${selectBox.left - PADDING_PLACEMENT / 2}px`
        };
      } else {
        positionStyle = {
          ...positionStyle,
          top: shouldShowAbove ? `${triggerNode.offsetTop - dropdownHeight + PADDING_PLACEMENT + inForm - triggerNode.offsetHeight}px` : `${triggerNode.offsetTop + triggerNode.offsetHeight}px`,
          left: `${triggerNode.offsetLeft - PADDING_PLACEMENT / 2}px`
        };
      }
      setDropdownPosition(positionStyle);
    }
  }, [prefixCls, listHeight, getPopupContainer, isOpenChecker, isOpen]);
  react.useEffect(() => {
    setIsOpenChecker(isOpen);
    if (!isOpen) {
      setDropdownPosition({});
      setSearchFocused(false);
    } else {
      if (showSearch) {
        setSearchFocused(true);
        searchInputRef.current?.focus();
      }
    }
  }, [isOpen, showSearch]);
  react.useEffect(() => {
    if (!open && isOpen && closeFromParent) {
      handleClickOutside();
    }
  }, [open, isOpen, closeFromParent]);
  react.useEffect(() => {
    if (!isOpen) return;
    const _updateDropdownPosition = () => updateDropdownPosition();
    _updateDropdownPosition();
    const controller = new AbortController();
    const scrollableParents = getScrollParents(selectRef.current);
    scrollableParents.forEach(el => {
      el.addEventListener('scroll', _updateDropdownPosition, {
        passive: true,
        signal: controller.signal
      });
    });
    window.addEventListener('scroll', _updateDropdownPosition, {
      passive: true,
      signal: controller.signal
    });
    window.addEventListener('resize', _updateDropdownPosition, {
      signal: controller.signal
    });
    return () => {
      controller.abort();
    };
  }, [isOpen, getPopupContainer, updateDropdownPosition]);
  react.useEffect(() => {
    updateDropdownPosition(true);
  }, [searchQuery.length]);
  const getScrollParents = react.useCallback(element => {
    const parents = [];
    let current = element.parentElement;
    while (current) {
      if (current.scrollHeight > current.clientHeight) {
        parents.push(current);
      }
      current = current.parentElement;
    }
    return parents;
  }, []);
  const handleSearch = e => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
    if (!isOpen) {
      setIsOpen(!isOpen || defaultOpen);
      handleClearInputValue();
    }
  };
  const handleEnterAddNewTag = () => {
    if (asMultiple || maxCount && selected.length >= maxCount && !selected.includes(searchQuery)) {
      return;
    }
    const newOptionValue = searchQuery.trim();
    if (!newOptionValue || !hasMode || selected.includes(newOptionValue)) {
      return;
    }
    const updatedSelected = [...selected, newOptionValue];
    onChange?.(updatedSelected);
    !controlled && onSelect?.(updatedSelected);
    const input = selectRef.current?.querySelector('input');
    if (input) {
      input.value = '';
    }
    !controlled && setSelected(updatedSelected);
    handleClearInputValue();
  };
  const handleSelect = (e, optionValue, option) => {
    if (hasMode) {
      if (maxCount && selected.length >= maxCount && !selected.includes(optionValue)) {
        return;
      }
      const newSelection = selected.includes(optionValue) ? selected.filter(item => item !== optionValue) : [...selected, optionValue];
      !controlled && setSelected(newSelection);
      onChange?.(newSelection, option);
      if (selected.includes(optionValue)) {
        !controlled && onDeselect?.(optionValue, option);
      } else {
        !controlled && onSelect?.(optionValue, option);
      }
    } else {
      setIsOpen(defaultOpen);
      !controlled && setSelected(optionValue);
      onChange?.(optionValue, option);
      !controlled && onSelect?.(optionValue, option);
    }
    handleClearInputValue();
  };
  const handleClear = () => {
    const value = hasMode ? [] : '';
    !controlled && setSelected(value);
    onChange?.('');
    !controlled && onSelect?.('');
    onClear?.();
    handleClearInputValue();
  };
  const handleRemoveTag = e => handleSelect(e, e.target.value);
  const handleOnKeyDown = e => {
    if (!isOpen || e.which === 13) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    const timeout = setTimeout(() => {
      setSearchFocused(true);
      e.target.value = (searchInputRef.current?.innerText || e.target.innerText).replace('\n', '');
      setSearchQuery(e.target.value);
      onSearch?.(e.target.value);
      if (e.key === 'Enter' && searchQuery.trim() !== '') {
        if (!asTag) {
          e.stopPropagation();
          e.preventDefault();
          clearTimeout(timeout);
          return;
        }
        handleEnterAddNewTag();
        e.target.innerText = '';
      }
      if (e.key === 'Backspace') {
        if (hasMode && !e.target.value.trim().length) {
          const updatedSelected = hasMode ? selected.filter(item => item !== selected[selected.length - 1]) : e.target.value.trim();
          if (selected[selected.length - 1]) {
            !controlled && onDeselect?.(selected[selected.length - 1]);
          }
          onChange?.(updatedSelected);
          !controlled && setSelected(updatedSelected);
          setSearchFocused(false);
        }
      }
      clearTimeout(timeout);
    });
  };
  const ArrowContainer = react.useMemo(() => {
    if (!showArrow) {
      return null;
    }
    return showSearch && isOpen ? searchIcon || jsxRuntime.jsx(SearchIcon, {}) : suffixIcon ? jsxRuntime.jsx("span", {
      style: {
        display: 'contents'
      },
      onClick: () => iconClickClear ? handleClear() : iconClick?.(),
      children: suffixIcon
    }) : showArrow && jsxRuntime.jsx(ArrowIcon, {
      isOpen: isOpen
    });
  }, [showArrow, showSearch, isOpen, suffixIcon, searchIcon]);
  const extractOptions = react.useCallback((children, options) => {
    const result = [];
    const flatten = nodes => {
      try {
        react.Children.forEach(nodes, child => {
          if (!child) return;
          if (/*#__PURE__*/react.isValidElement(child)) {
            if (child.type === react.Fragment || child.type === react.Suspense) {
              flatten(child.props.children);
            } else {
              result.push(child.props);
            }
          }
        });
      } catch (e) {
        Object.assign(result, nodes);
      }
    };
    if (children) {
      flatten(children);
      return result;
    }
    return options || [];
  }, []);
  const extractedOptions = react.useMemo(() => {
    return children ? extractOptions(children) : Array.isArray(options) ? options : [];
  }, [children, options]);
  const triggerNode = react.useMemo(() => {
    return selectRef.current?.querySelector(`.${prefixCls}-trigger`);
  }, [prefixCls]);
  const filteredOptions = react.useMemo(() => {
    return extractedOptions.filter(option => {
      if (typeof filterOption === 'function') {
        return filterOption(searchQuery, option);
      }
      if (filterOption === false) {
        return true;
      }
      // @ts-expect-error
      const optionFilterPropValue = option[optionFilterProp];
      const valueToCheck = optionFilterProp && typeof optionFilterPropValue === 'string' ? String(optionFilterPropValue) : Array.isArray(option.children) && typeof option.children[0] === 'string' ? option.children[0] : getTextFromNode(option.children) || String(option.label) || String(option.value);
      return valueToCheck.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [extractedOptions, filterOption, optionFilterProp, searchQuery]);
  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      onDropdownVisibleChange?.(!isOpen, selected);
    }
    const searchContent = selectRef.current?.getElementsByClassName(`${prefixCls}-tag-container`)?.[0];
    if (searchContent) {
      setSearchInputWidth(searchContent.clientWidth - PADDING_TAG_INPUT);
    }
  };
  const selectedOption = react.useMemo(() => {
    const option = extractedOptions.find(e => e.value === selected || e.label === selected || e.children === selected) || selected;
    const title = typeof option === 'string' ? option : option?.children || option?.label || option?.value || null;
    return jsxRuntime.jsx("div", {
      style: {
        display: 'contents'
      },
      children: title
    });
  }, [extractedOptions, selected]) || selected || null;
  const hasMaxTagCount = hasMode && (typeof maxTagCount === 'number' || maxTagCount === 'responsive');
  const container = tagtriggerRef.current;
  const selectedTags = hasMode ? selected : [];
  const displayTagCount = maxTagCount === 'responsive' ? responsiveTagCount : maxTagCount;
  const tagsToDisplay = hasMaxTagCount ? selectedTags.slice(0, displayTagCount || selectedTags.length) : selectedTags;
  const overflowCount = hasMaxTagCount ? selectedTags.length - (displayTagCount || selectedTags.length) : 0;
  const tags = Array.from(container?.querySelectorAll(`.${prefixCls}-tag:not(.contentEditable):not(.${prefixCls}-tag-overflow)`) || []);
  react.useLayoutEffect(() => {
    if (maxTagCount === 'responsive' && container) {
      const containerWidth = container?.clientWidth || 0;
      let currentWidth = 0;
      let count = 0;
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        if (tags.length - 1 === i && overflowCount) {
          setLastTagWidth(tag.offsetWidth);
        }
        currentWidth += tag.offsetWidth + PADDING_PLACEMENT;
        if (currentWidth < containerWidth) {
          count++;
        } else {
          break;
        }
      }
      if (overflowCount === 1 && lastTagWidth + PADDING_PLACEMENT) {
        setResponsiveTagCount(0);
      }
      if (currentWidth >= containerWidth) {
        setResponsiveTagCount(count);
      }
    }
  }, [maxTagCount, container, tags, overflowCount]);
  return jsxRuntime.jsxs("div", {
    id: id,
    ref: selectRef,
    style: style,
    className: clsx([{
      [size]: size,
      noStyle: noStyle,
      [prefixCls]: prefixCls,
      [prefixClsV3]: prefixClsV3,
      [className]: !!className,
      [`${prefixCls}-error ${prefixClsV3}-error`]: error,
      [`${prefixCls}-multi ${prefixClsV3}-multi`]: hasMode,
      [`${prefixCls}-disabled ${prefixClsV3}-disabled`]: disabled
    }]),
    children: [jsxRuntime.jsxs("div", {
      tabIndex: 0,
      role: "button",
      onClick: handleTriggerClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      className: `${prefixCls}-trigger ${prefixClsV3}-trigger`,
      children: [showSearch || hasMode ? jsxRuntime.jsxs("div", {
        ref: tagtriggerRef,
        style: {
          ...style,
          ...(isOpen ? {
            opacity: hasMode || searchQuery.length ? 1 : 0.5,
            maxWidth: `${searchInputWidth}px`
          } : {}),
          minWidth: `${searchInputWidth}px`
        },
        className: clsx([`${prefixCls}-tag-container ${prefixClsV3}-tag-container`, {
          [`${prefixCls}-tag-container-fixHeight ${prefixClsV3}-tag-container-fixHeight`]: !tagtriggerRef.current
        }]),
        children: [hasMode ? jsxRuntime.jsx(jsxRuntime.Fragment, {
          children: selectedTags.length ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [tagsToDisplay.map((tag, index) => tagRender ? jsxRuntime.jsx("div", {
              "data-testid": tag,
              children: tagRender?.({
                label: (() => {
                  const option = extractedOptions.find(e => e.value === tag || e.label === tag || e.children === tag);
                  return option?.children || option?.label || option?.value || null;
                })() || tag || null,
                value: tag,
                onClose: handleRemoveTag,
                closable: true
              })
            }, `${index}_${tag}`) : jsxRuntime.jsx(Tag, {
              closable: true,
              value: tag,
              label: (() => {
                const option = extractedOptions.find(e => e.value === tag || e.label === tag || e.children === tag);
                return option?.children || option?.label || option?.value || null;
              })() || tag || null,
              onClose: handleRemoveTag
            }, `${index}_${tag}`)), overflowCount > 0 && jsxRuntime.jsx(Tag, {
              label: `+${overflowCount}`,
              className: `${prefixCls}-tag-overflow ${prefixClsV3}-tag-overflow`
            })]
          }) : jsxRuntime.jsx("span", {
            style: {
              opacity: 0.5
            },
            children: searchFocused ? '' : placeholder
          })
        }) : null, isOpen ? jsxRuntime.jsxs("div", {
          className: `${prefixCls}-tag ${prefixClsV3}-tag contentEditable`,
          children: [jsxRuntime.jsx("div", {
            ref: searchInputRef,
            onClick: e => {
              if (disabled) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
            },
            onKeyDown: handleOnKeyDown,
            style: {
              minWidth: showSearch && !searchQuery.length ? 1 : 'auto',
              display: 'ruby',
              textAlign: 'center',
              opacity: searchFocused ? 1 : 0
            },
            ...(showSearch ? {
              contentEditable: true
            } : {}),
            id: `${prefixCls}-search-tag-input`,
            className: `${prefixCls}-tag-input`
          }), !hasMode && !searchQuery.length ? selected === '' ? placeholder : selectedOption : null]
        }) : !hasMode ? jsxRuntime.jsx("div", {
          className: `${prefixCls}-input ${prefixClsV3}-input globalEllipsis`,
          style: {
            opacity: isOpen || selected === '' ? '0.6' : '1'
          },
          children: selected === '' ? placeholder : selectedOption
        }) : null]
      }) : !hasMode ? jsxRuntime.jsx("div", {
        className: `${prefixCls}-input ${prefixClsV3}-input globalEllipsis`,
        onClick: () => !disabled && setIsOpen(!isOpen || defaultOpen),
        style: {
          opacity: isOpen || selected === '' ? '0.6' : '1'
        },
        children: selected === '' ? placeholder : selectedOption
      }) : null, isHover && !loading ? allowClear && selected ? jsxRuntime.jsx("button", {
        className: `${prefixCls}-clear-btn ${prefixClsV3}-clear-btn`,
        onClick: handleClear,
        children: removeIcon || jsxRuntime.jsx(ClearIcon, {})
      }) : jsxRuntime.jsxs("span", {
        className: `${prefixCls}-arrow ${prefixClsV3}-arrow`,
        children: [ArrowContainer, error && feedbackIcons ? jsxRuntime.jsx(ErrorIcon, {}) : null]
      }) : jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [!loading && jsxRuntime.jsxs("span", {
          className: `${prefixCls}-arrow ${prefixClsV3}-arrow`,
          children: [ArrowContainer, error && feedbackIcons ? jsxRuntime.jsx(ErrorIcon, {}) : null]
        }), loading && jsxRuntime.jsx("span", {
          className: `${prefixCls}-loading ${prefixClsV3}-loading`,
          children: jsxRuntime.jsx(LoadingIcon, {})
        })]
      })]
    }), jsxRuntime.jsx(ConditionalWrapper, {
      condition: getPopupContainer !== undefined,
      wrapper: element => getPopupContainer ? /*#__PURE__*/reactDom.createPortal(element, getPopupContainer(triggerNode)) : jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: element
      }),
      children: !loading && open && isOpen && jsxRuntime.jsxs("div", {
        className: clsx([`${prefixCls}-dropdown ${prefixClsV3}-dropdown`, {
          [placement]: placement,
          [dropdownClassName]: dropdownClassName
        }]),
        style: {
          ...dropdownPosition,
          maxHeight: dropdownRender ? 'unset' : listHeight
        },
        children: [filterable && jsxRuntime.jsx("input", {
          type: "text",
          inputMode: "text",
          className: `${prefixCls}-search ${prefixClsV3}-search`,
          value: searchQuery,
          onChange: handleSearch,
          placeholder: "Search..."
        }), !loading &&
        // @ts-expect-error
        jsxRuntime.jsx(ConditionalWrapper, {
          wrapper: element => {
            return dropdownRender?.(element || jsxRuntime.jsx(jsxRuntime.Fragment, {
              children: " "
            })) || jsxRuntime.jsx(jsxRuntime.Fragment, {
              children: " "
            });
          },
          condition: !!dropdownRender,
          children: jsxRuntime.jsxs("div", {
            className: `${prefixCls}-options ${prefixClsV3}-options`,
            style: {
              maxHeight: listHeight,
              overflowY: 'auto',
              // display: !filteredOptions.length && asTag ? 'none' : 'block',
              maxWidth: selectRef.current ? `${selectRef.current.getBoundingClientRect().width}px` : 'inherit'
            },
            children: [asTag && !!searchQuery && jsxRuntime.jsx(Option, {
              value: searchQuery,
              className: `${prefixCls}-focused ${prefixClsV3}-focused`,
              onClick: e => {
                handleSelect(e, searchQuery);
              },
              "data-value": searchQuery,
              "data-testid": searchQuery,
              children: searchQuery
            }), filteredOptions.length ? filteredOptions.map(({
              children,
              className = '',
              ...props
            }, index) => {
              const isSelected = hasMode ? selected.includes(props.value) : props.value === selected;
              return jsxRuntime.jsxs(Option, {
                ...props,
                selected: isSelected,
                className: clsx([className, {
                  [`${prefixCls}-focused ${prefixClsV3}-focused`]: hasMode ? isSelected : props.value === selected,
                  [`${prefixCls}-disabled ${prefixClsV3}-disabled`]: maxCount && hasMode && !isSelected ? selected.length >= maxCount : false
                }]),
                onClick: e => {
                  if (props.disabled) {
                    return;
                  }
                  handleSelect(e, props.value, {
                    children,
                    className,
                    ...props,
                    key: `${index}`
                  });
                },
                "data-value": props.value,
                "data-testid": props.value,
                children: [children || props.label || props.value, menuItemSelectedIcon && hasMode && isSelected && jsxRuntime.jsx("span", {
                  className: `${prefixCls}-selected-icon ${prefixClsV3}-selected-icon`,
                  children: menuItemSelectedIcon === true ? jsxRuntime.jsx(CheckIcon, {}) : menuItemSelectedIcon
                })]
              }, `${props.value}_${index}`);
            }) : !asTag ? notFoundContent || jsxRuntime.jsx(EmptyContent, {}) : null]
          })
        })]
      })
    })]
  });
};
Select.displayName = 'Select';

var css_248z$8 = "@keyframes xUi-skeleton-loading{0%{background-position:100% 50%}to{background-position:0 50%}}.xUi-skeleton-element{display:inline-block!important;width:auto!important}.xUi-skeleton-button{background:hsla(0,0%,75%,.2);border-radius:4px;display:inline-block;height:32px;line-height:32px;min-width:64px;vertical-align:top;width:64px}.xUi-skeleton-button-sm{height:24px;line-height:24px;min-width:48px;width:48px}.xUi-skeleton-button-lg{height:44px;line-height:44px;min-width:80px;width:80px}.xUi-skeleton-active .xUi-skeleton-button{animation:xUi-skeleton-loading 1.4s ease infinite;background:linear-gradient(90deg,hsla(0,0%,75%,.2) 25%,hsla(0,0%,51%,.24) 37%,hsla(0,0%,75%,.2) 63%);background-size:400% 100%}";
styleInject(css_248z$8);

const BUTTON_SKELETON_SIZE = {
  small: `${prefixClsSkeleton}-button-sm`,
  large: `${prefixClsSkeleton}-button-lg`,
  default: ''
};
const SkeletonButton = ({
  prefixCls = prefixClsSkeleton,
  style = {},
  active,
  className,
  size = 'default',
  applyElementStyle = true
}) => {
  return jsxRuntime.jsx("div", {
    className: clsx([`${prefixCls}`, {
      [`${prefixCls}-element`]: applyElementStyle,
      [`${prefixCls}-active`]: active
    }, className]),
    children: jsxRuntime.jsx("span", {
      className: clsx([`${prefixCls}-button `, BUTTON_SKELETON_SIZE[size], className]),
      style: style
    })
  });
};

var css_248z$7 = "@keyframes xUi-skeleton-loading{0%{background-position:100% 50%}to{background-position:0 50%}}.xUi-skeleton-avatar{animation:xUi-skeleton-loading 1.4s ease infinite;background:linear-gradient(90deg,hsla(0,0%,75%,.2) 25%,hsla(0,0%,51%,.24) 37%,hsla(0,0%,75%,.2) 63%);background-size:400% 100%;display:block;height:40px;line-height:40px;width:40px}.xUi-skeleton-avatar-circle{border-radius:50%}.xUi-skeleton-avatar-square{border-radius:4px}";
styleInject(css_248z$7);

const AVATAR_DEFAULT_SIZE = 32;
const AVATAR_GLOBAL_SIZE = 40;
const GET_AVATAR_SKELETON_PROPS = avatar => {
  return typeof avatar !== 'boolean' ? {
    shape: avatar?.shape || 'circle',
    size: avatar?.size || AVATAR_GLOBAL_SIZE,
    style: avatar?.style || {},
    className: avatar?.className || ''
  } : {
    shape: 'circle',
    size: AVATAR_GLOBAL_SIZE
  };
};
const SkeletonAvatar = ({
  prefixCls = prefixClsSkeleton,
  className,
  shape = 'circle',
  style,
  wrapperStyle,
  size = AVATAR_DEFAULT_SIZE,
  active,
  applyElementStyle = true,
  ...props
}) => {
  return jsxRuntime.jsx("div", {
    className: clsx([`${prefixCls}`, {
      [`${prefixCls}-element`]: applyElementStyle,
      [`${prefixCls}-active`]: active
    }, className]),
    style: wrapperStyle,
    ...props,
    children: jsxRuntime.jsx("span", {
      className: clsx([`${prefixCls}-avatar ${prefixCls}-avatar-${shape}`]),
      style: {
        ...(size ? {
          width: size,
          height: size,
          lineHeight: size
        } : {}),
        ...(style || {})
      }
    })
  });
};

var css_248z$6 = ".xUi-skeleton-image{align-items:center;background:hsla(0,0%,75%,.2);display:flex;height:96px;justify-content:center;line-height:96px;vertical-align:top;width:96px}.xUi-skeleton-image .xUi-skeleton-icon{font-size:inherit!important}.xUi-skeleton-image svg{display:flex;height:100%;line-height:48px;margin:0 auto;max-width:192px;width:48px}";
styleInject(css_248z$6);

const CUSTOm_ICON_SIZE = 48;
const SkeletonImage = ({
  prefixCls = prefixClsSkeleton,
  className,
  style = {}
}) => {
  return jsxRuntime.jsx("div", {
    className: `${prefixCls}-image ${className || ''}`,
    style: style,
    children: jsxRuntime.jsx("span", {
      className: `${prefixCls}-icon`,
      style: {
        fontSize: `${style?.width || CUSTOm_ICON_SIZE}px`,
        color: '#bfbfbf',
        position: 'relative',
        width: '100%',
        height: '100%',
        ...(style?.backgroundColor ? {
          backgroundColor: style?.backgroundColor
        } : {})
      },
      children: jsxRuntime.jsx("svg", {
        viewBox: "0 0 1098 1024",
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        fill: "currentColor",
        children: jsxRuntime.jsx("path", {
          d: "M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z",
          className: `${prefixCls}-image-path`
        })
      })
    })
  });
};

var css_248z$5 = "@keyframes xUi-skeleton-loading{0%{background-position:100% 50%}to{background-position:0 50%}}.xUi-skeleton-element{display:inline-block!important;width:auto!important}.xUi-skeleton-input{background:hsla(0,0%,75%,.2);display:inline-block;height:32px;line-height:32px;min-width:160px;vertical-align:top;width:160px}.xUi-skeleton-input-sm{height:24px;line-height:24px;min-width:120px;width:120px}.xUi-skeleton-input-lg{height:44px;line-height:44px;min-width:200px;width:200px}.xUi-skeleton-active .xUi-skeleton-input{animation:xUi-skeleton-loading 1.4s ease infinite;background:linear-gradient(90deg,hsla(0,0%,75%,.2) 25%,hsla(0,0%,51%,.24) 37%,hsla(0,0%,75%,.2) 63%);background-size:400% 100%}.xUi-skeleton-block,.xUi-skeleton-block .xUi-skeleton-input{width:100%}";
styleInject(css_248z$5);

const INPUT_SKELETON_SIZE = {
  small: `${prefixClsSkeleton}-input-sm`,
  large: `${prefixClsSkeleton}-input-lg`,
  default: ''
};
const SkeletonInput = ({
  prefixCls = prefixClsSkeleton,
  style,
  block,
  active,
  className,
  size = 'default'
}) => {
  return jsxRuntime.jsx("div", {
    className: clsx([`${prefixCls}-element`, {
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-block`]: block
    }, className]),
    children: jsxRuntime.jsx("span", {
      className: `${prefixCls}-input ${INPUT_SKELETON_SIZE[size]} ${className || ''}`,
      style: style
    })
  });
};

var css_248z$4 = "@keyframes xUi-skeleton-loading{0%{background-position:100% 50%}to{background-position:0 50%}}.xUi-skeleton{display:table;width:100%}.xUi-skeleton__withAvatar{display:flex;gap:12px}.xUi-skeleton-content{width:100%}.xUi-skeleton-content,.xUi-skeleton__header{display:table-cell;vertical-align:top}.xUi-skeleton-title{background:hsla(0,0%,75%,.2);border-radius:4px;height:16px;margin-top:16px;width:38%}.xUi-skeleton-title-avatar{margin-top:12px;width:100%}.xUi-skeleton-title+.xUi-skeleton-paragraph{margin-top:24px}.xUi-skeleton-paragraph{padding:0}.xUi-skeleton-paragraph li{background:hsla(0,0%,75%,.2);border-radius:4px;height:16px;list-style:none;width:100%}.xUi-skeleton-paragraph li+li{margin-top:16px}.xUi-skeleton-paragraph li:last-child:not(:first-child){width:61%}.xUi-skeleton-active .xUi-skeleton-paragraph>li,.xUi-skeleton-active .xUi-skeleton-title{animation:xUi-skeleton-loading 1.4s ease infinite;background:linear-gradient(90deg,hsla(0,0%,75%,.2) 25%,hsla(0,0%,51%,.24) 37%,hsla(0,0%,75%,.2) 63%);background-size:400% 100%}.xUi-skeleton-round .xUi-skeleton-content,.xUi-skeleton-round .xUi-skeleton-paragraph>li,.xUi-skeleton-round .xUi-skeleton-title{border-radius:100px}";
styleInject(css_248z$4);

const PARAGRAPH_AVATAR_ROWS = 2;
const PARAGRAPH_DEFAULT_ROWS = 3;
const SkeletonComponent = ({
  prefixCls = prefixClsSkeleton,
  active,
  className,
  style,
  avatar,
  paragraph,
  round,
  title,
  teamLogo = true
}) => {
  const GET_TITLE_SKELETON_PROPS = typeof title !== 'boolean' ? {
    style: {
      width: title?.width,
      ...title?.style
    },
    className: title?.className || ''
  } : {};
  const PARAGRAPH_ROWS = avatar ? PARAGRAPH_AVATAR_ROWS : PARAGRAPH_DEFAULT_ROWS;
  const HAS_PHARAGRAPH = typeof paragraph === 'boolean' || !paragraph ? PARAGRAPH_ROWS : paragraph?.rows ?? PARAGRAPH_ROWS;
  return jsxRuntime.jsxs("div", {
    className: clsx([prefixCls, {
      [`${prefixCls}__withAvatar`]: avatar,
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-round`]: round
    }, className]),
    style: style,
    children: [avatar && teamLogo && jsxRuntime.jsx("div", {
      className: `${prefixCls}__header`,
      children: jsxRuntime.jsx(SkeletonAvatar, {
        ...GET_AVATAR_SKELETON_PROPS(avatar)
      })
    }), jsxRuntime.jsxs("div", {
      className: `${prefixCls}-content`,
      children: [jsxRuntime.jsx("h3", {
        className: clsx([`${prefixCls}-title ${GET_TITLE_SKELETON_PROPS.className}`, {
          [`${prefixCls}-title-avatar`]: avatar
        }]),
        style: GET_TITLE_SKELETON_PROPS.style
      }), paragraph !== false && jsxRuntime.jsx("ul", {
        className: `${prefixCls}-paragraph`,
        style: {
          ...(typeof paragraph !== 'boolean' && paragraph ? paragraph.style : {})
        },
        children: createArray(HAS_PHARAGRAPH).map(key => jsxRuntime.jsx("li", {}, key))
      })]
    })]
  });
};
const Skeleton = Object.assign(SkeletonComponent, {
  Image: SkeletonImage,
  Input: SkeletonInput,
  Avatar: SkeletonAvatar,
  Button: SkeletonButton
});

const MenuItem = ({
  itemKey,
  label,
  icon,
  title,
  disabled,
  danger,
  extra,
  selected,
  className = '',
  prefixCls = prefixClsMenu,
  onClick,
  style
}) => {
  const menuContext = react.useContext(MenuContext);
  if (!menuContext) {
    throw new Error('MenuItem must be used within a Menu');
  }
  const handleClick = e => {
    if (disabled) {
      return;
    }
    onClick?.({
      key: itemKey,
      keyPath: [itemKey],
      domEvent: e
    });
    menuContext?.onItemClick(itemKey, e);
  };
  return jsxRuntime.jsxs("li", {
    style: style,
    role: "menuitem",
    title: title,
    onClick: handleClick,
    className: clsx([`${prefixCls}-item ${className}`, {
      [`${prefixCls}-item-disabled`]: disabled,
      [`${prefixCls}-item-selected`]: selected,
      [`${prefixCls}-item-danger`]: danger
    }]),
    children: [icon && jsxRuntime.jsx("span", {
      className: `${prefixCls}-item-icon`,
      children: icon
    }), jsxRuntime.jsx("span", {
      className: `${prefixCls}-item-label`,
      children: label
    }), extra && jsxRuntime.jsx("span", {
      className: `${prefixCls}-item-extra`,
      children: extra
    })]
  });
};

const SubMenu = ({
  itemKey,
  title,
  icon,
  children,
  className = '',
  level,
  prefixCls = prefixClsMenu
}) => {
  const menuContext = react.useContext(MenuContext);
  if (!menuContext) {
    throw new Error('MenuItem must be used within a Menu');
  }
  const {
    openKeys,
    toggleOpen,
    triggerSubMenuAction
  } = menuContext;
  const isOpen = openKeys.includes(itemKey);
  const handleClick = react.useCallback(() => {
    if (triggerSubMenuAction === "click") {
      toggleOpen(itemKey, level);
    }
  }, [itemKey, level]);
  const handleHover = react.useCallback(_ => {
    if (triggerSubMenuAction === "hover") {
      toggleOpen(itemKey, level);
    }
  }, [itemKey, level]);
  return jsxRuntime.jsxs("li", {
    className: `${prefixCls}-sub ${className}`,
    ...(triggerSubMenuAction === "hover" ? {
      onMouseEnter: () => handleHover(true),
      onMouseLeave: () => handleHover(false)
    } : {}),
    children: [jsxRuntime.jsxs("div", {
      className: `${prefixCls}-sub-title`,
      onClick: handleClick,
      children: [icon && jsxRuntime.jsx("span", {
        className: `${prefixCls}-sub-icon`,
        children: icon
      }), "\u00A0", jsxRuntime.jsx("span", {
        className: `${prefixCls}-sub-label`,
        children: title
      }), jsxRuntime.jsx("span", {
        className: `${prefixCls}-sub-arrow`,
        children: jsxRuntime.jsx(ArrowIcon, {
          isOpen: isOpen
        })
      })]
    }), !isOpen ? null : jsxRuntime.jsx("ul", {
      className: `${prefixCls}-sub-list`,
      children: children
    })]
  });
};

var css_248z$3 = ".xUi-menu{box-shadow:0 0 4px rgba(0,0,0,.15);font-size:14px;user-select:none}.xUi-menu,.xUi-menu-sub-list{border-radius:4px;display:flex;flex-direction:column;gap:4px;list-style:none;margin:0;padding:4px}.xUi-menu-sub-list{background:var(--xui-background-color);height:max-content}.xUi-menu-item-group{padding:0 24px!important}.xUi-menu-vertical .xUi-menu-sub-list{background-color:#fff;box-shadow:0 0 4px rgba(0,0,0,.15);left:100%;min-width:160px;position:absolute;right:-100%;top:0;width:min-content;z-index:1}.xUi-menu-horizontal{display:flex;flex-direction:row}.xUi-menu-item{align-items:center;border-radius:4px;color:var(--xui-text-color);cursor:pointer;display:flex;height:40px;padding:0 12px;transition:background .3s}.xUi-menu-item:hover{background:rgba(0,0,0,.04)}.xUi-menu-item-icon{margin-right:8px}.xUi-menu-sub{border-radius:6px;position:relative}.xUi-menu-sub-title{align-items:center;cursor:pointer;display:flex;height:40px;padding:0 12px;&:hover{background-color:var(--xui-color-hover);border-radius:6px}}.xUi-menu-sub-label{flex:1}.xUi-menu-sub-arrow{margin-left:8px;transition:transform .2s}.xUi-menu-vertical .xUi-menu-sub-arrow{transform:rotate(-90deg)}.xUi-menu-group{list-style:none;margin:0;padding:0}.xUi-menu-group-title{color:rgba(0,0,0,.45);font-size:12px;padding:8px 12px}.xUi-menu-group-list{list-style:none;margin:0;padding:0}.xUi-menu-divider{border-bottom:1px solid var(--xui-color-disabled);display:block;margin:0 auto;width:calc(100% - 16px)}.xUi-menu-item.xUi-menu-item-disabled{cursor:auto;opacity:.6;&:hover{background-color:unset}}.xUi-menu-inline .xUi-menu-sub-list{background-color:var(--xui-menu-inline-bg)}.xUi-menu-inline .xUi-menu-item{padding:0 24px}.xUi-menu-inline .xUi-menu-sub-title{padding:0 20px}.xUi-menu-inline .xUi-menu-sub-list-sub .xUi-menu-item{padding:0 30px}";
styleInject(css_248z$3);

const MenuContext = /*#__PURE__*/react.createContext(null);
const Menu = ({
  prefixCls = prefixClsMenu,
  className = "",
  style,
  defaultOpenKeys = [],
  defaultSelectedKeys = [],
  openKeys: openKeysProp,
  selectedKeys: selectedKeysProp,
  mode = "vertical",
  multiple = false,
  inlineCollapsed = false,
  inlineIndent = 24,
  triggerSubMenuAction = "hover",
  onClick,
  onSelect,
  onDeselect,
  onOpenChange,
  selectable = true,
  children,
  items
}) => {
  const hasInteracted = react.useRef(false);
  const [openKeys, setOpenKeys] = react.useState(openKeysProp ?? defaultOpenKeys);
  const [selectedKeys, setSelectedKeys] = react.useState(selectedKeysProp ?? defaultSelectedKeys);
  const _triggerSubMenuActionClick = react.useMemo(() => {
    if (mode === 'inline') {
      return "click";
    }
    return triggerSubMenuAction;
  }, [triggerSubMenuAction, mode]);
  const toggleOpen = react.useCallback((key, level) => {
    setOpenKeys(_openKeys => {
      const isOpen = _openKeys?.includes(key);
      const openKeysData = level ? [...(_triggerSubMenuActionClick === 'click' ? level === "2" ? [..._openKeys] : [] : _openKeys), key] : [key];
      const next = [...new Set(isOpen ? _openKeys.filter(k => k !== key) : openKeysData)];
      if (openKeysProp === undefined) {
        _openKeys = next;
      }
      onOpenChange?.(next);
      return _openKeys;
    });
  }, [openKeysProp, hasInteracted, _triggerSubMenuActionClick]);
  const onItemClick = react.useCallback((key, domEvent) => {
    if (!selectable) {
      return;
    }
    let nextSelected = [...(selectedKeys || [])];
    const already = nextSelected.includes(key);
    if (multiple) {
      nextSelected = already ? nextSelected.filter(k => k !== key) : [...nextSelected, key];
    } else {
      nextSelected = [key];
    }
    if (selectedKeysProp === undefined) {
      setSelectedKeys(nextSelected);
    }
    onSelect?.({
      key,
      keyPath: [key],
      selectedKeys: nextSelected
    });
    onClick?.({
      key,
      keyPath: [key],
      domEvent: domEvent
    });
    if (already && multiple) {
      onDeselect?.({
        key,
        keyPath: [key]
      });
    }
  }, [multiple, onClick, onSelect, onDeselect, selectedKeys, selectable, selectedKeysProp]);
  const menuContext = react.useMemo(() => ({
    mode,
    inlineIndent,
    inlineCollapsed,
    selectedKeys: selectedKeys || [],
    openKeys: openKeys || [],
    toggleOpen,
    onItemClick,
    triggerSubMenuAction: _triggerSubMenuActionClick
  }), [mode, inlineIndent, inlineCollapsed, selectedKeys, openKeys, toggleOpen, onItemClick, _triggerSubMenuActionClick]);
  return jsxRuntime.jsx(MenuContext.Provider, {
    value: menuContext,
    children: jsxRuntime.jsx("ul", {
      role: "menu",
      style: style,
      className: `${prefixCls}-${mode} ${prefixCls || ''} ${className || ''}`,
      children: items ? items.map((it, index) => {
        if (it.type === 'divider') {
          return jsxRuntime.jsx("span", {
            className: `${prefixCls}-divider`
          }, `${it.key}_${index}_divider`);
        }
        if (it.type === 'group') {
          return jsxRuntime.jsxs("div", {
            children: [jsxRuntime.jsx(MenuItem, {
              itemKey: it.key,
              label: it.label,
              icon: it.icon,
              className: `${prefixCls}-item-disabled`
            }, `${it.key}_${index}_${it.label}_menu-item`), (it.children || []).map((c, i) => jsxRuntime.jsx(MenuItem, {
              itemKey: c.key,
              label: c.label,
              icon: c.icon,
              className: `${prefixCls}-item-group`
            }, `${c.key}_${i}_menu-item`))]
          }, index + it.key);
        }
        return it.children ? jsxRuntime.jsx(SubMenu, {
          itemKey: it.key,
          title: it.label,
          icon: it.icon,
          level: "1",
          children: it.children.map((c, idx) => {
            if (c.type === 'group') {
              return jsxRuntime.jsxs("div", {
                children: [jsxRuntime.jsx(MenuItem, {
                  itemKey: c.key,
                  label: c.label,
                  icon: c.icon,
                  className: `${prefixCls}-item-disabled`
                }, `${c.key}_${idx}_menu-item`), (c.children || []).map((c, _i) => jsxRuntime.jsx(MenuItem, {
                  itemKey: c.key,
                  label: c.label,
                  icon: c.icon,
                  className: `${prefixCls}-item-group`
                }, `${c.key}_${_i}_menu-item`))]
              }, c.key + idx);
            }
            return c.children ? jsxRuntime.jsx(SubMenu, {
              className: `${prefixCls}-sub-list-sub`,
              itemKey: c.key,
              title: c.label,
              icon: c.icon,
              level: "2",
              children: c.children.map((c, _idx) => jsxRuntime.jsx(MenuItem, {
                itemKey: c.key,
                label: c.label,
                icon: c.icon
              }, `${c.key}_${_idx}_${c.label}_menu-item`))
            }, `${c.key}_${c.label}_${idx}_sub_menu`) : jsxRuntime.jsx(MenuItem, {
              itemKey: c.key,
              label: c.label,
              icon: c.icon
            }, `${index}_${c.key}_${c.label}_menu-item`);
          })
        }, `${it.key}_${it.label}_${index}_sub_menu`) : jsxRuntime.jsx(MenuItem, {
          itemKey: it.key,
          label: it.label,
          icon: it.icon
        }, `${index}_${it.key}_menu-item`);
      }) : children
    })
  });
};
Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;

var css_248z$2 = ".xUi-dropdown-overlay{background:var(--xui-menu-inline-bg);border:1px solid var(--xui-border-color);border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.08);min-width:160px;padding:4px 0;position:absolute;&:before{content:\"\";height:10px;position:absolute;top:-15px;width:100%;z-index:1}}.xUi-dropdown-overlay>div,.xUi-dropdown-overlay>select,.xUi-dropdown-overlay>ul{box-shadow:unset}.xUi-dropdown-overlay .xUi-dropdown-menu{margin:0;padding:0 4px;position:relative;&:before{content:\"\";height:10px;position:absolute;top:-15px;width:100%;z-index:1}}.xUi-dropdown-overlay .xUi-dropdown-item{border-radius:8px;color:var(--xui-text-color);cursor:pointer;font-size:14px;list-style:none;padding:8px 12px;user-select:none}.xUi-dropdown-overlay .xUi-dropdown-item:focus,.xUi-dropdown-overlay .xUi-dropdown-item:hover{background:var(--xui-color-hover);outline:none}.xUi-dropdown-overlay .xUi-dropdown-item.disabled{cursor:not-allowed;opacity:.5}.xUi-dropdown-overlay .xUi-dropdown-item.danger{color:var(--xui-error-color-light);&:hover{background-color:var(--xui-error-color-light);color:var(--xui-background-color)}}.xUi-dropdown-arrow{background:var(--xui-background-color);border-left:.5px solid var(--xui-border-color);border-top:.5px solid var(--xui-border-color);height:10px;left:12px;position:absolute;top:-6px;transform:rotate(45deg);width:10px}.xUi-dropdown-bottomRight .xUi-dropdown-arrow,.xUi-dropdown-right .xUi-dropdown-arrow,.xUi-dropdown-topRight .xUi-dropdown-arrow{left:unset;right:12px}.xUi-dropdown-arrow.bottom{border-bottom:.5px solid var(--xui-border-color);border-left:unset;border-right:.5px solid var(--xui-border-color);border-top:unset;bottom:-6px;top:unset}.xUi-dropdown-arrow.center{left:0;margin:0 auto;right:0}";
styleInject(css_248z$2);

const Dropdown = ({
  children,
  menu,
  open: controlledOpen,
  defaultOpen = false,
  onVisibleChange,
  trigger = 'hover',
  placement = 'bottomLeft',
  overlayClassName = '',
  overlayStyle,
  getPopupContainer,
  destroyOnHidden = false,
  disabled = false,
  arrow = false,
  autoFocus = false,
  popupRender,
  className = '',
  overlay,
  prefixCls = prefixClsDropdown
}) => {
  const [open, setOpen] = react.useState(controlledOpen ?? defaultOpen);
  const [_hover, setHover] = react.useState(controlledOpen ?? defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const triggerRef = react.useRef(null);
  const popupRef = react.useRef(null);
  const menuRef = react.useRef(null);
  const {
    showPlacement,
    dropdownPosition
  } = usePosition({
    popupRef,
    placement,
    offset: 8,
    isOpen: open,
    triggerRef,
    getPopupContainer: getPopupContainer?.(triggerRef.current)
  });
  react.useEffect(() => {
    if (isControlled) {
      setOpen(Boolean(controlledOpen));
      onVisibleChange?.(Boolean(controlledOpen));
    }
  }, [controlledOpen]);
  react.useEffect(() => {
    if (open && autoFocus) {
      requestAnimationFrame(() => {
        const first = menuRef.current?.querySelector("[role='menuitem']:not([aria-disabled='true'])");
        first?.focus();
      });
    }
  }, [open]);
  const setOpenInternal = next => {
    if (disabled) {
      return;
    }
    if (!isControlled) {
      setOpen(next);
    }
    onVisibleChange?.(next);
    onVisibleChange?.(next);
  };
  react.useEffect(() => {
    const handleClick = e => {
      if (!open) {
        return;
      }
      const target = e.target;
      if (triggerRef.current && !triggerRef.current.contains(target) && !popupRef.current?.contains(target)) {
        setOpenInternal(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);
  const triggers = Array.isArray(trigger) ? trigger : [trigger];
  const onTriggerClick = () => {
    if (triggers.includes('click')) {
      setOpenInternal(!open);
    }
  };
  const onTriggerMouseEnter = () => {
    setHover(true);
    if (triggers.includes('hover')) {
      setOpenInternal(true);
    }
  };
  const onTriggerMouseLeave = () => {
    setHover(false);
    if (triggers.includes('hover')) {
      setOpenInternal(false);
    }
  };
  const popup = jsxRuntime.jsx(ConditionalWrapper, {
    condition: getPopupContainer !== undefined,
    wrapper: element => getPopupContainer ? /*#__PURE__*/reactDom.createPortal(element, getPopupContainer(popupRef.current)) : jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: element
    }),
    children: jsxRuntime.jsxs("div", {
      ref: popupRef,
      className: `${prefixCls}-overlay ${prefixCls}-${placement} ${overlayClassName}`,
      style: {
        zIndex: _hover ? 1000 : 0,
        ...overlayStyle,
        ...dropdownPosition
      },
      children: [arrow && jsxRuntime.jsx("div", {
        className: `${prefixCls}-arrow ${showPlacement ? 'bottom' : ''}`
      }), overlay ? typeof overlay === 'function' ? overlay() : overlay : popupRender ? popupRender(menu ? jsxRuntime.jsx(MenuInner, {
        prefixCls: prefixCls,
        items: menu.items,
        menuRef: menuRef,
        onClose: () => setOpenInternal(false)
      }) : jsxRuntime.jsx("div", {
        style: {
          padding: 8
        },
        children: "Empty menu"
      })) : menu ? jsxRuntime.jsx(MenuInner, {
        prefixCls: prefixCls,
        items: menu.items,
        menuRef: menuRef,
        onClose: () => setOpenInternal(false)
      }) : jsxRuntime.jsx("div", {
        style: {
          padding: 8
        },
        children: "Empty menu"
      })]
    })
  });
  return jsxRuntime.jsx("div", {
    ref: triggerRef,
    className: className,
    children: jsxRuntime.jsxs("div", {
      onClick: onTriggerClick,
      onMouseEnter: onTriggerMouseEnter,
      onMouseLeave: onTriggerMouseLeave,
      tabIndex: disabled ? -1 : 0,
      "aria-haspopup": 'menu',
      style: {
        width: 'fit-content'
      },
      "aria-expanded": open,
      children: [children, open && popup, !open && !destroyOnHidden && null]
    })
  });
};
function MenuInner({
  items,
  menuRef,
  onClose,
  prefixCls
}) {
  return jsxRuntime.jsx("ul", {
    className: `${prefixCls}-menu`,
    ref: menuRef,
    role: 'menu',
    children: items.map(it => jsxRuntime.jsx("li", {
      role: 'menuitem',
      tabIndex: it.disabled ? -1 : 0,
      "aria-disabled": it.disabled ?? false,
      onClick: e => {
        if (it.disabled) {
          return;
        }
        it.onClick?.(e);
        onClose();
      },
      className: clsx([`${prefixCls}-item`, {
        'disabled': it.disabled,
        'danger': it.danger
      }]),
      children: it.label ?? it.key
    }, it.key))
  });
}

var css_248z$1 = ".xUi-popover{&:before{content:\"\";height:10px;left:0;position:absolute;top:-10px;width:100%;z-index:10000}}.xUi-popover-wrapper-content{cursor:pointer;max-width:fit-content;width:-webkit-fill-available}.xUi-popover{background:var(--xui-background-color);border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,.15);padding:8px 12px;width:max-content;z-index:1000}.xUi-popover-title{padding:4px}.xUi-popover-inner{color:var(--xui-text-color);font-size:14px}.xUi-popover-arrow{background:var(--xui-background-color);border-left:.5px solid var(--xui-border-color);border-top:.5px solid var(--xui-border-color);height:10px;left:12px;position:absolute;top:-6px;transform:rotate(45deg);width:10px}.xUi-popover-bottomRight .xUi-popover-arrow,.xUi-popover-right .xUi-popover-arrow,.xUi-popover-topRight .xUi-popover-arrow{left:unset;right:12px}.xUi-popover-arrow.bottom{border-bottom:.5px solid var(--xui-border-color);border-left:unset;border-right:.5px solid var(--xui-border-color);border-top:unset;bottom:-6px;top:unset}.xUi-popover-arrow.center{left:0;margin:0 auto;right:0}";
styleInject(css_248z$1);

const Popover = ({
  prefixCls = prefixClsPopover,
  content,
  children,
  trigger = "click",
  placement = "bottom",
  open,
  visible,
  title,
  style = {},
  overlayClassName = '',
  overlayStyle = {},
  onVisibleChange,
  getPopupContainer
}) => {
  const triggerRef = react.useRef(null);
  const popupRef = react.useRef(null);
  const [innerOpen, setInnerOpen] = react.useState(false);
  const isOpen = visible !== undefined ? visible : open !== undefined ? open : innerOpen;
  const {
    dropdownPosition,
    showPlacement
  } = usePosition({
    isOpen,
    offset: 10,
    popupRef,
    placement,
    triggerRef,
    getPopupContainer: getPopupContainer?.(triggerRef.current)
  });
  react.useEffect(() => {
    const handleClickOutside = e => {
      if (popupRef.current && !popupRef.current.contains(e.target) && triggerRef.current && !triggerRef.current.contains(e.target)) {
        setInnerOpen(false);
        onVisibleChange?.(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleOnClick = react.useCallback(() => {
    const newState = !isOpen;
    onVisibleChange?.(newState);
    setInnerOpen(newState);
  }, [isOpen, trigger]);
  const handleOnMouseEnter = react.useCallback(() => {
    if (trigger === "hover") {
      onVisibleChange?.(true);
      setInnerOpen(true);
    }
  }, [trigger]);
  const handleOnMouseLeave = react.useCallback(() => {
    if (trigger === "hover") {
      onVisibleChange?.(false);
      setInnerOpen(false);
    }
  }, [trigger]);
  const childProps = react.useMemo(() => trigger === "click" ? {
    onClick: handleOnClick
  } : {
    onMouseEnter: handleOnMouseEnter,
    onMouseLeave: handleOnMouseLeave
  }, [trigger]);
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [react.Children.map(children, (child, index) => {
      if (! /*#__PURE__*/react.isValidElement(child)) {
        child = jsxRuntime.jsx("div", {
          children: child
        });
      }
      return /*#__PURE__*/react.cloneElement(child, {
        key: index,
        ...(index === 0 ? {
          style,
          ...childProps,
          ref: triggerRef,
          className: `${prefixCls}-wrapper-content`
        } : {})
      });
    }), isOpen && jsxRuntime.jsx(ConditionalWrapper, {
      condition: !!getPopupContainer,
      wrapper: element => getPopupContainer ? /*#__PURE__*/reactDom.createPortal(element, getPopupContainer(popupRef.current)) : jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: element
      }),
      children: jsxRuntime.jsxs("div", {
        ref: popupRef,
        ...childProps,
        className: clsx(prefixCls, `${prefixCls}-${placement}`, overlayClassName),
        style: {
          zIndex: 1000,
          position: "absolute",
          ...overlayStyle,
          ...dropdownPosition
        },
        children: [title && jsxRuntime.jsx("div", {
          className: `${prefixCls}-title`,
          children: title
        }), jsxRuntime.jsx("div", {
          className: `${prefixCls}-inner`,
          children: content
        }), jsxRuntime.jsx("div", {
          className: `${prefixCls}-arrow ${showPlacement}`
        })]
      })
    })]
  });
};

var css_248z = ".xUi-result{background:var(--xui-result-bg);border-radius:var(--xui-border-radius-lg);box-sizing:border-box;color:var(--xui-result-color);flex-direction:column;gap:var(--xui-gap);margin:0 auto;max-width:var(--xui-max-width);padding:var(--xui-padding);text-align:center}.xUi-result,.xUi-result-icon{align-items:center;display:flex}.xUi-result-icon{border-radius:50%;font-size:32px;height:var(--xui-icon-size);justify-content:center;line-height:1;width:var(--xui-icon-size)}.xUi-result-icon.xUi-result-icon-success{background:#f6ffed;border:1px solid #b7eb8f;color:#52c41a}.xUi-result-icon.xUi-result-icon-error{background:#fff2f0;border:1px solid #ffccc7;color:#ff4d4f}.xUi-result-icon.xUi-result-icon-info{background:#e6f7ff;border:1px solid #91d5ff;color:#1890ff}.xUi-result-icon.xUi-result-icon-warning{background:#fffbe6;border:1px solid #ffe58f;color:#faad14}.xUi-result>.xUi-result-icon:not(.xUi-result-icon-success):not(.xUi-result-icon-error):not(.xUi-result-icon-info):not(.xUi-result-icon-warning){background:transparent;border-radius:0;height:auto;width:auto}.xUi-result-title{color:var(--xui-result-color);font-family:var(--xui-font-family);font-size:24px;font-weight:600;margin-top:4px}.xUi-result-subtitle{color:var(--xui-subtle-color);font-family:var(--xui-font-family);font-size:14px;margin-top:6px;max-width:100%}.xUi-result-extra{align-items:center;display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:12px}.xUi-result-content{margin-top:12px;width:100%}.xUi-result-success{--xui-accent:#52c41a}.xUi-result-error{--xui-accent:#ff4d4f}.xUi-result-info{--xui-accent:#1890ff}.xUi-result-warning{--xui-accent:#faad14}.xUi-result-403 .xUi-result-icon,.xUi-result-404 .xUi-result-icon,.xUi-result-500 .xUi-result-icon{align-items:center;background:none;border-radius:8px;color:var(--xui-subtle-color);display:flex;font-size:48px;height:110px;justify-content:center;width:160px}@media (max-width:480px){.xUi-result{gap:12px;padding:16px}.xUi-result-title{font-size:18px}.xUi-result-icon{font-size:24px;height:56px;width:56px}.xUi-result-403 .xUi-result-icon,.xUi-result-404 .xUi-result-icon,.xUi-result-500 .xUi-result-icon{font-size:40px;height:84px;width:120px}}.xUi-result-extra :is(button,a){outline:none;text-decoration:none}.xUi-result-extra :is(button,a):focus{border-radius:6px;box-shadow:0 0 0 3px rgba(24,144,255,.12)}.xUi-result-center{align-items:center;display:flex;justify-content:center}.xUi-result-bordered{border:1px solid rgba(0,0,0,.06)}.xUi-result[data-bg]{background:var(--xui-result-bg)}.xUi-result.full-width{max-width:100%}.xUi-result-extra .xUi-btn{background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:6px;cursor:pointer;padding:6px 14px}.xUi-result-extra .xUi-btn:hover{box-shadow:0 1px 2px rgba(0,0,0,.04)}";
styleInject(css_248z);

const Result = ({
  icon,
  status = "info",
  title,
  subTitle,
  extra,
  prefixCls = prefixClsResult,
  className = "",
  style,
  children
}) => {
  const renderIcon = () => {
    if (icon) {
      return jsxRuntime.jsx("div", {
        className: `${prefixCls}-icon`,
        children: icon
      });
    }
    return jsxRuntime.jsx("div", {
      className: `${prefixCls}-icon`,
      children: renderDefaultIcon(status)
    });
  };
  return jsxRuntime.jsxs("div", {
    className: `${prefixCls} ${prefixCls}-${status} ${className}`,
    style: style,
    children: [renderIcon(), title && jsxRuntime.jsx("div", {
      className: `${prefixCls}-title`,
      children: title
    }), subTitle && jsxRuntime.jsx("div", {
      className: `${prefixCls}-subtitle`,
      children: subTitle
    }), extra && jsxRuntime.jsx("div", {
      className: `${prefixCls}-extra`,
      children: extra
    }), children && jsxRuntime.jsx("div", {
      className: `${prefixCls}-content`,
      children: children
    })]
  });
};

const useWatch = ({
  name,
  defaultValue,
  form
}) => {
  const formContext = react.useContext(FormContext);
  const formInstance = form || formContext;
  if (!formInstance) {
    throw new Error('useWatch must be used within a Form or with a form instance.');
  }
  const [value, setValue] = react.useState(() => {
    return name ? formInstance.getFieldValue(name) ?? defaultValue : formInstance.getFieldsValue() ?? defaultValue;
  });
  react.useEffect(() => {
    if (!name) {
      const unsubscribe = formInstance.subscribeToForm(setValue);
      return () => unsubscribe();
    }
    const unsubscribe = formInstance.subscribeToField(name, setValue);
    return () => unsubscribe();
  }, [name, formInstance]);
  return value;
};

exports.ArrowIcon = ArrowIcon;
exports.Button = ButtonComponent;
exports.CalendarIcon = CalendarIcon;
exports.CheckIcon = CheckIcon;
exports.Checkbox = Checkbox;
exports.ClearIcon = ClearIcon;
exports.DateDistanceIcon = DateDistanceIcon;
exports.DatePicker = DatePicker;
exports.Dropdown = Dropdown;
exports.Empty = EmptyContent;
exports.ErrorIcon = ErrorIcon;
exports.Form = Form;
exports.FormContext = FormContext;
exports.FormItem = FormItem;
exports.Input = Input;
exports.LoadingIcon = LoadingIcon;
exports.Menu = Menu;
exports.MenuItem = MenuItem;
exports.MenuSubMenu = SubMenu;
exports.Option = Option;
exports.Popover = Popover;
exports.Radio = Radio;
exports.RadioButton = RadioButton;
exports.RadioGroup = RadioGroup;
exports.RangePicker = RangePicker;
exports.Result = Result;
exports.SearchIcon = SearchIcon;
exports.Select = Select;
exports.Skeleton = Skeleton;
exports.SkeletonAvatar = SkeletonAvatar;
exports.SkeletonButton = SkeletonButton;
exports.SkeletonImage = SkeletonImage;
exports.SkeletonInput = SkeletonInput;
exports.SpinerIcon = SpinerIcon;
exports.StampleIcon = StampleIcon;
exports.SuccessIcon = SuccessIcon;
exports.Switch = Switch;
exports.Tag = Tag;
exports.Textarea = Textarea;
exports.TimeIcon = TimeIcon;
exports.TimePicker = TimePicker;
exports.TrashIcon = TrashIcon;
exports.Upload = Upload;
exports.clsx = clsx;
exports.createArray = createArray;
exports.flattenChildren = flattenChildren;
exports.parseValue = parseValue;
exports.useForm = useForm;
exports.useWatch = useWatch;
//# sourceMappingURL=index.js.map
