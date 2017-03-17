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
        ground?: __esri.GroundProperties,
    }
    viewProperties?: {
        center?: __esri.PointProperties,
        constraints?: __esri.MapViewConstraints,
        extent?: __esri.ExtentProperties,
        resizeAlign?: string,
        rotation?: number,
        scale?: number,
        viewpoint?: __esri.ViewpointProperties,
        zoom?: number
    }

}

interface ComponentState { 
    mapContainerId: string,
    map: __esri.Map,
    view: __esri.View
}

export default class MapView extends React.Component<MapViewProps, ComponentState> {
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
            'esri/views/MapView'
        ]).then(([
            Map, MapView
        ]) => {
            
            let mapProperties = { basemap: "streets-vector" }
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
                center: [-122.4443, 47.2529],
                zoom: 6
            };
            if (typeof this.props.viewProperties === 'object') {
                viewProperties = Object.keys(this.props.viewProperties).reduce((p, c) => {
                    p[c] = this.props.viewProperties[c];
                    return p;
                }, {...viewProperties});
            }
            const view: __esri.MapView = new MapView(viewProperties);

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