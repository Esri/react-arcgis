(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("esri-promise"));
	else if(typeof define === 'function' && define.amd)
		define("react-arcgis", ["react", "esri-promise"], factory);
	else if(typeof exports === 'object')
		exports["react-arcgis"] = factory(require("react"), require("esri-promise"));
	else
		root["react-arcgis"] = factory(root["react"], root["esri-promise"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_15__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 206);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(15);
var React = __webpack_require__(5);
var Symbol = (function (_super) {
    __extends(Symbol, _super);
    function Symbol(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            graphic: _this.props.graphic,
            instance: null,
            scriptUri: _this.props.scriptUri,
        };
        _this.createSymbol = _this.createSymbol.bind(_this);
        return _this;
    }
    Symbol.prototype.render = function () {
        return null;
    };
    Symbol.prototype.componentDidMount = function () {
        var _this = this;
        esri_promise_1.esriPromise([
            this.props.scriptUri
        ]).then(function (_a) {
            var Symbol = _a[0];
            _this.createSymbol(Symbol);
            if (_this.props.onLoad) {
                _this.props.onLoad(_this.state.instance);
            }
        }).catch(function (e) {
            if (_this.props.onFail) {
                _this.props.onFail(e);
            }
        });
    };
    Symbol.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (this.props.dataFlow === 'oneWay') {
            Object.keys(nextProps.symbolProperties).forEach(function (key) {
                if (_this.state.instance.get(key)) {
                    _this.state.instance.set(key, nextProps.symbolProperties[key]);
                }
            });
        }
    };
    Symbol.prototype.createSymbol = function (Symbol) {
        var instance = new Symbol(this.props.symbolProperties);
        this.setState({ instance: instance });
        this.props.registerSymbol(instance);
    };
    return Symbol;
}(React.Component));
exports.default = Symbol;
;


/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(5);
var SymbolBase_1 = __webpack_require__(100);
exports.Font = function (props) { return (React.createElement(SymbolBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/symbols/Font", symbolProperties: __assign({}, props.symbolProperties) }))); };
exports.PictureFillSymbol = function (props) { return (React.createElement(SymbolBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/symbols/PictureFillSymbol", symbolProperties: __assign({}, props.symbolProperties) }))); };
exports.PictureMarkerSymbol = function (props) { return (React.createElement(SymbolBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/symbols/PictureMarkerSymbol", symbolProperties: __assign({}, props.symbolProperties) }))); };
exports.SimpleFillSymbol = function (props) { return (React.createElement(SymbolBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/symbols/SimpleFillSymbol", symbolProperties: __assign({}, props.symbolProperties) }))); };
exports.SimpleLineSymbol = function (props) { return (React.createElement(SymbolBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/symbols/SimpleLineSymbol", symbolProperties: __assign({}, props.symbolProperties) }))); };
exports.SimpleMarkerSymbol = function (props) { return (React.createElement(SymbolBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/symbols/SimpleMarkerSymbol", symbolProperties: __assign({}, props.symbolProperties) }))); };


/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(15);
var React = __webpack_require__(5);
var Widget = (function (_super) {
    __extends(Widget, _super);
    function Widget(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            instance: null,
            map: _this.props.map,
            scriptUri: _this.props.scriptUri,
            view: _this.props.view,
        };
        _this.renderWidget = _this.renderWidget.bind(_this);
        return _this;
    }
    Widget.prototype.render = function () {
        return null;
    };
    Widget.prototype.componentDidMount = function () {
        var _this = this;
        esri_promise_1.esriPromise([
            this.props.scriptUri
        ]).then(function (_a) {
            var Widget = _a[0];
            _this.renderWidget(Widget);
            if (_this.props.onLoad) {
                _this.props.onLoad(_this.state.instance);
            }
        }).catch(function (e) {
            if (_this.props.onFail) {
                _this.props.onFail(e);
            }
        });
    };
    Widget.prototype.componentWillUnmount = function () {
        this.state.view.ui.remove(this.state.instance);
    };
    Widget.prototype.renderWidget = function (Widget) {
        var _this = this;
        var widgetProperties = __assign({ view: this.state.view }, this.props.widgetProperties);
        var position = this.props.position ? this.props.position : 'manual';
        var instance = new Widget(widgetProperties);
        Object.keys(this.props.eventMap).forEach(function (key) {
            if (_this.props[key]) {
                instance.on(_this.props.eventMap[key], _this.props[key]);
            }
        });
        this.setState({ instance: instance });
        this.state.view.ui.add(instance, { position: position });
    };
    Widget.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        Object.keys(nextProps.widgetProperties).forEach(function (key) {
            if (_this.state.instance.get(key)) {
                _this.state.instance.set(key, nextProps.widgetProperties[key]);
            }
        });
    };
    return Widget;
}(React.Component));
exports.default = Widget;
;


/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(5);
var WidgetBase_1 = __webpack_require__(102);
exports.Attribution = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/Attribution", widgetProperties: __assign({}, props.widgetProperties), eventMap: {} }))); };
exports.BasemapGallery = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/BasemapGallery", widgetProperties: __assign({}, props.widgetProperties), eventMap: {} }))); };
exports.BasemapToggle = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/BasemapToggle", widgetProperties: __assign({}, props.widgetProperties), eventMap: {
        onToggle: 'toggle'
    } }))); };
exports.ColorSlider = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/ColorSlider", widgetProperties: __assign({}, props.widgetProperties), eventMap: {
        onDataChange: 'data-change',
        onDataValueChange: 'data-value-change',
        onHandleValueChange: 'handle-value-change'
    } }))); };
exports.Compass = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/Compass", widgetProperties: __assign({}, props.widgetProperties), eventMap: {} }))); };
exports.Expand = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/Expand", widgetProperties: __assign({}, props.widgetProperties), eventMap: {} }))); };
exports.Home = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/Home", widgetProperties: __assign({}, props.widgetProperties), eventMap: {} }))); };
exports.LayerList = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/LayerList", widgetProperties: __assign({}, props.widgetProperties), eventMap: {
        onTriggerAction: 'trigger-action'
    } }))); };
