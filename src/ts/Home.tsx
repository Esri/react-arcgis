import * as React from 'react';

import '../css/index.scss';
import { Map, Scene } from './components/ArcComposites';
import { Search, BasemapGallery } from './components/widgets/WidgetComposites';
import { Polygon, Polyline, Point } from './components/geometry/GeometryComposites';
import { SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol } from './components/symbols/SymbolComposites';
import Graphic from './components/graphics/Graphic';
import { FeatureLayer } from './components/layers/LayerComposites'

interface ComponentState {
    myViewProperties: __esri.SceneViewProperties;
    myMapProperties: __esri.MapProperties;
}

export default class HomeComponent extends React.Component<null, ComponentState>{
    constructor(props) {
        super(props);
        this.state = {
            myViewProperties: {
                zoom: 0
            },
            myMapProperties: {
                basemap: 'satellite'
            }
        }
        this.handleViewPropertyChange = this.handleViewPropertyChange.bind(this);
        this.resetZoom = this.resetZoom.bind(this);
        this.setBasemap = this.setBasemap.bind(this);
    }

    render() {
        return (
            <div>
                <Scene 
                    style={{ width: '80vw', height: '80vh' }}
                    mapProperties={this.state.myMapProperties}
                    viewProperties={this.state.myViewProperties}
                    onViewPropertyChange={this.handleViewPropertyChange}
                >
                </Scene>
                <button onClick={this.resetZoom}>ResetZoom</button>
                <button onClick={() => this.setBasemap('topo')}>Topo Basemap</button>
                <button onClick={() => this.setBasemap('satellite')}>Satellite Basemap</button>
                <button onClick={() => this.goto(-122.4443, 47.2529)}>Go to Tacoma</button>
            </div>
        )
    }

    private handleViewPropertyChange(key: string, value: any) {
        let newViewProperties = {...this.state.myViewProperties};
        newViewProperties[key] = value;
        this.setState({
            myViewProperties: newViewProperties
        })
    }

    private resetZoom() {
        this.setState({
            myViewProperties: { ...this.state.myViewProperties, zoom: 0 }
        });
    }

    private setBasemap(basemap: string) {
        this.setState({
            myMapProperties: { ...this.state.myMapProperties, basemap }
        })
    }

    private goto(latitude: number, longitude: number) {
        this.setState({
            myViewProperties: { ...this.state.myViewProperties, center: [latitude, longitude] }
        })
    }
}

