import require$$1 from 'react/jsx-runtime';
import React, { useRef, useState, Children, isValidElement, Fragment, Suspense, useContext, useMemo, useEffect, forwardRef, createContext, useImperativeHandle, useCallback, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import ReactDOMServer from 'react-dom/server';

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
    const _react = /*#__PURE__*/_interop_require_default._(React);
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
    const _react = /*#__PURE__*/_interop_require_default._(React);
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
  const _jsxruntime = require$$1;
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

var css_248z$m = ":root{--xui-color-hover:#f5f5f5;--xui-color-disabled:#e6e6e6;--xui-primary-color:#1677ff;--xui-primary-color-light:#40a9ff;--xui-text-color:rgba(0,0,0,.88);--xui-text-color-light:rgba(0,0,0,.5);--xui-error-color:#ff4d4f;--xui-error-color-light:#ff6668;--xui-success-color:#52c41a;--xui-background-color:#fff;--xui-font-size-xs:12px;--xui-font-size-sm:14px;--xui-font-size-md:14px;--xui-font-size-lg:16px;--xui-border-radius-sm:4px;--xui-border-radius-md:4px;--xui-border-radius-lg:6px;--xui-border-color:#d9d9d9;--xui-select-primary-color:var(--xui-primary-color);--xui-select-background-color:var(--xui-background-color)}html{font-family:sans-serif}.globalEllipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
styleInject(css_248z$m);

const ClearIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "10",
  height: "10",
  viewBox: "0 0 14 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M1 1L13 13M13 1L1 13",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round"
}));
const ArrowIcon = ({
  isOpen
}) => /*#__PURE__*/React.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React.createElement("path", {
  d: "M7 10L12 15L17 10",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  transform: isOpen ? 'rotate(180, 12, 12)' : ''
}));
const LoadingIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 1024 1024",
  focusable: "false",
  "data-icon": "loading",
  width: "12",
  height: "12",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
}));
const CheckIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "check",
  width: "12",
  height: "12",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
}));
const SearchIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "search",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
}));
const CalendarIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "calendar",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"
}));
const SuccessIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "check-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
}));
const ErrorIcon = () => /*#__PURE__*/React.createElement("svg", {
  className: "error-svg-icon",
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "close-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"
}));
const DateDistanceIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 1024 1024",
  focusable: "false",
  "data-icon": "swap-right",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"
}));
const TimeIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "clock-circle",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"
}));
const StampleIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "paper-clip",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z"
}));
const TrashIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "delete",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
}));
const SpinerIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 1024 1024",
  focusable: "false",
  "data-icon": "loading",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
}));

const useForm = (initialValues = {}, onFieldsChange, onValuesChange, scrollToFirstError, onFinish) => {
  const touchedFieldsRef = useRef(new Set());
  const rulesRef = useRef({});
  const warningsRef = useRef({});
  const _scrollToFirstError = useRef(scrollToFirstError);
  const stepRef = useRef(0);
  const formHandlersRef = useRef({
    onFinish,
    onValuesChange,
    onFieldsChange
  });
  const formRef = useRef({
    [stepRef.current]: {
      ...initialValues
    }
  });
  const fieldInstancesRef = useRef({});
  const [isReseting, setIsReseting] = useState(false);
  const [errors, setErrors] = useState({});
  const fieldSubscribers = useRef({});
  const formSubscribers = useRef([]);
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
  function setFieldValue(name, value, errors, reset = undefined, touch) {
    if (!reset && reset !== null && ([undefined, null].includes(value) || formRef.current[stepRef.current][name] === value)) {
      return;
    }
    formRef.current[stepRef.current][name] = value;
    if (touch) {
      touchedFieldsRef.current.add(name);
    }
    if (reset === null) {
      setErrors({
        [name]: []
      });
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
      setErrors({
        [name]: errors
      });
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
    }) => setFieldValue(Array.isArray(name) ? name[0] : name, value, errors));
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
      delete formRef.current[stepRef.current]?.[name];
      delete rulesRef.current[name];
      delete fieldInstancesRef.current[name];
    } else {
      if (!(name in formRef.current[stepRef.current])) {
        formRef.current[stepRef.current][name] = initialValues?.[name];
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
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors
    }));
    warningsRef.current[name] = fieldWarnings;
    return fieldErrors.length === 0;
  }
  async function validateFields(nameList) {
    const fieldsToValidate = nameList || Object.keys(formRef.current[stepRef.current]);
    const results = await Promise.all(fieldsToValidate.map(name => validateField(name)));
    if (_scrollToFirstError.current) {
      const firstErrorContent = document.querySelectorAll('.xUi-form-item-has-error')?.[0];
      if (firstErrorContent) {
        firstErrorContent.closest('.xUi-form-item')?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
    return results.every(valid => valid);
  }
  function resetFields(nameList, showError = true) {
    const formData = getFormFields();
    if (nameList?.length) {
      nameList.forEach(name => {
        formData[name] = initialValues[name];
        touchedFieldsRef.current.delete(name);
        delete warningsRef.current[name];
        setErrors(prev => ({
          ...prev,
          [name]: []
        }));
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
  function changeStep(step) {
    stepRef.current = step ?? 0;
    if (!formRef.current[stepRef.current]) {
      formRef.current[stepRef.current] = {};
    }
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
    setFieldInstance,
    subscribeToFields,
    setScrollToFirstError,
    scrollToFirstError,
    isReseting,
    setOnFinish,
    setOnFieldsChange,
    setOnValuesChange,
    changeStep
  };
  return formInstance;
};

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

function flattenChildren(children) {
  const result = [];
  Children.forEach(children, child => {
    if (! /*#__PURE__*/isValidElement(child)) return;
    if (child.type === Fragment || child.type === Suspense) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      result.push(...flattenChildren(child.props.children));
    } else {
      result.push(child);
    }
  });
  return result;
}

var css_248z$l = ".xUi-form-item{display:flex;position:relative}.xUi-form-item.noStyle{display:inline-flex;margin-bottom:0}.xUi-form-item-label{align-items:center;color:var(--xui-text-color);display:flex;font-size:var(--xui-font-size-md);font-weight:500;line-height:20px;margin-bottom:4px}.xUi-form-item-error{color:var(--xui-error-color);display:block;font-size:var(--xui-font-size-xs);line-height:16px;margin-bottom:8px;margin-top:4px;min-height:16px;position:relative;right:0;text-align:end;user-select:none}.xUi-form-item-required{color:var(--xui-error-color);display:inline-block;font-size:var(--xui-font-size-md);line-height:1;margin-left:4px;margin-right:4px}.xUi-form-item.horizontal{align-items:center;flex-direction:row;gap:4px}.xUi-form-item.vertical{align-self:flex-start;flex-direction:column}.xUi-form-item .xUi-input-container{width:-webkit-fill-available}";
styleInject(css_248z$l);

// const REF_CLIENT_HEIGHT = 24;
const FormItem$1 = ({
  prefixCls = prefixClsFormItem,
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
  const formContext = useContext(FormContext);
  const errorRef = useRef(null);
  const fieldRef = useRef(null);
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
    setFieldInstance,
    subscribeToFields,
    validateFields
  } = formContext;
  const childrenList = useMemo(() => flattenChildren(children), [children]);
  useEffect(() => {
    if (name && !getFieldInstance(name)) {
      registerField(name, rules);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, rules]);
  useEffect(() => {
    setFieldInstance(name, fieldRef.current);
  }, [name, fieldRef.current]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => registerField(name, undefined, true), [name]);
  useEffect(() => {
    if (initialValue) {
      setFieldValue(name, initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (name && dependencies.length > 0) {
      const unsubscribe = subscribeToFields(dependencies, () => {
        validateFields([name]);
      });
      return () => {
        unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies, name]);
  const isRequired = useMemo(() => rules.some(rule => rule.required), [rules]);
  const errorMessage = getFieldError(name)?.[0];
  return /*#__PURE__*/React.createElement("div", {
    style: style,
    "data-instance": name,
    className: clsx([`${prefixCls}`, {
      [layout]: layout,
      [className]: className,
      noStyle: props.noStyle
    }])
  }, !props.noStyle && (label || name) && !hideLabel && /*#__PURE__*/React.createElement("label", {
    className: `${prefixCls}-label`,
    htmlFor: name
  }, label || name, isRequired && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-required`
  }, "*")), Children.map(childrenList, (child, key) => {
    if (/*#__PURE__*/isValidElement(child)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const {
        onChange,
        value,
        ...childProps
      } = child.props;
      const fieldValue = value ?? getFieldValue(name) ?? initialValue;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormItemChildComponent, _extends({}, props, {
        key: `${key}_${isReseting}`
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ,
        ref: fieldRef,
        name: name,
        child: child,
        value: value,
        error: !!errorMessage,
        fieldValue: fieldValue,
        setFieldValue: setFieldValue,
        feedbackIcons: feedbackIcons,
        onChange: onChange,
        noStyle: props.noStyle,
        normalize: props.normalize
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ,
        size: childProps.size || props.size
      })), extra ? /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-extra`
      }, extra || '') : null, !props.noStyle && /*#__PURE__*/React.createElement("span", {
        ref: errorRef,
        className: clsx([`${prefixCls}-error`, {
          [`${prefixCls}-has-error`]: errorMessage?.length
        }]),
        style: {
          ...(removeErrorMessageHeight ? {
            minHeight: 0
          } : {}),
          ...(extra ? {
            marginBottom: 0
          } : {})
        }
      }, errorMessage || ''));
    }
    return child;
  }));
};
const FormItemChildComponent = /*#__PURE__*/forwardRef(({
  child,
  name,
  error,
  fieldValue,
  setFieldValue,
  onChange,
  normalize,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  noStyle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  feedbackIcons,
  ...props
}, ref) => {
  const formContext = useContext(FormContext);
  const [wasNormalize, setWasNormalize] = useState(false);
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
    setFieldValue(name, rawValue, undefined, undefined, true);
    onChange?.(e, option);
  };
  const injectPropsIntoFinalLeaf = child => {
    if (! /*#__PURE__*/isValidElement(child)) {
      return child;
    }
    const childProps = child.props;
    const isWrapper = typeof child.type === 'string' && !('dangerouslySetInnerHTML' in childProps) && ['div', 'span', 'label'].includes(child.type);
    if (isWrapper) {
      return /*#__PURE__*/React.createElement(child.type, childProps, Children.map(flattenChildren(childProps.children), injectPropsIntoFinalLeaf));
    }
    if (childProps?.__injected) {
      return child;
    }
    return /*#__PURE__*/React.createElement(child.type, _extends({}, props, {
      ref: ref
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    }, child.props, {
      name: name,
      child: child,
      onChange: handleChange,
      key: `${name}_${wasNormalize}`,
      value: fieldValue ?? props.value
    }, 'dangerouslySetInnerHTML' in childProps ? {} : {
      __injected: true,
      ...(error ? {
        error
      } : {})
    }));
  };
  return injectPropsIntoFinalLeaf(child);
});
FormItem$1.displayName = 'FormItem';

var Item = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: FormItem$1
});

const FormContext = /*#__PURE__*/createContext(null);
const Form$1 = ({
  children,
  form,
  style = {},
  prefixCls = prefixClsForm,
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
  const internalForm = useForm(initialValues, onFieldsChange, onValuesChange);
  const formInstance = form || internalForm;
  const formRef = useRef(null);
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
  const childrenList = useMemo(() => flattenChildren(children), [children]);
  useEffect(() => {
    if (onFieldsChange) {
      formInstance.setOnFieldsChange?.(onFieldsChange);
    }
    if (onValuesChange) {
      formInstance.setOnValuesChange?.(onValuesChange);
    }
    if (onFinish) {
      formInstance.setOnFinish?.(onFinish);
    }
    if (scrollToFirstError) {
      formInstance.setScrollToFirstError(scrollToFirstError);
    }
  }, [formInstance, onFieldsChange, onValuesChange, onFinish, scrollToFirstError]);
  const injectPropsIntoFinalLeaf = child => {
    if (! /*#__PURE__*/isValidElement(child)) {
      return child;
    }
    const childProps = child.props;
    const isWrapper = typeof child.type === 'string' && !('dangerouslySetInnerHTML' in childProps) && ['div', 'span', 'label'].includes(child.type);
    if (isWrapper) {
      return /*#__PURE__*/React.createElement(child.type, childProps, Children.map(flattenChildren(childProps.children), injectPropsIntoFinalLeaf));
    }
    if (childProps?.__injected) {
      return child;
    }
    return /*#__PURE__*/React.createElement(child.type, _extends({}, child.props, {
      child: child,
      size: childProps.size || rest.size,
      layout: childProps.layout || layout
    }));
  };
  return /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: formInstance
  }, /*#__PURE__*/React.createElement("form", {
    style: style,
    ref: formRef,
    onSubmit: handleSubmit,
    className: `${prefixCls} ${className}`
  }, Children.map(childrenList, child => injectPropsIntoFinalLeaf(child))));
};
Form$1.Item = FormItem$1;

var Form$2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	FormContext: FormContext,
	default: Form$1
});

const useWatch = ({
  name,
  defaultValue,
  form
}) => {
  const formContext = useContext(FormContext);
  const formInstance = form || formContext;
  if (!formInstance) {
    throw new Error('useWatch must be used within a Form or with a form instance.');
  }
  const [value, setValue] = useState(() => {
    return name ? formInstance.getFieldValue(name) ?? defaultValue : formInstance.getFieldsValue() ?? defaultValue;
  });
  useEffect(() => {
    if (!name) {
      const unsubscribe = formInstance.subscribeToForm(setValue);
      return () => unsubscribe();
    }
    const unsubscribe = formInstance.subscribeToField(name, setValue);
    return () => unsubscribe();
  }, [name, formInstance]);
  return value;
};

