'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var core = require('@material-ui/core');
var icons = require('@material-ui/icons');
var _ = _interopDefault(require('lodash'));
var MuiAlert = _interopDefault(require('@material-ui/lab/Alert'));
var reactHelmet = require('react-helmet');
var styles = require('@material-ui/core/styles');
var clsx = _interopDefault(require('clsx'));
var SwipeableViews = _interopDefault(require('react-swipeable-views'));
var luxon = require('luxon');
var Grid = _interopDefault(require('@material-ui/core/Grid'));
var Typography = _interopDefault(require('@material-ui/core/Typography'));
var jssip = require('jssip');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment=e;var Lazy=t;var Memo=r;var Portal=d;
var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};var typeOf=z;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs_development = createCommonjsModule(function (module, exports) {



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}
});
var reactIs_development_1 = reactIs_development.AsyncMode;
var reactIs_development_2 = reactIs_development.ConcurrentMode;
var reactIs_development_3 = reactIs_development.ContextConsumer;
var reactIs_development_4 = reactIs_development.ContextProvider;
var reactIs_development_5 = reactIs_development.Element;
var reactIs_development_6 = reactIs_development.ForwardRef;
var reactIs_development_7 = reactIs_development.Fragment;
var reactIs_development_8 = reactIs_development.Lazy;
var reactIs_development_9 = reactIs_development.Memo;
var reactIs_development_10 = reactIs_development.Portal;
var reactIs_development_11 = reactIs_development.Profiler;
var reactIs_development_12 = reactIs_development.StrictMode;
var reactIs_development_13 = reactIs_development.Suspense;
var reactIs_development_14 = reactIs_development.isAsyncMode;
var reactIs_development_15 = reactIs_development.isConcurrentMode;
var reactIs_development_16 = reactIs_development.isContextConsumer;
var reactIs_development_17 = reactIs_development.isContextProvider;
var reactIs_development_18 = reactIs_development.isElement;
var reactIs_development_19 = reactIs_development.isForwardRef;
var reactIs_development_20 = reactIs_development.isFragment;
var reactIs_development_21 = reactIs_development.isLazy;
var reactIs_development_22 = reactIs_development.isMemo;
var reactIs_development_23 = reactIs_development.isPortal;
var reactIs_development_24 = reactIs_development.isProfiler;
var reactIs_development_25 = reactIs_development.isStrictMode;
var reactIs_development_26 = reactIs_development.isSuspense;
var reactIs_development_27 = reactIs_development.isValidElementType;
var reactIs_development_28 = reactIs_development.typeOf;

var reactIs = createCommonjsModule(function (module) {

if (process.env.NODE_ENV === 'production') {
  module.exports = reactIs_production_min;
} else {
  module.exports = reactIs_development;
}
});

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning$1 = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning$1(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning$1(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning$1('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has$1(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning$1(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = reactIs;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var Page = React.forwardRef(function (_ref, ref) {
  var title = _ref.title,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["title", "children"]);

  return /*#__PURE__*/React__default.createElement("div", _extends({
    ref: ref
  }, rest), /*#__PURE__*/React__default.createElement(reactHelmet.Helmet, null, /*#__PURE__*/React__default.createElement("title", null, title)), children);
});
Page.propTypes = {
  children: propTypes.node,
  title: propTypes.string
};

var useStyles = core.makeStyles(function (theme) {
  return {
    root: {
      display: 'inline-block',
      borderRadius: '50%',
      flexGrow: 0,
      flexShrink: 0
    },
    small: {
      height: theme.spacing(1),
      width: theme.spacing(1)
    },
    medium: {
      height: theme.spacing(2),
      width: theme.spacing(2)
    },
    large: {
      height: theme.spacing(3),
      width: theme.spacing(3)
    },
    offline: {
      backgroundColor: core.colors.grey[50]
    },
    away: {
      backgroundColor: core.colors.orange[600]
    },
    busy: {
      backgroundColor: core.colors.red[600]
    },
    online: {
      backgroundColor: core.colors.green[600]
    }
  };
});

function OnlineIndicator(_ref) {
  var _clsx;

  var className = _ref.className,
      size = _ref.size,
      status = _ref.status,
      rest = _objectWithoutProperties(_ref, ["className", "size", "status"]);

  var classes = useStyles();
  var rootClassName = clsx((_clsx = {}, _defineProperty(_clsx, classes.root, true), _defineProperty(_clsx, classes[size], size), _defineProperty(_clsx, classes[status], status), _clsx), className);
  return /*#__PURE__*/React__default.createElement("span", _extends({
    className: rootClassName
  }, rest));
}

OnlineIndicator.propTypes = {
  className: propTypes.string,
  size: propTypes.oneOf(['small', 'medium', 'large']),
  status: propTypes.oneOf(['online', 'offline', 'away', 'busy'])
};
OnlineIndicator.defaultProps = {
  size: 'medium',
  status: 'offline'
};

var useStyles$1 = styles.makeStyles(function (theme) {
  return {
    flexBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    status: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 0 0 10px'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: '0 10px'
    },
    list: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  };
});

function SearchList(_ref) {
  var _ref$asteriskAccounts = _ref.asteriskAccounts,
      asteriskAccounts = _ref$asteriskAccounts === void 0 ? [] : _ref$asteriskAccounts,
      onClickList = _ref.onClickList,
      ariaDescribedby = _ref.ariaDescribedby,
      anchorEl = _ref.anchorEl,
      setAnchorEl = _ref.setAnchorEl;
  var classes = useStyles$1();

  var _React$useState = React__default.useState(asteriskAccounts),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      list = _React$useState2[0],
      setList = _React$useState2[1];

  var _useState = React.useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      inputSearch = _useState2[0],
      setInputSearch = _useState2[1];

  var open = Boolean(anchorEl);
  var id = open ? "".concat(ariaDescribedby) : undefined;

  var handleClose = function handleClose() {
    return setAnchorEl(null);
  };

  var handleClick = function handleClick(value) {
    onClickList(value);
    setAnchorEl(null);
  };

  React.useEffect(function () {
    var searchedAccounts = asteriskAccounts.filter(function (acc) {
      return acc.label.toLowerCase().includes(inputSearch.toLowerCase()) || acc.accountId.includes(inputSearch);
    });
    setList(searchedAccounts);
  }, [inputSearch, asteriskAccounts]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, open ? /*#__PURE__*/React__default.createElement(core.Popover, {
    id: id,
    open: open,
    onClose: handleClose,
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center'
    }
  }, /*#__PURE__*/React__default.createElement(core.List, {
    component: "nav",
    className: classes.list,
    "aria-label": "accounts"
  }, /*#__PURE__*/React__default.createElement(core.ListItem, null, /*#__PURE__*/React__default.createElement(core.ListItemText, {
    primary: /*#__PURE__*/React__default.createElement(core.Paper, {
      style: {
        padding: '5px'
      }
    }, /*#__PURE__*/React__default.createElement(core.InputBase, {
      id: "inputSearch",
      className: classes.input,
      placeholder: "Search",
      inputProps: {
        'aria-label': 'search'
      },
      onChange: function onChange(event) {
        return setInputSearch(event.target.value);
      },
      defaultValue: inputSearch
    }), /*#__PURE__*/React__default.createElement(core.IconButton, {
      type: "submit",
      className: classes.iconButton,
      "aria-label": "search"
    }, /*#__PURE__*/React__default.createElement(icons.Search, null)))
  })), /*#__PURE__*/React__default.createElement(core.Divider, null), list.map(function (account) {
    return /*#__PURE__*/React__default.createElement(core.ListItem, {
      button: true,
      key: account.accountId,
      onClick: function onClick() {
        return handleClick(account.accountId);
      }
    }, /*#__PURE__*/React__default.createElement(core.ListItemText, {
      primary: /*#__PURE__*/React__default.createElement("span", {
        className: classes.flexBetween
      }, account.label, ' ', account.accountId, ' ', /*#__PURE__*/React__default.createElement("div", {
        className: classes.status
      }, /*#__PURE__*/React__default.createElement(OnlineIndicator, {
        size: "small",
        status: account.online === 'true' ? 'online' : 'busy'
      })))
    }));
  }))) : null);
}

SearchList.propTypes = {
  asteriskAccounts: propTypes.any,
  onClickList: propTypes.any,
  ariaDescribedby: propTypes.any,
  anchorEl: propTypes.any,
  setAnchorEl: propTypes.any
};

var useStyles$2 = styles.makeStyles(function (theme) {
  return {
    root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    },
    fab: {
      width: '41px',
      height: '41px',
      background: '#f4f6f8'
    },
    callButton: {
      color: 'white',
      background: '#4ada61',
      '&:hover': {
        background: '#94f3a4'
      }
    },
    endCallButton: {
      color: 'white',
      background: '#fa1941',
      '&:hover': {
        background: '#f8939b'
      }
    },
    pauseIcon: {
      color: '#263238'
    },
    gridRaw: {
      paddingTop: '27px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    gridLastRaw: {
      paddingTop: '12px',
      display: 'flex',
      justifyContent: 'center'
    },
    list: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    flexBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    status: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 0 0 10px'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: '0 10px'
    }
  };
});

