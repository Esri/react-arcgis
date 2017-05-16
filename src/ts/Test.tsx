import * as React from 'react';
import '../css/index.scss';
import { Map, Scene } from './components/ArcComposites';
import { WebMap, WebScene } from './components/WebComposites';
import { BasemapGallery, Legend, Search } from './components/widgets/WidgetComposites';

interface ComponentState {
    myMap: __esri.WebScene;
    myView: __esri.MapView;
    boundProps: {
        [propName: string]: any;
    }
}

export default class TestComponent extends React.Component<null, ComponentState>{
    constructor(props) {
        super(props);
        this.state = {
            myMap: null,
            myView: null,
            boundProps: {
                zoom: null,
                foobar: null
            }
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.resetZoom = this.resetZoom.bind(this);
    }

    public render() {
        return (
            <div style={{ width: '80vw', height: '80vh' }}>
                <div style={{ display: 'inline-block', width: '100%', height: '100%' }}>
                    <Map
                        onLoad={this.handleMapLoad}
                        boundProperties={this.state.boundProps}
                        mapProperties={{ basemap: 'osm' }}
                    />
                </div>
                <button onClick={this.resetZoom}>Reset Zoom</button>
            </div>
        );
    }

    private handleMapLoad(map, view) {
        this.setState({
            myMap: map,
            myView: view
        });
    }

    private resetZoom() {
        this.setState({
            boundProps: {...this.state.boundProps, zoom: 0, foobar: 5000}
        });
    }
}