// Styles
const Button$3 = dynamic$1(() => Promise.resolve().then(function () { return Button$2; }), {
  ssr: false
});
const Checkbox$2 = dynamic$1(() => Promise.resolve().then(function () { return Checkbox$1; }), {
  ssr: false
});
const Switch$2 = dynamic$1(() => Promise.resolve().then(function () { return Switch$1; }), {
  ssr: false
});
const Empty$1 = dynamic$1(() => Promise.resolve().then(function () { return Empty; }), {
  ssr: false
});
const Upload$2 = dynamic$1(() => Promise.resolve().then(function () { return Upload$1; }), {
  ssr: false
});
const DatePicker$2 = dynamic$1(() => Promise.resolve().then(function () { return DatePicker$1; }), {
  ssr: false
});
const RangePicker$2 = dynamic$1(() => Promise.resolve().then(function () { return RangePicker$1; }), {
  ssr: false
});
const TimePicker$2 = dynamic$1(() => Promise.resolve().then(function () { return TimePicker$1; }), {
  ssr: false
});
const Form = dynamic$1(() => Promise.resolve().then(function () { return Form$2; }), {
  ssr: false
});
const FormItem = dynamic$1(() => Promise.resolve().then(function () { return Item; }), {
  ssr: false
});
const Input$3 = dynamic$1(() => Promise.resolve().then(function () { return Input$2; }), {
  ssr: false
});
const Textarea$2 = dynamic$1(() => Promise.resolve().then(function () { return Textarea$1; }), {
  ssr: false
});
const Radio$2 = dynamic$1(() => Promise.resolve().then(function () { return Radio$1; }), {
  ssr: false
});
const RadioButton$1 = dynamic$1(() => Promise.resolve().then(function () { return Button$1; }), {
  ssr: false
});
const RadioGroup$1 = dynamic$1(() => Promise.resolve().then(function () { return Group; }), {
  ssr: false
});
const Select$2 = dynamic$1(() => Promise.resolve().then(function () { return Select$1; }), {
  ssr: false
});
const Option$2 = dynamic$1(() => Promise.resolve().then(function () { return Option$1; }), {
  ssr: false
});
const Tag$2 = dynamic$1(() => Promise.resolve().then(function () { return Tag$1; }), {
  ssr: false
});
const Skeleton$2 = dynamic$1(() => Promise.resolve().then(function () { return Skeleton$1; }), {
  ssr: false
});
const SkeletonAvatar$1 = dynamic$1(() => Promise.resolve().then(function () { return Avatar; }), {
  ssr: false
});
const SkeletonButton$1 = dynamic$1(() => Promise.resolve().then(function () { return Button; }), {
  ssr: false
});
const SkeletonImage$1 = dynamic$1(() => Promise.resolve().then(function () { return Image; }), {
  ssr: false
});
const SkeletonInput$1 = dynamic$1(() => Promise.resolve().then(function () { return Input; }), {
  ssr: false
});

var css_248z$k = ".xUi-button{border:1px solid transparent;border-radius:6px;cursor:pointer;font-weight:400;line-height:1.5715;transition:all .3s ease;user-select:none;vertical-align:middle;white-space:nowrap}.xUi-button,.xUi-button-content,.xUi-button-icon{align-items:center;display:inline-flex;justify-content:center}.xUi-button-icon{line-height:0;margin-right:.5em}.xUi-button-icon:last-child{margin-left:.5em;margin-right:0}.xUi-button-spinner{animation:xUi-spin 1s linear infinite;border:1px solid transparent;border-radius:50%;border-top:1px solid var(--xui-text-color);height:1em;width:1em}@keyframes xUi-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.xUi-button-size-small{font-size:12px;height:24px;padding:4px 12px}.xUi-button-size-middle{font-size:14px;height:32px;padding:0 16px}.xUi-button-size-large{font-size:16px;height:44px;padding:8px 20px}.xUi-button-circle{border-radius:50%;justify-content:center;padding:0}.xUi-button-circle.xUi-button-size-small{height:24px;width:24px}.xUi-button-circle.xUi-button-size-large{height:44px;width:44px}.xUi-button-round{border-radius:9999px}.xUi-button-default{background-color:#fff;border-color:var(--xui-border-color);color:rgba(0,0,0,.85)}.xUi-button-default:hover{border-color:var(--xui-primary-color);color:var(--xui-primary-color)}.xUi-button-primary{background-color:var(--xui-primary-color);border-color:var(--xui-primary-color);color:#fff}.xUi-button-primary:hover{background-color:var(--xui-color-hover);border-color:var(--xui-color-hover);color:#fff}.xUi-button-dashed{background-color:#fff;border-color:var(--xui-border-color);border-style:dashed;color:rgba(0,0,0,.85)}.xUi-button-dashed:hover{border-color:var(--xui-primary-color);color:var(--xui-primary-color)}.xUi-button-text{background-color:transparent;border-color:transparent!important;color:rgba(0,0,0,.88)}.xUi-button-text:hover{background-color:rgba(0,0,0,.04);border-color:transparent;color:rgba(0,0,0,.88)}.xUi-button-link{background-color:transparent;border-color:transparent!important;color:var(--xui-primary-color)}.xUi-button-link:hover{border-color:transparent;color:var(--xui-primary-color-light)}.xUi-button-outlined{color:#fff}.xUi-button-filled,.xUi-button-outlined{background-color:transparent;border-color:var(--xui-border-color)}.xUi-button-filled{color:var(--xui-text-color)}.xUi-button-danger{background-color:transparent;border-color:var(--xui-error-color);color:var(--xui-error-color)}.xUi-button-danger:hover{border-color:var(--xui-error-color-light);color:var(--xui-error-color-light)}.xUi-button-ghost{opacity:0}.xUi-button-ghost:hover{opacity:1}.xUi-button-block{display:flex;width:100%}.xUi-button-disabled,.xUi-button-loading{background-color:var(--xui-color-disabled);border-color:var(--xui-border-color);color:var(--xui-text-color);cursor:not-allowed;opacity:.5;pointer-events:none}.xUi-button-loading{background-color:transparent}";
styleInject(css_248z$k);

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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __injected,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  child,
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
  const classes = useMemo(() => {
    return clsx([...new Set([prefixCls, rootClassName, `${prefixCls}-${type}`, `${prefixCls}-${variant}`, `${prefixCls}-${color}`, `${prefixCls}-${shape}`, `${prefixCls}-size-${size}`, {
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-ghost`]: ghost,
      [`${prefixCls}-danger`]: danger,
      [`${prefixCls}-loading`]: innerLoading,
      [`${prefixCls}-disabled`]: disabled
    }, className])]);
  }, [block, className, color, danger, disabled, ghost, innerLoading, prefixCls, rootClassName, shape, size, type, variant]);
  const iconNode = innerLoading ? typeof loading === 'object' && loading.icon || /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-spinner`
  }) : icon;
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, iconNode && iconPosition === 'start' && /*#__PURE__*/React.createElement("span", {
    className: clsx(`${prefixCls}-icon`, customClassNames.icon),
    style: styles.icon
  }, iconNode), /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-content`
  }, children), iconNode && iconPosition === 'end' && /*#__PURE__*/React.createElement("span", {
    className: clsx(`${prefixCls}-icon`, customClassNames.icon),
    style: styles.icon
  }, iconNode));
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

var Button$2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: ButtonComponent
});

var css_248z$j = ".xUi-checkbox-wrapper{align-items:center;color:var(--xui-main-color);cursor:pointer;display:inline-flex;font-size:var(--xui-font-size-md);margin:16px 0}.xUi-checkbox{background-color:transparent;border:1px solid var(--xui-border-color);border-radius:var(--xui-border-radius-sm);display:inline-block;height:14px;position:relative;transition:all .3s;width:14px}.xUi-checkbox.xUi-checkbox-checked{background-color:#f0f5ff;border-color:var(--xui-primary-color)}.xUi-checkbox input{cursor:pointer;inset:0;opacity:0;position:absolute}.xUi-checkbox-inner{border-left:0;border-top:0;border:2px solid var(--xui-background-color);height:6px;left:50%;position:absolute;top:50%;transform:rotate(45deg) scale(0);transition:transform .2s ease-in-out;width:10px}.xUi-checkbox-check{background-color:var(--xui-primary-color);border-color:var(--xui-primary-color);display:block;height:100%;position:relative;transition:.1s ease;width:100%}.xUi-checkbox-check:after{border:solid #fff;border-width:0 2px 2px 0;content:\"\";height:8px;left:3px;position:absolute;top:1px;transform:rotate(45deg);width:5px}.xUi-checkbox-disabled,.xUi-checkbox-disabled .xUi-checkbox-check{background-color:var(--xui-color-disabled);border-color:var(--xui-border-color)!important;cursor:not-allowed;opacity:.5}.xUi-checkbox-label{font-size:14px;margin-left:8px;user-select:none}.xUi-checkbox:focus:not(.disabled),.xUi-checkbox:hover:not(.disabled){border-color:var(--xui-primary-color);cursor:pointer}.xUi-checkbox.disabled{cursor:not-allowed;opacity:.5}";
styleInject(css_248z$j);

const Checkbox = /*#__PURE__*/forwardRef(({
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
  noStyle,
  titleClick
}, ref) => {
  const isChecked = checked !== undefined ? checked : defaultChecked || value;
  const [internalChecked, setInternalChecked] = useState(isChecked);
  const handleClick = e => {
    if (disabled) {
      e.stopPropagation();
      return;
    }
    setInternalChecked(!internalChecked);
    e.target.value = !internalChecked;
    onClick?.(e);
    onChange?.(e);
  };
  useEffect(() => {
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
      opacity: internalChecked ? 1 : 0
    }
  }))), titleClick ? /*#__PURE__*/React.createElement("div", {
    onClick: handleClick
  }, children) : children && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-label`
  }, children));
});
Checkbox.displayName = 'Checkbox';

var Checkbox$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: Checkbox
});

var css_248z$i = ".xUi-switch{background-color:var(--xui-color-disabled);border:0;border-radius:100px;box-sizing:border-box;color:#000000d9;cursor:pointer;display:inline-block;font-size:14px;font-variant:tabular-nums;height:22px;list-style:none;margin:0;min-width:44px;padding:0;position:relative;transition:all .2s;user-select:none;vertical-align:middle}.xUi-switch.xUi-switch__disabled{opacity:.5;pointer-events:none}.xUi-switch .xUi-switch__slider{background-color:#fff;border-radius:50%;height:18px;left:2px;position:absolute;top:2px;transition:transform .3s;width:18px}.xUi-switch__checked .xUi-switch__slider{transform:translateX(21px)}.xUi-switch__checked{background-color:var(--xui-primary-color)}";
styleInject(css_248z$i);