exports.Legend = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/Legend", widgetProperties: __assign({}, props.widgetProperties), eventMap: {} }))); };
exports.Locate = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/Locate", widgetProperties: __assign({}, props.widgetProperties), eventMap: {
        onLocate: 'locate',
        onLocateError: 'locate-error'
    } }))); };
exports.NavigationToggle = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/NavigationToggle", widgetProperties: __assign({}, props.widgetProperties) }))); };
exports.Popup = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/Popup", widgetProperties: __assign({}, props.widgetProperties), eventMap: {
        onTriggerAction: 'trigger-action'
    } }))); };
exports.Print = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/Print", widgetProperties: __assign({}, props.widgetProperties), eventMap: {} }))); };
exports.ScaleBar = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/ScaleBar", widgetProperties: __assign({}, props.widgetProperties), eventMap: {} }))); };
exports.Search = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/Search", widgetProperties: __assign({}, props.widgetProperties), eventMap: {
        onSearchClear: 'search-clear',
        onSearchComplete: 'search-complete',
        onSearchStart: 'search-start',
        onSelectResult: 'select-result',
        onSuggestComplete: 'suggest-complete',
        onSuggestStart: 'suggest-start'
    } }))); };
exports.SizeSlider = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/SizeSlider", widgetProperties: __assign({}, props.widgetProperties), eventMap: {
        onDataChange: 'data-change',
        onDataValueChange: 'data-value-change',
        onHandleValueChange: 'handle-value-change'
    } }))); };
exports.Track = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/Track", widgetProperties: __assign({}, props.widgetProperties), eventMap: {
        onTrack: 'track',
        onTrackError: 'track-error'
    } }))); };
exports.UnivariateColorSizeSlider = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/UnvariateColorSizeSlider", widgetProperties: __assign({}, props.widgetProperties), eventMap: {
        onDataChange: 'data-change',
        onDataValueChange: 'data-value-change',
        onHandleValueChange: 'handle-value-change'
    } }))); };
exports.Zoom = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/widgets/Zoom", widgetProperties: __assign({}, props.widgetProperties), eventMap: {} }))); };


