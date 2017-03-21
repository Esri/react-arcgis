(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("esri-promise"));
	else if(typeof define === 'function' && define.amd)
		define("react-arcgis", ["react", "esri-promise"], factory);
	else if(typeof exports === 'object')
		exports["react-arcgis"] = factory(require("react"), require("esri-promise"));
	else
		root["react-arcgis"] = factory(root["react"], root["esri-promise"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 194);
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("esri-promise");

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(86);


/***/ }),

/***/ 33:
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
var esri_promise_1 = __webpack_require__(14);
var React = __webpack_require__(6);
var ArcContainer_1 = __webpack_require__(35);
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
            mapContainerId: Math.random().toString(36).substring(14),
            mapProperties: _this.props.mapProperties,
            mapWatchables: ['allLayers', 'basemap', 'declaredClass', 'ground', 'layers'],
            status: 'loading',
            view: null,
            viewProperties: _this.props.viewProperties,
            viewWatchables: _this.props.viewWatchables,
        };
        _this.renderMap = _this.renderMap.bind(_this);
        _this.registerStateChanges = _this.registerStateChanges.bind(_this);
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
        var mapStyle = __assign({ position: 'relative' }, this.props.style);
        if (this.state.status === 'loaded') {
            var childrenWithProps = React.Children.map(this.props.children, function (child) {
                var childEl = child;
                return React.cloneElement(childEl, {
                    map: _this.state.map,
                    view: _this.state.view
                });
            });
            return (React.createElement("div", { style: mapStyle },
                React.createElement(ArcContainer_1.default, { id: this.state.mapContainerId, style: { width: '100%', height: '100%' } }),
                childrenWithProps));
        }
        else if (this.state.status === 'loading') {
            return (React.createElement("div", { style: mapStyle },
                React.createElement(ArcContainer_1.default, { id: this.state.mapContainerId, style: { width: '100%', height: '100%' } }),
                React.createElement("h3", { style: centerStyle }, "Loading..")));
        }
        return (React.createElement("div", { style: mapStyle },
            React.createElement("h3", { style: centerStyle }, "The ArcGIS API failed to load.")));
    };
    ArcView.prototype.componentDidMount = function () {
        var _this = this;
        esri_promise_1.esriPromise(this.props.scriptUri)
            .then(function (_a) {
            var Map = _a[0], View = _a[1];
            _this.renderMap(Map, View);
            _this.registerStateChanges(_this.state.map, 'mapProperties', _this.state.mapWatchables, _this.props.onMapPropertyChange);
            _this.registerStateChanges(_this.state.view, 'viewProperties', _this.state.viewWatchables, _this.props.onViewPropertyChange);
            if (_this.props.onLoad) {
                _this.props.onLoad(_this.state.map, _this.state.view);
            }
        }).catch(function (e) {
            _this.setState({ status: 'failed' });
            if (_this.props.onFail) {
                _this.props.onFail(e);
            }
        });
    };
    ArcView.prototype.renderMap = function (Map, View) {
        var _this = this;
        var map = new Map(this.props.mapProperties); // Make the map
        var viewProperties = __assign({ map: map, container: this.state.mapContainerId }, this.props.viewProperties);
        var view = new View(viewProperties); // Make the view
        var typedView = view;
        Object.keys(eventMap).forEach(function (key) {
            if (_this.props[key]) {
                typedView.on(eventMap[key], _this.props[key]);
            }
        });
        this.setState({ map: map, view: typedView, status: 'loaded' }); // Set the map and view as part of the component state
    };
    ArcView.prototype.registerStateChanges = function (targetObj, componentStateKey, watchables, callback) {
        var _this = this;
        watchables.forEach(function (propKey) {
            targetObj.watch(propKey, function (newValue) {
                var newState = __assign({}, _this.state);
                newState[componentStateKey][propKey] = newValue;
                _this.setState(newState);
                callback(propKey, newValue);
            });
        });
    };
    ArcView.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (nextProps.mapProperties !== this.state.mapProperties && this.state.map) {
            this.state.mapWatchables.forEach(function (key) {
                if (nextProps.mapProperties[key] !== _this.state.mapProperties[key]) {
                    var newState = __assign({}, _this.state);
                    newState.mapProperties[key] = nextProps.mapProperties[key];
                    _this.setState(newState);
                    _this.state.map[key] = nextProps.mapProperties[key];
                }
            });
        }
        if (nextProps.viewProperties !== this.state.viewProperties && this.state.view) {
            this.state.viewWatchables.forEach(function (key) {
                if (nextProps.viewProperties[key] !== _this.state.viewProperties[key]) {
                    var newState = __assign({}, _this.state);
                    newState.viewProperties[key] = nextProps.viewProperties[key];
                    _this.setState(newState);
                    _this.state.view[key] = nextProps.viewProperties[key];
                }
            });
        }
    };
    return ArcView;
}(React.Component));
exports.ArcView = ArcView;


