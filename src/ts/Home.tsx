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
    zoomLevel: number;
}

export default class HomeComponent extends React.Component<null, ComponentState>{
    constructor(props) {
        super(props);
        this.state = {
            zoomLevel: 0
        }
    }

    render() {
        return (
            <div>
                <Scene style={{ width: '100vw', height: '100vh' }} />
            </div>
        )
    }
}

