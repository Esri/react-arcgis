import * as React from 'react';
import { esriPromise } from 'esri-promise';
import MapContainer from './mapContainer';

export interface MapViewProps {
    style?: {
        [propName: string]: any
    },
    mapProperties?: {
        allLayers?: __esri.Collection,
        basemap?: __esri.BasemapProperties,
        ground?: __esri.GroundProperties
    },
    viewProperties?: {
        camera?: __esri.CameraProperties;
        center?: __esri.PointProperties;
        clippingArea?: __esri.ExtentProperties;
        constraints?: __esri.SceneViewConstraintsProperties;
        environment?: __esri.SceneViewEnvironmentProperties;
        extent?: __esri.ExtentProperties;
        qualityProfile?: string;
        scale?: number;
        viewingMode?: string;
        viewpoint?: __esri.ViewpointProperties;
        zoom?: number;
    },
    onClick?: (e: EventProperties) => any,
    onDoubleClick?: (e: EventProperties) => any,
    onDrag?: (e: EventProperties) => any,
    onHold?: (e: EventProperties) => any,
    onKeyDown?: (e: EventProperties) => any,
    onKeyUp?: (e: EventProperties) => any,
    onLayerViewCreate?: (e: EventProperties) => any,
    onLayerViewDestroy?: (e: EventProperties) => any,
    onMouseWheel?: (e: EventProperties) => any,
    onPointerDown?: (e: EventProperties) => any,
    onPointerMove?: (e: EventProperties) => any,
    onPointerUp?: (e: EventProperties) => any,
    onResize?: (e: EventProperties) => any
}

interface EventProperties {
    [propName: string]: any
}

interface ComponentState { 
    mapContainerId: string,
    map: __esri.Map,
    view: __esri.View
}

const eventMap = {
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

export default class Scene extends React.Component<MapViewProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            mapContainerId: Math.random().toString(36).substring(14),
            map: null,
            view: null
        }
        this.renderScene = this.renderScene.bind(this);
    }

    private componentDidMount() {
        esriPromise([
            'esri/Map',
            'esri/views/SceneView'
        ]).then(([
            Map, SceneView
        ]) => {
            this.renderScene(Map, SceneView);
        })
    }

    render() {
        return (
            <div style={this.props.style}>
                <MapContainer id={this.state.mapContainerId} style={{ width: '100%', height: '100%' }} />
            </div>
        );
    }

    private renderScene(Map: __esri.MapConstructor, SceneView: __esri.SceneViewConstructor) {
        let mapProperties = { // Set some default map properties
            basemap: "streets-relief-vector",
            ground: "world-elevation"
        }
        if (typeof this.props.mapProperties === 'object') {
            mapProperties = Object.keys(this.props.mapProperties).reduce((p, c) => {    // Overwrite defaults with user defined properties
                p[c] = this.props.mapProperties[c];
                return p;
            }, {...mapProperties});
        }
        const map: __esri.Map = new Map(mapProperties);

        let viewProperties = {  // Set some default view properties
            map,
            container: this.state.mapContainerId,
            scale: 500000,
            center: [-122.4443, 47.2529]
        }
        if (typeof this.props.viewProperties === 'object') {  // Overwrite defaults with user defined properties
            viewProperties = Object.keys(this.props.viewProperties).reduce((p, c) => {
                p[c] = this.props.viewProperties[c];
                return p;
            }, {...viewProperties});
        }
        const view: __esri.SceneView = new SceneView(viewProperties);

        Object.keys(eventMap).forEach((key) => {  // Set view events to any user defined callbacks
            if (this.props[key]) {
                view.on(eventMap[key], this.props[key]);
            }
        });

        this.setState({ map, view });
    }
}