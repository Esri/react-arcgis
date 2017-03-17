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
    }
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
    }
}

interface ComponentState { 
    mapContainerId: string,
    map: __esri.Map,
    view: __esri.View
}

export default class Scene extends React.Component<MapViewProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            mapContainerId: Math.random().toString(36).substring(14),
            map: null,
            view: null
        }
    }

    componentDidMount() {
        esriPromise([
            'esri/Map',
            'esri/views/SceneView'
        ]).then(([
            Map, SceneView
        ]) => {
            let mapProperties = {
                basemap: "streets-relief-vector",
                ground: "world-elevation"
            }
            if (typeof this.props.mapProperties === 'object') {
                mapProperties = Object.keys(this.props.mapProperties).reduce((p, c) => {
                    p[c] = this.props.mapProperties[c];
                    return p;
                }, {...mapProperties});
            }
            const map: __esri.Map = new Map(mapProperties);

            let viewProperties = {
                map,
                container: this.state.mapContainerId,
                scale: 500000,
                center: [-122.4443, 47.2529]
            }
            if (typeof this.props.viewProperties === 'object') {
                viewProperties = Object.keys(this.props.viewProperties).reduce((p, c) => {
                    p[c] = this.props.viewProperties[c];
                    return p;
                }, {...viewProperties});
            }
            const view: __esri.SceneView = new SceneView(viewProperties);

            this.setState({ map, view });
        })
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <MapContainer id={this.state.mapContainerId} style={this.props.style} />
            </div>
        );
    }
}