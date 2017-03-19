import * as React from 'react';

import '../css/index.scss';
import Map from './components/Map';
import Scene from './components/Scene';
import { Search, BasemapGallery } from './components/widgets/WidgetComposites';
import { Polygon, Polyline, Point } from './components/geometry/GeometryComposites';
import { SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol } from './components/symbols/SymbolComposites';
import Graphic from './components/graphics/Graphic';
import { FeatureLayer } from './components/layers/LayerComposites'

interface ComponentState {
    active: boolean;
}

export default class HomeComponent extends React.Component<null, ComponentState>{
    constructor(props) {
        super(props);
        this.state = {
            active: true
        }
    }

    render() {
        return (
            <div>
                <Scene style={{ width: '100vw', height: '100vh' }} >
                    <FeatureLayer layerProperties={{
                       url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0" 
                    }} />
                    <Search position="top-right" />
                    <BasemapGallery position="bottom-left" />
                </Scene>
            </div>
        )
    }
}

