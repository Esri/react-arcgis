import * as React from 'react';

import '../css/index.scss';
import Map from './components/Map';
import Scene from './components/Scene';
import { Locate } from './components/widgets/WidgetComposites';
import { Polygon, Polyline, Point } from './components/geometry/GeometryComposites';
import { SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol } from './components/symbols/SymbolComposites';
import Graphic from './components/graphics/Graphic';

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
                    <Locate position="top-right" />
                    <Graphic>
                        <Polygon geometryProperties={{
                            rings: [
                                [-64.78, 32.3],
                                [-66.07, 18.45],
                                [-80.21, 25.78],
                                [-64.78, 32.3]
                            ]
                        }} />
                        <SimpleFillSymbol symbolProperties={{
                            color: [227, 139, 79, 0.8],
                            outline: {
                                color: [255, 255, 255],
                                width: 1
                            }
                        }} />
                    </Graphic>
                    <Graphic>
                        <Polyline geometryProperties={{
                            paths: [
                                [-111.30, 52.68],
                                [-98, 49.5],
                                [-93.94, 29.89]
                            ]
                        }} />
                        <SimpleLineSymbol symbolProperties={{
                            color: [226, 119, 40],
                            width: 4
                        }} />
                    </Graphic>
                    <Graphic>
                        <Point geometryProperties={{
                            longitude: -49.97,
                            latitude: 41.73
                        }} />
                        <SimpleMarkerSymbol symbolProperties={{
                            color: [226, 119, 40],
                            outline: {
                                color: [255, 255, 255],
                                width: 2
                            }
                        }} />
                    </Graphic>
                </Scene>
            </div>
        )
    }
}