/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("esri-promise");

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(90);


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(38);
var React = __webpack_require__(5);
var ArcBase_1 = __webpack_require__(35);
var eventMap = {
    onClick: 'click',
    onDoubleClick: 'double-click',
    onDrag: 'drag',
    onHold: 'hold',
    onKeyDown: 'key-down',
    onKeyUp: 'key-up',
    onLayerViewCreate: 'layerview-create',
    onLayerViewDestroy: 'layerview-destroy',
    onMouseWheel: 'mouse-wheel',
    onPointerDown: 'pointer-down',
    onPointerMove: 'pointer-move',
    onPointerUp: 'pointer-up',
    onResize: 'resize'
};
exports.MapBase = function (props) { return (React.createElement(ArcBase_1.ArcView, __assign({}, props, { loadMap: function (_a, containerId) {
        var Map = _a[0], View = _a[1];
        var mapData = new es6_promise_1.Promise(function (resolve, reject) {
            try {
                var map_1 = new Map(props.mapProperties); // Make the map
                var viewProperties = __assign({ map: map_1, container: containerId }, props.viewProperties);
                var view_1 = new View(viewProperties); // Make the view
                var typedView_1 = view_1;
                Object.keys(eventMap).forEach(function (key) {
                    if (props[key]) {
                        typedView_1.on(eventMap[key], props[key]);
                    }
                });
                view_1.then(function () {
                    resolve({ map: map_1, view: view_1 });
                }, function (err) {
                    reject(err);
                });
            }
            catch (err) {
                reject(err);
            }
        });
        return mapData;
    } }))); };
exports.WebBase = function (props) { return (React.createElement(ArcBase_1.ArcView, __assign({}, props, { loadMap: function (_a, containerId) {
        var WebConstructor = _a[0], ViewConstructor = _a[1], all = _a[2];
        var mapData = new es6_promise_1.Promise(function (resolve, reject) {
            try {
                var map_2 = new WebConstructor({
                    portalItem: {
                        id: props.id
                    }
                });
                map_2.load()
                    .then(function () {
                    return map_2.basemap.load();
                })
                    .then(function () {
                    var allLayers = map_2.allLayers;
                    var promises = allLayers.map(function (layer) { return layer.load(); });
                    return all(promises.toArray());
                })
                    .then(function (layers) {
                    var view = new ViewConstructor(__assign({ container: containerId, map: map_2 }, props.viewProperties));
                    Object.keys(eventMap).forEach(function (key) {
                        if (props[key]) {
                            view.on(eventMap[key], props[key]);
                        }
                    });
                    resolve({ map: map_2, view: view });
                }).otherwise(function (err) {
                    reject(err);
                });
            }
            catch (err) {
                reject(err);
            }
        });
        return mapData;
    } }))); };