const Switch = ({
  prefixCls = prefixClsSwitch,
  checked,
  onChange,
  onClick,
  disabled = false,
  className = '',
  style = {},
  defaultChecked,
  value
}) => {
  const isChecked = checked !== undefined ? checked : defaultChecked || value;
  const [internalChecked, setInternalChecked] = useState(isChecked);
  const handleClick = e => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    setInternalChecked(!internalChecked);
    e.target.value = !internalChecked;
    onClick?.(e.target.value);
    onChange?.(e.target.value);
  };
  useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);
  return /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-wrapper ${className}  ${disabled ? `${prefixCls}__disabled` : ''}`,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls} ${internalChecked ? `${prefixCls}__checked` : ''}`,
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}__slider`
  })));
};
Switch.displayName = 'Switch';

var Switch$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: Switch
});

var css_248z$h = ".xUi-empty{align-items:center;display:grid;gap:4px;justify-content:center;padding:14px}.xUi-empty-description{color:var(--xui-text-color);font-size:var(--xui-font-size-md);text-align:center}";
styleInject(css_248z$h);

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

var Empty = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: EmptyContent
});

var css_248z$g = ".xUi-upload-wrapper{font-family:Arial,sans-serif;width:100%}.xUi-upload{align-items:center;border-radius:6px;color:#666;cursor:pointer;display:flex;justify-content:flex-start;text-align:center;transition:all .3s}.xUi-upload:hover{border-color:var(--xui-primary-color,var(--xui-primary-color));color:var(--xui-primary-color,var(--xui-primary-color))}.xUi-upload-disabled{cursor:not-allowed;opacity:.6}.xUi-upload-disabled .xUi-upload-picture button{cursor:not-allowed}.xUi-upload-input{display:none}.xUi-upload-list{list-style:none;margin:0;padding:0}.xUi-upload-list-picture .xUi-upload-item{border:1px dashed var(--xui-border-color);line-height:unset;margin-top:8px;padding:8px}.xUi-upload-list-picture .xUi-upload-item-done{border:1px solid var(--xui-border-color)}.xUi-upload-list-picture .xUi-upload-item-error{border:1px solid var(--xui-error-color)}.xUi-upload-list-picture .xUi-upload-item-error .xUi-upload-item-title{color:var(--xui-error-color)}.xUi-upload-item{align-items:center;border-radius:8px;color:#333;display:flex;font-size:14px;gap:8px;line-height:35px;margin:0;transition:background .3s}.xUi-upload-item.uploading{color:var(--xui-primary-color)}.xUi-upload-item.done{color:var(--xui-success-color)}.xUi-upload-item.error{color:var(--xui-error-color)}.xUi-upload-remove{color:rgba(0,0,0,.45)}.xUi-upload-item-title{align-items:center;color:var(--xui-text-color);display:flex;justify-content:space-between}.xUi-upload-item-title svg{color:var(--xui-error-color)}.xUi-upload-list-picture-card{display:flex;flex-wrap:wrap;gap:8px}.xUi-upload-list-picture-card .xUi-upload-item{align-items:center;border-radius:4px;display:flex;flex-direction:column;height:104px;justify-content:center;position:relative;width:104px}.xUi-upload-list-picture-card .xUi-upload-item img{max-height:100%;max-width:100%;object-fit:cover}.xUi-upload-list-picture-card .xUi-upload-remove{border-radius:50%;color:#fff;font-size:12px;line-height:1;padding:2px 6px;position:absolute;right:4px;top:4px}.xUi-upload-item-thumbnail{border-radius:4px;height:44px;object-fit:cover;width:44px}.xUi-upload-item-progress-line{border:1px solid var(--xui-border-color);height:0;width:calc(100% - 8px)}.xUi-upload-item-progress-line-percent{border:1px solid red;height:0;position:relative;top:-2px}";
styleInject(css_248z$g);

const IMAGE_SIZE = 40;
const IMAGE_PROGRESS_PERCENT = 100;
const Upload = ({
  prefixCls = prefixClsUpload,
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
  const uploadRef = useRef(null);
  const [fileList, setFileList] = useState(() => (controlledFileList || defaultFileList || []).map((file, idx) => ({
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
  return /*#__PURE__*/React.createElement("div", {
    className: clsx([`${prefixCls}-wrapper`, className, rootClassName, {
      noStyle: noStyle,
      [`${prefixCls}-disabled`]: disabled
    }]),
    style: style
  }, /*#__PURE__*/React.createElement("span", {
    className: clsx([`${prefixCls}`, `${prefixCls}-${listType}`]),
    onClick: handleClick
  }, children, /*#__PURE__*/React.createElement("input", _extends({
    type: "file",
    ref: uploadRef,
    accept: accept,
    multiple: multiple,
    onChange: handleFileChange,
    className: `${prefixCls}-input`,
    disabled: disabled
  }, directory ? {
    directory: true,
    webkitdirectory: true
  } : {}))), showUploadList && fileList.length > 0 && /*#__PURE__*/React.createElement("ul", {
    className: `${prefixCls}-list ${prefixCls}-list-${listType}`
  }, fileList.map(file => /*#__PURE__*/React.createElement("li", {
    key: file.uid,
    className: `${prefixCls}-item ${prefixCls}-item-${file.status}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-remove`,
    onClick: () => handleRemove(file.uid)
  }, listType === 'picture' && (file.originFileObj || file.url) ?
  /*#__PURE__*/
  // eslint-disable-next-line @next/next/no-img-element
  React.createElement("img", {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    alt: file.name,
    src: file.url || URL.createObjectURL(file.originFileObj),
    className: `${prefixCls}-item-thumbnail`
  }) : /*#__PURE__*/React.createElement(StampleIcon, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-item-title`,
    style: {
      ...(file.status === 'uploading' ? {
        marginBottom: 12
      } : {})
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-item-remove-icon`,
    onClick: () => handleRemove(file.uid),
    style: {
      cursor: 'pointer',
      marginLeft: 'auto'
    },
    role: "button",
    "aria-label": "Remove file"
  }, /*#__PURE__*/React.createElement(TrashIcon, null))), file.status === 'uploading' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-item-progress-line`
  }), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-item-progress-line-percent`,
    style: {
      width: `${file.percent}%`
    }
  })))))));
};

var Upload$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: Upload
});

var css_248z$f = ".xUi-rangepicker-range-container{font-size:14px;position:relative;user-select:none}.xUi-rangepicker-range-input-wrapper{background-color:#fff;border-radius:6px;display:flex;transition:all .3s;width:100%}.xUi-rangepicker-range-input-wrapper:hover{border-color:#4096ff}.xUi-rangepicker-range-input{align-items:center;border-right:1px solid var(--xui-border-color);cursor:pointer;display:flex;flex:1;padding:4px 11px}.xUi-rangepicker-range-input:last-child{border-right:none}.xUi-rangepicker-range-input input{background:transparent;border:none;color:#000;cursor:pointer;font-size:14px;outline:none;width:100%}.xUi-rangepicker-range-input input::placeholder{color:#bfbfbf}.xUi-rangepicker-range-clear,.xUi-rangepicker-range-icon{align-items:center;display:flex;margin-left:8px;transition:color .3s}.xUi-rangepicker-range-icon{color:rgba(0,0,0,.25)}.xUi-rangepicker-range-clear{color:rgba(0,0,0,.45);cursor:pointer}.xUi-rangepicker-range-clear:hover{color:#000}.xUi-rangepicker-range-dropdown-wrapper{background:#fff;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.15);display:none;left:0;margin-top:4px;min-width:560px;opacity:1;padding:8px;position:absolute;top:100%;transform:translateY(4px);transition:opacity .2s ease,transform .2s ease;z-index:1050}.xUi-rangepicker-range-dropdown-wrapper.show{display:flex}.xUi-rangepicker-dropdown-range,.xUi-rangepicker-range-dropdown{background-color:#fff;border:1px solid var(--xui-border-color);border-radius:6px;display:flex;margin-top:2px;overflow:hidden}.xUi-rangepicker-calendar{background:#fff;border-radius:6px;margin:12px}.xUi-rangepicker-calendar.month,.xUi-rangepicker-calendar.year{width:280px}.xUi-rangepicker-calendar-header{align-items:center;display:flex;font-weight:500;justify-content:space-between}.xUi-rangepicker-month,.xUi-rangepicker-year{background:none;border:none;border-radius:4px;color:var(--xui-text-color);cursor:pointer;height:30px;line-height:30px;margin:7px;min-width:30px;text-align:center;transition:all .2s}.xUi-rangepicker-day:disabled,.xUi-rangepicker-month:disabled,.xUi-rangepicker-select:disabled,.xUi-rangepicker-year:disabled{background-color:var(--xui-color-disabled);cursor:not-allowed;opacity:.5}.xUi-rangepicker-day:not(:disabled):hover,.xUi-rangepicker-month:not(:disabled):hover,.xUi-rangepicker-year:not(:disabled):hover{background:var(--xui-primary-color-light);color:#fff}.xUi-rangepicker-calendar-header button,.xUi-rangepicker-dropdown-selects button,.xUi-rangepicker-nav-buttons button{background:transparent;border:none;color:#595959;cursor:pointer;font-size:14px;font-weight:600;line-height:1;padding:0 6px;transition:color .2s ease}.xUi-rangepicker-nav-buttons button{font-size:20px;font-weight:400}.xUi-rangepicker-calendar-header button:hover,.xUi-rangepicker-dropdown-selects button:hover,.xUi-rangepicker-nav-buttons button:hover{color:var(--xui-primary-color)}.xUi-rangepicker-input{align-items:center;background-color:transparent;border:1px solid var(--xui-border-color);border-radius:6px;color:var(--xui-text-color);cursor:pointer;display:flex;gap:8px;justify-content:space-between;padding:3px 7px;transition:all .3s}.xUi-rangepicker-input.noBordered{border:none!important}.xUi-rangepicker-input input{border:none;color:var(--xui-text-color);font-size:var(--xui-font-size-sm);outline:none;padding:0}.xUi-rangepicker-input:placeholder-shown{text-overflow:ellipsis}.xUi-rangepicker-input:hover{border-color:var(--xui-primary-color)}.xUi-rangepicker-weekday-row{background-color:#fff;box-shadow:0 1px 0 rgba(0,0,0,.1);display:grid;gap:4px;grid-template-columns:repeat(7,1fr);position:sticky;top:0;z-index:1}.xUi-rangepicker-weekday{align-items:center;color:var(--xui-text-color);display:flex;font-size:12px;font-weight:500;font-weight:600;height:30px;justify-content:center;text-align:center}.xUi-rangepicker-days-grid,.xUi-rangepicker-grid{display:grid;gap:2px;grid-template-columns:repeat(3,1fr)}.xUi-rangepicker-days-grid.day{grid-template-columns:repeat(7,0fr)}.xUi-rangepicker-day{background-color:transparent;border:none;border-radius:4px;cursor:pointer;height:30px;line-height:30px;text-align:center;transition:background-color .3s,color .3s;width:30px}.xUi-rangepicker-day:hover{background-color:var(--xui-primary-color);border-radius:4px;color:#fff}.xUi-rangepicker-day.xUi-rangepicker-other-month:hover{background-color:var(--xui-color-disabled)!important;color:var(--xui-text-color)}.xUi-rangepicker-range-end:not(.xUi-rangepicker-other-month),.xUi-rangepicker-range-start:not(.xUi-rangepicker-other-month),.xUi-rangepicker-selected:not(.xUi-rangepicker-other-month){background-color:var(--xui-primary-color);color:#fff;font-weight:600}.xUi-rangepicker-in-range:not(.xUi-rangepicker-other-month){background-color:#f0f5ff}.xUi-rangepicker-hover-end{background-color:var(--xui-primary-color)!important}.xUi-rangepicker-disabled,.xUi-rangepicker-other-month{color:#ccc}.xUi-rangepicker-disabled{cursor:not-allowed}.xUi-rangepicker-footer{display:flex;grid-column:span 7;justify-content:center;padding-top:6px}.xUi-rangepicker-select{background:none;border:none;color:var(--xui-primary-color);cursor:pointer}.xUi-rangepicker-input.sm{font-size:var(--xui-font-size-sm);padding:4px 8px}.xUi-rangepicker-input.md{font-size:var(--xui-font-size-md);padding:8px 12px}.xUi-rangepicker-input.lg{font-size:var(--xui-font-size-lg);padding:10px 16px}.xUi-rangepicker-dropdown-wrapper{opacity:0;pointer-events:none;position:absolute;transform:scale(.95);transition:opacity .2s ease,transform .2s ease;z-index:1000}.xUi-rangepicker-dropdown-wrapper.bottomLeft{left:0;margin-top:4px;top:100%}.xUi-rangepicker-dropdown-wrapper.bottomRight{margin-top:4px;right:0;top:100%}.xUi-rangepicker-dropdown-wrapper.topLeft{bottom:100%;left:0;margin-bottom:4px}.xUi-rangepicker-dropdown-wrapper.topRight{bottom:100%;margin-bottom:4px;right:0}.xUi-rangepicker-dropdown-wrapper.show{opacity:1;pointer-events:auto;transform:scale(1)}.xUi-rangepicker-large .xUi-rangepicker-selected-date{font-size:16px}.xUi-rangepicker-large .xUi-rangepicker-input{padding:11px}.xUi-rangepicker-middle .xUi-rangepicker-input{padding:6px 11px}.xUi-rangepicker-dropdown-trigger{background-color:#fff;border:1px solid var(--xui-border-color);border-radius:2px;cursor:pointer;line-height:32px;padding:0 8px}.xUi-rangepicker-dropdown-menu{background:#fff;border:1px solid var(--xui-border-color);box-shadow:0 2px 8px rgba(0,0,0,.15);max-height:200px;overflow-y:auto;position:absolute;z-index:1000}.xUi-rangepicker-dropdown-item{cursor:pointer;padding:4px 12px}.xUi-rangepicker-dropdown-item:hover{background:#f5f5f5}.xUi-rangepicker-dropdown-item.active{background-color:#e6f7ff;font-weight:700}.xUi-rangepicker-header{align-items:center;border-bottom:1px solid var(--xui-border-color);display:flex;gap:8px;justify-content:space-between;margin-bottom:8px;padding-bottom:12px;width:100%}";
styleInject(css_248z$f);

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
  style = {},
  className = '',
  separator,
  defaultValue,
  bordered = true
}) => {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState([value?.[0] || defaultValue?.[0] || null, value?.[1] || defaultValue?.[1] || null]);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState(picker === 'month' ? 'month' : picker === 'year' ? 'year' : 'day');
  const localeMonths = locale?.shortMonths || Array.from({
    length: 12
  }, (_, i) => new Date(0, i).toLocaleString(locale?.locale || 'default', {
    month: 'short'
  }));
  const localeWeekdays = locale?.shortWeekDays || ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  useEffect(() => {
    const handleClickOutside = event => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleSelect = date => {
    if (!selectedDates[0] || selectedDates[0] && selectedDates[1]) {
      setSelectedDates([date, null]);
    } else {
      const start = selectedDates[0];
      const end = date < start ? start : date;
      const begin = date < start ? date : start;
      setSelectedDates([begin, end]);
      onChange?.([begin.toUTCString(), end.toUTCString()], [formatDate(begin), formatDate(end)]);
      setIsOpen(false);
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
    return /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-header`
    }, all || !monthOffset ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-nav-buttons`
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setCurrentYear(y => y - 1)
    }, "\xAB"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setCurrentMonth(m => m === 0 ? (setCurrentYear(y => y - 1), MONTH_LENGTH) : m - 1)
    }, "\u2039")) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-dropdown-selects`
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `${prefixCls}-select`,
      onClick: () => setViewMode('year')
    }, baseYear), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: `${prefixCls}-select`,
      onClick: () => setViewMode('month')
    }, localeMonths[baseMonth])), all || monthOffset ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-nav-buttons`
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setCurrentMonth(m => m === MONTH_LENGTH ? (setCurrentYear(y => y + 1), 0) : m + 1)
    }, "\u203A"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setCurrentYear(y => y + 1)
    }, "\xBB")) : /*#__PURE__*/React.createElement("span", null));
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
    return /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-calendar ${viewMode}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-calendar-header`
    }, renderMonthYearSelector(monthOffset, all)), viewMode === 'day' && /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-days-grid day`
    }, localeWeekdays.map((day, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `${prefixCls}-weekday`
    }, day)), days.map((day, i) => {
      const isSelected = day && selectedDates.some(d => d?.toDateString() === day?.toDateString());
      const inRange = day && isInRange(day);
      const isSameMonth = day?.getMonth() === month;
      return /*#__PURE__*/React.createElement("button", {
        key: i,
        disabled: disabledDate?.(day, {
          from: undefined,
          to: undefined
        }),
        onClick: () => day && handleSelect(day),
        onMouseEnter: () => day && setHoveredDate(day),
        className: clsx([`${prefixCls}-day`, {
          [`${prefixCls}-selected`]: isSelected,
          [`${prefixCls}-in-range`]: inRange,
          [`${prefixCls}-hover-end`]: hoveredDate && selectedDates[0] && !selectedDates[1] && hoveredDate > selectedDates[0] && hoveredDate?.toDateString() === day?.toDateString(),
          [`${prefixCls}-other-month`]: !isSameMonth
        }])
      }, day?.getDate());
    })), viewMode === 'month' && /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-grid`
    }, localeMonths.map((m, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      className: `${prefixCls}-month`,
      onClick: () => {
        setCurrentMonth(i);
        setViewMode('day');
      },
      disabled: isMonthDisabled(i)
    }, m))), viewMode === 'year' && /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-grid`
    }, Array.from({
      length: 12
    }, (_, i) => {
      const year = currentYear - NUMBER_SIX + i;
      return /*#__PURE__*/React.createElement("button", {
        key: year,
        className: `${prefixCls}-year`,
        disabled: isYearDisabled(year),
        onClick: () => {
          setCurrentYear(year);
          setViewMode('month');
        }
      }, year);
    })));
  };
  const handleClear = () => {
    setSelectedDates([null, null]);
    onChange?.(null, ['', '']);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    style: style,
    className: clsx([`${prefixCls}-range-container`, {
      [`${prefixCls}-${size}`]: size,
      [className]: className
    }])
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-range-input-wrapper`
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: clsx([`${prefixCls}-input`, {
      noBordered: !bordered,
      [`${prefixCls}-error`]: error,
      [`${prefixCls}-disabled`]: disabled
    }]),
    disabled: disabled,
    onClick: () => setIsOpen(!isOpen)
  }, prefix, /*#__PURE__*/React.createElement("input", {
    readOnly: inputReadOnly,
    className: `${prefixCls}-selected-date`,
    placeholder: placeholder[0],
    value: selectedDates[0] ? formatDate(selectedDates[0]) : ''
  }), /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-range-separator`
  }, separator || /*#__PURE__*/React.createElement(DateDistanceIcon, null)), /*#__PURE__*/React.createElement("input", {
    readOnly: inputReadOnly,
    className: `${prefixCls}-selected-date`,
    placeholder: placeholder[1],
    value: selectedDates[1] ? formatDate(selectedDates[1]) : ''
  }), /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-icon`
  }, allowClear && (selectedDates[0] || selectedDates[1]) ? /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-clear`,
    onClick: handleClear
  }, /*#__PURE__*/React.createElement(ClearIcon, null)) : /*#__PURE__*/React.createElement(CalendarIcon, null)))), isOpen && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-dropdown-wrapper show`
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-dropdown-range`
  }, renderCalendar(0, viewMode !== 'day'), viewMode === 'day' && renderCalendar(1, viewMode !== 'day'))));
};

var RangePicker$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: RangePicker
});

var css_248z$e = ".xUi-datepicker-container{font-family:Arial,sans-serif;height:max-content;position:relative}.xUi-datepicker-input{align-items:center;background-color:transparent;border:1px solid var(--xui-border-color);border-radius:6px;color:var(--xui-text-color);cursor:pointer;display:flex;gap:8px;justify-content:space-between;padding:3px 7px;transition:all .3s}.xUi-datepicker-input.noBordered{border:none!important}.xUi-datepicker-input input{border:none;color:var(--xui-text-color);font-size:var(--xui-font-size-sm);outline:none;padding:0}.xUi-datepicker-input:placeholder-shown{text-overflow:ellipsis}.xUi-datepicker-input:hover{border-color:var(--xui-primary-color)}.xUi-datepicker-icon{color:var(--xui-text-color);cursor:pointer;height:16px;opacity:.6;transition:.3s ease;width:16px}.xUi-datepicker-icon:hover{color:var(--xui-primary-color);opacity:1}.xUi-datepicker-selected-date{border:none;color:var(--xui-text-color);font-size:var(--xui-font-size-md);letter-spacing:.8px;outline:none}.xUi-datepicker-disabled{background-color:var(--xui-color-disabled);border-color:var(--xui-border-color)!important;cursor:not-allowed;opacity:.5}.xUi-datepicker-disabled .xUi-datepicker-selected-date{cursor:not-allowed;opacity:.6}.xUi-datepicker-disabled .xUi-datepicker-icon{cursor:not-allowed}.xUi-datepicker-icon{align-items:center;color:#8c8c8c;display:flex;font-size:16px;gap:6px}.xUi-datepicker-error{border-color:var(--xui-error-color)}.xUi-datepicker-error .error-svg-icon,.xUi-datepicker-error .xUi-datepicker-icon,.xUi-datepicker-icon .error-svg-icon{color:var(--xui-error-color)}.xUi-datepicker-input.sm{font-size:var(--xui-font-size-sm);padding:4px 8px}.xUi-datepicker-input.md{font-size:var(--xui-font-size-md);padding:8px 12px}.xUi-datepicker-input.lg{font-size:var(--xui-font-size-lg);padding:10px 16px}.xUi-datepicker-dropdown-wrapper{opacity:0;pointer-events:none;position:absolute;transform:scale(.95);transition:opacity .2s ease,transform .2s ease;z-index:1000}.xUi-datepicker-dropdown-wrapper.bottomLeft{left:0;margin-top:4px;top:100%}.xUi-datepicker-dropdown-wrapper.bottomRight{margin-top:4px;right:0;top:100%}.xUi-datepicker-dropdown-wrapper.topLeft{bottom:100%;left:0;margin-bottom:4px}.xUi-datepicker-dropdown-wrapper.topRight{bottom:100%;margin-bottom:4px;right:0}.xUi-datepicker-dropdown-wrapper.show{opacity:1;pointer-events:auto;transform:scale(1)}.xUi-datepicker-dropdown{background:var(--xui-background-color);border:1px solid var(--xui-border-color);border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.15);min-width:250px;padding:12px}.xUi-datepicker-header{align-items:center;border-bottom:1px solid var(--xui-border-color);display:flex;gap:8px;justify-content:space-between;margin-bottom:8px;padding-bottom:12px}.xUi-datepicker-day-footer{align-items:center;border-top:1px solid var(--xui-border-color);display:flex;justify-content:center;margin-top:8px;padding-top:12px;width:100%}.xUi-datepicker-nav-buttons{display:flex;gap:4px}.xUi-datepicker-nav-buttons button{background:none;border:none;border-radius:4px;color:var(--xui-text-color);cursor:pointer;font-size:20px;opacity:.7;padding:2px 6px;transition:all .3s}.xUi-datepicker-nav-buttons button:not(:disabled):hover{color:var(--xui-primary-color)}.xUi-datepicker-dropdown-selects{align-items:center;display:flex;gap:6px}.xUi-datepicker-dropdown-selects button,.xUi-datepicker-select{background:var(--xui-background-color);border:none;border-radius:4px;color:var(--xui-text-color);cursor:pointer;font-weight:600;padding:4px 8px;transition:all .3s}.xUi-datepicker-dropdown-selects button:hover,.xUi-datepicker-select:not(:disabled):hover{color:var(--xui-primary-color)}.xUi-datepicker-grid{display:grid;gap:2px;grid-template-columns:repeat(3,1fr);text-align:center}.xUi-datepicker-grid.day{grid-template-columns:repeat(7,1fr)}.xUi-datepicker-day-header{color:var(--xui-text-color);font-size:14px;margin:4px 0;user-select:none}.xUi-datepicker-day,.xUi-datepicker-month,.xUi-datepicker-year{background:none;border:none;border-radius:4px;color:var(--xui-text-color);cursor:pointer;height:30px;line-height:30px;min-width:30px;text-align:center;transition:all .2s}.xUi-datepicker-month,.xUi-datepicker-year{margin:7px}.xUi-datepicker-day:disabled,.xUi-datepicker-month:disabled,.xUi-datepicker-select:disabled,.xUi-datepicker-year:disabled{background-color:var(--xui-color-disabled);cursor:not-allowed;opacity:.5}.xUi-datepicker-day:not(:disabled):hover,.xUi-datepicker-month:not(:disabled):hover,.xUi-datepicker-year:not(:disabled):hover{background:var(--xui-primary-color-light);color:#fff}.xUi-datepicker-selected{background:var(--xui-primary-color)!important;color:#fff!important;font-weight:700}.xUi-datepicker-other-month{color:var(--xui-text-color);opacity:.4}.xUi-datepicker-other-month:not(:disabled):hover{background-color:var(--xui-color-hover);color:var(--xui-text-color);user-select:none}.xUi-datepicker-footer{margin-top:12px;text-align:right}.xUi-datepicker-footer-today-btn{background:none;border:1px solid var(--xui-border-color);border-radius:4px;color:var(--xui-primary-color);cursor:pointer;font-size:13px;padding:4px 8px;transition:all .3s}.xUi-datepicker-footer-today-btn:not(:disabled):hover{background-color:var(--xui-primary-color-light);color:#fff}.xUi-datepicker-large .xUi-datepicker-selected-date{font-size:16px}.xUi-datepicker-large .xUi-datepicker-input{padding:11px}.xUi-datepicker-middle .xUi-datepicker-input{padding:6px 11px}";
styleInject(css_248z$e);

const INPUT_SIZE$1 = 12;
const CONTENT_PADDING = 6;
const NUMBER_SIX = 6;
const MONTH_LENGTH = 11;
const NEXT_DAYS_COUNT_AS_CURRENT_MUNTH = 35;
const DatePickerComponent = ({
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
  bordered = true
}) => {
  const containerRef = useRef(null);
  const initialDate = value || defaultValue;
  const popupContainerRef = useRef(null);
  const [placementPossition, setPlacementPossition] = useState({});
  const DateNow = new Date();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedDatePlaceholder, setSelectedDatePlaceholder] = useState(initialDate ? formatDate(initialDate) : undefined);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [currentYear, setCurrentYear] = useState(initialDate ? new Date(initialDate).getFullYear() : DateNow.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate ? new Date(initialDate).getMonth() : DateNow.getMonth());
  const [viewMode, setViewMode] = useState(picker === 'month' ? 'month' : picker === 'year' ? 'year' : 'day');
  const localeMonths = locale?.shortMonths || Array.from({
    length: 12
  }, (_, i) => new Date(0, i).toLocaleString(locale?.locale || 'default', {
    month: 'short'
  }));
  const localeWeekdays = locale?.shortWeekDays || ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  useEffect(() => {
    const handleClickOutside = event => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const controller = new AbortController();
    if (isOpen) {
      calculateDatePickerPopupPossition();
      document.addEventListener('scroll', calculateDatePickerPopupPossition, {
        signal: controller.signal
      });
      document.addEventListener('mousedown', handleClickOutside, {
        signal: controller.signal
      });
    }
    return () => {
      controller.abort();
    };
  }, [isOpen]);
  useEffect(() => {
    if (getPopupContainer && containerRef.current) {
      popupContainerRef.current = getPopupContainer(containerRef.current);
    }
  }, [getPopupContainer]);
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  function formatDate(date) {
    if (typeof format === 'function') {
      return format(date);
    }
    if (typeof format === 'string') {
      date = new Date(date);
      return format.replace(/YYYY/, date.getFullYear().toString()).replace(/MM/, (date.getMonth() + 1).toString().padStart(2, '0')).replace(/DD/, date.getDate().toString().padStart(2, '0'));
    }
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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
    const formatted = formatDate(date);
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
  function calculateDatePickerPopupPossition() {
    const datePickerContainerHeight = (containerRef.current?.clientHeight || 0) + CONTENT_PADDING;
    const datePickerPossitionFromTop = containerRef.current?.getBoundingClientRect().top || 0;
    const datePickerPossitionFromBottom = window.innerHeight - (containerRef.current?.getBoundingClientRect().bottom || 0);
    const datePickerContainerPopupHeight = containerRef.current?.querySelector(`.${prefixCls}-dropdown`)?.clientHeight || 0;
    setPlacementPossition(['topLeft', 'topRight'].includes(placement) ? {
      position: 'absolute',
      top: datePickerPossitionFromTop - datePickerContainerPopupHeight < 0 ? datePickerContainerHeight : -datePickerContainerPopupHeight
    } : {
      position: 'absolute',
      top: datePickerPossitionFromBottom > datePickerContainerPopupHeight ? 0 : -(datePickerContainerPopupHeight + datePickerContainerHeight)
    });
  }
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
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: clsx([`${prefixCls}-container`, {
      noStyle,
      [`${prefixCls}-${size}`]: size
    }])
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-input-wrapper`
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: clsx([`${prefixCls}-input`, {
      noBordered: !bordered,
      [`${prefixCls}-error`]: error,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-disabled`]: disabled
    }]),
    disabled: disabled,
    onClick: () => setIsOpen(!isOpen)
  }, prefix || null, /*#__PURE__*/React.createElement("input", {
    size: INPUT_SIZE$1,
    disabled: disabled,
    readOnly: inputReadOnly,
    className: `${prefixCls}-selected-date globalEllipsis`,
    placeholder: placeholder,
    style: {
      opacity: isOpen ? '0.6' : 1
    },
    defaultValue: selectedDatePlaceholder
  }), /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-icon`
  }, allowClear && selectedDate ? /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-clear`,
    onClick: clearSelection
  }, typeof allowClear === 'object' && allowClear.clearIcon ? allowClear.clearIcon : /*#__PURE__*/React.createElement(ClearIcon, null)) : suffixIcon || /*#__PURE__*/React.createElement(CalendarIcon, null), error && feedbackIcons ? /*#__PURE__*/React.createElement(ErrorIcon, null) : null))), /*#__PURE__*/React.createElement("div", {
    style: popupContainerRef.current ? {
      position: 'absolute'
    } : {},
    className: clsx([placement, `${prefixCls}-dropdown-wrapper`, {
      show: isOpen
    }])
  }, isOpen && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-dropdown`,
    style: placementPossition
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-header`
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-nav-buttons`
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentYear(y => y - 1)
  }, "\xAB"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentMonth(m => m === 0 ? (setCurrentYear(y => y - 1), MONTH_LENGTH) : m - 1)
  }, "\u2039")), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-dropdown-selects`
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `${prefixCls}-select`,
    onClick: () => setViewMode('year')
  }, currentYear), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `${prefixCls}-select`,
    onClick: () => setViewMode('month')
  }, localeMonths[currentMonth])), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-nav-buttons`
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentMonth(m => m === MONTH_LENGTH ? (setCurrentYear(y => y + 1), 0) : m + 1)
  }, "\u203A"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentYear(y => y + 1)
  }, "\xBB"))), viewMode === 'day' && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-grid day`
  }, localeWeekdays.map(day => /*#__PURE__*/React.createElement("div", {
    key: day,
    className: `${prefixCls}-day-header`
  }, day)), days.map(({
    day,
    current,
    month,
    year
  }, idx) => {
    const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
    return /*#__PURE__*/React.createElement("button", {
      key: `${year}-${month}-${day}-${idx}`,
      className: clsx([`${prefixCls}-day`, {
        [`${prefixCls}-selected`]: isSelected,
        [`${prefixCls}-other-month`]: !current
      }]),
      onClick: () => handleSelect(day, month, year),
      disabled: disabledDate?.(new Date(year, month, day), {
        from: undefined,
        to: undefined
      })
    }, day);
  })), viewMode === 'month' && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-grid`
  }, localeMonths.map((m, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: `${prefixCls}-month`,
    onClick: () => {
      setCurrentMonth(i);
      setViewMode('day');
    },
    disabled: isMonthDisabled(i)
  }, m))), viewMode === 'year' && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-grid`
  }, Array.from({
    length: 12
  }, (_, i) => {
    const year = currentYear - NUMBER_SIX + i;
    return /*#__PURE__*/React.createElement("button", {
      key: year,
      className: `${prefixCls}-year`,
      disabled: isYearDisabled(year),
      onClick: () => {
        setCurrentYear(year);
        setViewMode('month');
      }
    }, year);
  })), showToday && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-day-footer`,
    style: {
      gridColumn: 'span 7'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `${prefixCls}-select`,
    disabled: disabledDate?.(new Date(DateNow.getDate(), DateNow.getMonth(), DateNow.getFullYear()), {
      from: undefined,
      to: undefined
    }),
    onClick: () => {
      handleSelect(DateNow.getDate(), DateNow.getMonth(), DateNow.getFullYear());
    }
  }, locale?.today || 'Today')))));
};
const DatePicker = Object.assign(DatePickerComponent, {
  RangePicker
});