/***/ }),

/***/ 34:
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
var React = __webpack_require__(6);
var ArcBase_1 = __webpack_require__(33);
exports.Map = function (props) { return (React.createElement(ArcBase_1.ArcView, __assign({ scriptUri: ['esri/Map', 'esri/views/MapView'] }, props, { mapProperties: __assign({ basemap: 'streets-vector' }, props.mapProperties), viewProperties: __assign({ center: [-122.4443, 47.2529], zoom: 6 }, props.viewProperties), viewWatchables: [
        'camera',
        'center',
        'clippingArea',
        'constraints',
        'environment',
        'extent',
        'qualityProfile',
        'scale',
        'viewingMode',
        'viewpoint',
        'zoom'
    ], onViewPropertyChange: (props.onViewPropertyChange ? props.onViewPropertyChange : function () { return null; }), onMapPropertyChange: (props.onMapPropertyChange ? props.onMapPropertyChange : function () { return null; }) }))); };
exports.Scene = function (props) { return (React.createElement(ArcBase_1.ArcView, __assign({ scriptUri: ['esri/Map', 'esri/views/SceneView'] }, props, { mapProperties: __assign({ basemap: 'satellite', ground: 'world-elevation' }, props.mapProperties), viewProperties: __assign({ center: [-122.4443, 47.2529], scale: 500000 }, props.viewProperties), viewWatchables: [
        'center',
        'constraints',
        'extent',
        'resizeAlign',
        'rotation',
        'scale',
        'viewpoint',
        'zoom'
    ], onViewPropertyChange: (props.onViewPropertyChange ? props.onViewPropertyChange : function () { return null; }), onMapPropertyChange: (props.onMapPropertyChange ? props.onMapPropertyChange : function () { return null; }) }))); };


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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(6);
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var esri_promise_1 = __webpack_require__(14);
var React = __webpack_require__(6);
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
        var widgetProperties = __assign({ view: this.state.view }, this.props.widgetProperties);
        var position = this.props.position ? this.props.position : 'manual';
        var instance = new Widget(widgetProperties);
        this.setState({ instance: instance });
        this.state.view.ui.add(instance, { position: position });
    };
    return Widget;
}(React.Component));
exports.default = Widget;


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
var React = __webpack_require__(6);
var WidgetBase_1 = __webpack_require__(36);
exports.Attribution = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/Attribution" }))); };
exports.BasemapGallery = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/BasemapGallery" }))); };
exports.BasemapToggle = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/BasemapToggle" }))); };
exports.ColorSlider = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/ColorSlider" }))); };
exports.Compass = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/Compass" }))); };
exports.Expand = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/Expand" }))); };
exports.Home = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/Home" }))); };
exports.LayerList = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/LayerList" }))); };
exports.Legend = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/Legend" }))); };
exports.Locate = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/Locate" }))); };
exports.NavigationToggle = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/NavigationToggle" }))); };
exports.Popup = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/Popup" }))); };
exports.Print = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/Print" }))); };
exports.ScaleBar = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/ScaleBar" }))); };
exports.Search = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/Search" }))); };
exports.SizeSlider = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/SizeSlider" }))); };
exports.Track = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/Track" }))); };
exports.UnivariateColorSizeSlider = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/UnvariateColorSizeSlider" }))); };
exports.Zoom = function (props) { return (React.createElement(WidgetBase_1.default, __assign({}, props, { scriptUri: "esri/widgets/Zoom" }))); };


/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Views = __webpack_require__(34);
var GeometryImport = __webpack_require__(90);
var Graphic_1 = __webpack_require__(91);
var LayersImport = __webpack_require__(93);
var SymbolsImport = __webpack_require__(95);
var WidgetsImport = __webpack_require__(37);
var ReactArcGIS = {
    Geometry: GeometryImport,
    Graphic: Graphic_1.default,
    Layers: LayersImport,
    Map: Views.Map,
    Scene: Views.Scene,
    Symbols: SymbolsImport,
    Widgets: WidgetsImport,
};
exports.default = ReactArcGIS;
exports.Map = ReactArcGIS.Map;
exports.Scene = ReactArcGIS.Scene;
exports.Geometry = ReactArcGIS.Geometry;
exports.Graphic = Graphic_1.default;
exports.Layers = LayersImport;
exports.Symbols = SymbolsImport;
exports.Widgets = WidgetsImport;


/***/ }),

/***/ 89:
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
var esri_promise_1 = __webpack_require__(14);
var React = __webpack_require__(6);
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
    Geometry.prototype.createGeometry = function (Geometry) {
        var instance = new Geometry(this.props.geometryProperties);
        this.setState({ instance: instance });
        this.props.registerGeometry(instance);
    };
    return Geometry;
}(React.Component));
exports.default = Geometry;


