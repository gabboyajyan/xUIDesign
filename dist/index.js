'use strict';

var require$$1$1 = require('react/jsx-runtime');
var require$$1 = require('react');

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var dynamic$2 = {exports: {}};

var _interop_require_default$1 = {};

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
_interop_require_default$1._ = _interop_require_default;

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var loadable_sharedRuntime = {};

var loadableContext_sharedRuntime = {};

var hasRequiredLoadableContext_sharedRuntime;
function requireLoadableContext_sharedRuntime() {
  if (hasRequiredLoadableContext_sharedRuntime) return loadableContext_sharedRuntime;
  hasRequiredLoadableContext_sharedRuntime = 1;
  (function (exports) {
    'use client';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "LoadableContext", {
      enumerable: true,
      get: function () {
        return LoadableContext;
      }
    });
    const _interop_require_default = _interop_require_default$1;
    const _react = /*#__PURE__*/_interop_require_default._(require$$1);
    const LoadableContext = _react.default.createContext(null);
    if (process.env.NODE_ENV !== 'production') {
      LoadableContext.displayName = 'LoadableContext';
    }
  })(loadableContext_sharedRuntime);
  return loadableContext_sharedRuntime;
}

var hasRequiredLoadable_sharedRuntime;
function requireLoadable_sharedRuntime() {
  if (hasRequiredLoadable_sharedRuntime) return loadable_sharedRuntime;
  hasRequiredLoadable_sharedRuntime = 1;
  (function (exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function () {
        return _default;
      }
    });
    const _interop_require_default = _interop_require_default$1;
    const _react = /*#__PURE__*/_interop_require_default._(require$$1);
    const _loadablecontextsharedruntime = requireLoadableContext_sharedRuntime();
    function resolve(obj) {
      return obj && obj.default ? obj.default : obj;
    }
    const ALL_INITIALIZERS = [];
    const READY_INITIALIZERS = [];
    let initialized = false;
    function load(loader) {
      let promise = loader();
      let state = {
        loading: true,
        loaded: null,
        error: null
      };
      state.promise = promise.then(loaded => {
        state.loading = false;
        state.loaded = loaded;
        return loaded;
      }).catch(err => {
        state.loading = false;
        state.error = err;
        throw err;
      });
      return state;
    }
    function createLoadableComponent(loadFn, options) {
      let opts = Object.assign({
        loader: null,
        loading: null,
        delay: 200,
        timeout: null,
        webpack: null,
        modules: null
      }, options);
      /** @type LoadableSubscription */
      let subscription = null;
      function init() {
        if (!subscription) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          const sub = new LoadableSubscription(loadFn, opts);
          subscription = {
            getCurrentValue: sub.getCurrentValue.bind(sub),
            subscribe: sub.subscribe.bind(sub),
            retry: sub.retry.bind(sub),
            promise: sub.promise.bind(sub)
          };
        }
        return subscription.promise();
      }
      // Server only
      if (typeof window === 'undefined') {
        ALL_INITIALIZERS.push(init);
      }
      // Client only
      if (!initialized && typeof window !== 'undefined') {
        // require.resolveWeak check is needed for environments that don't have it available like Jest
        const moduleIds = opts.webpack && typeof commonjsRequire.resolveWeak === 'function' ? opts.webpack() : opts.modules;
        if (moduleIds) {
          READY_INITIALIZERS.push(ids => {
            for (const moduleId of moduleIds) {
              if (ids.includes(moduleId)) {
                return init();
              }
            }
          });
        }
      }
      function useLoadableModule() {
        init();
        const context = _react.default.useContext(_loadablecontextsharedruntime.LoadableContext);
        if (context && Array.isArray(opts.modules)) {
          opts.modules.forEach(moduleName => {
            context(moduleName);
          });
        }
      }
      function LoadableComponent(props, ref) {
        useLoadableModule();
        const state = _react.default.useSyncExternalStore(subscription.subscribe, subscription.getCurrentValue, subscription.getCurrentValue);
        _react.default.useImperativeHandle(ref, () => ({
          retry: subscription.retry
        }), []);
        return _react.default.useMemo(() => {
          if (state.loading || state.error) {
            return /*#__PURE__*/_react.default.createElement(opts.loading, {
              isLoading: state.loading,
              pastDelay: state.pastDelay,
              timedOut: state.timedOut,
              error: state.error,
              retry: subscription.retry
            });
          } else if (state.loaded) {
            return /*#__PURE__*/_react.default.createElement(resolve(state.loaded), props);
          } else {
            return null;
          }
        }, [props, state]);
      }
      LoadableComponent.preload = () => init();
      LoadableComponent.displayName = 'LoadableComponent';
      return /*#__PURE__*/_react.default.forwardRef(LoadableComponent);
    }
    class LoadableSubscription {
      promise() {
        return this._res.promise;
      }
      retry() {
        this._clearTimeouts();
        this._res = this._loadFn(this._opts.loader);
        this._state = {
          pastDelay: false,
          timedOut: false
        };
        const {
          _res: res,
          _opts: opts
        } = this;
        if (res.loading) {
          if (typeof opts.delay === 'number') {
            if (opts.delay === 0) {
              this._state.pastDelay = true;
            } else {
              this._delay = setTimeout(() => {
                this._update({
                  pastDelay: true
                });
              }, opts.delay);
            }
          }
          if (typeof opts.timeout === 'number') {
            this._timeout = setTimeout(() => {
              this._update({
                timedOut: true
              });
            }, opts.timeout);
          }
        }
        this._res.promise.then(() => {
          this._update({});
          this._clearTimeouts();
        }).catch(_err => {
          this._update({});
          this._clearTimeouts();
        });
        this._update({});
      }
      _update(partial) {
        this._state = {
          ...this._state,
          error: this._res.error,
          loaded: this._res.loaded,
          loading: this._res.loading,
          ...partial
        };
        this._callbacks.forEach(callback => callback());
      }
      _clearTimeouts() {
        clearTimeout(this._delay);
        clearTimeout(this._timeout);
      }
      getCurrentValue() {
        return this._state;
      }
      subscribe(callback) {
        this._callbacks.add(callback);
        return () => {
          this._callbacks.delete(callback);
        };
      }
      constructor(loadFn, opts) {
        this._loadFn = loadFn;
        this._opts = opts;
        this._callbacks = new Set();
        this._delay = null;
        this._timeout = null;
        this.retry();
      }
    }
    function Loadable(opts) {
      return createLoadableComponent(load, opts);
    }
    function flushInitializers(initializers, ids) {
      let promises = [];
      while (initializers.length) {
        let init = initializers.pop();
        promises.push(init(ids));
      }
      return Promise.all(promises).then(() => {
        if (initializers.length) {
          return flushInitializers(initializers, ids);
        }
      });
    }
    Loadable.preloadAll = () => {
      return new Promise((resolveInitializers, reject) => {
        flushInitializers(ALL_INITIALIZERS).then(resolveInitializers, reject);
      });
    };
    Loadable.preloadReady = ids => {
      if (ids === void 0) ids = [];
      return new Promise(resolvePreload => {
        const res = () => {
          initialized = true;
          return resolvePreload();
        };
        // We always will resolve, errors should be handled within loading UIs.
        flushInitializers(READY_INITIALIZERS, ids).then(res, res);
      });
    };
    if (typeof window !== 'undefined') {
      window.__NEXT_PRELOADREADY = Loadable.preloadReady;
    }
    const _default = Loadable;
  })(loadable_sharedRuntime);
  return loadable_sharedRuntime;
}