var DatePicker$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	MONTH_LENGTH: MONTH_LENGTH,
	NEXT_DAYS_COUNT_AS_CURRENT_MUNTH: NEXT_DAYS_COUNT_AS_CURRENT_MUNTH,
	NUMBER_SIX: NUMBER_SIX,
	default: DatePicker
});

var css_248z$d = ".xUi-timepicker-wrapper{display:inline-block;font-size:14px;position:relative}.xUi-timepicker-input-wrapper{position:relative;width:100%}.xUi-timepicker-input{border:1px solid var(--xui-border-color);border-radius:6px;box-sizing:border-box;font-size:14px;height:32px;line-height:32px;padding:4px 11px;transition:all .3s;width:100%}.xUi-timepicker-input:focus,.xUi-timepicker-input:hover{border-color:var(--xui-primary-color-light)}.xUi-timepicker-input:focus{outline:none}.xUi-timepicker-input::placeholder{opacity:.6}.xUi-timepicker-clear{color:rgba(0,0,0,.45);cursor:pointer;font-size:12px;position:absolute;right:8px;top:50%;transform:translateY(-50%);z-index:2}.xUi-timepicker-clear:hover{color:rgba(0,0,0,.75)}.xUi-timepicker-popup{background:#fff;border:1px solid var(--xui-border-color);border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.15);display:flex;left:0;margin-top:4px;padding:8px 4px;position:absolute;top:100%;z-index:1}.xUi-timepicker-panel{display:flex;width:100%}.xUi-timepicker-column{align-items:center;display:flex;flex:1;flex-direction:column;margin-bottom:5px;max-height:169px;overflow-y:auto;padding-left:4px;width:45px}.xUi-timepicker-column::-webkit-scrollbar,.xUi-timepicker-column::-webkit-scrollbar-thumb{width:4px}.xUi-timepicker-column:nth-child(2){border-left:1px solid var(--xui-border-color);border-right:1px solid var(--xui-border-color)}.xUi-timepicker-cell{align-items:center;border-radius:4px;cursor:pointer;display:flex;font-size:14px;justify-content:center;padding:6px 0;text-align:center;transition:background .3s;width:44px}.xUi-timepicker-cell:hover{background-color:#e9e9e9}.xUi-timepicker-cell-selected{background-color:#e6f4ff;font-weight:500}.xUi-timepicker-cell-disabled{color:rgba(0,0,0,.25);pointer-events:none;user-select:none}.xUi-timepicker-now-btn{color:#4096ff;cursor:pointer;font-weight:500;margin-top:10px;padding:0 0 4px;text-align:center;transition:background .3s}.xUi-timepicker-icons{align-items:center;display:flex;gap:4px;position:absolute;right:8px;top:50%;transform:translateY(-50%)}.xUi-timepicker-suffix{align-items:center;cursor:pointer;display:flex;justify-content:center}.xUi-timepicker-suffix svg{color:#999;height:14px;width:14px}.xUi-timepicker-clear{right:0;top:1px}.xUi-timepicker-actions{align-items:center;border-top:1px solid var(--xui-border-color);display:flex;justify-content:space-between;padding:0 4px}.xUi-timepicker-ok-btn{background-color:var(--xui-primary-color);border:none;border-radius:4px;color:#fff;cursor:pointer;margin-top:7px;outline:none;padding:4px 8px;transition:.3s ease}.xUi-timepicker-ok-btn:disabled{background-color:var(--xui-color-disabled);color:grey;font-size:13px}.xUi-timepicker-ok-btn:not(:disabled):hover{background-color:var(--xui-primary-color-light)}";
styleInject(css_248z$d);

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
  clearIcon = /*#__PURE__*/React.createElement(ClearIcon, null),
  suffixIcon = /*#__PURE__*/React.createElement(TimeIcon, null),
  placeholder = 'Select time'
}) => {
  const [open, setOpen] = useState(false);
  const [innerValue, setInnerValue] = useState(propValue || defaultValue ? new Date(propValue || defaultValue) : null);
  const [tempValue, setTempValue] = useState(null);
  const inputRef = useRef(null);
  const popupRef = useRef(null);
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);
  useEffect(() => {
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
  useEffect(() => {
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
  useEffect(() => {
    onSelect?.(tempValue);
  }, [tempValue, onSelect]);
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
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-panel`
    }, /*#__PURE__*/React.createElement("div", {
      ref: hourRef,
      className: `${prefixCls}-column`
    }, hours.map((h, index) => h === false ? /*#__PURE__*/React.createElement("div", {
      key: `${h}_${index}`,
      className: `${prefixCls}-cell`,
      style: {
        opacity: 0,
        userSelect: 'none',
        cursor: 'inherit'
      }
    }, "0") : /*#__PURE__*/React.createElement("div", {
      key: h,
      className: clsx([`${prefixCls}-cell`, {
        [`${prefixCls}-cell-disabled`]: getDisabled('hour').includes(h),
        [`${prefixCls}-cell-selected`]: selectedHour === h
      }]),
      onClick: () => !getDisabled('hour').includes(h) && onSelectHour(h)
    }, pad(h)))), /*#__PURE__*/React.createElement("div", {
      ref: minuteRef,
      className: `${prefixCls}-column`
    }, minutesSeconds.map((m, index) => m === false ? /*#__PURE__*/React.createElement("div", {
      key: `${m}_${index}`,
      className: `${prefixCls}-cell`,
      style: {
        opacity: 0,
        userSelect: 'none',
        cursor: 'inherit'
      }
    }, "0") : /*#__PURE__*/React.createElement("div", {
      key: m,
      className: clsx([`${prefixCls}-cell`, {
        [`${prefixCls}-cell-disabled`]: getDisabled('minute', currentHour).includes(m),
        [`${prefixCls}-cell-selected`]: selectedMinute === m
      }]),
      onClick: () => !getDisabled('minute', currentHour).includes(m) && onSelectMinute(m)
    }, pad(m)))), /*#__PURE__*/React.createElement("div", {
      ref: secondRef,
      className: `${prefixCls}-column`
    }, minutesSeconds.map((s, index) => s === false ? /*#__PURE__*/React.createElement("div", {
      key: `${s}_${index}`,
      className: `${prefixCls}-cell`,
      style: {
        opacity: 0,
        userSelect: 'none',
        cursor: 'inherit'
      }
    }, "0") : /*#__PURE__*/React.createElement("div", {
      key: s,
      className: clsx([`${prefixCls}-cell`, {
        [`${prefixCls}-cell-disabled`]: getDisabled('second', currentHour, currentMinute).includes(s),
        [`${prefixCls}-cell-selected`]: selectedSecond === s
      }]),
      onClick: () => !getDisabled('second', currentHour, currentMinute).includes(s) && onSelectSecond(s)
    }, pad(s))))), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-actions`
    }, showNow ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-now-btn`,
      onClick: handleShowNow
    }, "Now") : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("button", {
      className: `${prefixCls}-ok-btn`,
      disabled: selectedHour === null || selectedMinute === null || selectedSecond === null,
      onClick: handleOkButton
    }, "OK")));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: clsx([`${prefixCls}-wrapper`, className]),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-input-wrapper`,
    onClick: () => setOpen(true)
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: inputRef,
    size: INPUT_SIZE,
    placeholder: placeholder,
    className: `${prefixCls}-input`,
    readOnly: inputReadOnly,
    onChange: handleOnChange
  }, open ? {} : {
    value: formatDate(innerValue)
  }, {
    onBlur: e => {
      onBlur?.(e, {
        source: 'input'
      });
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-icons`
  }, clearIcon && innerValue ? /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-clear`,
    onClick: handleClear
  }, clearIcon) : suffixIcon && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-suffix`,
    onClick: e => {
      e.stopPropagation();
      setOpen(true);
    }
  }, suffixIcon))), open && /*#__PURE__*/React.createElement("div", {
    ref: popupRef,
    className: `${prefixCls}-popup`
  }, renderOptions()));
};

var TimePicker$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: TimePicker
});

var css_248z$c = ".xUi-textarea-wrapper{margin-bottom:10px;position:relative;width:100%}.xUi-textarea{border:none;border-radius:6px;box-shadow:none;color:var(--xui-text-color);font-size:14px;min-height:14px;outline:none;padding:8px 12px;resize:vertical;transition:all .3s ease;width:100%}.xUi-textarea:placeholder-shown{font-size:14px;text-overflow:ellipsis}.xUi-textarea::placeholder{color:var(--xui-text-color);opacity:.6}.xUi-textarea-small{font-size:12px;padding:6px 10px}.xUi-textarea-middle{font-size:14px;padding:8px 12px}.xUi-textarea-large{padding:10px}.xUi-textarea-outlined{background:transparent;border:1px solid var(--xui-border-color)}.xUi-textarea-outlined:focus{border-color:var(--xui-primary-color)}.xUi-textarea-borderless{background:transparent;border:none}.xUi-textarea-filled{background:var(--xui-primary-color);border:1px solid var(--xui-border-color)}.xUi-textarea-filled:focus{background:var(--xui-background-color);border-color:var(--xui-primary-color)}.xUi-textarea-underlined{background:transparent;border:none;border-bottom:1px solid var(--xui-border-color)}.xUi-textarea-underlined:focus{border-bottom-color:var(--xui-primary-color)}.xUi-textarea-container:has(.xUi-textarea-bordered){border:1px solid var(--xui-border-color)}.xUi-textarea-container:has(.xUi-textarea-success){border-color:var(--xui-success-color)}.xUi-textarea-wrapper:has(.xUi-textarea-error) textarea,.xUi-textarea-wrapper:has(.xUi-textarea-error) textarea:focus{border:1px solid var(--xui-error-color)}.xUi-textarea-clear{background:transparent;border:none;color:#999;cursor:pointer;position:absolute;right:0;top:15px;transform:translateY(-50%)}.xUi-textarea-clear:hover{color:#333}";
styleInject(css_248z$c);

const Textarea = /*#__PURE__*/forwardRef(({
  prefixCls = prefixClsTextArea,
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
  ...props
}, ref) => {
  const [inputValue, setInputValue] = useState(value?.toString() || '');
  const textareaRef = useRef(null);
  useEffect(() => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-wrapper ${rootClassName || ''}`
  }, /*#__PURE__*/React.createElement("textarea", _extends({}, props, {
    ref: ref || textareaRef,
    value: inputValue,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    style: {
      ...styles?.textarea,
      ...style
    },
    className: clsx([`${prefixCls} ${prefixCls}-${size} ${prefixCls}-${variant} ${className}`, {
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-success`]: status === 'success',
      [`${prefixCls}-error`]: status === 'error' || error
    }])
  })), allowClear && inputValue && /*#__PURE__*/React.createElement("button", {
    className: `${prefixCls}-clear`,
    onClick: handleClear
  }, "\u2715"));
});
Textarea.displayName = 'Textarea';

var Textarea$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: Textarea
});

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

var css_248z$b = ".xUi-input-container{align-items:center;background-color:transparent;border:1px solid var(--xui-border-color);border-radius:var(--xui-border-radius-sm);display:flex;overflow:hidden}.xUi-input-container:not(.xUi-input-error):not(.xUi-input-disabled):has(.xUi-input):hover,.xUi-input-container:not(.xUi-input-error):not(.xUi-input-disabled):has(.xUi-input:focus){border:1px solid var(--xui-primary-color)}.xUi-input-container.xUi-input-error{border-color:var(--xui-error-color)}.xUi-input-container.xUi-input-error .error-svg-icon,.xUi-input-suffix .error-svg-icon{color:var(--xui-error-color)}.xUi-input-wrapper{align-items:center;display:flex;flex-grow:1;margin:-1px;position:relative;transition:border .3s}.xUi-input,.xUi-input-wrapper{background-color:transparent;height:-webkit-fill-available}.xUi-input{border:none;color:var(--xui-text-color);flex:1;outline:none;padding:.1px 7px;width:100%}.xUi-input:placeholder-shown{text-overflow:ellipsis}.xUi-input::placeholder{color:var(--xui-text-color);opacity:.6}.xUi-input-prefix,.xUi-input-suffix{background-color:transparent;gap:4px}.xUi-input-addon,.xUi-input-prefix,.xUi-input-suffix{align-items:center;color:var(--xui-text-color);display:flex;height:-webkit-fill-available;padding:0 7px}.xUi-input-addon.xUi-input-after{border-left:1px solid var(--xui-border-color)}.xUi-input-addon.xUi-input-before{border-right:1px solid var(--xui-border-color)}.xUi-input-large .xUi-input-addon{padding:0 10px}.xUi-input-clear{align-items:center;cursor:pointer;display:flex;margin:0 5px;position:relative;width:16px}.xUi-input-clear svg{color:var(--xui-text-color)}.xUi-input-disabled,.xUi-input-disabled .xUi-input,.xUi-input-disabled .xUi-input-suffix{background-color:var(--xui-color-disabled);cursor:not-allowed}.xUi-input-small{height:22px}.xUi-input-large .xUi-input-clear,.xUi-input-small .xUi-input,.xUi-input-small .xUi-input::placeholder{font-size:var(--xui-font-size-md)}.xUi-input-middle{border-radius:var(--xui-border-radius-md);height:30px}.xUi-input-large .xUi-input-clear,.xUi-input-middle .xUi-input,.xUi-input-middle .xUi-input::placeholder{font-size:var(--xui-font-size-md)}.xUi-input-large{border-radius:var(--xui-border-radius-lg);height:44px}.xUi-input-large .xUi-input,.xUi-input-large .xUi-input-clear,.xUi-input-large .xUi-input::placeholder{font-size:var(--xui-font-size-lg)}";
styleInject(css_248z$b);

const InputComponent = /*#__PURE__*/forwardRef(({
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
  className = '',
  value = undefined,
  iconRender,
  noStyle,
  feedbackIcons,
  mask,
  maskChar = MASK_CHAR,
  maskRegex = MASK_REGEX,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __injected,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultValue,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  child,
  ...props
}, ref) => {
  const inputRef = useRef(null);
  const lastKeyPressed = useRef(null);
  const internalValue = mask ? applyMask(stripMask(`${value ?? ''}`, mask, maskChar), mask, maskChar).masked : value ?? '';
  const [maskValue, setMaskValue] = useState(internalValue);
  const [iconRenderVisible, setIconRenderVisible] = useState(false);
  const animationRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    focus: inputRef.current?.focus,
    input: inputRef.current,
    blur: inputRef.current.blur,
    nativeElement: inputRef.current,
    setSelectionRange: (start, end) => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(start, end);
      }
    }
  }), [ref, inputRef.current]);
  useEffect(() => {
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
    if (rawInput === mask) {
      rawInput = '';
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
  return /*#__PURE__*/React.createElement("div", {
    className: clsx([`${prefixCls}-container`, {
      [`${prefixCls}-error`]: error,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-${size}`]: size,
      noStyle: noStyle
    }, className]),
    style: props.style
  }, addonBefore && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-addon ${prefixCls}-before`
  }, addonBefore), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-wrapper`
  }, prefix && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-prefix`
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({}, props, {
    ref: inputRef
  }, props.type === 'password' && iconRender ? {
    type: iconRenderVisible ? 'text' : 'password'
  } : {}, {
    disabled: disabled,
    value: maskValue,
    onChange: handleChange,
    onKeyDown: handleOnKeyDown,
    className: clsx([prefixCls, className])
  })), allowClear && internalValue ? /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-clear`,
    onClick: handleClear
  }, /*#__PURE__*/React.createElement(ErrorIcon, null)) : null, (suffix || iconRender) && /*#__PURE__*/React.createElement("span", _extends({
    className: `${prefixCls}-suffix`
  }, iconRender !== undefined ? {
    onClick: () => setIconRenderVisible(icon => !icon)
  } : {}), suffix || iconRender?.(iconRenderVisible), error && feedbackIcons ? /*#__PURE__*/React.createElement(ErrorIcon, null) : null)), addonAfter ? /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-addon ${prefixCls}-after`
  }, addonAfter) : null);
});
InputComponent.displayName = 'Input';
const Input$1 = InputComponent;
Input$1.TextArea = Textarea;

var Input$2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: Input$1
});

var css_248z$a = ".xUi-radio-label{align-items:center;cursor:pointer;display:inline-flex;font-size:var(--xui-font-size-md);line-height:1;margin:16px 0;position:relative}.xUi-radio-label input{display:none}.xUi-radio{border:1px solid var(--xui-border-color);border-radius:50%;height:16px;position:relative;transition:all .3s;width:16px}.xUi-radio-error:not(.xUi-radio-disabled){border:1px solid var(--xui-error-color)}.xUi-radio-label input:checked+.xUi-radio-error:not(.xUi-radio-disabled){background:var(--xui-error-color)}.xUi-radio-group{display:flex}.xUi-radio-label .xUi-radio-enabled:not(.xUi-radio-error):hover{border:1px solid var(--xui-primary-color-light)!important}.xUi-radio-disabled{background-color:var(--xui-color-disabled)}.xUi-radio-title{color:var(--xui-text-color);padding-inline-end:8px;padding-inline-start:8px}.xUi-radio-label input:checked+.xUi-radio{background:var(--xui-primary-color)}.xUi-radio-label input:checked+.xUi-radio:after{background-color:#fff;border-radius:50%;content:\"\";height:6px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:6px}.xUi-radio-label.disabled{cursor:not-allowed;opacity:.5}";
styleInject(css_248z$a);

const Radio = /*#__PURE__*/forwardRef(({
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
  noStyle
}, ref) => {
  const handleChange = () => {
    if (!disabled) {
      onClick?.(parseValue(title ?? value));
      onChange?.(parseValue(title ?? value));
    }
  };
  useEffect(() => {
    if (defaultChecked ?? checked) {
      onChange?.(parseValue(value));
    }
  }, [defaultChecked, checked]);
  return /*#__PURE__*/React.createElement("label", {
    ref: ref,
    title: title,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    className: clsx([`${prefixCls}-label`, {
      disabled,
      noStyle: noStyle,
      [className]: className
    }])
  }, /*#__PURE__*/React.createElement("input", {
    name: name,
    type: "radio",
    onClick: onClick,
    disabled: disabled,
    onChange: handleChange,
    onBlur: e => onBlur?.(e),
    onFocus: e => onFocus?.(e),
    checked: checked ?? defaultChecked
  }), /*#__PURE__*/React.createElement("span", {
    className: clsx([`${prefixCls} ${prefixCls}-${disabled ? 'disabled' : 'enabled'}`])
  }), /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-title`
  }, children ?? title ?? value));
});
Radio.displayName = 'Radio';

