import * as React from 'react';
import '../css/index.scss';
import { Scene } from './components/ArcComposites';
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
                zoom: null
            }
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.resetZoom = this.resetZoom.bind(this);
    }

    public render() {
        return (
            <div style={{ width: '100vw', height: '100vh' }}>
                <div style={{ display: 'inline-block', width: '100%', height: '100%' }}>
                    <WebMap
                        id='6627e1dd5f594160ac60f9dfc411673f'
                        onLoad={this.handleMapLoad}
                        boundProperties={this.state.boundProps}
                    >
                        <BasemapGallery position="bottom-left" />
                    </WebMap>
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
            boundProps: {...this.state.boundProps, zoom: 0}
        });
    }
}

