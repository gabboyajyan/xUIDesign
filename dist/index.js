'use strict';

var React$1 = require('react');

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

var css_248z$4 = ":root{--xui-color-hover:#f5f5f5;--xui-color-disabled:#e6e6e6;--xui-primary-color:#1677ff;--xui-primary-color-light:#40a9ff;--xui-text-color:rgba(0,0,0,.88);--xui-text-color-light:rgba(0,0,0,.5);--xui-error-color:#ff4d4f;--xui-error-color-light:#ff6668;--xui-success-color:#52c41a;--xui-background-color:#fff;--xui-font-size-xs:12px;--xui-font-size-sm:14px;--xui-font-size-md:14px;--xui-font-size-lg:16px;--xui-border-radius-sm:4px;--xui-border-radius-md:4px;--xui-border-radius-lg:6px;--xui-border-color:#d9d9d9;--xui-select-primary-color:var(--xui-primary-color);--xui-select-background-color:var(--xui-background-color)}html{font-family:sans-serif}.globalEllipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
styleInject(css_248z$4);

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

const prefixClsForm = 'xUi-form';
const prefixClsFormItem = 'xUi-form-item';
const prefixClsEmpty = 'xUi-empty';
const prefixClsCheckbox = 'xUi-checkbox';
const prefixClsButton = 'xUi-button';

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

var css_248z$3 = ".xUi-form-item{display:flex;margin-bottom:10px;position:relative}.xUi-form-item.noStyle{display:inline-flex;margin-bottom:0}.xUi-form-item-label{align-items:center;color:var(--xui-text-color);display:flex;font-size:var(--xui-font-size-md);font-weight:500;line-height:20px;margin-bottom:4px}.xUi-form-item-error{bottom:-6px;color:var(--xui-error-color);font-size:var(--xui-font-size-xs);line-height:16px;position:absolute;right:0;user-select:none}.xUi-form-item-required{color:var(--xui-error-color);display:inline-block;font-size:var(--xui-font-size-md);line-height:1;margin-left:4px;margin-right:4px}.xUi-form-item.horizontal{align-items:center;flex-direction:row;gap:4px}.xUi-form-item.vertical{align-self:flex-start;flex-direction:column}.xUi-form-item .xUi-input-container{margin-bottom:12px!important;width:-webkit-fill-available}.xUi-form-item .xUi-datepicker-container{margin-bottom:10px}";
styleInject(css_248z$3);

