// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"sass/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\img\\tilde.svg":[["tilde.03376d1c.svg","img/tilde.svg"],"img/tilde.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/lodash.debounce/index.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

},{}],"js/DOMRefs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.galleryWrapRef = exports.searchInput = exports.intersectionAnchorGalleryRef = exports.nightModeSwitch = exports.galleryMenuRef = exports.modalUploadRef = exports.modalImgWindowRef = exports.modalImgRef = exports.modalNavRef = exports.modalAuthRef = exports.backdropRef = exports.galleryPageRef = exports.menuWrapRef = exports.bodyRef = void 0;

/* -------------------------------------------*/

/* --------------- DOM REFERENCES ------------*/

/* -------------------------------------------*/
var bodyRef = document.querySelector('body');
exports.bodyRef = bodyRef;
var menuWrapRef = document.querySelectorAll('.menu-item-wrap');
exports.menuWrapRef = menuWrapRef;
var galleryPageRef = document.querySelector('.gallery-page');
exports.galleryPageRef = galleryPageRef;
var galleryWrapRef = document.querySelector('.gallery-page-wrap');
exports.galleryWrapRef = galleryWrapRef;
var backdropRef = Array.from(document.querySelectorAll('.backdrop'));
exports.backdropRef = backdropRef;
var modalAuthRef = document.querySelector('[data-auth-modal]');
exports.modalAuthRef = modalAuthRef;
var modalNavRef = document.querySelector('[data-nav-modal]');
exports.modalNavRef = modalNavRef;
var modalImgRef = document.querySelector('.modal-image');
exports.modalImgRef = modalImgRef;
var modalImgWindowRef = document.querySelector('[data-img-modal]');
exports.modalImgWindowRef = modalImgWindowRef;
var modalUploadRef = document.querySelector('[data-upload-modal]');
exports.modalUploadRef = modalUploadRef;
var galleryMenuRef = document.querySelector('.gallery-menu');
exports.galleryMenuRef = galleryMenuRef;
var nightModeSwitch = document.querySelector('.nightMode-checkbox');
exports.nightModeSwitch = nightModeSwitch;
var intersectionAnchorGalleryRef = document.querySelector('.intersection-anchor');
exports.intersectionAnchorGalleryRef = intersectionAnchorGalleryRef;
var searchInput = document.querySelector('.search-input');
exports.searchInput = searchInput;
},{}],"js/globalVar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imgFetchOptions = void 0;

var _DOMRefs = require("./DOMRefs");

/* ---------------------------------------------*/

/* --------------- GLOBAL VARIABLES ------------*/

/* ---------------------------------------------*/
var imgFetchOptions = {
  API_KEY: '20496318-c7af985c6ce4a327e41f45e16',
  BASE_URL: 'https://pixabay.com/api/',
  imgPerPage: 20,
  currentPage: 1,
  currentImgArray: [],
  query: _DOMRefs.searchInput.value
};
exports.imgFetchOptions = imgFetchOptions;
},{"./DOMRefs":"js/DOMRefs.js"}],"js/inputQueryHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inputQueryHandler = inputQueryHandler;

var _DOMRefs = require("./DOMRefs");

var _globalVar = require("./globalVar");

function inputQueryHandler() {
  _globalVar.imgFetchOptions.query = _DOMRefs.searchInput.value;
  _globalVar.imgFetchOptions.currentImgArray = [];
  _globalVar.imgFetchOptions.currentPage = 1;
  _DOMRefs.galleryPageRef.innerHTML = '';
}
},{"./DOMRefs":"js/DOMRefs.js","./globalVar":"js/globalVar.js"}],"js/night-mode-toggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themeLoadHandler = themeLoadHandler;
exports.nightModeToggle = nightModeToggle;

var _DOMRefs = require("./DOMRefs");

/* ----------------------------*/

/*  NIGHT MODE TOGGLE FUNCTION */

/* ----------------------------*/
function themeLoadHandler() {
  switch (localStorage.getItem('theme')) {
    case 'light':
      _DOMRefs.bodyRef.classList.add('light-theme');

      _DOMRefs.nightModeSwitch.checked = true;
      break;

    case 'dark':
      return;
  }
}