/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(15);
var React = __webpack_require__(5);
var ArcContainer_1 = __webpack_require__(36);
var eventMap = {
    onClick: 'click',
    onDoubleClick: 'double-click',
    onDrag: 'drag',
    onHold: 'hold',
    onKeyDown: 'key-down',
    onKeyUp: 'key-up',
    onLayerViewCreate: 'layerview-create',
    onLayerViewDestroy: 'layerview-destroy',
    onMouseWheel: 'mouse-wheel',
    onPointerDown: 'pointer-down',
    onPointerMove: 'pointer-move',
    onPointerUp: 'pointer-up',
    onResize: 'resize'
};
var ArcView = (function (_super) {
    __extends(ArcView, _super);
    function ArcView(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            map: null,
            mapContainerId: Math.random().toString(36).substring(0, 14),
            mapProperties: _this.props.mapProperties,
            status: 'loading',
            view: null,
            viewProperties: _this.props.viewProperties
        };
        return _this;
    }
    ArcView.prototype.render = function () {
        var _this = this;
        var centerStyle = {
            left: '50%',
            marginRight: '-50%',
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        };
        var mapStyle = this.props.className ? this.props.style : __assign({ position: 'relative', width: '100%', height: '100%' }, this.props.style);
        var className = this.props.className ? this.props.className : null;
        var loadElement = (this.props.loadComponent ? React.createElement(this.props.loadComponent, null) : React.createElement("h3", { id: "react-arcgis-loading-text", style: centerStyle }, "Loading.."));
        var failElement = (this.props.failComponent ? React.createElement(this.props.failComponent, null) :
            React.createElement("h3", { id: "react-arcgis-fail-text", style: centerStyle }, "The ArcGIS API failed to load."));
        if (this.state.status === 'loaded') {
            var childrenWithProps = React.Children.map(this.props.children, function (child) {
                var childEl = child;
                return React.cloneElement(childEl, {
                    map: _this.state.map,
                    view: _this.state.view
                });
            });
            return (React.createElement("div", { id: "base-container", style: mapStyle, className: className },
                React.createElement(ArcContainer_1.default, { id: this.state.mapContainerId, style: { width: '100%', height: '100%' } }),
                childrenWithProps));
        }
        else if (this.state.status === 'loading') {
            return (React.createElement("div", { id: "base-container", style: mapStyle, className: className },
                React.createElement(ArcContainer_1.default, { id: this.state.mapContainerId, style: { width: '100%', height: '100%' } }),
                loadElement));
        }
        return (React.createElement("div", { id: "base-container", style: mapStyle, className: className }, failElement));
    };
    ArcView.prototype.componentDidMount = function () {
        var _this = this;
        esri_promise_1.esriPromise(this.props.scriptUri)
            .then(function (modules) { return (_this.props.loadMap(modules, _this.state.mapContainerId)
            .then(function (_a) {
            var map = _a.map, view = _a.view;
            _this.setState({
                map: map,
                view: view,
                status: 'loaded'
            });
            if (_this.props.onLoad) {
                _this.props.onLoad(map, view);
            }
        })
            .catch(function (e) {
            throw e;
        })); }).catch(function (e) {
            _this.setState({ status: 'failed' });
            if (_this.props.onFail) {
                _this.props.onFail(e);
            }
        });
    };
    ArcView.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (this.props.dataFlow === 'oneWay') {
            Object.keys(nextProps.userDefinedMapProperties).forEach(function (key) {
                if (_this.state.map.get(key) && _this.state.map.get(key) !== nextProps.userDefinedMapProperties[key]) {
                    _this.state.map.set(key, nextProps.userDefinedMapProperties[key]);
                }
            });
            Object.keys(nextProps.userDefinedViewProperties).forEach(function (key) {
                if (_this.state.view.get(key) && _this.state.view.get(key) !== nextProps.userDefinedViewProperties[key]) {
                    var changes = {};
                    changes[key] = nextProps.userDefinedViewProperties[key];
                    _this.state.view.set(changes);
                }
            });
        }
    };
    return ArcView;
}(React.Component));
exports.ArcView = ArcView;


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(5);
var ArcContainer = (function (_super) {
    __extends(ArcContainer, _super);
    function ArcContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArcContainer.prototype.render = function () {
        return React.createElement("div", { id: this.props.id, style: this.props.style });
    };
    ArcContainer.prototype.shouldComponentUpdate = function () {
        return false;
    };
    return ArcContainer;
}(React.Component));
exports.default = ArcContainer;