var Radio$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: Radio
});

var css_248z$9 = ".xUi-radio-button{align-items:center;background:var(--xui-background-color);border:1px solid var(--xui-border-color);border-radius:var(--xui-border-radius-sm);cursor:pointer;display:inline-flex;height:-webkit-fill-available;justify-content:center;margin:-1px;padding:8px 16px;transition:all .3s}.xUi-radio-button .xUi-radio{display:none}.xUi-radio-button.xUi-radio-button-middle{border-radius:var(--xui-border-radius-md)}.xUi-radio-button.xUi-radio-button-large{border-radius:var(--xui-border-radius-lg)}.xUi-radio-button-checked{background:var(--xui-primary-color);border-color:var(--xui-primary-color);color:var(--xui-background-color);z-index:1}.xUi-radio-button-content{font-size:14px}.xUi-radio-button.disabled{background:var(--xui-color-disabled);border-color:var(--xui-border-color);color:var(--xui-color-disabled);cursor:not-allowed}";
styleInject(css_248z$9);

const RadioButton = ({
  prefixCls = prefixClsRadio,
  className = '',
  checked,
  disabled,
  children,
  size = 'large',
  ...props
}) => {
  return /*#__PURE__*/React.createElement(Radio, _extends({}, props, {
    checked: checked,
    disabled: disabled,
    className: clsx([`${prefixCls}-button`, {
      disabled,
      [className]: className,
      [`${prefixCls}-button-${size}`]: size,
      [`${prefixCls}-button-checked`]: checked
    }])
  }), /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-button-content`
  }, children ?? props.value));
};

var Button$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: RadioButton
});

var css_248z$8 = ".xUi-radio-group.xUi-radio-group-small{height:24px}.xUi-radio-group.xUi-radio-group-small .xUi-radio-button:first-child{border-radius:var(--xui-border-radius-sm) 0 0 var(--xui-border-radius-sm)}.xUi-radio-group.xUi-radio-group-small .xUi-radio-button:last-child{border-radius:0 var(--xui-border-radius-sm) var(--xui-border-radius-sm) 0}.xUi-radio-group.xUi-radio-group-middle{height:32px}.xUi-radio-group.xUi-radio-group-middle .xUi-radio-button:first-child{border-radius:var(--xui-border-radius-md) 0 0 var(--xui-border-radius-md)}.xUi-radio-group.xUi-radio-group-middle .xUi-radio-button:last-child{border-radius:0 var(--xui-border-radius-md) var(--xui-border-radius-md) 0}.xUi-radio-group.xUi-radio-group-large{height:44px}.xUi-radio-group.xUi-radio-group-large .xUi-radio-button:first-child{border-radius:var(--xui-border-radius-lg) 0 0 var(--xui-border-radius-lg)}.xUi-radio-group.xUi-radio-group-large .xUi-radio-button:last-child{border-radius:0 var(--xui-border-radius-lg) var(--xui-border-radius-lg) 0}.xUi-radio-group .xUi-radio-button:not(:first-child){border-radius:0}.xUi-radio-group.block{display:inline-flex;width:100%}.xUi-radio-group.block .xUi-radio-button{width:100%}.xUi-radio-group:not(.xUi-radio-group-solid) .xUi-radio-button-checked{background-color:var(--xui-background-color);color:var(--xui-primary-color)}";
styleInject(css_248z$8);

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
  className = '',
  options = [],
  children,
  ...props
}) => {
  const selectedValue = useMemo(() => value !== undefined ? value : defaultValue, [value, defaultValue]);
  const renderChildren = () => {
    if (options.length > 0) {
      return options.map((option, key) => {
        const optionValue = typeof option === 'object' ? option.value : option;
        const optionLabel = typeof option === 'object' ? option.label : option;
        return /*#__PURE__*/React.createElement(Radio, _extends({
          value: optionValue,
          key: `${key}_${optionValue}`,
          checked: selectedValue === optionValue,
          disabled: disabled || typeof option === 'object' && option.disabled
        }, props), optionLabel);
      });
    }
    return Children.map(children, child => {
      if (/*#__PURE__*/isValidElement(child) && (child.type === Radio || child.type === RadioButton)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const {
          ...childProps
        } = child.props;
        return /*#__PURE__*/React.createElement(child.type, _extends({}, props, childProps, child.type === RadioButton ? {
          size,
          buttonStyle
        } : {}, {
          defaultValue: defaultValue,
          disabled: disabled ?? child.props.disabled,
          checked: selectedValue === child.props.value,
          name: name ?? prefixClsRadio
        }));
      }
      return child;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    style: style,
    className: clsx([`${prefixCls}-group`, {
      block,
      className,
      [`${prefixCls}-group-${size}`]: size,
      [`${prefixCls}-group-solid`]: buttonStyle === 'solid'
    }])
  }, renderChildren());
};

var Group = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: RadioGroup
});

var css_248z$7 = ".xUi-select-options{list-style:none;margin:0;padding:4px}.xUi-select-option,.xUi-select-options{border-radius:var(--xui-border-radius-sm)}.xUi-select-option{align-items:center;color:var(--xui-text-color);cursor:pointer;display:flex;font-size:var(--xui-font-size-md);margin-bottom:2px;padding:8px 16px}.xUi-select-option.xUi-select-focused,.xUi-select-option:hover{background-color:var(--xui-primary-color);color:var(--xui-background-color)}.xUi-select-option.xUi-select-focused{align-items:center;display:flex;font-weight:600;justify-content:space-between}.xUi-select-option.xUi-select-disabled{color:rgba(0,0,0,.25);cursor:not-allowed}.xUi-select-option.selected{background-color:var(--xui-primary-color);color:var(--xui-background-color)}.xUi-select-option.selected:hover{background-color:var(--xui-primary-color-light)}";
styleInject(css_248z$7);

const Option = ({
  value,
  children,
  disabled,
  className = '',
  style,
  onClick,
  render,
  prefixCls = prefixClsSelect,
  selected,
  title
}) => {
  const handleClick = e => {
    if (disabled) {
      return;
    }
    onClick?.(e);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx([`${prefixCls}-option ${className} `, {
      selected: selected,
      disabled: disabled
    }]),
    style: style,
    onClick: handleClick
  }, title ? {
    title
  } : {}), render ? render(value) : children || value);
};

var Option$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: Option
});

var css_248z$6 = ".xUi-select .xUi-select-tag-container{display:flex;flex:auto;flex-wrap:wrap;gap:4px;line-height:12px;position:relative}.xUi-select .xUi-select-tag-container-fixHeight{max-height:32px!important;overflow:hidden}.xUi-select.large .xUi-select-tag-container,.xUi-select.middle .xUi-select-tag-container{line-height:22px}.xUi-select .xUi-select-tag{align-items:center;align-self:center;background:rgba(0,0,0,.06);border:1px solid transparent;border-radius:var(--xui-border-radius-sm);box-sizing:border-box;cursor:default;display:flex;flex:none;height:100%;max-width:100%;overflow:hidden;padding:2px;text-overflow:ellipsis;transition:font-size .3s,line-height .3s,height .3s;white-space:nowrap}.xUi-select.middle .xUi-select-tag{padding:4px 8px}.xUi-select.large .xUi-select-tag{font-size:var(--xui-font-size-lg);padding:4px 8px}.xUi-select .xUi-select-tag span{font-size:var(--xui-font-size-sm);margin:0 2px}.xUi-select .xUi-select-tag .xUi-select-tag-close-icon{color:rgba(0,0,0,.5);cursor:pointer;font-size:var(--xui-font-size-xs)}.xUi-select .xUi-select-tag .xUi-select-tag-close-icon:hover{color:var(--xui-text-color)}.xUi-select .xUi-select-tag:has([class=xUi-select-tag-input]){background:transparent;border:none;color:var(--xui-text-color);font-size:var(--xui-font-size-md);outline:none;padding:0}.xUi-select .xUi-select-tag:has([class=xUi-select-tag-input]) input{background-color:transparent;border:none;font-size:var(--xui-font-size-md);height:-webkit-fill-available;padding:0}.xUi-select .xUi-select-tag-input:focus{border:none;box-shadow:none;outline:none}";
styleInject(css_248z$6);

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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style,
      backgroundColor: color
    },
    className: `${prefixCls}-tag ${className}`
  }, /*#__PURE__*/React.createElement("span", null, label !== undefined ? label : value), closable && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-tag-close-icon`,
    onClick: handleOnClick
  }, icon || /*#__PURE__*/React.createElement(React.Fragment, null, "\u2715")));
};