function KeypadBlock(_ref) {
  var handleCallAttendedTransfer = _ref.handleCallAttendedTransfer,
      handleCallTransfer = _ref.handleCallTransfer,
      handlePressKey = _ref.handlePressKey,
      handleMicMute = _ref.handleMicMute,
      handleCall = _ref.handleCall,
      handleEndCall = _ref.handleEndCall,
      activeChanel = _ref.activeChanel,
      _ref$keyVariant = _ref.keyVariant,
      keyVariant = _ref$keyVariant === void 0 ? 'default' : _ref$keyVariant,
      handleHold = _ref.handleHold,
      _ref$asteriskAccounts = _ref.asteriskAccounts,
      asteriskAccounts = _ref$asteriskAccounts === void 0 ? [] : _ref$asteriskAccounts,
      dialState = _ref.dialState,
      setDialState = _ref.setDialState;
  var classes = useStyles$2();
  var inCall = activeChanel.inCall,
      muted = activeChanel.muted,
      hold = activeChanel.hold,
      sessionId = activeChanel.sessionId,
      inAnswer = activeChanel.inAnswer,
      inAnswerTransfer = activeChanel.inAnswerTransfer,
      inConference = activeChanel.inConference,
      inTransfer = activeChanel.inTransfer,
      transferControl = activeChanel.transferControl,
      allowTransfer = activeChanel.allowTransfer,
      allowAttendedTransfer = activeChanel.allowAttendedTransfer;

  var _React$useState = React__default.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      anchorElTransfer = _React$useState2[0],
      setAnchorElTransfer = _React$useState2[1];

  var _React$useState3 = React__default.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      anchorElAttended = _React$useState4[0],
      setAnchorElAttended = _React$useState4[1];

  var handleClickTransferCall = function handleClickTransferCall(event) {
    if (dialState.match(/^[0-9]+$/) != null) {
      handleCallTransfer(dialState);
      setDialState('');
      return;
    }

    setAnchorElTransfer(event.currentTarget);
  };

  var TransferListClick = function TransferListClick(id) {
    if (id) {
      handleCallTransfer(id);
    }
  };

  var handleClickAttendedTransfer = function handleClickAttendedTransfer(event) {
    if (dialState.match(/^[0-9]+$/) != null) {
      handleCallAttendedTransfer('transfer', {});
      setDialState('');
    }

    setAnchorElAttended(event.currentTarget);
  };

  var AttendedTransferListClick = function AttendedTransferListClick(id) {
    if (id) {
      handleCallAttendedTransfer('transfer', id);
      setDialState('');
    }
  };

  return /*#__PURE__*/React__default.createElement("div", null, keyVariant === 'default' ? /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    spacing: 0,
    className: classes.gridRaw
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/React__default.createElement(core.Tooltip, {
    title: muted ? 'Unmute mic' : 'Mute mic',
    disableFocusListener: true,
    disableTouchListener: true
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(core.Fab, {
    disabled: !inCall,
    value: inCall,
    className: classes.fab,
    size: "small",
    "aria-label": "",
    onClick: handleMicMute
  }, muted ? /*#__PURE__*/React__default.createElement(icons.MicOff, null) : /*#__PURE__*/React__default.createElement(icons.Mic, null))))), /*#__PURE__*/React__default.createElement(core.Grid, {
    hidden: true
  }, /*#__PURE__*/React__default.createElement(core.FormControlLabel, {
    control: /*#__PURE__*/React__default.createElement(core.Switch, {
      size: "small",
      checked: true,
      onChange: function onChange() {}
    }),
    label: "Mute"
  }))), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React__default.createElement(core.Tooltip, {
    title: hold ? 'Resume' : 'Hold',
    disableFocusListener: true,
    disableTouchListener: true
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(core.Fab, {
    disabled: !inCall || !inAnswer,
    className: classes.fab,
    size: "small",
    "aria-label": "4",
    onClick: function onClick() {
      handleHold(sessionId, hold);
    }
  }, hold ? /*#__PURE__*/React__default.createElement(icons.PlayArrow, null) : /*#__PURE__*/React__default.createElement(icons.Pause, null))))), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React__default.createElement(core.Tooltip, {
    title: "Transfer Call"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(core.Fab, {
    disabled: !inCall || !inAnswer || hold || !allowAttendedTransfer,
    className: classes.fab,
    size: "small",
    "aria-label": "4",
    onClick: handleClickTransferCall,
    "aria-describedby": "transferredBox"
  }, /*#__PURE__*/React__default.createElement(icons.PhoneForwarded, null)))), /*#__PURE__*/React__default.createElement(SearchList, {
    asteriskAccounts: asteriskAccounts,
    onClickList: function onClickList(id) {
      return TransferListClick(id);
    },
    ariaDescribedby: "transferredBox",
    anchorEl: anchorElTransfer,
    setAnchorEl: setAnchorElTransfer
  })), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React__default.createElement(core.Tooltip, {
    title: "Attended Transfer"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(core.Fab, {
    disabled: !inCall || !inAnswer || hold || !allowTransfer,
    className: classes.fab,
    size: "small",
    "aria-label": "4",
    onClick: handleClickAttendedTransfer,
    "aria-describedby": "attendedBox"
  }, /*#__PURE__*/React__default.createElement(icons.Transform, null)))), /*#__PURE__*/React__default.createElement(SearchList, {
    asteriskAccounts: asteriskAccounts,
    onClickList: AttendedTransferListClick,
    ariaDescribedby: "attendedBox",
    anchorEl: anchorElAttended,
    setAnchorEl: setAnchorElAttended
  })), inAnswerTransfer && !inConference && inTransfer && transferControl ? /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    spacing: 0,
    className: classes.gridRaw
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React__default.createElement(core.Tooltip, {
    title: "Conference",
    "aria-label": "conference"
  }, /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement(core.Fab, {
    disabled: false,
    className: classes.fab,
    size: "small",
    "aria-label": "4",
    onClick: function onClick() {
      handleCallAttendedTransfer('merge', {});
    }
  }, /*#__PURE__*/React__default.createElement(icons.CallMerge, null))))), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React__default.createElement(core.Tooltip, {
    title: "Swap Caller",
    "aria-label": "swap-caller"
  }, /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement(core.Fab, {
    disabled: false,
    className: classes.fab,
    size: "small",
    "aria-label": "4",
    onClick: function onClick() {
      handleCallAttendedTransfer('swap', {});
    }
  }, /*#__PURE__*/React__default.createElement(icons.SwapCalls, null))))), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React__default.createElement(core.Tooltip, {
    title: "Pass Call",
    "aria-label": "pass-call"
  }, /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement(core.Fab, {
    disabled: false,
    className: classes.fab,
    size: "small",
    "aria-label": "4",
    onClick: function onClick() {
      handleCallAttendedTransfer('finish', {});
    }
  }, /*#__PURE__*/React__default.createElement(icons.PhoneForwarded, null))))), /*#__PURE__*/React__default.createElement(core.Grid, {
    item: true,
    xs: 3
  }, /*#__PURE__*/React__default.createElement(core.Tooltip, {
    title: "Cancel Transfer",
    "aria-label": "cancel-transfer"
  }, /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement(core.Fab, {
    disabled: false,
    className: classes.fab,
    size: "small",
    "aria-label": "4",
    onClick: function onClick() {
      handleCallAttendedTransfer('cancel', {});
    }
  }, /*#__PURE__*/React__default.createElement(icons.Cancel, null)))))) : /*#__PURE__*/React__default.createElement("div", null)), /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    spacing: 0,
    className: classes.gridLastRaw
  }, inCall === false ? /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.callButton,
    size: "small",
    "aria-label": "4",
    onClick: handleCall
  }, /*#__PURE__*/React__default.createElement(icons.Call, null)) : /*#__PURE__*/React__default.createElement(core.Fab, {
    size: "small",
    "aria-label": "",
    className: classes.endCallButton,
    onClick: handleEndCall
  }, /*#__PURE__*/React__default.createElement(icons.CallEnd, null)))) : /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    spacing: 0,
    className: classes.gridRaw
  }, /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "1",
    value: 1,
    onClick: handlePressKey
  }, "1"), /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "2",
    value: 2,
    onClick: handlePressKey
  }, "2"), /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "3",
    value: 3,
    onClick: handlePressKey
  }, "3"), /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "4"
  }, /*#__PURE__*/React__default.createElement(icons.Settings, null))), /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    spacing: 0,
    className: classes.gridRaw
  }, /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "4",
    value: 4,
    onClick: handlePressKey
  }, "4"), /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "5",
    value: 5,
    onClick: handlePressKey
  }, "5"), /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "6",
    value: 6,
    onClick: handlePressKey
  }, "6"), /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "4"
  }, /*#__PURE__*/React__default.createElement(icons.Pause, null))), /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    spacing: 0,
    className: classes.gridRaw
  }, /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "7",
    value: 7,
    onClick: handlePressKey
  }, "7"), /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "8",
    value: 8,
    onClick: handlePressKey
  }, "8"), /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "9",
    value: 9,
    onClick: handlePressKey
  }, "9"), /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "4"
  }, /*#__PURE__*/React__default.createElement(icons.Transform, null))), /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    spacing: 0,
    className: classes.gridRaw
  }, /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "*",
    value: "*",
    onClick: handlePressKey
  }, "*"), /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "0",
    value: 0,
    onClick: handlePressKey
  }, "0"), /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": "#",
    value: "#",
    onClick: handlePressKey
  }, "#"), /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.fab,
    size: "small",
    "aria-label": ""
  }, /*#__PURE__*/React__default.createElement(icons.Settings, null))), /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    spacing: 0,
    className: classes.gridLastRaw
  }, inCall === 0 ? /*#__PURE__*/React__default.createElement(core.Fab, {
    className: classes.callButton,
    size: "small",
    "aria-label": "4",
    onClick: handleCall
  }, /*#__PURE__*/React__default.createElement(icons.Call, null)) : /*#__PURE__*/React__default.createElement(core.Fab, {
    size: "small",
    "aria-label": "",
    className: classes.endCallButton,
    onClick: handleEndCall
  }, /*#__PURE__*/React__default.createElement(icons.CallEnd, null)))));
}

KeypadBlock.propTypes = {
  handleCallAttendedTransfer: propTypes.any,
  handleCallTransfer: propTypes.any,
  handlePressKey: propTypes.any,
  handleMicMute: propTypes.any,
  handleCall: propTypes.any,
  handleEndCall: propTypes.any,
  activeChanel: propTypes.any,
  keyVariant: propTypes.any,
  handleHold: propTypes.any,
  asteriskAccounts: propTypes.any,
  dialState: propTypes.any,
  setDialState: propTypes.any
};