const REF_CLIENT_HEIGHT = 24;
const FormItemClient = ({
  prefixCls = prefixClsFormItem,
  name,
  label,
  rules = [],
  children,
  className = '',
  layout = 'vertical',
  style = {},
  valuePropName,
  dependencies = [],
  initialValue,
  feedbackIcons,
  ...props
}) => {
  const formContext = React$1.useContext(FormContext);
  const errorRef = React$1.useRef(null);
  if (!formContext) {
    throw new Error('FormItem must be used within a Form');
  }
  const {
    isReseting,
    registerField,
    getFieldError,
    getFieldValue,
    setFieldValue,
    getFieldInstance,
    subscribeToFields,
    validateFields
  } = formContext;
  const childrenList = React$1.useMemo(() => (Array.isArray(children) ? children : [children]).filter(Boolean), [children]);
  React$1.useEffect(() => {
    if (name && !getFieldInstance(name)) {
      registerField(name, rules);
    }
  }, [name, rules]);
  React$1.useEffect(() => {
    if (initialValue) {
      setFieldValue(name, initialValue);
    }
  }, []);
  React$1.useEffect(() => {
    if (name && dependencies.length > 0) {
      const unsubscribe = subscribeToFields(dependencies, () => {
        validateFields([name]);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [dependencies, name]);
  React$1.useEffect(() => {
    if (errorRef.current && errorRef.current?.clientHeight >= REF_CLIENT_HEIGHT) {
      errorRef.current.style.position = 'relative';
      errorRef.current.style.marginTop = '-16px';
    }
  }, [errorRef.current]);
  const isRequired = React$1.useMemo(() => rules.some(rule => rule.required), [rules]);
  const errorMessage = getFieldError(valuePropName || name)?.[0];
  return /*#__PURE__*/React.createElement("div", {
    style: style,
    className: clsx([`${prefixCls}`, {
      [layout]: layout,
      [className]: className,
      noStyle: props.noStyle
    }])
  }, !props.noStyle && (label || name) && /*#__PURE__*/React.createElement("label", {
    className: `${prefixCls}-label`,
    htmlFor: name
  }, label || name, ":", isRequired && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-required`
  }, "*")), React$1.Children.map(childrenList, (child, key) => {
    if (/*#__PURE__*/React$1.isValidElement(child) && child.type !== React$1.Fragment) {
      const {
        value,
        ...childProps
      } = child.props;
      const fieldValue = getFieldValue(valuePropName || name) ?? initialValue;
      return /*#__PURE__*/React.createElement(FormItemChildComponent, _extends({}, childProps, {
        name: name,
        child: child,
        value: value,
        fieldValue: fieldValue,
        noStyle: props.noStyle,
        normalize: props.normalize,
        key: `${key}_${isReseting}`,
        error: Boolean(errorMessage),
        setFieldValue: setFieldValue,
        valuePropName: valuePropName,
        feedbackIcons: feedbackIcons
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ,
        size: childProps.size || props.size
      }));
    }
    return child;
  }), !props.noStyle && errorMessage && /*#__PURE__*/React.createElement("span", {
    ref: errorRef,
    className: `${prefixCls}-error`
  }, errorMessage));
};
const FormItemChildComponent = ({
  child,
  name,
  error,
  fieldValue,
  setFieldValue,
  onChange,
  valuePropName,
  normalize,
  ...props
}) => {
  const formContext = React$1.useContext(FormContext);
  const [wasNormalize, setWasNormalize] = React$1.useState(false);
  const {
    getFieldsValue
  } = formContext || {};
  const handleChange = (e, option) => {
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
    setFieldValue(valuePropName || name, rawValue);
    onChange?.(e, option);
  };
  return /*#__PURE__*/React.createElement(child.type, _extends({}, props, {
    name: name,
    onChange: handleChange
  }, error ? {
    error
  } : {}, {
    key: `${name}_${wasNormalize}`,
    value: fieldValue ?? props.value
  }));
};
FormItemClient.displayName = 'FormItemClient';

const FormItem = ({
  prefixCls = prefixClsFormItem,
  name,
  label,
  rules = [],
  children,
  className = '',
  layout = 'vertical',
  style = {},
  valuePropName,
  dependencies = [],
  initialValue,
  feedbackIcons,
  ...props
}) => {
  return /*#__PURE__*/React.createElement(FormItemClient, _extends({
    prefixCls: prefixCls,
    name: name,
    label: label,
    rules: rules,
    className: className,
    layout: layout,
    style: style,
    valuePropName: valuePropName,
    dependencies: dependencies,
    initialValue: initialValue,
    feedbackIcons: feedbackIcons
  }, props), children);
};
FormItem.displayName = 'FormItem';

const useForm = (initialValues = {}, onFieldsChange, onValuesChange) => {
  const touchedFieldsRef = React$1.useRef(new Set());
  const rulesRef = React$1.useRef({});
  const warningsRef = React$1.useRef({});
  const formRef = React$1.useRef({
    ...initialValues
  });
  const fieldInstancesRef = React$1.useRef({});
  const [isReseting, setIsReseting] = React$1.useState(false);
  const [errors, setErrors] = React$1.useState({});
  const fieldSubscribers = React$1.useRef({});
  const formSubscribers = React$1.useRef([]);
  function getFieldInstance(name) {
    return fieldInstancesRef.current[name] || null;
  }
  function getFieldValue(name) {
    return formRef.current[name];
  }
  function getFieldsValue(nameList) {
    if (!nameList) {
      return {
        ...formRef.current
      };
    }
    return nameList.reduce((acc, key) => {
      acc[key] = formRef.current[key];
      return acc;
    }, {});
  }
  function getFieldError(name) {
    return errors[name] || [];
  }
  function getFieldWarning(name) {
    return warningsRef.current[name] || [];
  }
  function getFieldsError() {
    return Object.entries(errors).map(([name, err]) => ({
      name,
      errors: err
    }));
  }
  function setFieldValue(name, value, errors, reset) {
    if (!reset && ([undefined, null].includes(value) || formRef.current[name] === value)) {
      return;
    }
    formRef.current[name] = value;
    touchedFieldsRef.current.add(name);
    if (!errors?.length) {
      validateField(name).then(() => {
        const allValues = getFieldsValue();
        fieldSubscribers.current[name]?.forEach(callback => callback(value));
        formSubscribers.current.forEach(callback => callback(allValues));
        if (onValuesChange) {
          onValuesChange({
            [name]: value
          }, allValues);
        }
        if (onFieldsChange) {
          onFieldsChange([{
            name,
            value
          }]);
        }
      });
    } else {
      setErrors({
        [name]: errors
      });
    }
  }
  function setFieldsValue(values) {
    Object.entries(values).forEach(([name, value]) => setFieldValue(name, value));
  }
  function setFields(fields) {
    fields.forEach(({
      name,
      value,
      errors
    }) => setFieldValue(Array.isArray(name) ? name[0] : name, value, errors));
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
  function registerField(name, rules = []) {
    if (!(name in formRef.current)) {
      formRef.current[name] = initialValues?.[name];
    }
    rulesRef.current[name] = rules;
  }
  async function validateField(name) {
    const value = formRef.current[name];
    const rules = rulesRef.current[name] || [];
    const fieldErrors = [];
    const fieldWarnings = [];
    await Promise.all([rules].flat(1).map(async rule => {
      rule = typeof rule === 'function' ? rule(formInstance) : rule;
      if (rule.required && (value === undefined || value === null || value === '' || Array.isArray(value) && !value.length)) {
        fieldErrors.push(rule.message || 'This field is required');
      }
      if ((typeof value === 'string' || typeof value === 'number' || Array.isArray(value)) && rule.min !== undefined && String(value).length < rule.min) {
        fieldErrors.push(rule.message || `Must be at least ${rule.min} characters`);
      }
      if ((typeof value === 'string' || typeof value === 'number' || Array.isArray(value)) && rule.max !== undefined && String(value).length > rule.max) {
        fieldErrors.push(rule.message || `Must be at most ${rule.max} characters`);
      }
      if (rule.pattern && !rule.pattern.test(String(value))) {
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
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors
    }));
    warningsRef.current[name] = fieldWarnings;
    return fieldErrors.length === 0;
  }
  async function validateFields(nameList) {
    const fieldsToValidate = nameList || Object.keys(formRef.current);
    const results = await Promise.all(fieldsToValidate.map(name => validateField(name)));
    return results.every(valid => valid);
  }
  function resetFields(nameList) {
    if (nameList?.length) {
      nameList.forEach(name => {
        formRef.current[name] = initialValues[name];
        touchedFieldsRef.current.delete(name);
        delete warningsRef.current[name];
        setErrors(prev => ({
          ...prev,
          [name]: []
        }));
        setFieldValue(name, initialValues[name], undefined, true);
      });
    } else {
      touchedFieldsRef.current.clear();
      warningsRef.current = {};
      Object.keys(formRef.current).forEach(name => {
        setFieldValue(name, initialValues[name], undefined, true);
      });
    }
    formSubscribers.current.forEach(callback => callback(getFieldsValue()));
    setIsReseting(prev => !prev);
  }
  async function submit() {
    return (await validateFields()) ? formRef.current : undefined;
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
    isFieldsTouched,
    getFieldWarning,
    isFieldValidating,
    subscribeToField,
    subscribeToForm,
    onFieldsChange,
    onValuesChange,
    getFieldInstance,
    subscribeToFields,
    isReseting
  };
  return formInstance;
};

const FormClient = ({
  children,
  form,
  style = {},
  prefixCls,
  className = '',
  onFinish,
  onFinishFailed,
  initialValues = {},
  onValuesChange,
  onFieldsChange,
  layout = 'horizontal',
  onSubmitCapture,
  ...rest
}) => {
  const internalForm = useForm(initialValues, onFieldsChange, onValuesChange);
  const formInstance = form || internalForm;
  const formRef = React$1.useRef(null);
  const handleSubmit = async e => {
    e.preventDefault();
    if (await formInstance.validateFields()) {
      onFinish?.(formInstance.getFieldsValue());
    } else if (onFinishFailed) {
      const errorFields = formInstance.getFieldsError();
      onFinishFailed({
        values: formInstance.getFieldsValue(),
        errorFields
      });
    }
  };
  const childrenList = React$1.useMemo(() => (Array.isArray(children) ? children : [children]).filter(Boolean), [children]);
  React$1.useEffect(() => {
    if (onFieldsChange) {
      formInstance.onFieldsChange = onFieldsChange;
    }
    if (onValuesChange) {
      formInstance.onValuesChange = onValuesChange;
    }
  }, [formInstance, onFieldsChange, onValuesChange]);
  return /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: formInstance
  }, /*#__PURE__*/React.createElement("form", _extends({
    style: style,
    ref: formRef,
    onSubmit: handleSubmit
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ,
    onSubmitCapture: onSubmitCapture,
    className: `${prefixCls} ${className}`
  }, rest), React$1.Children.map(childrenList, child => {
    if (/*#__PURE__*/React$1.isValidElement(child) && child.type !== React$1.Fragment) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const {
        ...childProps
      } = child.props;
      return /*#__PURE__*/React.createElement(child.type, _extends({}, childProps, {
        child: child,
        size: childProps.size || rest.size,
        layout: childProps.layout || layout
      }));
    }
    return child;
  })));
};

const FormContext = /*#__PURE__*/React$1.createContext(null);
const Form = ({
  children,
  style = {},
  prefixCls = prefixClsForm,
  className = '',
  layout = 'horizontal',
  ...rest
}) => {
  return /*#__PURE__*/React.createElement(FormClient, _extends({
    style: style,
    prefixCls: prefixCls,
    className: className,
    layout: layout
  }, rest), children);
};
Form.Item = FormItem;

var css_248z$2 = ".xUi-empty{align-items:center;display:grid;gap:4px;justify-content:center;padding:14px}.xUi-empty-description{color:var(--xui-text-color);font-size:var(--xui-font-size-md);text-align:center}";
styleInject(css_248z$2);

const EmptyContent = ({
  icon,
  style = {},
  className = '',
  title = 'No Data',
  description = 'No data',
  prefixCls = prefixClsEmpty
}) => /*#__PURE__*/React.createElement("div", {
  style: style,
  className: `${prefixCls} ${prefixCls}-normal ${prefixCls}-small ${className}`
}, /*#__PURE__*/React.createElement("div", {
  className: `${prefixCls}-image`
}, icon || /*#__PURE__*/React.createElement("svg", {
  width: "64",
  height: "41",
  viewBox: "0 0 64 41",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("title", null, title), /*#__PURE__*/React.createElement("g", {
  transform: "translate(0 1)",
  fill: "none"
}, /*#__PURE__*/React.createElement("ellipse", {
  fill: "#f5f5f5",
  cx: "32",
  cy: "33",
  rx: "32",
  ry: "7"
}), /*#__PURE__*/React.createElement("g", {
  stroke: "#d9d9d9"
}, /*#__PURE__*/React.createElement("path", {
  d: "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
  fill: "#fafafa"
}))))), /*#__PURE__*/React.createElement("div", {
  className: `${prefixCls}-description`
}, description));

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
  const content = /*#__PURE__*/React$1.createElement(React$1.Fragment, null, iconNode && iconPosition === 'start' && /*#__PURE__*/React$1.createElement("span", {
    className: clsx(`${prefixCls}-icon`, customClassNames.icon),
    style: styles.icon
  }, iconNode), /*#__PURE__*/React$1.createElement("span", {
    className: `${prefixCls}-content`
  }, children), iconNode && iconPosition === 'end' && /*#__PURE__*/React$1.createElement("span", {
    className: clsx(`${prefixCls}-icon`, customClassNames.icon),
    style: styles.icon
  }, iconNode));
  if (href) {
    return /*#__PURE__*/React$1.createElement("a", {
      className: classes,
      href: mergedDisabled ? undefined : href,
      "aria-disabled": mergedDisabled
    }, content);
  }
  return /*#__PURE__*/React$1.createElement("button", _extends({
    type: htmlType,
    className: classes,
    disabled: mergedDisabled
  }, restProps), content);
};

var css_248z = ".xUi-checkbox-wrapper{align-items:center;color:var(--xui-main-color);cursor:pointer;display:inline-flex;font-size:var(--xui-font-size-md);margin:16px 0}.xUi-checkbox{background-color:transparent;border:1px solid var(--xui-border-color);border-radius:var(--xui-border-radius-sm);display:inline-block;height:14px;position:relative;transition:all .3s;width:14px}.xUi-checkbox.xUi-checkbox-checked{background-color:#f0f5ff;border-color:var(--xui-primary-color)}.xUi-checkbox input{cursor:pointer;inset:0;opacity:0;position:absolute}.xUi-checkbox-inner{border-left:0;border-top:0;border:2px solid var(--xui-background-color);height:6px;left:50%;position:absolute;top:50%;transform:rotate(45deg) scale(0);transition:transform .2s ease-in-out;width:10px}.xUi-checkbox-check{background-color:var(--xui-primary-color);border-color:var(--xui-primary-color);display:block;height:100%;position:relative;transition:.1s ease;width:100%}.xUi-checkbox-check:after{border:solid #fff;border-width:0 2px 2px 0;content:\"\";height:8px;left:3px;position:absolute;top:1px;transform:rotate(45deg);width:5px}.xUi-checkbox-disabled,.xUi-checkbox-disabled .xUi-checkbox-check{background-color:var(--xui-color-disabled);border-color:var(--xui-border-color)!important;cursor:not-allowed;opacity:.5}.xUi-checkbox-label{font-size:14px;margin-left:8px;user-select:none}.xUi-checkbox:focus:not(.disabled),.xUi-checkbox:hover:not(.disabled){border-color:var(--xui-primary-color);cursor:pointer}.xUi-checkbox.disabled{cursor:not-allowed;opacity:.5}";
styleInject(css_248z);

const CheckboxClient = /*#__PURE__*/React$1.forwardRef(({
  prefixCls,
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
  noStyle
}, ref) => {
  const isChecked = checked !== undefined ? checked : defaultChecked || value;
  const [internalChecked, setInternalChecked] = React$1.useState(isChecked);
  const handleClick = e => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    setInternalChecked(!internalChecked);
    e.target.value = !internalChecked;
    onClick?.(e);
    onChange?.(e);
  };
  React$1.useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);
  return /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-wrapper`
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: style,
    onClick: handleClick,
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
CheckboxClient.displayName = 'CheckboxClient';

const Checkbox = ({
  prefixCls = prefixClsCheckbox,
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
  noStyle
}) => {
  return /*#__PURE__*/React.createElement(CheckboxClient, {
    prefixCls: prefixCls,
    className: className,
    defaultChecked: defaultChecked,
    checked: checked,
    style: style,
    disabled: disabled,
    onChange: onChange,
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onKeyPress: onKeyPress,
    onKeyDown: onKeyDown,
    tabIndex: tabIndex,
    name: name,
    id: id,
    autoFocus: autoFocus,
    type: type,
    value: value,
    required: required,
    noStyle: noStyle
  }, children);
};
Checkbox.displayName = 'Checkbox';

const useWatch = ({
  name,
  defaultValue,
  form
}) => {
  const formContext = React$1.useContext(FormContext);
  const formInstance = form || formContext;
  if (!formInstance) {
    throw new Error('useWatch must be used within a Form or with a form instance.');
  }
  const [value, setValue] = React$1.useState(() => {
    return name ? formInstance.getFieldValue(name) ?? defaultValue : formInstance.getFieldsValue() ?? defaultValue;
  });
  React$1.useEffect(() => {
    if (!name) {
      const unsubscribe = formInstance.subscribeToForm(setValue);
      return () => unsubscribe();
    }
    const unsubscribe = formInstance.subscribeToField(name, setValue);
    return () => unsubscribe();
  }, [name, formInstance]);
  return value;
};

exports.Button = Button;
exports.Checkbox = Checkbox;
exports.Empty = EmptyContent;
exports.Form = Form;
exports.FormItem = FormItem;
exports.useForm = useForm;
exports.useWatch = useWatch;
//# sourceMappingURL=index.js.map