(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all) Object.defineProperty(target, name, {
      enumerable: true,
      get: all[name]
    });
  }
  _export(exports, {
    /**
    * This function lets you dynamically import a component.
    * It uses [React.lazy()](https://react.dev/reference/react/lazy) with [Suspense](https://react.dev/reference/react/Suspense) under the hood.
    *
    * Read more: [Next.js Docs: `next/dynamic`](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#nextdynamic)
    */
    default: function () {
      return dynamic;
    },
    noSSR: function () {
      return noSSR;
    }
  });
  const _interop_require_default = _interop_require_default$1;
  const _jsxruntime = require$$1$1;
  const _loadablesharedruntime = /*#__PURE__*/_interop_require_default._(requireLoadable_sharedRuntime());
  const isServerSide = typeof window === 'undefined';
  // Normalize loader to return the module as form { default: Component } for `React.lazy`.
  // Also for backward compatible since next/dynamic allows to resolve a component directly with loader
  // Client component reference proxy need to be converted to a module.
  function convertModule(mod) {
    return {
      default: (mod == null ? void 0 : mod.default) || mod
    };
  }
  function noSSR(LoadableInitializer, loadableOptions) {
    // Removing webpack and modules means react-loadable won't try preloading
    delete loadableOptions.webpack;
    delete loadableOptions.modules;
    // This check is necessary to prevent react-loadable from initializing on the server
    if (!isServerSide) {
      return LoadableInitializer(loadableOptions);
    }
    const Loading = loadableOptions.loading;
    // This will only be rendered on the server side
    return () => /*#__PURE__*/(0, _jsxruntime.jsx)(Loading, {
      error: null,
      isLoading: true,
      pastDelay: false,
      timedOut: false
    });
  }
  function dynamic(dynamicOptions, options) {
    let loadableFn = _loadablesharedruntime.default;
    let loadableOptions = {
      // A loading component is not required, so we default it
      loading: param => {
        let {
          error,
          isLoading,
          pastDelay
        } = param;
        if (!pastDelay) return null;
        if (process.env.NODE_ENV !== 'production') {
          if (isLoading) {
            return null;
          }
          if (error) {
            return /*#__PURE__*/(0, _jsxruntime.jsxs)("p", {
              children: [error.message, /*#__PURE__*/(0, _jsxruntime.jsx)("br", {}), error.stack]
            });
          }
        }
        return null;
      }
    };
    // Support for direct import(), eg: dynamic(import('../hello-world'))
    // Note that this is only kept for the edge case where someone is passing in a promise as first argument
    // The react-loadable babel plugin will turn dynamic(import('../hello-world')) into dynamic(() => import('../hello-world'))
    // To make sure we don't execute the import without rendering first
    if (dynamicOptions instanceof Promise) {
      loadableOptions.loader = () => dynamicOptions;
      // Support for having import as a function, eg: dynamic(() => import('../hello-world'))
    } else if (typeof dynamicOptions === 'function') {
      loadableOptions.loader = dynamicOptions;
      // Support for having first argument being options, eg: dynamic({loader: import('../hello-world')})
    } else if (typeof dynamicOptions === 'object') {
      loadableOptions = {
        ...loadableOptions,
        ...dynamicOptions
      };
    }
    // Support for passing options, eg: dynamic(import('../hello-world'), {loading: () => <p>Loading something</p>})
    loadableOptions = {
      ...loadableOptions,
      ...options
    };
    const loaderFn = loadableOptions.loader;
    const loader = () => loaderFn != null ? loaderFn().then(convertModule) : Promise.resolve(convertModule(() => null));
    // coming from build/babel/plugins/react-loadable-plugin.js
    if (loadableOptions.loadableGenerated) {
      loadableOptions = {
        ...loadableOptions,
        ...loadableOptions.loadableGenerated
      };
      delete loadableOptions.loadableGenerated;
    }
    // support for disabling server side rendering, eg: dynamic(() => import('../hello-world'), {ssr: false}).
    if (typeof loadableOptions.ssr === 'boolean' && !loadableOptions.ssr) {
      delete loadableOptions.webpack;
      delete loadableOptions.modules;
      return noSSR(loadableFn, loadableOptions);
    }
    return loadableFn({
      ...loadableOptions,
      loader: loader
    });
  }
  if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
      value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
})(dynamic$2, dynamic$2.exports);
var dynamicExports = dynamic$2.exports;