function TabPanel(props) {
  var children = props.children,
      value = props.value,
      index = props.index,
      other = _objectWithoutProperties(props, ["children", "value", "index"]);

  return /*#__PURE__*/React__default.createElement(core.Typography, _extends({
    component: "div",
    role: "tabpanel",
    hidden: value !== index,
    id: "full-width-tabpanel-".concat(index),
    "aria-labelledby": "full-width-tab-".concat(index)
  }, other), value === index && /*#__PURE__*/React__default.createElement(core.Box, {
    p: 3
  }, children));
}

function a11yProps(index) {
  return {
    id: "full-width-tab-".concat(index),
    'aria-controls': "full-width-tabpanel-".concat(index)
  };
}

var useStyles$3 = core.makeStyles(function (theme) {
  return {
    tabs: {
      textTransform: 'none',
      minWidth: '25%',
      marginRight: 'auto',
      // marginRight: theme.spacing(4),
      fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
      '&:hover': {
        color: '#3949ab',
        opacity: 1
      },
      '&:focus': {
        color: '#3949ab'
      }
    },
    tabPanelHold: {
      backgroundColor: '#ff8686'
    },
    tabPanelActive: {
      padding: "".concat(theme.spacing(1), "px ").concat(theme.spacing(3), "px"),
      backgroundColor: '#d0f6bb'
    },
    text: {
      color: 'black'
    }
  };
});

function SwipeCaruselBlock(_ref) {
  var localStatePhone = _ref.localStatePhone,
      activeChannel = _ref.activeChannel,
      setActiveChannel = _ref.setActiveChannel;
  var classes = useStyles$3();

  var _React$useState = React__default.useState([{
    duration: 0
  }, {
    duration: 0
  }, {
    duration: 0
  }]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      duration = _React$useState2[0],
      setDuration = _React$useState2[1];

  var _React$useState3 = React__default.useState([{
    intrId: 0,
    active: false
  }, {
    intrId: 0,
    active: false
  }, {
    intrId: 0,
    active: false
  }]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      intervals = _React$useState4[0],
      setintervals = _React$useState4[1];

  var displayCalls = localStatePhone.displayCalls;

  var handleTabChangeIndex = function handleTabChangeIndex(index) {
    setActiveChannel(index);
  };

  var handleTabChange = function handleTabChange(event, newValue) {
    setActiveChannel(newValue);
  };

  displayCalls.map(function (displayCall, key) {
    // if Call just started then increment duration every one second
    if (displayCall.inCall === true && displayCall.inAnswer === true && intervals[key].active === false) {
      var intr = setInterval(function () {
        setDuration(function (durations) {
          return _objectSpread2(_objectSpread2({}, durations), {}, _defineProperty({}, key, {
            duration: durations[key].duration + 1
          }));
        });
      }, 1000);
      setintervals(function (inter) {
        return _objectSpread2(_objectSpread2({}, inter), {}, _defineProperty({}, key, {
          intrId: intr,
          active: true
        }));
      });
    } // if Call ended  then stop  increment duration every one second


    if (displayCall.inCall === false && displayCall.inAnswer === false && intervals[key].active === true) {
      clearInterval(intervals[key].intrId);
      setDuration(function (durations) {
        return _objectSpread2(_objectSpread2({}, durations), {}, _defineProperty({}, key, {
          duration: 0
        }));
      });
      setintervals(function (inter) {
        return _objectSpread2(_objectSpread2({}, inter), {}, _defineProperty({}, key, {
          intrId: 0,
          active: false
        }));
      });
    }

    return true;
  });
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(core.AppBar, {
    position: "static",
    color: "default"
  }, /*#__PURE__*/React__default.createElement(core.Tabs, {
    value: activeChannel,
    onChange: handleTabChange,
    indicatorColor: "primary",
    textColor: "primary",
    variant: "fullWidth",
    "aria-label": "full width tabs example"
  }, /*#__PURE__*/React__default.createElement(core.Tab, _extends({
    className: classes.tabs,
    label: "CH 1"
  }, a11yProps(0))), /*#__PURE__*/React__default.createElement(core.Tab, _extends({
    className: classes.tabs,
    label: "CH 2"
  }, a11yProps(1))), /*#__PURE__*/React__default.createElement(core.Tab, _extends({
    className: classes.tabs,
    label: "Ch 3"
  }, a11yProps(2))))), /*#__PURE__*/React__default.createElement(SwipeableViews, {
    axis: "x",
    index: activeChannel,
    onChangeIndex: handleTabChangeIndex
  }, displayCalls.map(function (displayCall, key) {
    return /*#__PURE__*/React__default.createElement(TabPanel, {
      key: "".concat(displayCall.id, "-TabPanel"),
      className: displayCall.hold ? classes.tabPanelHold : classes.tabPanelActive,
      value: key,
      index: displayCall.id
    }, function () {
      if (displayCall.inCall === true) {
        if (displayCall.inAnswer === true) {
          if (displayCall.hold === true) {
            return (
              /*#__PURE__*/
              // Show hold Call info
              React__default.createElement("div", {
                className: classes.text
              }, /*#__PURE__*/React__default.createElement(core.Typography, null, "Status:", ' ', displayCall.callInfo), /*#__PURE__*/React__default.createElement(core.Typography, null, "Duration:", duration[key].duration), /*#__PURE__*/React__default.createElement(core.Typography, null, "Number:", displayCall.callNumber), /*#__PURE__*/React__default.createElement(core.Typography, null, "Side:", displayCall.direction))
            );
          }

          if (displayCall.inTransfer === true) {
            return (
              /*#__PURE__*/
              // Show In Transfer info
              React__default.createElement("div", {
                className: classes.text
              }, /*#__PURE__*/React__default.createElement(core.Typography, null, "Status:", ' ', displayCall.callInfo), /*#__PURE__*/React__default.createElement(core.Typography, null, "Side:", displayCall.direction), /*#__PURE__*/React__default.createElement(core.Typography, null, "Duration:", duration[key].duration), /*#__PURE__*/React__default.createElement(core.Typography, null, "Number:", ' ', displayCall.callNumber), /*#__PURE__*/React__default.createElement(core.Typography, null, "Transfer to :", ' ', displayCall.transferNumber), /*#__PURE__*/React__default.createElement(core.Typography, null, displayCall.attendedTransferOnline.length > 1 && !displayCall.inConference ? /*#__PURE__*/React__default.createElement("span", null, 'Talking with :', ' ', displayCall.attendedTransferOnline) : null))
            );
          }

          return (
            /*#__PURE__*/
            // Show In Call info
            React__default.createElement("div", {
              className: classes.text
            }, /*#__PURE__*/React__default.createElement(core.Typography, null, "Status:", displayCall.callInfo), /*#__PURE__*/React__default.createElement(core.Typography, null, "Side:", displayCall.direction), /*#__PURE__*/React__default.createElement(core.Typography, null, "Duration:", duration[key].duration), /*#__PURE__*/React__default.createElement(core.Typography, null, "Number:", displayCall.callNumber))
          );
        }

        return (
          /*#__PURE__*/
          // Show Calling info
          React__default.createElement("div", {
            className: classes.text
          }, /*#__PURE__*/React__default.createElement(core.Typography, null, "Status:", ' ', displayCall.callInfo), /*#__PURE__*/React__default.createElement(core.Typography, null, "Side:", ' ', displayCall.direction), /*#__PURE__*/React__default.createElement(core.Typography, null, "Number:", ' ', displayCall.callNumber))
        );
      }

      return (
        /*#__PURE__*/
        // Show Ready info
        React__default.createElement("div", {
          className: classes.text
        }, /*#__PURE__*/React__default.createElement(core.Typography, null, "Status:", ' ', displayCall.callInfo, ' ', displayCall.info))
      );
    });
  })));
}

SwipeCaruselBlock.propTypes = {
  localStatePhone: propTypes.any,
  activeChannel: propTypes.any,
  setActiveChannel: propTypes.any
};

var useStyles$4 = styles.makeStyles(function (theme) {
  return {
    root: {
      padding: theme.spacing(0)
    },
    sliderIcons: {
      marginRight: '10px',
      color: '#546e7a'
    },
    tab: {
      '& .MuiBox-root': {
        padding: theme.spacing(2)
      }
    },
    form: {
      margin: 0
    },
    label: {
      margin: 0,
      padding: '0 8px',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    },
    "switch": {
      marginRight: '-8px'
    }
  };
});

function SettingsBlock(_ref) {
  var localStatePhone = _ref.localStatePhone,
      handleConnectPhone = _ref.handleConnectPhone,
      handleConnectOnStart = _ref.handleConnectOnStart,
      handleNotifications = _ref.handleNotifications,
      handleSettingsSlider = _ref.handleSettingsSlider;
  var classes = useStyles$4();
  var connectedPhone = localStatePhone.connectedPhone,
      connectingPhone = localStatePhone.connectingPhone,
      phoneConnectOnStart = localStatePhone.phoneConnectOnStart,
      notifications = localStatePhone.notifications,
      ringVolume = localStatePhone.ringVolume,
      callVolume = localStatePhone.callVolume;

  var _React$useState = React__default.useState({
    ringVolume: ringVolume,
    callVolume: callVolume
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      sliderValue = _React$useState2[0],
      setSliderValue = _React$useState2[1];

  var handleSettingsSliderState = function handleSettingsSliderState(name) {
    return function (e, newValue) {
      setSliderValue(function (prevState) {
        return _objectSpread2(_objectSpread2({}, prevState), {}, _defineProperty({}, name, newValue));
      });
      handleSettingsSlider(name, newValue);
    };
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    spacing: 2
  }, /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    direction: "row",
    justify: "space-between",
    alignItems: "center",
    style: {
      margin: '8px 16px 8px 8px'
    }
  }, sliderValue.ringVolume === 0 ? /*#__PURE__*/React__default.createElement(icons.NotificationsOff, {
    className: classes.sliderIcons
  }) : /*#__PURE__*/React__default.createElement(icons.NotificationsActive, {
    className: classes.sliderIcons
  }), /*#__PURE__*/React__default.createElement(core.Slider, {
    value: sliderValue.ringVolume,
    onChange: handleSettingsSliderState('ringVolume'),
    "aria-labelledby": "continuous-slider",
    style: {
      width: 'calc(100% - 34px)'
    }
  })), /*#__PURE__*/React__default.createElement(core.Grid, {
    container: true,
    direction: "row",
    justify: "space-between",
    alignItems: "center",
    style: {
      margin: '8px 16px 8px 8px'
    }
  }, sliderValue.callVolume === 0 ? /*#__PURE__*/React__default.createElement(icons.VolumeOff, {
    className: classes.sliderIcons
  }) : /*#__PURE__*/React__default.createElement(icons.VolumeUp, {
    className: classes.sliderIcons
  }), /*#__PURE__*/React__default.createElement(core.Slider, {
    value: sliderValue.callVolume,
    onChange: handleSettingsSliderState('callVolume'),
    "aria-labelledby": "continuous-slider",
    style: {
      width: 'calc(100% - 34px)'
    }
  })), /*#__PURE__*/React__default.createElement(core.FormControl, {
    component: "fieldset",
    className: classes.form
  }, /*#__PURE__*/React__default.createElement(core.FormGroup, {
    "aria-label": "position",
    row: true
  }, /*#__PURE__*/React__default.createElement(core.FormControlLabel, {
    value: "top",
    control: /*#__PURE__*/React__default.createElement(core.Switch, {
      className: classes["switch"],
      checked: notifications,
      color: "primary",
      onChange: handleNotifications
    }),
    label: "Notifications",
    labelPlacement: "start",
    className: classes.label
  }), /*#__PURE__*/React__default.createElement(core.FormControlLabel, {
    value: "top",
    control: /*#__PURE__*/React__default.createElement(core.Switch, {
      className: classes["switch"],
      checked: phoneConnectOnStart,
      color: "primary",
      onChange: handleConnectOnStart
    }),
    label: "Auto Connect",
    labelPlacement: "start",
    className: classes.label
  }), /*#__PURE__*/React__default.createElement(core.FormControlLabel, {
    value: "top",
    control: /*#__PURE__*/React__default.createElement(core.Switch, {
      className: classes["switch"],
      disabled: connectingPhone,
      checked: connectedPhone,
      color: "primary",
      onChange: handleConnectPhone
    }),
    label: connectedPhone ? 'Disconnect' : 'Connect',
    labelPlacement: "start",
    className: classes.label
  })), connectingPhone ? /*#__PURE__*/React__default.createElement(core.LinearProgress, null) : '')));
}