/***/ }),

/***/ 90:
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
var React = __webpack_require__(6);
var GeometryBase_1 = __webpack_require__(89);
exports.Circle = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { scriptUri: "esri/geometry/Circle" }))); };
exports.Extent = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { scriptUri: "esri/geometry/Extent" }))); };
exports.Multipoint = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { scriptUri: "esri/geometry/Multipoint" }))); };
exports.Point = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { scriptUri: "esri/geometry/Point" }))); };
exports.Polygon = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { scriptUri: "esri/geometry/Polygon" }))); };
exports.Polyline = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { scriptUri: "esri/geometry/Polyline" }))); };
exports.ScreenPoint = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { scriptUri: "esri/geometry/ScreenPoint" }))); };
exports.SpatialReference = function (props) { return (React.createElement(GeometryBase_1.default, __assign({}, props, { scriptUri: "esri/geometry/SpatialReference" }))); };


/***/ }),

/***/ 91:
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
var esri_promise_1 = __webpack_require__(14);
var React = __webpack_require__(6);
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
    Graphic.prototype.registerSymbol = function (symbol) {
        this.setState({ symbol: symbol });
        this.renderGraphic();
    };
    Graphic.prototype.registerGeometry = function (geometry) {
        this.setState({ geometry: geometry });
        this.renderGraphic();
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
    return Graphic;
}(React.Component));
exports.default = Graphic;


/***/ }),

/***/ 92:
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
var esri_promise_1 = __webpack_require__(14);
var React = __webpack_require__(6);
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
    Layer.prototype.componentWillUnmount = function () {
        this.state.map.remove(this.state.instance);
    };
    Layer.prototype.renderLayer = function (Layer) {
        var instance = new Layer(this.props.layerProperties);
        this.setState({ instance: instance });
        this.state.map.add(instance);
    };
    return Layer;
}(React.Component));
exports.default = Layer;


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
var React = __webpack_require__(6);
var LayerBase_1 = __webpack_require__(92);
exports.CSVLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/CSVLayer' }))); };
exports.ElevationLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/ElevationLayer' }))); };
exports.FeatureLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/FeatureLayer' }))); };
exports.GeoRSSLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/GeoRSSLayer' }))); };
exports.GraphicsLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/GraphicsLayer' }))); };
exports.GroupLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/GroupLayer' }))); };
exports.ImageryLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/ImageryLayer' }))); };
exports.IntegratedMeshLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/IntegratedMeshLayer' }))); };
exports.MapImageLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/MapImageLayer' }))); };
exports.OpenStreetMapLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/OpenStreetMapLayer' }))); };
exports.PointCloudLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/PointCloudLayer' }))); };
exports.SceneLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/SceneLayer' }))); };
exports.StreamLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/StreamLayer' }))); };
exports.TileLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/TileLayer' }))); };
exports.VectorTileLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/VectorTileLayer' }))); };
exports.WebTileLayer = function (props) { return (React.createElement(LayerBase_1.default, __assign({}, props, { scriptUri: 'esri/layers/WebTileLayer' }))); };


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
var esri_promise_1 = __webpack_require__(14);
var React = __webpack_require__(6);
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
    Symbol.prototype.createSymbol = function (Symbol) {
        var instance = new Symbol(this.props.symbolProperties);
        this.setState({ instance: instance });
        this.props.registerSymbol(instance);
    };
    return Symbol;
}(React.Component));
exports.default = Symbol;


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
var React = __webpack_require__(6);
var SymbolBase_1 = __webpack_require__(94);
exports.Font = function (props) { return (React.createElement(SymbolBase_1.default, __assign({}, props, { scriptUri: "esri/symbols/Font" }))); };
exports.PictureFillSymbol = function (props) { return (React.createElement(SymbolBase_1.default, __assign({}, props, { scriptUri: "esri/symbols/PictureFillSymbol" }))); };
exports.PictureMarkerSymbol = function (props) { return (React.createElement(SymbolBase_1.default, __assign({}, props, { scriptUri: "esri/symbols/PictureMarkerSymbol" }))); };
exports.SimpleFillSymbol = function (props) { return (React.createElement(SymbolBase_1.default, __assign({}, props, { scriptUri: "esri/symbols/SimpleFillSymbol" }))); };
exports.SimpleLineSymbol = function (props) { return (React.createElement(SymbolBase_1.default, __assign({}, props, { scriptUri: "esri/symbols/SimpleLineSymbol" }))); };
exports.SimpleMarkerSymbol = function (props) { return (React.createElement(SymbolBase_1.default, __assign({}, props, { scriptUri: "esri/symbols/SimpleMarkerSymbol" }))); };


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map