var dynamic = dynamicExports;
var dynamic$1 = /*@__PURE__*/getDefaultExportFromCjs(dynamic);

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

var css_248z$1 = ":root{--xui-color-hover:#f5f5f5;--xui-color-disabled:#e6e6e6;--xui-primary-color:#1677ff;--xui-primary-color-light:#40a9ff;--xui-text-color:rgba(0,0,0,.88);--xui-text-color-light:rgba(0,0,0,.5);--xui-error-color:#ff4d4f;--xui-error-color-light:#ff6668;--xui-success-color:#52c41a;--xui-background-color:#fff;--xui-font-size-xs:12px;--xui-font-size-sm:14px;--xui-font-size-md:14px;--xui-font-size-lg:16px;--xui-border-radius-sm:4px;--xui-border-radius-md:4px;--xui-border-radius-lg:6px;--xui-border-color:#d9d9d9;--xui-select-primary-color:var(--xui-primary-color);--xui-select-background-color:var(--xui-background-color)}html{font-family:sans-serif}.globalEllipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
styleInject(css_248z$1);

// Styles
// const Button = dynamic(() => import('@/components/Button/Button'), {
//     ssr: false,
// });
const Checkbox$2 = dynamic$1(() => Promise.resolve().then(function () { return Checkbox$1; }), {
  ssr: false
});
// Components
// export { default as Button } from "@/components/Button/Button";
// export { default as Checkbox } from '@/components/Checkbox/Checkbox';

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