SettingsBlock.propTypes = {
  localStatePhone: propTypes.any,
  handleConnectPhone: propTypes.any,
  handleConnectOnStart: propTypes.any,
  handleSettingsSlider: propTypes.any,
  handleNotifications: propTypes.any
};

function TabPanel$1(props) {
  var children = props.children,
      value = props.value,
      index = props.index,
      other = _objectWithoutProperties(props, ["children", "value", "index"]);

  return /*#__PURE__*/React__default.createElement(core.Typography, _extends({
    component: "div",
    role: "tabpanel",
    hidden: value !== index,
    id: "full-width-tabpanel-".concat(index),
    "aria-labelledby": "full-width-tab-".concat(index)
  }, other), value === index && /*#__PURE__*/React__default.createElement(core.Box, {
    p: 3
  }, children));
}

function a11yProps$1(index) {
  return {
    id: "full-width-tab-".concat(index),
    'aria-controls': "full-width-tabpanel-".concat(index)
  };
}

var useStyles$5 = core.makeStyles(function (theme) {
  return {
    tabs: {
      textTransform: 'none',
      minWidth: '25%',
      marginRight: 'auto',
      // marginRight: theme.spacing(4),
      fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
      '&:hover': {
        color: '#3949ab',
        opacity: 1
      },
      '&:focus': {
        color: '#3949ab'
      }
    },
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
      padding: 0
    },
    listSection: {
      backgroundColor: 'inherit'
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0
    },
    tab: {
      '& .MuiBox-root': {
        padding: theme.spacing(2)
      }
    }
  };
});

function SwipeCaruselBodyBlock(_ref) {
  var calls = _ref.calls,
      localStatePhone = _ref.localStatePhone,
      handleConnectPhone = _ref.handleConnectPhone,
      handleSettingsSlider = _ref.handleSettingsSlider,
      handleConnectOnStart = _ref.handleConnectOnStart,
      handleNotifications = _ref.handleNotifications,
      timelocale = _ref.timelocale;
  var classes = useStyles$5();

  var _React$useState = React__default.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var handleChange = function handleChange(event, newValue) {
    setValue(newValue);
  };

  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(core.AppBar, {
    position: "static",
    color: "default"
  }, /*#__PURE__*/React__default.createElement(core.Tabs, {
    value: value,
    onChange: handleChange,
    indicatorColor: "primary",
    textColor: "primary",
    variant: "fullWidth",
    "aria-label": "full width tabs example"
  }, /*#__PURE__*/React__default.createElement(core.Tab, _extends({
    className: classes.tabs,
    icon: /*#__PURE__*/React__default.createElement(icons.Settings, null),
    label: "Settings"
  }, a11yProps$1(0))), /*#__PURE__*/React__default.createElement(core.Tab, _extends({
    className: classes.tabs,
    icon: /*#__PURE__*/React__default.createElement(icons.History, null),
    label: "History"
  }, a11yProps$1(1))))), /*#__PURE__*/React__default.createElement(TabPanel$1, {
    value: value,
    index: 0,
    classes: {
      root: classes.tab
    }
  }, /*#__PURE__*/React__default.createElement(SettingsBlock, {
    localStatePhone: localStatePhone,
    handleConnectPhone: handleConnectPhone,
    handleSettingsSlider: handleSettingsSlider,
    handleConnectOnStart: handleConnectOnStart,
    handleNotifications: handleNotifications
  })), /*#__PURE__*/React__default.createElement(TabPanel$1, {
    value: value,
    index: 1,
    classes: {
      root: classes.tab
    }
  }, calls.length === 0 ? 'No Calls' : /*#__PURE__*/React__default.createElement(core.List, {
    className: classes.root,
    subheader: /*#__PURE__*/React__default.createElement("li", null)
  }, calls.map(function (_ref2) {
    var sessionId = _ref2.sessionId,
        direction = _ref2.direction,
        number = _ref2.number,
        time = _ref2.time,
        status = _ref2.status;
    return /*#__PURE__*/React__default.createElement("li", {
      key: "section-".concat(sessionId),
      className: classes.listSection
    }, /*#__PURE__*/React__default.createElement("ul", {
      className: classes.ul
    }, /*#__PURE__*/React__default.createElement(core.ListSubheader, {
      style: {
        color: status === 'missed' ? 'red' : 'green',
        fontSize: number.length > 11 ? '0.55rem' : '0.675rem',
        lineHeight: '20px',
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'unset'
      }
    }, /*#__PURE__*/React__default.createElement("span", null, "".concat(number), ' ', direction === 'outgoing' ? /*#__PURE__*/React__default.createElement(icons.CallMade, {
      style: {
        fontSize: number.length > 11 ? '0.55rem' : '0.675rem'
      }
    }) : /*#__PURE__*/React__default.createElement(icons.CallReceived, {
      style: {
        fontSize: number.length > 11 ? '0.55rem' : '0.675rem'
      }
    })), luxon.DateTime.fromISO(time.toISOString()).setZone(timelocale).toString()), /*#__PURE__*/React__default.createElement(core.Divider, null)));
  }))));
}

SwipeCaruselBodyBlock.propTypes = {
  calls: propTypes.any,
  localStatePhone: propTypes.any,
  handleConnectPhone: propTypes.any,
  handleSettingsSlider: propTypes.any,
  handleConnectOnStart: propTypes.any,
  handleNotifications: propTypes.any,
  callVolume: propTypes.any,
  timelocale: propTypes.any
};
TabPanel$1.propTypes = {
  props: propTypes.any
};

var useStyles$6 = core.makeStyles(function (theme) {
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      alignItems: 'center',
      borderRadius: 2,
      display: 'inline-flex',
      flexGrow: 0,
      whiteSpace: 'nowrap',
      cursor: 'default',
      flexShrink: 0,
      fontSize: theme.typography.pxToRem(12),
      fontWeight: theme.typography.fontWeightMedium,
      height: 20,
      justifyContent: 'center',
      letterSpacing: 0.5,
      minWidth: 20,
      padding: theme.spacing(0.5, 1),
      textTransform: 'uppercase'
    },
    primary: {
      color: theme.palette.primary.main,
      backgroundColor: core.fade(theme.palette.primary.main, 0.08)
    },
    secondary: {
      color: theme.palette.secondary.main,
      backgroundColor: core.fade(theme.palette.secondary.main, 0.08)
    },
    error: {
      color: theme.palette.error.main,
      backgroundColor: core.fade(theme.palette.error.main, 0.08)
    },
    success: {
      color: theme.palette.success.main,
      backgroundColor: core.fade(theme.palette.success.main, 0.08)
    },
    warning: {
      color: theme.palette.warning.main,
      backgroundColor: core.fade(theme.palette.warning.main, 0.08)
    }
  };
});

function Label(_ref) {
  var className = _ref.className,
      color = _ref.color,
      children = _ref.children,
      style = _ref.style,
      rest = _objectWithoutProperties(_ref, ["className", "color", "children", "style"]);

  var classes = useStyles$6();
  return /*#__PURE__*/React__default.createElement("span", _extends({
    className: clsx(classes.root, _defineProperty({}, classes[color], color), className)
  }, rest), children);
}

Label.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
  style: propTypes.object,
  color: propTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'success'])
};
Label.defaultProps = {
  className: '',
  color: 'secondary'
};

var useStyles$7 = styles.makeStyles(function (theme) {
  return {
    root: {
      padding: theme.spacing(3)
    },
    online: {
      color: 'green',
      backgroundColor: '#d0f6bb'
    },
    offline: {
      color: 'red',
      backgroundColor: '#f6bbbb'
    }
  };
});

