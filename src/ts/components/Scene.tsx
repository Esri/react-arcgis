import * as React from 'react';
import { esriPromise } from 'esri-promise';
import MapContainer from './MapContainer';

export interface SceneViewProps {
    style?: {
        [propName: string]: any
    },
    mapProperties?: __esri.MapProperties,
    viewProperties?: __esri.SceneViewProperties,
    
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

    onLoad?: (map: __esri.Map, view: __esri.SceneView) => any,
    onFail?: (e: any) => any
}

interface EventProperties {
    [propName: string]: any
}

interface ComponentState { 
    status: string,
    mapContainerId: string,
    map: __esri.Map,
    view: __esri.SceneView
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

export default class Scene extends React.Component<SceneViewProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            status: 'loading',
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
            if (this.props.onLoad) {
                this.props.onLoad(this.state.map, this.state.view);
            }
        }).catch((e) => {
            this.setState({ status: 'failed' })
            if (this.props.onFail) {
                this.props.onFail(e);
            }
        })
    }

    render() {
        const centerStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        };
        const mapStyle = { position: 'relative', ...this.props.style }
        if (this.state.status === 'loaded') {
            const childrenWithProps = React.Children.map(this.props.children, (child) => {
                let childEl = child as React.ReactElement<any>
                return React.cloneElement(childEl,
                {
                    view: this.state.view,
                    map: this.state.map
                });
            });
            return (
                <div style={mapStyle}>
                    <MapContainer id={this.state.mapContainerId} style={{ width: '100%', height: '100%' }} />
                    {childrenWithProps}
                </div>
            );
        } else if (this.state.status === 'loading') {
            return (
                <div style={mapStyle}>
                    <MapContainer id={this.state.mapContainerId} style={{ width: '100%', height: '100%' }} />
                    <h3 style={centerStyle}>Loading the scene..</h3>
                </div>
            );
        }
        return (
            <div style={mapStyle}>
                <h3 style={centerStyle}>Failed to load the ArcGIS API.</h3>
            </div>
        );
    }

    private renderScene(Map: __esri.MapConstructor, SceneView: __esri.SceneViewConstructor) {
        let mapProperties = { // Set some default map properties
            basemap: "satellite",
            ground: "world-elevation",
            ...this.props.mapProperties
        }
        const map: __esri.Map = new Map(mapProperties);

        let viewProperties = {  // Set some default view properties
            map,
            container: this.state.mapContainerId,
            scale: 500000,
            center: [-122.4443, 47.2529],
            ...this.props.viewProperties
        }
        const view: __esri.SceneView = new SceneView(viewProperties);

        Object.keys(eventMap).forEach((key) => {  // Set view events to any user defined callbacks
            if (this.props[key]) {
                view.on(eventMap[key], this.props[key]);
            }
        });

        this.setState({ map, view, status: 'loaded' });
    }
}