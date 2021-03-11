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
},{"./..\\img\\tilde.svg":[["tilde.03376d1c.svg","img/tilde.svg"],"img/tilde.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/DOMRefs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intersectionAnchorGalleryRef = exports.nightModeSwitch = exports.galleryMenuRef = exports.modalUploadRef = exports.modalImgWindowRef = exports.modalImgRef = exports.modalNavRef = exports.modalAuthRef = exports.backdropRef = exports.galleryPageRef = exports.menuWrapRef = exports.bodyRef = void 0;

/* -------------------------------------------*/

/* --------------- DOM REFERENCES ------------*/

/* -------------------------------------------*/
var bodyRef = document.querySelector('body');
exports.bodyRef = bodyRef;
var menuWrapRef = document.querySelectorAll('.menu-item-wrap');
exports.menuWrapRef = menuWrapRef;
var galleryPageRef = document.querySelector('.gallery-page');
exports.galleryPageRef = galleryPageRef;
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
},{}],"js/night-mode-toggle.js":[function(require,module,exports) {
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
exports.default = sideMenuItemOpen;

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
  var target = event.target;

  if (event === 'close') {
    _DOMRefs.modalImgWindowRef.classList.toggle("modal-hidden");

    _DOMRefs.modalImgRef.src = '';
    return;
  }

  ;

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
},{"./DOMRefs":"js/DOMRefs.js","./specific-modal-window-handlers":"js/specific-modal-window-handlers.js"}],"js/globalVar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  imgPerPage: 20,
  currentPage: 1,
  currentImgArray: []
};
exports.default = _default;
},{}],"js/modal-image-nav.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modalImgTriggerHandler = modalImgTriggerHandler;

var _globalVar = _interopRequireDefault(require("./globalVar"));

var _DOMRefs = require("./DOMRefs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* -------------------------------------------*/

/* --------- MODAL IMAAGE NAVIGATION ---------*/

/* -------------------------------------------*/
function modalImgTriggerHandler(event) {
  console.log('click!');
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
  var currentImgQuantity = _globalVar.default.currentImgArray.length;
  if (nextIndex < 0 || nextIndex >= currentImgQuantity) return;
  console.log(nextIndex + ' ' + currentImgQuantity);
  _DOMRefs.modalImgRef.src = "https://picsum.photos/id/".concat(_globalVar.default.currentImgArray[nextIndex].id, "/1000");
  _DOMRefs.modalImgRef.dataset.index = nextIndex;
}
},{"./globalVar":"js/globalVar.js","./DOMRefs":"js/DOMRefs.js"}],"js/gallery-menu-toggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = galleryMenuToggle;

var _DOMRefs = require("./DOMRefs");

/* -------------------------------------------*/

/* ----- GALLERY MENU OPEN'CLOSE TOGGLE ------*/

/* -------------------------------------------*/
function galleryMenuToggle() {
  _DOMRefs.galleryMenuRef.classList.toggle('isOpen');
}
},{"./DOMRefs":"js/DOMRefs.js"}],"js/gallery-render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = galleryImgRender;

var _DOMRefs = require("./DOMRefs");

var _globalVar = _interopRequireDefault(require("./globalVar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ----------------------------*/

/*  GALLERY RENDERING FUNCTION */

/* ----------------------------*/
function galleryImgRender(imagesObjArray) {
  var imgRenderArray = imagesObjArray.map(function (el, index) {
    var imgIndex = index + (_globalVar.default.currentPage - 1) * _globalVar.default.imgPerPage;
    return "<div class=\"gallery-page-wrap\">\n          <div class=\"gallery-page-img-wrap\">\n              <img\n                class=\"gallery-page-img\"\n                src=\"https://picsum.photos/id/".concat(el.id, "/250\"\n                srcset=\"https://picsum.photos/id/").concat(el.id, "/250 1x, https://picsum.photos/id/").concat(el.id, "/500 2x\"\n                alt=\"image\"\n                data-src=\"https://picsum.photos/id/").concat(el.id, "/1000\"\n                data-index=\"").concat(imgIndex, "\"\n              />\n          </div>\n          <div class=\"gallery-page-text\">\n            <h2 class=\"gallery-page-header\">").concat(el.author, "</h2>\n            <p class=\"gallery-page-paragraph\">\n              Lorem ipsum dolor sit amet, consectetur adipisicing elit.</br> Index : ").concat(imgIndex, ".\n            </p>\n          </div>\n        </div>");
  });

  _DOMRefs.intersectionAnchorGalleryRef.insertAdjacentHTML('beforebegin', imgRenderArray.join(''));
}

;
},{"./DOMRefs":"js/DOMRefs.js","./globalVar":"js/globalVar.js"}],"js/fetchImages.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchImages = fetchImages;

var _galleryRender = _interopRequireDefault(require("./gallery-render"));

var _globalVar = _interopRequireDefault(require("./globalVar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function fetchImages() {
  return fetch("https://picsum.photos/v2/list?page=".concat(_globalVar.default.currentPage, "&limit=").concat(_globalVar.default.imgPerPage)).then(function (responce) {
    return responce.json();
  }).then(function (responce) {
    var _imgFetchOptions$curr;

    (0, _galleryRender.default)(responce);
    _globalVar.default.currentPage += 1;

    (_imgFetchOptions$curr = _globalVar.default.currentImgArray).push.apply(_imgFetchOptions$curr, _toConsumableArray(responce));

    console.log(_globalVar.default.currentImgArray);
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
  root: _DOMRefs.galleryPageRef,
  rootMargin: '50px',
  threshold: 1.0
};
var infScrollObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting) (0, _fetchImages.fetchImages)();
}, options);
exports.infScrollObserver = infScrollObserver;
},{"./DOMRefs":"js/DOMRefs.js","./fetchImages":"js/fetchImages.js"}],"js/script.js":[function(require,module,exports) {
"use strict";

require("../sass/main.scss");

var _nightModeToggle = require("./night-mode-toggle.js");

var _sideMenuItemToggle = _interopRequireDefault(require("./side-menu-item-toggle"));

var _basicModalWindowsHandler = require("./basic-modal-windows-handler");

var _modalImageNav = require("./modal-image-nav");

var _galleryMenuToggle = _interopRequireDefault(require("./gallery-menu-toggle"));

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

sideMenuSwitch.addEventListener('change', _galleryMenuToggle.default);
menuListItem.addEventListener('click', _sideMenuItemToggle.default);
modalOpenTriggersRef.forEach(function (item) {
  return item.addEventListener("click", _basicModalWindowsHandler.openModal);
});
modalCloseTriggersRef.forEach(function (item) {
  return item.addEventListener("click", _basicModalWindowsHandler.closeModal);
});
modalImgNav.forEach(function (item) {
  return item.addEventListener("click", _modalImageNav.modalImgTriggerHandler);
});

_intersectionObserver.infScrollObserver.observe(_DOMRefs.intersectionAnchorGalleryRef);
},{"../sass/main.scss":"sass/main.scss","./night-mode-toggle.js":"js/night-mode-toggle.js","./side-menu-item-toggle":"js/side-menu-item-toggle.js","./basic-modal-windows-handler":"js/basic-modal-windows-handler.js","./modal-image-nav":"js/modal-image-nav.js","./gallery-menu-toggle":"js/gallery-menu-toggle.js","./DOMRefs":"js/DOMRefs.js","./intersection-observer":"js/intersection-observer.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50300" + '/');

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