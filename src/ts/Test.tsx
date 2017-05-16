import * as React from 'react';
import '../css/index.scss';
import { Map, Scene } from './components/ArcComposites';
import { WebMap, WebScene } from './components/WebComposites';
import { BasemapGallery, Legend, Search } from './components/widgets/WidgetComposites';

interface ComponentState {
    myMap: __esri.WebScene;
    myView: __esri.MapView;
    mapProps: {
        [propName: string]: any;
    };
    searchWidgetProps: {
        [propName: string]: any;
    };
}

export default class TestComponent extends React.Component<null, ComponentState>{
    constructor(props) {
        super(props);
        this.state = {
            myMap: null,
            myView: null,
            mapProps: {
                zoom: null,
                foobar: null
            },
            searchWidgetProps: {
                searchTerm: null
            }
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.resetZoom = this.resetZoom.bind(this);
        this.clearSearchInput = this.clearSearchInput.bind(this);
    }

    public render() {
        return (
            <div style={{ width: '80vw', height: '80vh' }}>
                <div style={{ display: 'inline-block', width: '100%', height: '100%' }}>
                    <Scene
                        onLoad={this.handleMapLoad}
                        boundProperties={this.state.mapProps}
                        mapProperties={{ basemap: 'satellite' }}
                    >
                        <Search boundProperties={this.state.searchWidgetProps} position="top-right" />
                    </Scene>
                </div>
                <button onClick={this.resetZoom}>Reset Zoom</button>
                <button onClick={this.clearSearchInput}>Clear Search</button>
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
            mapProps: {...this.state.mapProps, zoom: 0, foobar: 5000}
        });
    }

    private clearSearchInput() {
        this.setState({
            searchWidgetProps: {...this.state.searchWidgetProps, searchTerm: ''}
        });
    }
}