var css_248z = ".xUi-checkbox-wrapper{align-items:center;color:var(--xui-main-color);cursor:pointer;display:inline-flex;font-size:var(--xui-font-size-md);margin:16px 0}.xUi-checkbox{background-color:transparent;border:1px solid var(--xui-border-color);border-radius:var(--xui-border-radius-sm);display:inline-block;height:14px;position:relative;transition:all .3s;width:14px}.xUi-checkbox.xUi-checkbox-checked{background-color:#f0f5ff;border-color:var(--xui-primary-color)}.xUi-checkbox input{cursor:pointer;inset:0;opacity:0;position:absolute}.xUi-checkbox-inner{border-left:0;border-top:0;border:2px solid var(--xui-background-color);height:6px;left:50%;position:absolute;top:50%;transform:rotate(45deg) scale(0);transition:transform .2s ease-in-out;width:10px}.xUi-checkbox-check{background-color:var(--xui-primary-color);border-color:var(--xui-primary-color);display:block;height:100%;position:relative;transition:.1s ease;width:100%}.xUi-checkbox-check:after{border:solid #fff;border-width:0 2px 2px 0;content:\"\";height:8px;left:3px;position:absolute;top:1px;transform:rotate(45deg);width:5px}.xUi-checkbox-disabled,.xUi-checkbox-disabled .xUi-checkbox-check{background-color:var(--xui-color-disabled);border-color:var(--xui-border-color)!important;cursor:not-allowed;opacity:.5}.xUi-checkbox-label{font-size:14px;margin-left:8px;user-select:none}.xUi-checkbox:focus:not(.disabled),.xUi-checkbox:hover:not(.disabled){border-color:var(--xui-primary-color);cursor:pointer}.xUi-checkbox.disabled{cursor:not-allowed;opacity:.5}";
styleInject(css_248z);

const Checkbox = /*#__PURE__*/require$$1.forwardRef(({
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
}, ref) => {
  const isChecked = checked !== undefined ? checked : defaultChecked || value;
  const [internalChecked, setInternalChecked] = require$$1.useState(isChecked);
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
  require$$1.useEffect(() => {
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
Checkbox.displayName = 'Checkbox';

var Checkbox$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: Checkbox
});

exports.Checkbox = Checkbox$2;
//# sourceMappingURL=index.js.map