function nightModeToggle() {
  if (_DOMRefs.bodyRef.classList.contains('light-theme')) {
    _DOMRefs.bodyRef.classList.remove('light-theme');

    localStorage.setItem('theme', 'dark');
    return;
  }

  ;

  _DOMRefs.bodyRef.classList.add('light-theme');

  localStorage.setItem('theme', 'light');
}

;
},{"./DOMRefs":"js/DOMRefs.js"}],"js/side-menu-item-toggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sideMenuItemOpen = sideMenuItemOpen;

var _DOMRefs = require("./DOMRefs");

/* -------------------------------------------*/

/*  SIDE MENU ITEM OPEN/CLOSE TOGGLE FUNCTION */

/* -------------------------------------------*/
function sideMenuItemOpen(event) {
  if (!event.target.classList.contains('menu-cat-button')) return;
  var targetItem = event.target.nextElementSibling.classList;

  if (!targetItem.contains('isOpen')) {
    _DOMRefs.menuWrapRef.forEach(function (item) {
      return item.classList.remove('isOpen');
    });

    targetItem.add('isOpen');
  } else targetItem.remove('isOpen');
}

;
},{"./DOMRefs":"js/DOMRefs.js"}],"js/specific-modal-window-handlers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navToggleHandler = navToggleHandler;
exports.authToggleHandler = authToggleHandler;
exports.uploadToggleHandler = uploadToggleHandler;
exports.imgToggleHandler = imgToggleHandler;

var _DOMRefs = require("./DOMRefs");

/* ----------------------------------------------------*/

/*  SPECIFIC MODAL WINDOWS OPEN/CLOSE TOGGLE FUNCTIONS */

/* ----------------------------------------------------*/
function navToggleHandler() {
  _DOMRefs.modalNavRef.classList.toggle("modal-hidden");
}

;

function authToggleHandler() {
  _DOMRefs.modalAuthRef.classList.toggle("modal-hidden");
}

;

function uploadToggleHandler() {
  _DOMRefs.modalUploadRef.classList.toggle("modal-hidden");
}

;

function imgToggleHandler(event) {
  if (event === 'close') {
    _DOMRefs.modalImgWindowRef.classList.toggle("modal-hidden");

    _DOMRefs.modalImgRef.src = '';
    return;
  }

  ;
  var target = event.target;

  if (target.classList.contains('gallery-page-img')) {
    _DOMRefs.modalImgRef.src = target.dataset.src;
    _DOMRefs.modalImgRef.dataset.index = target.dataset.index;

    _DOMRefs.modalImgWindowRef.classList.toggle("modal-hidden");
  }

  ;
}

;
},{"./DOMRefs":"js/DOMRefs.js"}],"js/basic-modal-windows-handler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openModal = openModal;
exports.closeModal = closeModal;

var _DOMRefs = require("./DOMRefs");

var _specificModalWindowHandlers = require("./specific-modal-window-handlers");

/* ------------------------------------------*/

/*  MODAL WINDOW OPEN/CLOSE TRIGGER HANDLERS */

/* ------------------------------------------*/
function openModal(event) {
  var role = event.currentTarget.dataset.modOpenTrigger;

  _DOMRefs.backdropRef.forEach(function (backdrop) {
    return backdrop.classList.add('modal-hidden');
  });

  switch (role) {
    case 'nav-open':
      {
        (0, _specificModalWindowHandlers.navToggleHandler)();
        break;
      }

    case 'auth-open':
      {
        (0, _specificModalWindowHandlers.authToggleHandler)();
        break;
      }

    case 'img-open':
      {
        (0, _specificModalWindowHandlers.imgToggleHandler)(event);
        break;
      }

    case 'upload-open':
      {
        event.preventDefault();
        (0, _specificModalWindowHandlers.uploadToggleHandler)();
        break;
      }
  }
}

;

