import * as React from 'react';
import { esriPromise } from 'esri-promise';
import MapContainer from './mapContainer';

export interface MapViewProps {
    style?: {
        [propName: string]: any
    },
    basemap?: string,
    zoom?: number,
    center?: number[]
}

interface ComponentState { 
    mapContainerId: string,
    map: __esri.Map,
    view: __esri.View
}

export class MapView extends React.Component<MapViewProps, ComponentState> {
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
            const map: __esri.Map = new Map({
                basemap: this.props.basemap ? this.props.basemap : "streets-vector"
            });

            const view: __esri.MapView = new MapView({
                map,
                container: this.state.mapContainerId,
                zoom: this.props.zoom ? this.props.zoom : 6,
                center: [-122.4443, 47.2529]
            });

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