/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(5);
var ArcComposites_1 = __webpack_require__(26);
exports.WebMap = function (props) { return (React.createElement(ArcComposites_1.WebBase, __assign({ dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: ['esri/WebMap', 'esri/views/MapView', 'dojo/promise/all'] }, props, { viewProperties: props.viewProperties, mapProperties: props.mapProperties, userDefinedMapProperties: __assign({}, props.mapProperties), userDefinedViewProperties: __assign({}, props.viewProperties) }))); };
exports.WebScene = function (props) { return (React.createElement(ArcComposites_1.WebBase, __assign({ dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: ['esri/WebScene', 'esri/views/SceneView', 'dojo/promise/all'] }, props, { viewProperties: props.viewProperties, mapProperties: props.mapProperties, userDefinedMapProperties: __assign({}, props.mapProperties), userDefinedViewProperties: __assign({}, props.viewProperties) }))); };


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(57);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(56)))

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 57:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MapViews = __webpack_require__(93);
var WebViews = __webpack_require__(37);
var GeometryImport = __webpack_require__(95);
var Graphic_1 = __webpack_require__(96);
var LayersImport = __webpack_require__(98);
var SymbolsImport = __webpack_require__(101);
var WidgetsImport = __webpack_require__(103);
var Popup_1 = __webpack_require__(99);
var ReactArcGIS = {
    Geometry: GeometryImport,
    Graphic: Graphic_1.default,
    Layers: LayersImport,
    Map: MapViews.Map,
    Popup: Popup_1.default,
    Scene: MapViews.Scene,
    Symbols: SymbolsImport,
    WebMap: WebViews.WebMap,
    WebScene: WebViews.WebScene,
    Widgets: WidgetsImport,
};
exports.default = ReactArcGIS;
exports.WebMap = ReactArcGIS.WebMap;
exports.WebScene = ReactArcGIS.WebScene;
exports.Map = ReactArcGIS.Map;
exports.Popup = ReactArcGIS.Popup;
exports.Scene = ReactArcGIS.Scene;
exports.Geometry = ReactArcGIS.Geometry;
exports.Graphic = Graphic_1.default;
exports.Layers = LayersImport;
exports.Symbols = SymbolsImport;
exports.Widgets = WidgetsImport;


/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(5);
var ArcComposites_1 = __webpack_require__(26);
exports.Map = function (props) { return (React.createElement(ArcComposites_1.MapBase, __assign({ dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: ['esri/Map', 'esri/views/MapView'] }, props, { mapProperties: __assign({ basemap: 'streets-vector' }, props.mapProperties), viewProperties: __assign({ center: [-122.4443, 47.2529], zoom: 6 }, props.viewProperties), userDefinedMapProperties: __assign({}, props.mapProperties), userDefinedViewProperties: __assign({}, props.viewProperties) }))); };
exports.Scene = function (props) { return (React.createElement(ArcComposites_1.MapBase, __assign({ dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: ['esri/Map', 'esri/views/SceneView'] }, props, { mapProperties: __assign({ basemap: 'satellite', ground: 'world-elevation' }, props.mapProperties), viewProperties: __assign({ center: [-122.4443, 47.2529], scale: 500000 }, props.viewProperties), userDefinedMapProperties: __assign({}, props.mapProperties), userDefinedViewProperties: __assign({}, props.viewProperties) }))); };


/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(15);
var React = __webpack_require__(5);
var Geometry = (function (_super) {
    __extends(Geometry, _super);
    function Geometry(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            graphic: _this.props.graphic,
            instance: null,
            scriptUri: _this.props.scriptUri,
        };
        _this.createGeometry = _this.createGeometry.bind(_this);
        return _this;
    }
    Geometry.prototype.render = function () {
        return null;
    };
    Geometry.prototype.componentDidMount = function () {
        var _this = this;
        esri_promise_1.esriPromise([
            this.props.scriptUri
        ]).then(function (_a) {
            var Geometry = _a[0];
            _this.createGeometry(Geometry);
            if (_this.props.onLoad) {
                _this.props.onLoad(_this.state.instance);
            }
        }).catch(function (e) {
            if (_this.props.onFail) {
                _this.props.onFail(e);
            }
        });
    };
    Geometry.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (this.props.dataFlow === 'oneWay') {
            Object.keys(nextProps.geometryProperties).forEach(function (key) {
                if (_this.state.instance.get(key)) {
                    _this.state.instance.set(key, nextProps.geometryProperties[key]);
                }
            });
        }
    };
    Geometry.prototype.createGeometry = function (Geometry) {
        var instance = new Geometry(this.props.geometryProperties);
        this.setState({ instance: instance });
        this.props.registerGeometry(instance);
    };
    return Geometry;
}(React.Component));
exports.default = Geometry;