function StatusBlock(_ref) {
  var connectingPhone = _ref.connectingPhone,
      connectedPhone = _ref.connectedPhone;
  var classes = useStyles$7();
  return /*#__PURE__*/React__default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React__default.createElement(Grid, {
    container: true,
    spacing: 2
  }, /*#__PURE__*/React__default.createElement(Grid, {
    container: true,
    direction: "row",
    justify: "flex-start",
    alignItems: "center",
    style: {
      flexGrow: 0,
      maxWidth: '50%',
      flexBasis: '50%'
    }
  }, /*#__PURE__*/React__default.createElement(Typography, {
    id: "continuous-slider"
  }, "STATUS")), /*#__PURE__*/React__default.createElement(Grid, {
    container: true,
    direction: "row",
    justify: "flex-end",
    alignItems: "center",
    style: {
      flexGrow: 0,
      maxWidth: '50%',
      flexBasis: '50%'
    }
  }, !connectingPhone ? connectedPhone ? /*#__PURE__*/React__default.createElement(Label, {
    className: classes.online,
    color: "primary"
  }, "ONLINE") : /*#__PURE__*/React__default.createElement(Label, {
    className: classes.offline,
    color: "primary"
  }, "OFFLINE") : !connectedPhone ? /*#__PURE__*/React__default.createElement(Label, {
    className: classes.online,
    color: "primary"
  }, "CONNECTING") : /*#__PURE__*/React__default.createElement(Label, {
    className: classes.offline,
    color: "primary"
  }, "DISCONNECTING"))));
}

StatusBlock.propTypes = {
  connectingPhone: propTypes.any,
  connectedPhone: propTypes.any
};

var useStyles$8 = styles.makeStyles(function (theme) {
  return {
    root: {
      alignItems: 'center',
      width: '100%'
    },
    answer: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.success.main,
      '&:hover': {
        backgroundColor: theme.palette.success.dark
      },
      fontSize: 9,
      alignItems: 'center'
    },
    reject: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.main,
      '&:hover': {
        backgroundColor: theme.palette.error.dark
      },
      fontSize: 9
    },
    wrapper: {
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px'
    },
    callButton: {
      color: 'white',
      background: '#4ada61',
      '&:hover': {
        background: '#94f3a4'
      }
    },
    endCallButton: {
      color: 'white',
      background: '#fa1941',
      '&:hover': {
        background: '#f8939b'
      }
    },
    '@keyframes ringing': {
      '0%': {
        transform: 'translate(0, 0)'
      },
      '10%': {
        transform: 'translate(4px, 0px)'
      },
      '20%': {
        transform: 'translate(-4px, 0px)'
      },
      '30%': {
        transform: 'translate(3px, 0px)'
      },
      '40%': {
        transform: 'translate(-3px, 0px)'
      },
      '50%': {
        transform: 'translate(2px, 0px)'
      },
      '60%': {
        transform: 'translate(0, 0)'
      },
      '100%': {
        transform: 'translate(0, 0)'
      }
    },
    ringing: {
      animation: '$ringing .6s infinite'
    }
  };
});

function CallQueue(_ref) {
  var calls = _ref.calls,
      handleAnswer = _ref.handleAnswer,
      handleReject = _ref.handleReject;
  var classes = useStyles$8();
  return /*#__PURE__*/React__default.createElement("div", {
    className: classes.root
  }, calls.map(function (call) {
    var parsedCaller = call.callNumber.split('-');
    return /*#__PURE__*/React__default.createElement(core.Paper, {
      className: classes.wrapper,
      key: call.sessionId
    }, /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true,
      xs: 12
    }, parsedCaller[0] ? /*#__PURE__*/React__default.createElement(core.Box, {
      overflow: "auto",
      component: "div",
      whiteSpace: "normal",
      bgcolor: "background.paper"
    }, /*#__PURE__*/React__default.createElement(core.Typography, {
      variant: "subtitle1"
    }, "Caller:", parsedCaller[0])) : /*#__PURE__*/React__default.createElement("div", null), parsedCaller[1] ? /*#__PURE__*/React__default.createElement(core.Box, {
      overflow: "auto",
      component: "div",
      whiteSpace: "normal",
      bgcolor: "background.paper"
    }, /*#__PURE__*/React__default.createElement(core.Typography, {
      variant: "subtitle1"
    }, "Jurisdiction:", parsedCaller[1])) : /*#__PURE__*/React__default.createElement("div", null), parsedCaller[2] ? /*#__PURE__*/React__default.createElement(core.Box, {
      overflow: "auto",
      component: "div",
      whiteSpace: "normal",
      bgcolor: "background.paper"
    }, /*#__PURE__*/React__default.createElement(core.Typography, {
      variant: "subtitle1"
    }, "To Number:", parsedCaller[2])) : /*#__PURE__*/React__default.createElement("div", null)), /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true,
      xs: 6
    }, /*#__PURE__*/React__default.createElement("div", {
      className: classes.paper
    }, /*#__PURE__*/React__default.createElement(core.Fab, {
      className: classes.callButton,
      size: "small",
      onClick: handleAnswer,
      value: call.sessionId
    }, /*#__PURE__*/React__default.createElement(icons.Call, {
      className: classes.ringing
    })))), /*#__PURE__*/React__default.createElement(core.Grid, {
      item: true,
      xs: 6
    }, /*#__PURE__*/React__default.createElement("div", {
      className: classes.paper
    }, /*#__PURE__*/React__default.createElement(core.Fab, {
      size: "small",
      className: classes.endCallButton,
      onClick: handleReject,
      value: call.sessionId
    }, /*#__PURE__*/React__default.createElement(icons.CallEnd, null)))));
  }));
}

function CallsFlowControl() {
  var _this = this;

  this.onUserAgentAction = function () {};

  this.notify = function (message) {
    _this.onCallActionConnection('notify', message);
  };

  this.tmpEvent = function () {
    console.log(_this.activeCall);
    console.log(_this.callsQueue);
    console.log(_this.holdCallsQueue);
  };

  this.onCallActionConnection = function () {};

  this.engineEvent = function () {};

  this.setMicMuted = function () {
    if (_this.micMuted && _this.activeCall) {
      _this.activeCall.unmute();

      _this.micMuted = false;

      _this.onCallActionConnection('unmute', _this.activeCall.id);
    } else if (!_this.micMuted && _this.activeCall) {
      _this.micMuted = true;

      _this.activeCall.mute();

      _this.onCallActionConnection('mute', _this.activeCall.id);
    }
  };

  this.hold = function (sessionId) {
    // If there is an active call with id that is requested then fire hold
    if (_this.activeCall.id === sessionId) {
      _this.activeCall.hold();
    }
  };

  this.unhold = function (sessionId) {
    // If we dont have active call then unhold the the call with requested id
    if (!_this.activeCall) {
      // Find the Requested call in hold calls array
      var toUnhold = _.find(_this.holdCallsQueue, {
        id: sessionId
      }); // If we found the call in hold calls array the fire unhold function


      if (toUnhold) {
        toUnhold.unhold();
      }
    } else {
      console.log('Please exit from all active calls to unhold');
    }
  };

  this.micMuted = false;
  this.activeCall = null;
  this.activeChanel = null;
  this.callsQueue = [];
  this.holdCallsQueue = [];
  this.player = {};
  this.ringer = null;
  this.connectedPhone = null;
  this.config = {};
  this.initiated = false;

  this.playRing = function () {
    _this.ringer.current.currentTime = 0;

    _this.ringer.current.play();
  };

  this.stopRing = function () {
    _this.ringer.current.currentTime = 0;

    _this.ringer.current.pause();
  };

  this.removeCallFromQueue = function (callId) {
    _.remove(_this.callsQueue, function (calls) {
      return calls.id === callId;
    });
  };

  this.addCallToHoldQueue = function (callId) {
    if (_this.activeCall.id === callId) {
      _this.holdCallsQueue.push(_this.activeCall);
    }
  };

  this.removeCallFromActiveCall = function (callId) {
    if (_this.activeCall && callId === _this.activeCall.id) {
      _this.activeCall = null;
    }
  };

  this.removeCallFromHoldQueue = function (callId) {
    _.remove(_this.holdCallsQueue, function (calls) {
      return calls.id === callId;
    });
  };

  this.connectAudio = function () {
    _this.activeCall.connection.addEventListener('addstream', function (event) {
      _this.player.current.srcObject = event.stream;
    });
  };

  this.sessionEvent = function (type, data, cause, callId) {
    // console.log(`Session: ${type}`);
    // console.log('Data: ', data);
    // console.log('callid: ', callId);
    switch (type) {
      case 'terminated':
        //  this.endCall(data, cause);
        break;

      case 'accepted':
        // this.startCall(data);
        break;

      case 'reinvite':
        _this.onCallActionConnection('reinvite', callId, data);

        break;

      case 'hold':
        _this.onCallActionConnection('hold', callId);

        _this.addCallToHoldQueue(callId);

        _this.removeCallFromActiveCall(callId);

        break;

      case 'unhold':
        _this.onCallActionConnection('unhold', callId);

        _this.activeCall = _.find(_this.holdCallsQueue, {
          id: callId
        });

        _this.removeCallFromHoldQueue(callId);

        break;

      case 'dtmf':
        break;

      case 'muted':
        _this.onCallActionConnection('muted', callId);

        break;

      case 'unmuted':
        break;

      case 'confirmed':
        if (!_this.activeCall) {
          _this.activeCall = _.find(_this.callsQueue, {
            id: callId
          });
        }

        _this.removeCallFromQueue(callId);

        _this.onCallActionConnection('callAccepted', callId, _this.activeCall);

        break;

      case 'connecting':
        break;

      case 'ended':
        _this.onCallActionConnection('callEnded', callId);

        _this.removeCallFromQueue(callId);

        _this.removeCallFromActiveCall(callId);

        _this.removeCallFromHoldQueue(callId);

        if (_this.callsQueue.length === 0) {
          _this.stopRing();
        }

        break;

      case 'failed':
        _this.onCallActionConnection('callEnded', callId);

        _this.removeCallFromQueue(callId);

        _this.removeCallFromActiveCall(callId);

        if (_this.callsQueue.length === 0) {
          _this.stopRing();
        }

        break;
    }
  };

  this.handleNewRTCSession = function (rtcPayload) {
    var call = rtcPayload.session;

    if (call.direction === 'incoming') {
      _this.callsQueue.push(call);

      _this.onCallActionConnection('incomingCall', call);

      if (!_this.activeCall) {
        _this.playRing();
      }
    } else {
      _this.activeCall = call;

      _this.onCallActionConnection('outgoingCall', call);

      _this.connectAudio();
    }

    var defaultCallEventsToHandle = ['peerconnection', 'connecting', 'sending', 'progress', 'accepted', 'newDTMF', 'newInfo', 'hold', 'unhold', 'muted', 'unmuted', 'reinvite', 'update', 'refer', 'replaces', 'sdp', 'icecandidate', 'getusermediafailed', 'ended', 'failed', 'connecting', 'confirmed'];

    _.forEach(defaultCallEventsToHandle, function (eventType) {
      call.on(eventType, function (data, cause) {
        _this.sessionEvent(eventType, data, cause, call.id);
      });
    });
  };

  this.init = function () {
    try {
      _this.phone = new jssip.UA(_this.config);

      _this.phone.on('newRTCSession', _this.handleNewRTCSession.bind(_this));

      var binds = ['connected', 'disconnected', 'registered', 'unregistered', 'registrationFailed', 'invite', 'message', 'connecting'];

      _.forEach(binds, function (value) {
        _this.phone.on(value, function (e) {
          _this.engineEvent(value, e);
        });
      });

      _this.initiated = true;
    } catch (e) {
      console.log(e);
    }
  };

  this.call = function (to) {
    if (!_this.connectedPhone) {
      _this.notify('Please connect to Voip Server in order to make calls');

      console.log('User agent not registered yet');
      return;
    }

    if (_this.activeCall) {
      _this.notify('Already have an active call');

      console.log('Already has active call');
      return;
    }

    _this.phone.call("sip:".concat(to, "@").concat(_this.config.domain), {
      extraHeaders: ['First: first', 'Second: second'],
      RTCConstraints: {
        optional: [{
          DtlsSrtpKeyAgreement: 'true'
        }]
      },
      mediaConstraints: {
        audio: true
      },
      sessionTimersExpires: 600
    });
  };

  this.answer = function (sessionId) {
    if (_this.activeCall) {
      _this.notify('Already have an active call');

      console.log('Already has active call');
    } else if (_this.activeChanel.inCall) {
      _this.notify('Current chanel is busy');

      console.log('Chanel is Busy');
    } else {
      // Stop the annoying ring ring
      _this.stopRing(); // Get the call from calls Queue


      _this.activeCall = _.find(_this.callsQueue, {
        id: sessionId
      });

      if (_this.activeCall) {
        _this.activeCall.customPayload = _this.activeChanel.id;

        _this.activeCall.answer({
          mediaConstraints: {
            audio: true
          }
        }); // Connect Audio


        _this.connectAudio();
      }
    }
  };

  this.hungup = function (e) {
    try {
      _this.phone._sessions[e].terminate();
    } catch (e) {
      console.log(e);
      console.log('Call already terminated');
    }
  };

  this.start = function () {
    if (!_this.initiated) {
      _this.notify('Error: 356 Please report');

      console.log('Please call .init() before connect');
      return;
    }

    if (_this.config.debug) {
      jssip.debug.enable('JsSIP:*');
    } else {
      jssip.debug.disable();
    }

    _this.phone.start();
  };

  this.stop = function () {
    _this.phone.stop();
  };
}

