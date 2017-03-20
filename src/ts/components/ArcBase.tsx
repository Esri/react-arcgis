import * as React from 'react';
import { esriPromise } from 'esri-promise';
import ArcContainer from './ArcContainer';

export interface BaseProps {
    style?: {
        [propName: string]: any
    },
    mapProperties?: __esri.MapProperties,
    viewProperties?: __esri.MapViewProperties | __esri.SceneViewProperties,
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
    onResize?: (e: EventProperties) => any,
    onLoad?: (map: __esri.Map, view: __esri.MapView | __esri.SceneView) => any,
    onFail?: (e: any) => any
}

interface ArcProps extends BaseProps {
    scriptUri: string[],
}

interface EventProperties {
    [propName: string]: any
}


interface ComponentState { 
    status: string,
    mapContainerId: string,
    map: __esri.Map,
    view: __esri.MapView | __esri.SceneView
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
}

export class ArcView extends React.Component<ArcProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            status: 'loading',
            mapContainerId: Math.random().toString(36).substring(14),
            map: null,
            view: null
        }
        this.renderMap = this.renderMap.bind(this);
    }

    private componentDidMount() {
        esriPromise(this.props.scriptUri)
        .then(([
            Map, View
        ]) => {
            this.renderMap(Map, View);
            if (this.props.onLoad) {
                this.props.onLoad(this.state.map, this.state.view);
            }
        }).catch((e) => {
            this.setState({ status: 'failed' });
            if (this.props.onFail) {
                this.props.onFail(e);
            }
        });
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
                    <ArcContainer id={this.state.mapContainerId} style={{ width: '100%', height: '100%' }} />
                    {childrenWithProps}
                </div>
            );
        } else if (this.state.status === 'loading') {
            return (
                <div style={mapStyle}>
                    <ArcContainer id={this.state.mapContainerId} style={{ width: '100%', height: '100%' }} />
                    <h3 style={centerStyle}>Loading the map..</h3>
                </div>
            );
        }
        return (
            <div style={mapStyle}>
                <h3 style={centerStyle}>The ArcGIS API failed to load.</h3>
            </div>
        );
    }

    private renderMap(Map: __esri.MapConstructor, View: __esri.ViewConstructor) {
        const map: __esri.Map = new Map(this.props.mapProperties);  // Make the map
        const viewProperties: __esri.ViewProperties | __esri.MapProperties = {
            map,
            container: this.state.mapContainerId,
            ...this.props.viewProperties
        }
        const view: __esri.View = new View(viewProperties);  // Make the view
        let typedView = view as __esri.MapView | __esri.SceneView;

        Object.keys(eventMap).forEach((key) => {  // Set view events to any user defined callbacks
            if (this.props[key]) {
                typedView.on(eventMap[key], this.props[key]);
            }
        });
        this.setState({ map, view: typedView, status: 'loaded' });   // Set the map and view as part of the component state
    }
}