/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(5);
var GeometryBase_1 = __webpack_require__(94);
exports.Circle = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/geometry/Circle", geometryProperties: __assign({}, props.geometryProperties) }))); };
exports.Extent = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/geometry/Extent", geometryProperties: __assign({}, props.geometryProperties) }))); };
exports.Multipoint = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/geometry/Multipoint", geometryProperties: __assign({}, props.geometryProperties) }))); };
exports.Point = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/geometry/Point", geometryProperties: __assign({}, props.geometryProperties) }))); };
exports.Polygon = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/geometry/Polygon", geometryProperties: __assign({}, props.geometryProperties) }))); };
exports.Polyline = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/geometry/Polyline", geometryProperties: __assign({}, props.geometryProperties) }))); };
exports.ScreenPoint = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/geometry/ScreenPoint", geometryProperties: __assign({}, props.geometryProperties) }))); };
exports.SpatialReference = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/geometry/SpatialReference", geometryProperties: __assign({}, props.geometryProperties) }))); };


/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(15);
var React = __webpack_require__(5);
var Graphic = (function (_super) {
    __extends(Graphic, _super);
    function Graphic(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            constructor: null,
            geometry: null,
            instance: null,
            layer: _this.props.layer,
            map: _this.props.map,
            symbol: null,
            view: _this.props.view,
        };
        _this.renderGraphic = _this.renderGraphic.bind(_this);
        _this.registerSymbol = _this.registerSymbol.bind(_this);
        _this.registerGeometry = _this.registerGeometry.bind(_this);
        return _this;
    }
    Graphic.prototype.render = function () {
        var _this = this;
        var childrenWithProps = React.Children.map(this.props.children, function (child) {
            var childEl = child;
            return React.cloneElement(childEl, {
                registerGeometry: _this.registerGeometry,
                registerSymbol: _this.registerSymbol,
            });
        });
        return (React.createElement("div", null, childrenWithProps));
    };
    Graphic.prototype.renderGraphic = function () {
        if (this.state.constructor && this.state.symbol && this.state.geometry) {
            var graphic = new this.state.constructor(__assign({ geometry: this.state.geometry, symbol: this.state.symbol }, this.props.graphicProperties));
            this.setState({
                instance: graphic
            });
            if (this.state.layer) {
                this.state.layer.graphics.add(graphic);
            }
            else if (this.state.view) {
                this.state.view.graphics.add(graphic);
            }
            if (this.props.onLoad) {
                this.props.onLoad(graphic);
            }
        }
    };
    Graphic.prototype.componentDidMount = function () {
        var _this = this;
        esri_promise_1.esriPromise([
            'esri/Graphic'
        ]).then(function (_a) {
            var Graphic = _a[0];
            _this.setState({ constructor: Graphic });
            _this.renderGraphic();
        }).catch(function (e) {
            if (_this.props.onFail) {
                _this.props.onFail(e);
            }
        });
    };
    Graphic.prototype.componentWillUnmount = function () {
        if (this.state.layer) {
            this.state.layer.graphics.remove(this.state.instance);
        }
        else if (this.state.view) {
            this.state.view.graphics.remove(this.state.instance);
        }
    };
    Graphic.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (nextProps.graphicProperties && this.props.dataFlow === 'oneWay') {
            Object.keys(nextProps.graphicProperties).forEach(function (key) {
                if (_this.state.instance.get(key)) {
                    _this.state.instance.set(key, nextProps.graphicProperties[key]);
                }
            });
        }
    };
    Graphic.prototype.registerSymbol = function (symbol) {
        this.setState({ symbol: symbol });
        this.renderGraphic();
    };
    Graphic.prototype.registerGeometry = function (geometry) {
        this.setState({ geometry: geometry });
        this.renderGraphic();
    };
    return Graphic;
}(React.Component));
exports.default = Graphic;