var flowRoute = new CallsFlowControl();
var player = React.createRef();
var ringer = React.createRef();
var useStyles$9 = core.makeStyles(function (theme) {
  return {
    root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    },
    results: {
      marginTop: theme.spacing(3)
    },
    phone: {
      padding: '27px'
    },
    gridSettings: {
      paddingTop: '26px',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      maxWidth: '202px'
    },
    connected: {
      color: 'green'
    },
    disconnected: {
      color: 'red'
    },
    textform: {
      '& > *': {
        textAlign: 'right',
        width: '100%'
      },
      '.MuiInputBase-input': {
        textAlign: 'right'
      }
    },
    phoneButton: {
      color: 'white',
      backgroundColor: '#3949ab',
      position: 'fixed',
      right: '27px',
      bottom: '27px',
      '&:hover': {
        background: '#94a3fc'
      }
    },
    drawerPaper: {
      width: 280
    },
    drawer: _defineProperty({}, theme.breakpoints.up('sm'), {
      width: 280,
      flexShrink: 0
    }),
    drawerHeader: _objectSpread2(_objectSpread2({
      marginTop: 64,
      minHeight: 30,
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1)
    }, theme.mixins.toolbar), {}, {
      justifyContent: 'flex-start'
    })
  };
});

function SoftPhone(_ref) {
  var callVolume = _ref.callVolume,
      ringVolume = _ref.ringVolume,
      setConnectOnStartToLocalStorage = _ref.setConnectOnStartToLocalStorage,
      setNotifications = _ref.setNotifications,
      setCallVolume = _ref.setCallVolume,
      setRingVolume = _ref.setRingVolume,
      _ref$notifications = _ref.notifications,
      notifications = _ref$notifications === void 0 ? true : _ref$notifications,
      _ref$connectOnStart = _ref.connectOnStart,
      connectOnStart = _ref$connectOnStart === void 0 ? true : _ref$connectOnStart,
      config = _ref.config,
      _ref$timelocale = _ref.timelocale,
      timelocale = _ref$timelocale === void 0 ? 'UTC' : _ref$timelocale,
      _ref$asteriskAccounts = _ref.asteriskAccounts,
      asteriskAccounts = _ref$asteriskAccounts === void 0 ? [] : _ref$asteriskAccounts;
  var defaultSoftPhoneState = {
    displayCalls: [{
      id: 0,
      info: 'Ch 1',
      hold: false,
      muted: 0,
      autoMute: 0,
      inCall: false,
      inAnswer: false,
      inTransfer: false,
      callInfo: 'Ready',
      inAnswerTransfer: false,
      allowTransfer: true,
      transferControl: false,
      allowAttendedTransfer: true,
      transferNumber: '',
      attendedTransferOnline: '',
      inConference: false,
      callNumber: '',
      duration: 0,
      side: '',
      sessionId: ''
    }, {
      id: 1,
      info: 'Ch 2',
      hold: false,
      muted: 0,
      autoMute: 0,
      inCall: false,
      inAnswer: false,
      inAnswerTransfer: false,
      inConference: false,
      inTransfer: false,
      callInfo: 'Ready',
      allowTransfer: true,
      transferControl: false,
      allowAttendedTransfer: true,
      transferNumber: '',
      attendedTransferOnline: '',
      callNumber: '',
      duration: 0,
      side: '',
      sessionId: ''
    }, {
      id: 2,
      info: 'Ch 3',
      hold: false,
      muted: 0,
      autoMute: 0,
      inCall: false,
      inConference: false,
      inAnswer: false,
      callInfo: 'Ready',
      inTransfer: false,
      inAnswerTransfer: false,
      Transfer: false,
      allowTransfer: true,
      transferControl: false,
      allowAttendedTransfer: true,
      transferNumber: '',
      attendedTransferOnline: '',
      callNumber: '',
      duration: 0,
      side: '',
      sessionId: ''
    }],
    phoneConnectOnStart: connectOnStart,
    notifications: notifications,
    phoneCalls: [],
    connectedPhone: false,
    connectingPhone: false,
    activeCalls: [],
    callVolume: callVolume,
    ringVolume: ringVolume
  };
  var classes = useStyles$9();

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      drawerOpen = _useState2[0],
      drawerSetOpen = _useState2[1];

  var _useState3 = React.useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      dialState = _useState4[0],
      setDialState = _useState4[1];

  var _useState5 = React.useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      activeChannel = _useState6[0],
      setActiveChannel = _useState6[1];

  var _useState7 = React.useState(defaultSoftPhoneState),
      _useState8 = _slicedToArray(_useState7, 2),
      localStatePhone = _useState8[0],
      setLocalStatePhone = _useState8[1];

  var _React$useState = React__default.useState({
    open: false,
    message: ''
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      notificationState = _React$useState2[0],
      setNotificationState = _React$useState2[1];

  var _React$useState3 = React__default.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      calls = _React$useState4[0],
      setCalls = _React$useState4[1];

  var notify = function notify(message) {
    setNotificationState(function (notification) {
      return _objectSpread2(_objectSpread2({}, notification), {}, {
        open: true,
        message: message
      });
    });
  };

  Notification.requestPermission();

  var handleClose = function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationState(function (notification) {
      return _objectSpread2(_objectSpread2({}, notification), {}, {
        open: false
      });
    });
  };

  function Alert(props) {
    return /*#__PURE__*/React__default.createElement(MuiAlert, _extends({
      elevation: 6,
      variant: "filled"
    }, props));
  }

  flowRoute.activeChanel = localStatePhone.displayCalls[activeChannel];
  flowRoute.connectedPhone = localStatePhone.connectedPhone;

  flowRoute.engineEvent = function (event, payload) {
    // Listen Here for Engine "UA jssip" events
    switch (event) {
      case 'connecting':
        break;

      case 'connected':
        setLocalStatePhone(function (prevState) {
          return _objectSpread2(_objectSpread2({}, prevState), {}, {
            connectingPhone: false,
            connectedPhone: true
          });
        });
        break;

      case 'registered':
        break;

      case 'disconnected':
        setLocalStatePhone(function (prevState) {
          return _objectSpread2(_objectSpread2({}, prevState), {}, {
            connectingPhone: false,
            connectedPhone: false
          });
        });
        break;
    }
  };

  flowRoute.onCallActionConnection = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type, payload, data) {
      var notification, newProgressLocalStatePhone, firstCheck, secondCheck, displayCallId, acceptedCall, newAcceptedLocalStatePhone, newAcceptedPhoneCalls;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = type;
              _context.next = _context.t0 === 'reinvite' ? 3 : _context.t0 === 'incomingCall' ? 5 : _context.t0 === 'outgoingCall' ? 8 : _context.t0 === 'callEnded' ? 13 : _context.t0 === 'callAccepted' ? 18 : _context.t0 === 'hold' ? 25 : _context.t0 === 'unhold' ? 27 : _context.t0 === 'unmute' ? 29 : _context.t0 === 'mute' ? 31 : _context.t0 === 'notify' ? 33 : 35;
              break;

            case 3:
              // looks like its Attended Transfer
              // Success transfer
              setLocalStatePhone(function (prevState) {
                return _objectSpread2(_objectSpread2({}, prevState), {}, {
                  displayCalls: _.map(localStatePhone.displayCalls, function (a) {
                    return a.sessionId === payload ? _objectSpread2(_objectSpread2({}, a), {}, {
                      allowAttendedTransfer: true,
                      allowTransfer: true,
                      inAnswerTransfer: true,
                      inTransfer: true,
                      attendedTransferOnline: data.request.headers['P-Asserted-Identity'][0].raw.split(' ')[0]
                    }) : a;
                  })
                });
              });
              return _context.abrupt("break", 36);

            case 5:
              // looks like new call its incoming call
              // Save new object with the Phone data of new incoming call into the array with Phone data
              setLocalStatePhone(function (prevState) {
                return _objectSpread2(_objectSpread2({}, prevState), {}, {
                  phoneCalls: [].concat(_toConsumableArray(prevState.phoneCalls), [{
                    callNumber: payload.remote_identity.display_name !== '' ? "".concat(payload.remote_identity.display_name || '') : payload.remote_identity.uri.user,
                    sessionId: payload.id,
                    ring: false,
                    duration: 0,
                    direction: payload.direction
                  }])
                });
              });

              if (document.visibilityState !== 'visible' && localStatePhone.notifications) {
                notification = new Notification('Incoming Call', {
                  icon: 'https://voip.robofx.com/static/images/call-icon-telefono.png',
                  body: "Caller: ".concat(payload.remote_identity.display_name !== '' ? "".concat(payload.remote_identity.display_name || '') : payload.remote_identity.uri.user)
                });

                notification.onclick = function () {
                  window.parent.focus();
                  window.focus(); // just in case, older browsers

                  this.close();
                };
              }

              return _context.abrupt("break", 36);

            case 8:
              // looks like new call its outgoing call
              // Create object with the Display data of new outgoing call
              newProgressLocalStatePhone = _.cloneDeep(localStatePhone);
              newProgressLocalStatePhone.displayCalls[activeChannel] = _objectSpread2(_objectSpread2({}, localStatePhone.displayCalls[activeChannel]), {}, {
                inCall: true,
                hold: false,
                inAnswer: false,
                direction: payload.direction,
                sessionId: payload.id,
                callNumber: payload.remote_identity.uri.user,
                callInfo: 'In out call'
              }); // Save new object into the array with display calls

              setLocalStatePhone(function (prevState) {
                return _objectSpread2(_objectSpread2({}, prevState), {}, {
                  displayCalls: newProgressLocalStatePhone.displayCalls
                });
              });
              setDialState('');
              return _context.abrupt("break", 36);

            case 13:
              // Call is ended, lets delete the call from calling queue
              // Call is ended, lets check and delete the call from  display calls list
              //        const ifExist= _.findIndex(localStatePhone.displayCalls,{sessionId:e.sessionId})
              setLocalStatePhone(function (prevState) {
                return _objectSpread2(_objectSpread2({}, prevState), {}, {
                  phoneCalls: localStatePhone.phoneCalls.filter(function (item) {
                    return item.sessionId !== payload;
                  }),
                  displayCalls: _.map(localStatePhone.displayCalls, function (a) {
                    return a.sessionId === payload ? _objectSpread2(_objectSpread2({}, a), {}, {
                      inCall: false,
                      inAnswer: false,
                      hold: false,
                      muted: 0,
                      inTransfer: false,
                      inAnswerTransfer: false,
                      allowFinishTransfer: false,
                      allowTransfer: true,
                      allowAttendedTransfer: true,
                      inConference: false,
                      callInfo: 'Ready'
                    }) : a;
                  })
                });
              });
              firstCheck = localStatePhone.phoneCalls.filter(function (item) {
                return item.sessionId === payload && item.direction === 'incoming';
              });
              secondCheck = localStatePhone.displayCalls.filter(function (item) {
                return item.sessionId === payload;
              });

              if (firstCheck.length === 1) {
                setCalls(function (call) {
                  return [{
                    status: 'missed',
                    sessionId: firstCheck[0].sessionId,
                    direction: firstCheck[0].direction,
                    number: firstCheck[0].callNumber,
                    time: new Date()
                  }].concat(_toConsumableArray(call));
                });
              } else if (secondCheck.length === 1) {
                setCalls(function (call) {
                  return [{
                    status: secondCheck[0].inAnswer ? 'answered' : 'missed',
                    sessionId: secondCheck[0].sessionId,
                    direction: secondCheck[0].direction,
                    number: secondCheck[0].callNumber,
                    time: new Date()
                  }].concat(_toConsumableArray(call));
                });
              }

              return _context.abrupt("break", 36);

            case 18:
              // Established conection
              // Set caller number for Display calls
              displayCallId = data.customPayload;
              acceptedCall = localStatePhone.phoneCalls.filter(function (item) {
                return item.sessionId === payload;
              });

              if (!acceptedCall[0]) {
                acceptedCall = localStatePhone.displayCalls.filter(function (item) {
                  return item.sessionId === payload;
                });
                displayCallId = acceptedCall[0].id;
              } // Call is Established
              // Lets make a copy of localStatePhone Object


              newAcceptedLocalStatePhone = _.cloneDeep(localStatePhone); // Lets check and delete the call from  phone calls list

              newAcceptedPhoneCalls = newAcceptedLocalStatePhone.phoneCalls.filter(function (item) {
                return item.sessionId !== payload;
              }); // Save to the local state

              setLocalStatePhone(function (prevState) {
                return _objectSpread2(_objectSpread2({}, prevState), {}, {
                  phoneCalls: newAcceptedPhoneCalls,
                  displayCalls: _.map(localStatePhone.displayCalls, function (a) {
                    return a.id === displayCallId ? _objectSpread2(_objectSpread2({}, a), {}, {
                      callNumber: acceptedCall[0].callNumber,
                      sessionId: payload,
                      duration: 0,
                      direction: acceptedCall[0].direction,
                      inCall: true,
                      inAnswer: true,
                      hold: false,
                      callInfo: 'In call'
                    }) : a;
                  })
                });
              });
              return _context.abrupt("break", 36);

            case 25:
              // let holdCall = localStatePhone.displayCalls.filter((item) => item.sessionId === payload);
              setLocalStatePhone(function (prevState) {
                return _objectSpread2(_objectSpread2({}, prevState), {}, {
                  displayCalls: _.map(localStatePhone.displayCalls, function (a) {
                    return a.sessionId === payload ? _objectSpread2(_objectSpread2({}, a), {}, {
                      hold: true
                    }) : a;
                  })
                });
              });
              return _context.abrupt("break", 36);

            case 27:
              setLocalStatePhone(function (prevState) {
                return _objectSpread2(_objectSpread2({}, prevState), {}, {
                  displayCalls: _.map(localStatePhone.displayCalls, function (a) {
                    return a.sessionId === payload ? _objectSpread2(_objectSpread2({}, a), {}, {
                      hold: false
                    }) : a;
                  })
                });
              });
              return _context.abrupt("break", 36);

            case 29:
              setLocalStatePhone(function (prevState) {
                return _objectSpread2(_objectSpread2({}, prevState), {}, {
                  displayCalls: _.map(localStatePhone.displayCalls, function (a) {
                    return a.sessionId === payload ? _objectSpread2(_objectSpread2({}, a), {}, {
                      muted: 0
                    }) : a;
                  })
                });
              });
              return _context.abrupt("break", 36);

            case 31:
              setLocalStatePhone(function (prevState) {
                return _objectSpread2(_objectSpread2({}, prevState), {}, {
                  displayCalls: _.map(localStatePhone.displayCalls, function (a) {
                    return a.sessionId === payload ? _objectSpread2(_objectSpread2({}, a), {}, {
                      muted: 1
                    }) : a;
                  })
                });
              });
              return _context.abrupt("break", 36);

            case 33:
              notify(payload);
              return _context.abrupt("break", 36);

            case 35:
              return _context.abrupt("break", 36);

            case 36:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  var handleSettingsSlider = function handleSettingsSlider(name, newValue) {
    // setLocalStatePhone((prevState) => ({
    //   ...prevState,
    //   [name]: newValue
    // }));
    switch (name) {
      case 'ringVolume':
        ringer.current.volume = parseInt(newValue, 10) / 100;
        setRingVolume(newValue); // flowRoute.setOutputVolume(newValue);

        break;

      case 'callVolume':
        player.current.volume = parseInt(newValue, 10) / 100;
        setCallVolume(newValue);
        break;
    }
  };

  var handleConnectPhone = function handleConnectPhone(event, connectionStatus) {
    try {
      event.persist();
    } catch (e) {}

    setLocalStatePhone(function (prevState) {
      return _objectSpread2(_objectSpread2({}, prevState), {}, {
        connectingPhone: true
      });
    });

    if (connectionStatus === true) {
      flowRoute.start();
    } else {
      flowRoute.stop();
    }

    return true;
  };

  var toggleDrawer = function toggleDrawer(openDrawer) {
    return function (event) {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      drawerSetOpen(openDrawer);
    };
  };

  var handleDialStateChange = function handleDialStateChange(event) {
    event.persist();
    setDialState(event.target.value);
  };

  var handleConnectOnStart = function handleConnectOnStart(event, newValue) {
    event.persist();
    setLocalStatePhone(function (prevState) {
      return _objectSpread2(_objectSpread2({}, prevState), {}, {
        phoneConnectOnStart: newValue
      });
    });
    setConnectOnStartToLocalStorage(newValue);
  };

  var handleNotifications = function handleNotifications(event, newValue) {
    event.persist();
    setLocalStatePhone(function (prevState) {
      return _objectSpread2(_objectSpread2({}, prevState), {}, {
        notifications: newValue
      });
    });
    setNotifications(newValue);
  };

  var handlePressKey = function handlePressKey(event) {
    event.persist();
    setDialState(dialState + event.currentTarget.value);
  };

  var handleCall = function handleCall(event) {
    event.persist();

    if (dialState.match(/^[0-9]+$/) != null) {
      flowRoute.call(dialState);
    }
  };

  var handleEndCall = function handleEndCall(event) {
    event.persist();
    flowRoute.hungup(localStatePhone.displayCalls[activeChannel].sessionId);
  };

  var handleHold = function handleHold(sessionId, hold) {
    if (hold === false) {
      flowRoute.hold(sessionId);
    } else if (hold === true) {
      flowRoute.unhold(sessionId);
    }
  };

  var handleAnswer = function handleAnswer(event) {
    flowRoute.answer(event.currentTarget.value);
  };

  var handleReject = function handleReject(event) {
    flowRoute.hungup(event.currentTarget.value);
  };

  var handleMicMute = function handleMicMute() {
    flowRoute.setMicMuted();
  };

  var handleCallTransfer = function handleCallTransfer(transferedNumber) {
    if (!dialState && !transferedNumber) return;

    var newCallTransferDisplayCalls = _.map(localStatePhone.displayCalls, function (a) {
      return a.id === activeChannel ? _objectSpread2(_objectSpread2({}, a), {}, {
        transferNumber: dialState || transferedNumber,
        inTransfer: true,
        allowAttendedTransfer: false,
        allowFinishTransfer: false,
        allowTransfer: false,
        callInfo: 'Transfering...'
      }) : a;
    });

    setLocalStatePhone(function (prevState) {
      return _objectSpread2(_objectSpread2({}, prevState), {}, {
        displayCalls: newCallTransferDisplayCalls
      });
    });
    flowRoute.activeCall.sendDTMF("##".concat(dialState || transferedNumber));
  };

  var handleCallAttendedTransfer = function handleCallAttendedTransfer(event, number) {
    switch (event) {
      case 'transfer':
        setLocalStatePhone(function (prevState) {
          return _objectSpread2(_objectSpread2({}, prevState), {}, {
            displayCalls: _.map(localStatePhone.displayCalls, function (a) {
              return a.id === activeChannel ? _objectSpread2(_objectSpread2({}, a), {}, {
                transferNumber: dialState || number,
                allowAttendedTransfer: false,
                allowTransfer: false,
                transferControl: true,
                allowFinishTransfer: false,
                callInfo: 'Attended Transferring...',
                inTransfer: true
              }) : a;
            })
          });
        });
        flowRoute.activeCall.sendDTMF("*2".concat(dialState || number));
        break;

      case 'merge':
        var newCallMergeAttendedTransferDisplayCalls = _.map(localStatePhone.displayCalls, function (a) {
          return a.id === activeChannel ? _objectSpread2(_objectSpread2({}, a), {}, {
            callInfo: 'Conference',
            inConference: true
          }) : a;
        });

        setLocalStatePhone(function (prevState) {
          return _objectSpread2(_objectSpread2({}, prevState), {}, {
            displayCalls: newCallMergeAttendedTransferDisplayCalls
          });
        });
        flowRoute.activeCall.sendDTMF('*5');
        break;

      case 'swap':
        flowRoute.activeCall.sendDTMF('*6');
        break;

      case 'finish':
        flowRoute.activeCall.sendDTMF('*4');
        break;

      case 'cancel':
        var newCallCancelAttendedTransferDisplayCalls = _.map(localStatePhone.displayCalls, function (a) {
          return a.id === activeChannel ? _objectSpread2(_objectSpread2({}, a), {}, {
            transferNumber: dialState,
            allowAttendedTransfer: true,
            allowTransfer: true,
            allowFinishTransfer: false,
            transferControl: false,
            inAnswerTransfer: false,
            callInfo: 'In Call',
            inTransfer: false
          }) : a;
        });

        setLocalStatePhone(function (prevState) {
          return _objectSpread2(_objectSpread2({}, prevState), {}, {
            displayCalls: newCallCancelAttendedTransferDisplayCalls
          });
        });
        flowRoute.activeCall.sendDTMF('*3');
        break;
    }
  };

  var handleSettingsButton = function handleSettingsButton() {
    flowRoute.tmpEvent();
  };

  React.useEffect(function () {
    flowRoute.config = config;
    flowRoute.init();

    if (localStatePhone.phoneConnectOnStart) {
      handleConnectPhone(null, true);
    }

    try {
      player.current.defaultMuted = false;
      player.current.autoplay = true;
      player.current.volume = parseInt(localStatePhone.callVolume, 10) / 100; // player.volume = this.outputVolume;

      flowRoute.player = player;
      ringer.current.src = '/sound/ringing.mp3';
      ringer.current.loop = true;
      ringer.current.volume = parseInt(localStatePhone.ringVolume, 10) / 100;
      flowRoute.ringer = ringer;
    } catch (e) {}
  }, [config, localStatePhone.callVolume, localStatePhone.phoneConnectOnStart, localStatePhone.ringVolume]);

  var dialNumberOnEnter = function dialNumberOnEnter(event) {
    if (event.key === 'Enter') {
      handleCall(event);
    }
  };

  return /*#__PURE__*/React__default.createElement(Page, {
    className: classes.root,
    title: "Phone"
  }, /*#__PURE__*/React__default.createElement("label", {
    htmlFor: "icon-button-file"
  }, /*#__PURE__*/React__default.createElement(core.IconButton, {
    className: classes.phoneButton,
    color: "primary",
    "aria-label": "call picture",
    component: "span",
    variant: "contained",
    onClick: toggleDrawer(true)
  }, /*#__PURE__*/React__default.createElement(icons.Call, null))), /*#__PURE__*/React__default.createElement(core.Drawer, {
    className: classes.drawer,
    classes: {
      paper: classes.drawerPaper
    },
    anchor: "right",
    open: drawerOpen,
    variant: "persistent"
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      minHeight: 30
    },
    className: classes.drawerHeader
  }, /*#__PURE__*/React__default.createElement(core.IconButton, {
    onClick: toggleDrawer(false)
  }, classes.direction === 'ltr' ? /*#__PURE__*/React__default.createElement(icons.ChevronLeft, null) : /*#__PURE__*/React__default.createElement(icons.ChevronRight, null))), /*#__PURE__*/React__default.createElement(core.Snackbar, {
    open: notificationState.open,
    autoHideDuration: 3000,
    onClose: handleClose
  }, /*#__PURE__*/React__default.createElement(Alert, {
    onClose: handleClose,
    severity: "warning"
  }, ' ', notificationState.message, ' ')), /*#__PURE__*/React__default.createElement(core.Divider, null), /*#__PURE__*/React__default.createElement(CallQueue, {
    calls: localStatePhone.phoneCalls,
    handleAnswer: handleAnswer,
    handleReject: handleReject
  }), /*#__PURE__*/React__default.createElement(SwipeCaruselBlock, {
    setLocalStatePhone: setLocalStatePhone,
    setActiveChannel: setActiveChannel,
    activeChannel: activeChannel,
    localStatePhone: localStatePhone
  }), /*#__PURE__*/React__default.createElement("div", {
    className: classes.phone
  }, /*#__PURE__*/React__default.createElement(core.TextField, {
    value: dialState,
    style: {
      textAlign: 'right'
    },
    id: "standard-basic",
    label: "Number",
    fullWidth: true,
    onKeyUp: function onKeyUp(event) {
      return dialNumberOnEnter(event);
    },
    onChange: handleDialStateChange
  }), /*#__PURE__*/React__default.createElement(KeypadBlock, {
    handleCallAttendedTransfer: handleCallAttendedTransfer,
    handleCallTransfer: handleCallTransfer,
    handleMicMute: handleMicMute,
    handleHold: handleHold,
    handleCall: handleCall,
    handleEndCall: handleEndCall,
    handlePressKey: handlePressKey,
    activeChanel: localStatePhone.displayCalls[activeChannel],
    handleSettingsButton: handleSettingsButton,
    asteriskAccounts: asteriskAccounts,
    dialState: dialState,
    setDialState: setDialState
  })), /*#__PURE__*/React__default.createElement(core.Divider, null), /*#__PURE__*/React__default.createElement(SwipeCaruselBodyBlock, {
    localStatePhone: localStatePhone,
    handleConnectPhone: handleConnectPhone,
    handleSettingsSlider: handleSettingsSlider,
    handleConnectOnStart: handleConnectOnStart,
    handleNotifications: handleNotifications,
    calls: calls,
    timelocale: timelocale,
    callVolume: callVolume
  }), /*#__PURE__*/React__default.createElement(core.Divider, null), /*#__PURE__*/React__default.createElement(StatusBlock, {
    connectedPhone: localStatePhone.connectedPhone,
    connectingPhone: localStatePhone.connectingPhone
  }), /*#__PURE__*/React__default.createElement(core.Divider, null)), /*#__PURE__*/React__default.createElement("div", {
    hidden: true
  }, /*#__PURE__*/React__default.createElement("audio", {
    preload: "auto",
    ref: player
  })), /*#__PURE__*/React__default.createElement("div", {
    hidden: true
  }, /*#__PURE__*/React__default.createElement("audio", {
    preload: "auto",
    ref: ringer
  })));
}

SoftPhone.propTypes = {
  callVolume: propTypes.any,
  ringVolume: propTypes.any,
  setConnectOnStartToLocalStorage: propTypes.any,
  setNotifications: propTypes.any,
  setCallVolume: propTypes.any,
  setRingVolume: propTypes.any,
  notifications: propTypes.any,
  connectOnStart: propTypes.any,
  config: propTypes.any,
  timelocale: propTypes.any,
  asteriskAccounts: propTypes.any
};

module.exports = SoftPhone;
//# sourceMappingURL=index.js.map