function closeModal(event) {
  var role = event.currentTarget.dataset.modCloseTrigger;
  if (event.target !== event.currentTarget) return;

  switch (role) {
    case 'nav-close':
      {
        (0, _specificModalWindowHandlers.navToggleHandler)();
        break;
      }

    case 'auth-close':
      {
        (0, _specificModalWindowHandlers.authToggleHandler)();
        break;
      }

    case 'upload-close':
      {
        (0, _specificModalWindowHandlers.uploadToggleHandler)();
        break;
      }

    case 'img-close':
      {
        (0, _specificModalWindowHandlers.imgToggleHandler)('close');
        break;
      }
  }
}

;
},{"./DOMRefs":"js/DOMRefs.js","./specific-modal-window-handlers":"js/specific-modal-window-handlers.js"}],"js/modal-image-nav.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modalImgTriggerHandler = modalImgTriggerHandler;

var _globalVar = require("./globalVar");

var _DOMRefs = require("./DOMRefs");

/* -------------------------------------------*/

/* --------- MODAL IMAAGE NAVIGATION ---------*/

/* -------------------------------------------*/
function modalImgTriggerHandler(event) {
  var direction = event.target.dataset.modalImgNav;

  switch (direction) {
    case 'prev':
      modalImageNav(-1);
      break;

    case 'next':
      modalImageNav(1);
      break;
  }
}

function modalImageNav(indexShift) {
  var currentIndex = Number(_DOMRefs.modalImgRef.dataset.index);
  var nextIndex = currentIndex + indexShift;
  var currentImgQuantity = _globalVar.imgFetchOptions.currentImgArray.length;
  if (nextIndex < 0 || nextIndex >= currentImgQuantity) return;
  console.log(nextIndex + ' ' + currentImgQuantity);
  _DOMRefs.modalImgRef.src = "".concat(_globalVar.imgFetchOptions.currentImgArray[nextIndex].largeImageURL);
  _DOMRefs.modalImgRef.dataset.index = nextIndex;
}
},{"./globalVar":"js/globalVar.js","./DOMRefs":"js/DOMRefs.js"}],"js/gallery-menu-toggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.galleryMenuToggle = galleryMenuToggle;

var _DOMRefs = require("./DOMRefs");

/* -------------------------------------------*/

/* ----- GALLERY MENU OPEN'CLOSE TOGGLE ------*/

/* -------------------------------------------*/
function galleryMenuToggle() {
  _DOMRefs.galleryMenuRef.classList.toggle('isOpen');
}

;
},{"./DOMRefs":"js/DOMRefs.js"}],"js/gallery-render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.galleryImgRender = galleryImgRender;

var _DOMRefs = require("./DOMRefs");

var _globalVar = require("./globalVar");

/* ----------------------------*/

/*  GALLERY RENDERING FUNCTION */

/* ----------------------------*/
function galleryImgRender(imagesObjArray) {
  var imgRenderArray = imagesObjArray.map(function (el, index) {
    var imgIndex = index + (_globalVar.imgFetchOptions.currentPage - 1) * _globalVar.imgFetchOptions.imgPerPage;
    return "<div class=\"gallery-page-card-wrap\">\n          <div class=\"gallery-page-img-wrap\">\n              <img\n                class=\"gallery-page-img\"\n                src=\"".concat(el.previewURL, "\"\n                alt=\"image\"\n                data-src=\"").concat(el.largeImageURL, "\"\n                data-index=\"").concat(imgIndex, "\"\n              />\n          </div>\n          <div class=\"gallery-page-text\">\n            <h2 class=\"gallery-page-header\">").concat(el.user, "</h2>\n            <p class=\"gallery-page-paragraph\">\n              Lorem ipsum dolor sit amet, consectetur adipisicing elit.</br> Index : ").concat(imgIndex, ".\n            </p>\n          </div>\n        </div>");
  });

  _DOMRefs.galleryPageRef.insertAdjacentHTML('beforeend', imgRenderArray.join(''));
}

;
},{"./DOMRefs":"js/DOMRefs.js","./globalVar":"js/globalVar.js"}],"js/fetchImages.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchImages = fetchImages;

var _galleryRender = require("./gallery-render");