var Tag$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: Tag
});

const ConditionalWrapper = ({
  condition,
  wrapper,
  children
}) => condition ? wrapper(children) : children;

var css_248z$5 = "@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.xUi-select{background-color:transparent;border:1px solid var(--xui-border-color);border-radius:var(--xui-border-radius-sm);box-sizing:border-box;color:var(--xui-text-color);display:inline-flex;flex-direction:row-reverse;min-height:24px;padding:2px 8px;position:relative;width:100%}.xUi-select-disabled{background:rgba(0,0,0,.04)}.xUi-select-arrow{align-items:center;color:var(--xui-text-color-light);display:flex;gap:6px;margin:0 4px}.xUi-select-arrow svg{align-items:center;display:flex;justify-content:center}.xUi-select-loading{animation:spin 1s linear infinite;color:var(--xui-text-color-light);display:inline-block;margin:0 8px}.xUi-select .xUi-select-trigger{align-items:center;background:transparent;border-radius:var(--xui-border-radius-sm);cursor:pointer;display:flex;justify-content:space-between;width:100%}.xUi-select .xUi-select-clear-btn{background:none;border:none;color:#999;cursor:pointer;font-size:var(--xui-font-size-lg);line-height:1;margin:0 8px;padding:0}.xUi-select .xUi-select-clear-btn:hover{color:var(--xui-primary-color)}.xUi-select-dropdown{background-color:var(--xui-select-background-color);border-radius:var(--xui-border-radius-sm);box-shadow:0 4px 12px rgba(0,0,0,.15);left:0;margin-top:5px;max-height:350px;overflow-y:auto;position:absolute;right:unset;top:100%;width:inherit;z-index:10}.xUi-select-dropdown.bottomRight,.xUi-select-dropdown.topRight{left:unset;right:0}.xUi-select .xUi-select-loading-spinner{color:#999;padding:10px;text-align:center}.xUi-select:focus-within{border-color:var(--xui-primary-color-light);box-shadow:none}.xUi-select:hover:not(.xUi-select-disabled){border-color:var(--xui-primary-color)}.xUi-select-disabled,.xUi-select-disabled .xUi-select-input,.xUi-select-disabled .xUi-select-trigger{cursor:not-allowed!important;opacity:.6!important}.xUi-select-selected-icon{color:var(--xui-primary-color-light)}.xUi-select-error{border-color:var(--xui-error-color)}.xUi-select-arrow .error-svg-icon,.xUi-select-error .error-svg-icon{color:var(--xui-error-color)}.xUi-select .xUi-select-input{align-items:center;background:transparent;border:none;color:var(--xui-text-color);cursor:pointer;display:inline-flex;font-size:var(--xui-font-size-md);height:auto;height:-webkit-fit-content;outline:none;padding:0;user-select:none;width:100%}.xUi-select .xUi-select-input:focus{border:none;box-shadow:none;outline:none}.xUi-select.middle{border-radius:var(--xui-border-radius-md);min-height:30px}.xUi-select.middle,.xUi-select.middle input{font-size:var(--xui-font-size-md)}.xUi-select.middle .xUi-select-trigger{border-radius:var(--xui-border-radius-md)}.xUi-select.large{font-size:var(--xui-font-size-lg);min-height:44px}.xUi-select.large,.xUi-select.large .xUi-select-trigger{border-radius:var(--xui-border-radius-lg)}.xUi-select input{font-size:var(--xui-font-size-lg)}";
styleInject(css_248z$5);

