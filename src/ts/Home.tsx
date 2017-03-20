import * as React from 'react';

import '../css/index.scss';
import { Map, Scene } from './components/ArcComposites';
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
            <Scene style={{ width: '100vw', height: '100vh' }}>
                <Search position="top-right" />
            </Scene>
        )
    }
}

