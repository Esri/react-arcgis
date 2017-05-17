import * as React from 'react';
import '../css/index.scss';
import { Map, Scene } from './components/ArcComposites';
import { WebMap, WebScene } from './components/WebComposites';
import { BasemapGallery, Legend, Search } from './components/widgets/WidgetComposites';
import Graphic from './components/graphics/Graphic';
import { SimpleFillSymbol } from './components/symbols/SymbolComposites';
import { Polygon } from './components/geometry/GeometryComposites';
import { GraphicsLayer } from './components/layers/LayerComposites';

interface ComponentState {
    myMap: __esri.WebScene;
    myView: __esri.MapView;
    mapProperties: {
        [propName: string]: any;
    };
    viewProperties: {
        [propName: string]: any;
    };
    dragging: boolean;
    dragPrevious: {
        x: number,
        y: number
    };
}

export default class TestComponent extends React.Component<null, ComponentState>{
    constructor(props) {
        super(props);
        this.state = {
            myMap: null,
            myView: null,
            mapProperties: {
                basemap: 'osm'
            },
            viewProperties: {
                center: [-122.4443, 47.2529],
                scale: 50000
            },
            dragging: false,
            dragPrevious: null
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleMouseWheel = this.handleMouseWheel.bind(this);
    }

    public render() {
        return (
            <div style={{ width: '80vw', height: '80vh' }}>
                <div style={{ display: 'inline-block', width: '100%', height: '100%' }}>
                    <Map
                        mapProperties={this.state.mapProperties}
                        viewProperties={this.state.viewProperties}
                        onLoad={this.handleMapLoad}
                        onDrag={this.handleDrag}
                        onMouseWheel={this.handleMouseWheel}
                    />
                </div>
            </div>
        );
    }

    private handleMapLoad(map, view) {
        view.ui.remove("compass");
        view.ui.remove("zoom");
        view.ui.remove("navigation-toggle");
        this.setState({
            myMap: map,
            myView: view
        });
    }

    private handleMouseWheel(e) {
        e.stopPropagation();
        this.setState({
            viewProperties: {
                ...this.state.viewProperties,
                scale: this.state.viewProperties.scale + (e.deltaY * (this.state.viewProperties.scale / 250))
            }
        });
    }

    private handleDrag(e) {
        e.stopPropagation();
        if (e.action === "start") {
            this.setState({
                dragPrevious: {
                    x: e.x,
                    y: e.y
                },
                dragging: true
            });

        } else if (e.action === "end") {
            this.setState({
                dragPrevious: null,
                dragging: false
            });
        } else if (e.action === "update" && this.state.dragging) {
            this.setState({
                dragPrevious: {
                    x: e.x,
                    y: e.y
                },
                viewProperties: {
                    ...this.state.viewProperties,
                    center: [
                        this.state.viewProperties.center[0] - 0.0001 * (e.x - this.state.dragPrevious.x) * (this.state.viewProperties.scale / 25000),
                        this.state.viewProperties.center[1] + 0.0001 * (e.y - this.state.dragPrevious.y) * (this.state.viewProperties.scale / 25000)
                    ]
                }
            });
        }
    }
}