const LIST_HEIGHT = 200;
const PADDING_PLACEMENT = 16;
const PADDING_TAG_INPUT = 4;
const FORM_MARGIN_BOTTOM = 20;
function getTextFromNode(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return node.toString();
  }
  if (/*#__PURE__*/isValidElement(node)) {
    const html = ReactDOMServer.renderToStaticMarkup(node);
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
  return '';
}
const SelectComponent = /*#__PURE__*/forwardRef(({
  prefixCls = prefixClsSelect,
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
  showArrow = true,
  notFoundContent = false,
  noStyle,
  feedbackIcons,
  placement = 'bottomLeft',
  removeIcon,
  maxTagCount,
  onSearch,
  onSelect,
  onDeselect,
  onClear,
  onChange,
  onClose,
  tagRender,
  getPopupContainer,
  dropdownRender,
  onDropdownVisibleChange
}, ref) => {
  const asTag = mode === 'tags';
  const asMultiple = mode === 'multiple';
  const hasMode = asTag || asMultiple;
  const initialValue = useMemo(() => value ?? defaultValue ?? '', [value, defaultValue]);
  const checkModeInitialValue = useMemo(() => (!Array.isArray(initialValue) ? [initialValue] : initialValue).filter(e => e !== undefined && e !== ''), [initialValue]);
  const [isHover, setIsHover] = useState(false);
  const selectRef = useRef(null);
  const [searchInputWidth, setSearchInputWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isOpenChecker, setIsOpenChecker] = useState(isOpen);
  const [searchQuery, setSearchQuery] = useState(searchValue || '');
  const [dropdownPosition, setDropdownPosition] = useState({});
  const [lastTagWidth, setLastTagWidth] = useState(0);
  const tagContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const [responsiveTagCount, setResponsiveTagCount] = useState(null);
  const [selected, setSelected] = useState(hasMode ? checkModeInitialValue : initialValue);
  useImperativeHandle(ref, () => ({
    focus: () => selectRef.current?.focus(),
    blur: () => selectRef.current?.blur(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    scrollTo: (...args) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    selectRef.current?.scrollTo(...args),
    nativeElement: selectRef.current
  }), [ref, selectRef.current]);
  const handleMouseEnter = () => !disabled && selected?.length && setIsHover(true);
  const handleMouseLeave = () => !disabled && setIsHover(false);
  const handleClearInputValue = useCallback(() => {
    if (!autoClearSearchValue) {
      return;
    }
    setSearchQuery('');
    onSearch?.('');
    let inputContainer = selectRef.current?.querySelector(`[id='${prefixCls}-search-tag-input']`);
    if (!inputContainer) {
      inputContainer = selectRef.current?.querySelector("[content-editable='plaintext-only']");
    }
    if (inputContainer) {
      inputContainer.innerText = '';
    }
  }, [autoClearSearchValue, prefixCls]);
  useEffect(() => {
    setSelected(hasMode ? checkModeInitialValue : initialValue);
  }, [checkModeInitialValue, hasMode, initialValue]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = event => {
    if (!selectRef.current) return;
    const dropdown = document.querySelector(`.${prefixCls}-dropdown`);
    const clickedInside = selectRef.current.contains(event?.target) || dropdown && dropdown.contains(event?.target);
    if (!clickedInside) {
      setIsOpen(false);
      handleClearInputValue();
      onClose?.();
      onDropdownVisibleChange?.(false, selected);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
  const updateDropdownPosition = useCallback(searchQueryUpdated => {
    if (!selectRef.current) {
      return;
    }
    const triggerNode = selectRef.current?.querySelector(`.${prefixCls}-trigger`);
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
  useEffect(() => {
    setIsOpenChecker(isOpen);
    if (!isOpen) {
      setDropdownPosition({});
      setSearchFocused(false);
    }
  }, [isOpen]);
  useEffect(() => {
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
  useEffect(() => {
    updateDropdownPosition(true);
  }, [searchQuery.length]);
  const getScrollParents = element => {
    const parents = [];
    let current = element.parentElement;
    while (current) {
      if (current.scrollHeight > current.clientHeight) {
        parents.push(current);
      }
      current = current.parentElement;
    }
    return parents;
  };
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
    onSelect?.(updatedSelected);
    const input = selectRef.current?.querySelector('input');
    if (input) {
      input.value = '';
    }
    setSelected(updatedSelected);
    handleClearInputValue();
  };
  const handleSelect = (e, optionValue, option) => {
    if (hasMode) {
      if (maxCount && selected.length >= maxCount && !selected.includes(optionValue)) {
        return;
      }
      const newSelection = selected.includes(optionValue) ? selected.filter(item => item !== optionValue) : [...selected, optionValue];
      setSelected(newSelection);
      onChange?.(newSelection, option);
      if (selected.includes(optionValue)) {
        onDeselect?.(optionValue, option);
      } else {
        onSelect?.(optionValue, option);
      }
    } else {
      setIsOpen(defaultOpen);
      setSelected(optionValue);
      onChange?.(optionValue, option);
      onSelect?.(optionValue, option);
    }
    handleClearInputValue();
  };
  const handleClear = () => {
    const value = hasMode ? [] : '';
    setSelected(value);
    onChange?.('');
    onSelect?.('');
    onClear?.();
    handleClearInputValue();
  };
  const handleRemoveTag = e => handleSelect(e, e.target.value);
  const handleOnKeyDown = e => {
    if (!isOpen) {
      return;
    }
    const timeout = setTimeout(() => {
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
            onDeselect?.(selected[selected.length - 1]);
          }
          onChange?.(updatedSelected);
          setSelected(updatedSelected);
        }
      }
      clearTimeout(timeout);
    });
  };
  const ArrowContainer = useMemo(() => {
    if (!showArrow) {
      return null;
    }
    return showSearch && isOpen ? searchIcon || /*#__PURE__*/React.createElement(SearchIcon, null) : /*#__PURE__*/React.createElement("span", null, suffixIcon || showArrow && /*#__PURE__*/React.createElement(ArrowIcon, {
      isOpen: isOpen
    }));
  }, [showArrow, showSearch, isOpen, suffixIcon, searchIcon]);
  const extractedOptions = children ? extractOptions(children) : Array.isArray(options) ? options : [];
  const triggerNode = useMemo(() => {
    return selectRef.current?.querySelector(`.${prefixCls}-trigger`);
  }, [prefixCls]);
  function extractOptions(children, options) {
    const result = [];
    const flatten = nodes => {
      try {
        Children.forEach(nodes, child => {
          if (!child) return;
          if (/*#__PURE__*/isValidElement(child)) {
            if (child.type === Fragment || child.type === Suspense) {
              flatten(child.props.children);
            } else {
              result.push(child.props);
            }
          }
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        Object.assign(result, nodes);
      }
    };
    if (children) {
      flatten(children);
      return result;
    }
    return options || [];
  }
  const filteredOptions = extractedOptions.filter(option => {
    if (typeof filterOption === 'function') {
      return filterOption(searchQuery, option);
    }
    if (filterOption === false) {
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const optionFilterPropValue = option[optionFilterProp];
    const valueToCheck = optionFilterProp && typeof optionFilterPropValue === 'string' ? String(optionFilterPropValue) : Array.isArray(option.children) && typeof option.children[0] === 'string' ? option.children[0] : getTextFromNode(option.children) || String(option.label) || String(option.value);
    return valueToCheck.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      onDropdownVisibleChange?.(!isOpen, selected);
    }
    const searchContent = selectRef.current?.getElementsByClassName(`${prefixCls}-tag-container`)?.[0];
    if (searchContent) {
      setSearchInputWidth(searchContent.clientWidth - PADDING_TAG_INPUT);
    }
    const timeout = setTimeout(() => {
      const searchInput = document.getElementById(`${prefixCls}-search-tag-input`);
      if (searchInput) {
        searchInput?.focus();
        setSearchFocused(true);
      }
      clearTimeout(timeout);
    }, 0);
  };
  const dataRender = (() => {
    const options = filteredOptions.map(({
      children,
      className = '',
      ...props
    }, index) => {
      const isSelected = hasMode ? selected.includes(props.value) : props.value === selected;
      return /*#__PURE__*/React.createElement(Option, _extends({
        key: `${props.value}_${index}`
      }, props, {
        selected: isSelected,
        className: clsx([className, {
          [`${prefixCls}-focused`]: hasMode ? isSelected : props.value === selected,
          [`${prefixCls}-disabled`]: maxCount && hasMode && !isSelected ? selected.length >= maxCount : false
        }]),
        onClick: e => {
          if (props.disabled) {
            return;
          }
          handleSelect(e, props.value, {
            children,
            className,
            ...props
          });
        },
        "data-value": props.value
      }), children || props.label || props.value, menuItemSelectedIcon && hasMode && isSelected && /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-selected-icon`
      }, menuItemSelectedIcon === true ? /*#__PURE__*/React.createElement(CheckIcon, null) : menuItemSelectedIcon));
    });
    return options;
  })();
  const dropdownContent = !loading && open && isOpen && /*#__PURE__*/React.createElement("div", {
    className: clsx([`${prefixCls}-dropdown`, {
      [placement]: placement,
      [dropdownClassName]: dropdownClassName
    }]),
    style: {
      ...dropdownPosition,
      maxHeight: dropdownRender ? 'unset' : listHeight,
      opacity: Object.keys(dropdownPosition).length ? 1 : 0
    }
  }, filterable && /*#__PURE__*/React.createElement("input", {
    type: "text",
    inputMode: "text",
    className: `${prefixCls}-search`,
    value: searchQuery,
    onChange: handleSearch,
    placeholder: "Search..."
  }), !loading &&
  /*#__PURE__*/
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  React.createElement(ConditionalWrapper, {
    wrapper: element => {
      return dropdownRender?.(element || /*#__PURE__*/React.createElement(React.Fragment, null, " ")) || /*#__PURE__*/React.createElement(React.Fragment, null, " ");
    },
    condition: !!dropdownRender
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-options`,
    style: {
      maxHeight: listHeight,
      overflowY: 'auto',
      maxWidth: selectRef.current ? `${selectRef.current.getBoundingClientRect().width}px` : 'inherit'
    }
  }, asTag && !!searchQuery && /*#__PURE__*/React.createElement(Option, {
    value: searchQuery,
    className: `${prefixCls}-focused`,
    onClick: e => {
      handleSelect(e, searchQuery);
    },
    "data-value": searchQuery
  }, searchQuery), filteredOptions.length ? dataRender : !asTag ? notFoundContent || /*#__PURE__*/React.createElement(EmptyContent, null) : null)));
  const selectedOption = (() => {
    const option = extractedOptions.find(e => e.value === selected || e.label === selected || e.children === selected) || selected;
    return option?.children || option?.label || option?.value || null;
  })() || selected || null;
  const hasMaxTagCount = hasMode && (typeof maxTagCount === 'number' || maxTagCount === 'responsive');
  const container = tagContainerRef.current;
  const selectedTags = hasMode ? selected : [];
  const displayTagCount = maxTagCount === 'responsive' ? responsiveTagCount : maxTagCount;
  const tagsToDisplay = hasMaxTagCount ? selectedTags.slice(0, displayTagCount || selectedTags.length) : selectedTags;
  const overflowCount = hasMaxTagCount ? selectedTags.length - (displayTagCount || selectedTags.length) : 0;
  const tags = Array.from(container?.querySelectorAll(`.${prefixCls}-tag:not(.contentEditable):not(.${prefixCls}-tag-overflow)`) || []);
  useLayoutEffect(() => {
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
      if (overflowCount === 1 && lastTagWidth) {
        setResponsiveTagCount(0);
      }
      if (currentWidth >= containerWidth) {
        setResponsiveTagCount(count);
      }
    }
  }, [maxTagCount, container, tags, overflowCount]);
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    ref: selectRef,
    style: style,
    className: clsx([{
      [size]: size,
      noStyle: noStyle,
      [prefixCls]: prefixCls,
      [className]: !!className,
      [`${prefixCls}-error`]: error,
      [`${prefixCls}-multi`]: hasMode,
      [`${prefixCls}-disabled`]: disabled
    }])
  }, /*#__PURE__*/React.createElement("div", {
    onClick: handleTriggerClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: `${prefixCls}-trigger`
  }, showSearch || hasMode ? /*#__PURE__*/React.createElement("div", {
    ref: tagContainerRef,
    style: {
      ...style,
      ...(isOpen ? {
        opacity: hasMode || searchQuery.length ? 1 : 0.5,
        maxWidth: `${searchInputWidth}px`
      } : {}),
      minWidth: `${searchInputWidth}px`
    },
    className: clsx([`${prefixCls}-tag-container`, {
      [`${prefixCls}-tag-container-fixHeight`]: !tagContainerRef.current
    }])
  }, hasMode ? /*#__PURE__*/React.createElement(React.Fragment, null, selectedTags.length ? /*#__PURE__*/React.createElement(React.Fragment, null, tagsToDisplay.map((tag, index) => tagRender ? /*#__PURE__*/React.createElement("div", {
    key: `${index}_${tag}`
  }, tagRender?.({
    label: (() => {
      const option = extractedOptions.find(e => e.value === tag || e.label === tag || e.children === tag);
      return option?.children || option?.label || option?.value || null;
    })() || tag || null,
    value: tag,
    onClose: handleRemoveTag,
    closable: true
  })) : /*#__PURE__*/React.createElement(Tag, {
    closable: true,
    value: tag,
    label: (() => {
      const option = extractedOptions.find(e => e.value === tag || e.label === tag || e.children === tag);
      return option?.children || option?.label || option?.value || null;
    })() || tag || null,
    onClose: handleRemoveTag,
    key: `${index}_${tag}`
  })), overflowCount > 0 && /*#__PURE__*/React.createElement(Tag, {
    label: `+${overflowCount}`,
    className: `${prefixCls}-tag-overflow`
  })) : /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, searchFocused ? '' : placeholder)) : null, isOpen ? /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-tag contentEditable`
  }, /*#__PURE__*/React.createElement("div", _extends({
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
      textAlign: 'center'
    }
  }, showSearch ? {
    contentEditable: 'plaintext-only'
  } : {}, {
    id: `${prefixCls}-search-tag-input`,
    className: `${prefixCls}-tag-input`
  })), !hasMode && !searchQuery.length ? selected === '' ? placeholder : selectedOption : null) : !hasMode ? /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-input globalEllipsis`,
    style: {
      opacity: isOpen ? '0.6' : '1'
    }
  }, selected === '' ? placeholder : selectedOption) : null) : !hasMode ? /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-input globalEllipsis`,
    onClick: () => !disabled && setIsOpen(!isOpen || defaultOpen),
    style: {
      opacity: isOpen ? '0.6' : '1'
    }
  }, selected === '' ? placeholder : selectedOption) : null, isHover && !loading ? allowClear && selected ? /*#__PURE__*/React.createElement("button", {
    className: `${prefixCls}-clear-btn`,
    onClick: handleClear
  }, removeIcon || /*#__PURE__*/React.createElement(ClearIcon, null)) : /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-arrow`
  }, ArrowContainer, error && feedbackIcons ? /*#__PURE__*/React.createElement(ErrorIcon, null) : null) : /*#__PURE__*/React.createElement(React.Fragment, null, !loading && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-arrow`
  }, ArrowContainer, error && feedbackIcons ? /*#__PURE__*/React.createElement(ErrorIcon, null) : null), loading && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-loading`
  }, /*#__PURE__*/React.createElement(LoadingIcon, null)))), getPopupContainer?.(triggerNode) ? /*#__PURE__*/createPortal(dropdownContent, getPopupContainer(triggerNode)) : dropdownContent);
});
SelectComponent.displayName = 'Select';
const Select = Object.assign(SelectComponent, {
  Option
});