var _globalVar = require("./globalVar");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function fetchImages() {
  var BASE_URL = _globalVar.imgFetchOptions.BASE_URL,
      API_KEY = _globalVar.imgFetchOptions.API_KEY,
      query = _globalVar.imgFetchOptions.query,
      currentPage = _globalVar.imgFetchOptions.currentPage,
      imgPerPage = _globalVar.imgFetchOptions.imgPerPage;
  var requestURL = "".concat(BASE_URL, "?key=").concat(API_KEY, "&q=").concat(query, "&page=").concat(currentPage, "&per_page=").concat(imgPerPage);
  return fetch(requestURL).then(function (responce) {
    return responce.json();
  }).then(function (responce) {
    var _imgFetchOptions$curr;

    (0, _galleryRender.galleryImgRender)(responce.hits);
    _globalVar.imgFetchOptions.currentPage += 1;

    (_imgFetchOptions$curr = _globalVar.imgFetchOptions.currentImgArray).push.apply(_imgFetchOptions$curr, _toConsumableArray(responce.hits));
  });
}
},{"./gallery-render":"js/gallery-render.js","./globalVar":"js/globalVar.js"}],"js/intersection-observer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infScrollObserver = void 0;

var _DOMRefs = require("./DOMRefs");

var _fetchImages = require("./fetchImages");

var options = {
  root: _DOMRefs.galleryWrapRef,
  rootMargin: '50px',
  threshold: 0.2
};
var infScrollObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting) {
    (0, _fetchImages.fetchImages)();
    console.log('intersection');
  }
}, options);
exports.infScrollObserver = infScrollObserver;
},{"./DOMRefs":"js/DOMRefs.js","./fetchImages":"js/fetchImages.js"}],"js/script.js":[function(require,module,exports) {
"use strict";

require("../sass/main.scss");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _inputQueryHandler = require("./inputQueryHandler");

var _nightModeToggle = require("./night-mode-toggle.js");

var _sideMenuItemToggle = require("./side-menu-item-toggle");

var _basicModalWindowsHandler = require("./basic-modal-windows-handler");

var _modalImageNav = require("./modal-image-nav");

var _galleryMenuToggle = require("./gallery-menu-toggle");

var _DOMRefs = require("./DOMRefs");

var _intersectionObserver = require("./intersection-observer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modalOpenTriggersRef = Array.from(document.querySelectorAll("[data-mod-open-trigger]"));
var modalCloseTriggersRef = Array.from(document.querySelectorAll("[data-mod-close-trigger]"));
var modalImgNav = document.querySelectorAll('.image-nav-arrow');
var menuListItem = document.querySelector('.gallery-menu');
var sideMenuSwitch = document.querySelector('.sideMenu-checkbox');
window.addEventListener('DOMContentLoaded', _nightModeToggle.themeLoadHandler);

_DOMRefs.nightModeSwitch.addEventListener('change', _nightModeToggle.nightModeToggle);

sideMenuSwitch.addEventListener('change', _galleryMenuToggle.galleryMenuToggle);
menuListItem.addEventListener('click', _sideMenuItemToggle.sideMenuItemOpen);
modalOpenTriggersRef.forEach(function (item) {
  return item.addEventListener("click", _basicModalWindowsHandler.openModal);
});
modalCloseTriggersRef.forEach(function (item) {
  return item.addEventListener("click", _basicModalWindowsHandler.closeModal);
});
modalImgNav.forEach(function (item) {
  return item.addEventListener("click", _modalImageNav.modalImgTriggerHandler);
});

_DOMRefs.searchInput.addEventListener('input', (0, _lodash.default)(_inputQueryHandler.inputQueryHandler, 1000));

_intersectionObserver.infScrollObserver.observe(_DOMRefs.intersectionAnchorGalleryRef);
},{"../sass/main.scss":"sass/main.scss","lodash.debounce":"../node_modules/lodash.debounce/index.js","./inputQueryHandler":"js/inputQueryHandler.js","./night-mode-toggle.js":"js/night-mode-toggle.js","./side-menu-item-toggle":"js/side-menu-item-toggle.js","./basic-modal-windows-handler":"js/basic-modal-windows-handler.js","./modal-image-nav":"js/modal-image-nav.js","./gallery-menu-toggle":"js/gallery-menu-toggle.js","./DOMRefs":"js/DOMRefs.js","./intersection-observer":"js/intersection-observer.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62278" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)
//# sourceMappingURL=/script.d573be0b.js.map