/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(15);
var React = __webpack_require__(5);
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            instance: null,
            map: _this.props.map,
            scriptUri: _this.props.scriptUri,
            status: 'loading',
            view: _this.props.view,
        };
        _this.renderLayer = _this.renderLayer.bind(_this);
        return _this;
    }
    Layer.prototype.render = function () {
        var _this = this;
        if (this.state.status === 'loaded') {
            var childrenWithProps = React.Children.map(this.props.children, function (child) {
                var childEl = child;
                return React.cloneElement(childEl, {
                    layer: _this.state.instance
                });
            });
            return (React.createElement("div", null, childrenWithProps));
        }
        return null;
    };
    Layer.prototype.componentWillUnmount = function () {
        this.state.map.remove(this.state.instance);
    };
    Layer.prototype.componentDidMount = function () {
        var _this = this;
        esri_promise_1.esriPromise([
            this.props.scriptUri
        ]).then(function (_a) {
            var Layer = _a[0];
            _this.renderLayer(Layer);
            _this.setState({ status: 'loaded' });
            if (_this.props.onLoad) {
                _this.props.onLoad(_this.state.instance);
            }
        }).catch(function (e) {
            _this.setState({ status: 'failed' });
            if (_this.props.onFail) {
                _this.props.onFail(e);
            }
        });
    };
    Layer.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (this.props.dataFlow === 'oneWay') {
            Object.keys(nextProps.layerProperties).forEach(function (key) {
                if (_this.state.instance.get(key)) {
                    _this.state.instance.set(key, nextProps.layerProperties[key]);
                }
            });
        }
    };
    Layer.prototype.renderLayer = function (Layer) {
        var _this = this;
        var instance = new Layer(this.props.layerProperties);
        Object.keys(this.props.eventMap).forEach(function (key) {
            if (_this.props[key]) {
                instance.on(_this.props.eventMap[key], _this.props[key]);
            }
        });
        this.setState({ instance: instance });
        var parent = this.props.addLocation.reduce(function (p, c) { return p[c]; }, this.state);
        parent.add(instance);
    };
    return Layer;
}(React.Component));
exports.default = Layer;
;


/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(5);
var LayerBase_1 = __webpack_require__(97);
exports.CSVLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/CSVLayer", layerProperties: __assign({}, props.layerProperties), addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.ElevationLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/ElevationLayer", layerProperties: __assign({}, props.layerProperties), addLocation: ['map', 'ground', 'layers'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.FeatureLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/FeatureLayer", layerProperties: __assign({}, props.layerProperties), addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.GeoRSSLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/GeoRSSLayer", layerProperties: __assign({}, props.layerProperties), addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.GraphicsLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/GraphicsLayer", layerProperties: __assign({}, props.layerProperties), addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.GroupLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/GroupLayer", layerProperties: __assign({}, props.layerProperties), addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.ImageryLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/ImageryLayer", layerProperties: __assign({}, props.layerProperties), addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.IntegratedMeshLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/IntegratedMeshLayer", layerProperties: __assign({}, props.layerProperties), addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.MapImageLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/MapImageLayer", layerProperties: __assign({}, props.layerProperties), addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.OpenStreetMapLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/OpenStreetMapLayer", addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.PointCloudLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/PointCloudLayer", addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.SceneLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/SceneLayer", addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.StreamLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/StreamLayer", addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.TileLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/TileLayer", addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.VectorTileLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/VectorTileLayer", addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };
exports.WebTileLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { dataFlow: props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime', scriptUri: "esri/layers/WebTileLayer", addLocation: ['map'], eventMap: {
        onLayerviewCreate: 'layerview-create',
        onLayerviewDestroy: 'layerview-destroy'
    } }))); };


/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(5);
;
;
;
var Popup = (function (_super) {
    __extends(Popup, _super);
    function Popup(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            map: _this.props.map,
            mounted: false,
            view: _this.props.view,
        };
        return _this;
    }
    Popup.prototype.render = function () {
        return null;
    };
    Popup.prototype.componentDidMount = function () {
        if (this.props.popupProperties) {
            this.state.view.popup.open(this.props.popupProperties);
            this.setState({
                mounted: true
            });
        }
        else {
            console.warn('React-arcgis attempted to display a popup without any content. Please include popupProperties in order to see the popup.');
        }
    };
    Popup.prototype.componentWillUnmount = function () {
        if (this.state.mounted) {
            this.state.view.popup.close();
            this.setState({
                mounted: false
            });
        }
    };
    Popup.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.popupProperties && this.state.mounted && nextProps.popupProperties !== this.props.popupProperties) {
            this.state.view.popup.close();
            this.state.view.popup.open(nextProps.popupProperties);
        }
    };
    return Popup;
}(React.Component));
exports.default = Popup;


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map