var Select$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: Select
});

var css_248z$4 = "@keyframes xUi-skeleton-loading{0%{background-position:100% 50%}to{background-position:0 50%}}.xUi-skeleton-element{display:inline-block!important;width:auto!important}.xUi-skeleton-button{background:hsla(0,0%,75%,.2);border-radius:4px;display:inline-block;height:32px;line-height:32px;min-width:64px;vertical-align:top;width:64px}.xUi-skeleton-button-sm{height:24px;line-height:24px;min-width:48px;width:48px}.xUi-skeleton-button-lg{height:44px;line-height:44px;min-width:80px;width:80px}.xUi-skeleton-active .xUi-skeleton-button{animation:xUi-skeleton-loading 1.4s ease infinite;background:linear-gradient(90deg,hsla(0,0%,75%,.2) 25%,hsla(0,0%,51%,.24) 37%,hsla(0,0%,75%,.2) 63%);background-size:400% 100%}";
styleInject(css_248z$4);

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
  return /*#__PURE__*/React.createElement("div", {
    className: clsx([`${prefixCls}`, {
      [`${prefixCls}-element`]: applyElementStyle,
      [`${prefixCls}-active`]: active
    }, className])
  }, /*#__PURE__*/React.createElement("span", {
    className: clsx([`${prefixCls}-button `, BUTTON_SKELETON_SIZE[size], className]),
    style: style
  }));
};

var Button = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: SkeletonButton
});

var css_248z$3 = "@keyframes xUi-skeleton-loading{0%{background-position:100% 50%}to{background-position:0 50%}}.xUi-skeleton-avatar{animation:xUi-skeleton-loading 1.4s ease infinite;background:linear-gradient(90deg,hsla(0,0%,75%,.2) 25%,hsla(0,0%,51%,.24) 37%,hsla(0,0%,75%,.2) 63%);background-size:400% 100%;display:block;height:40px;line-height:40px;width:40px}.xUi-skeleton-avatar-circle{border-radius:50%}.xUi-skeleton-avatar-square{border-radius:4px}";
styleInject(css_248z$3);

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
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx([`${prefixCls}`, {
      [`${prefixCls}-element`]: applyElementStyle,
      [`${prefixCls}-active`]: active
    }, className]),
    style: wrapperStyle
  }, props), /*#__PURE__*/React.createElement("span", {
    className: clsx([`${prefixCls}-avatar ${prefixCls}-avatar-${shape}`]),
    style: {
      ...(size ? {
        width: size,
        height: size,
        lineHeight: size
      } : {}),
      ...(style || {})
    }
  }));
};

var Avatar = /*#__PURE__*/Object.freeze({
	__proto__: null,
	AVATAR_DEFAULT_SIZE: AVATAR_DEFAULT_SIZE,
	AVATAR_GLOBAL_SIZE: AVATAR_GLOBAL_SIZE,
	GET_AVATAR_SKELETON_PROPS: GET_AVATAR_SKELETON_PROPS,
	default: SkeletonAvatar
});

var css_248z$2 = ".xUi-skeleton-image{align-items:center;background:hsla(0,0%,75%,.2);display:flex;height:96px;justify-content:center;line-height:96px;vertical-align:top;width:96px}.xUi-skeleton-image .xUi-skeleton-icon{font-size:inherit!important}.xUi-skeleton-image svg{display:flex;height:100%;line-height:48px;margin:0 auto;max-width:192px;width:48px}";
styleInject(css_248z$2);

const CUSTOm_ICON_SIZE = 48;
const SkeletonImage = ({
  prefixCls = prefixClsSkeleton,
  className,
  style = {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-image ${className || ''}`,
    style: style
  }, /*#__PURE__*/React.createElement("span", {
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
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1098 1024",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z",
    className: `${prefixCls}-image-path`
  }))));
};

var Image = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: SkeletonImage
});

var css_248z$1 = "@keyframes xUi-skeleton-loading{0%{background-position:100% 50%}to{background-position:0 50%}}.xUi-skeleton-element{display:inline-block!important;width:auto!important}.xUi-skeleton-input{background:hsla(0,0%,75%,.2);display:inline-block;height:32px;line-height:32px;min-width:160px;vertical-align:top;width:160px}.xUi-skeleton-input-sm{height:24px;line-height:24px;min-width:120px;width:120px}.xUi-skeleton-input-lg{height:44px;line-height:44px;min-width:200px;width:200px}.xUi-skeleton-active .xUi-skeleton-input{animation:xUi-skeleton-loading 1.4s ease infinite;background:linear-gradient(90deg,hsla(0,0%,75%,.2) 25%,hsla(0,0%,51%,.24) 37%,hsla(0,0%,75%,.2) 63%);background-size:400% 100%}.xUi-skeleton-block,.xUi-skeleton-block .xUi-skeleton-input{width:100%}";
styleInject(css_248z$1);

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
  return /*#__PURE__*/React.createElement("div", {
    className: clsx([`${prefixCls}-element`, {
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-block`]: block
    }, className])
  }, /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-input ${INPUT_SKELETON_SIZE[size]} ${className || ''}`,
    style: style
  }));
};

var Input = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: SkeletonInput
});

var css_248z = "@keyframes xUi-skeleton-loading{0%{background-position:100% 50%}to{background-position:0 50%}}.xUi-skeleton{display:table;width:100%}.xUi-skeleton__withAvatar{display:flex;gap:12px}.xUi-skeleton-content{width:100%}.xUi-skeleton-content,.xUi-skeleton__header{display:table-cell;vertical-align:top}.xUi-skeleton-title{background:hsla(0,0%,75%,.2);border-radius:4px;height:16px;margin-top:16px;width:38%}.xUi-skeleton-title-avatar{margin-top:12px;width:100%}.xUi-skeleton-title+.xUi-skeleton-paragraph{margin-top:24px}.xUi-skeleton-paragraph{padding:0}.xUi-skeleton-paragraph li{background:hsla(0,0%,75%,.2);border-radius:4px;height:16px;list-style:none;width:100%}.xUi-skeleton-paragraph li+li{margin-top:16px}.xUi-skeleton-paragraph li:last-child:not(:first-child){width:61%}.xUi-skeleton-active .xUi-skeleton-paragraph>li,.xUi-skeleton-active .xUi-skeleton-title{animation:xUi-skeleton-loading 1.4s ease infinite;background:linear-gradient(90deg,hsla(0,0%,75%,.2) 25%,hsla(0,0%,51%,.24) 37%,hsla(0,0%,75%,.2) 63%);background-size:400% 100%}.xUi-skeleton-round .xUi-skeleton-content,.xUi-skeleton-round .xUi-skeleton-paragraph>li,.xUi-skeleton-round .xUi-skeleton-title{border-radius:100px}";
styleInject(css_248z);

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
  return /*#__PURE__*/React.createElement("div", {
    className: clsx([prefixCls, {
      [`${prefixCls}__withAvatar`]: avatar,
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-round`]: round
    }, className]),
    style: style
  }, avatar && teamLogo && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}__header`
  }, /*#__PURE__*/React.createElement(SkeletonAvatar, GET_AVATAR_SKELETON_PROPS(avatar))), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-content`
  }, /*#__PURE__*/React.createElement("h3", {
    className: clsx([`${prefixCls}-title ${GET_TITLE_SKELETON_PROPS.className}`, {
      [`${prefixCls}-title-avatar`]: avatar
    }]),
    style: GET_TITLE_SKELETON_PROPS.style
  }), paragraph !== false && /*#__PURE__*/React.createElement("ul", {
    className: `${prefixCls}-paragraph`,
    style: {
      ...(typeof paragraph !== 'boolean' && paragraph ? paragraph.style : {})
    }
  }, createArray(HAS_PHARAGRAPH).map(key => /*#__PURE__*/React.createElement("li", {
    key: key
  })))));
};
const Skeleton = Object.assign(SkeletonComponent, {
  Image: SkeletonImage,
  Input: SkeletonInput,
  Avatar: SkeletonAvatar,
  Button: SkeletonButton
});

var Skeleton$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	default: Skeleton
});

export { ArrowIcon, Button$3 as Button, CalendarIcon, CheckIcon, Checkbox$2 as Checkbox, ClearIcon, DateDistanceIcon, DatePicker$2 as DatePicker, Empty$1 as Empty, ErrorIcon, Form, FormContext, FormItem, Input$3 as Input, LoadingIcon, Option$2 as Option, Radio$2 as Radio, RadioButton$1 as RadioButton, RadioGroup$1 as RadioGroup, RangePicker$2 as RangePicker, SearchIcon, Select$2 as Select, Skeleton$2 as Skeleton, SkeletonAvatar$1 as SkeletonAvatar, SkeletonButton$1 as SkeletonButton, SkeletonImage$1 as SkeletonImage, SkeletonInput$1 as SkeletonInput, SpinerIcon, StampleIcon, SuccessIcon, Switch$2 as Switch, Tag$2 as Tag, Textarea$2 as Textarea, TimeIcon, TimePicker$2 as TimePicker, TrashIcon, Upload$2 as Upload, clsx, createArray, flattenChildren, parseValue, useForm, useWatch };
//# sourceMappingURL=index.esm.js.map
