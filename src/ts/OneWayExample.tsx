import * as React from 'react';
import '../css/index.scss';
import { Map, Scene } from './components/ArcComposites';
import { WebMap, WebScene } from './components/WebComposites';
import { BasemapGallery, Legend, Search } from './components/widgets/WidgetComposites';
import Graphic from './components/graphics/Graphic';
import { SimpleFillSymbol, SimpleMarkerSymbol } from './components/symbols/SymbolComposites';
import { Polygon, Point } from './components/geometry/GeometryComposites';
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
    geometryProperties: {
        [propName: string]: any;
    };
    symbolProperties: {
        [propName: string]: any;
    };
    dragging: boolean;
    dragPrevious: {
        x: number,
        y: number
    };
    showGraphics: boolean;
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
            geometryProperties: {
                rings: [
                    [-64.78, 32.3],
                    [-66.07, 18.45],
                    [-80.21, 25.78],
                    [-64.78, 32.3]
                ]
            },
            symbolProperties: {
                color: [227, 139, 79, 0.8],
                outline: {
                    color: [255, 255, 255],
                    width: 1
                }
            },
            dragging: false,
            dragPrevious: null,
            showGraphics: true
        };
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleMouseWheel = this.handleMouseWheel.bind(this);
        this.handleRangeChange = this.handleRangeChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.toggleGraphics = this.toggleGraphics.bind(this);
    }

    public render() {
        let graphics = null;
        if (this.state.showGraphics) {
            graphics = (
                <GraphicsLayer>
                    <Graphic>
                        <SimpleFillSymbol
                            symbolProperties={this.state.symbolProperties}
                        />
                        <Polygon
                            geometryProperties={this.state.geometryProperties}
                        />
                    </Graphic>
                    <Graphic>
                        <SimpleMarkerSymbol
                            symbolProperties={this.state.symbolProperties}
                        />
                        <Point
                            geometryProperties={{
                                latitude: 41.73,
                                longitude: -49.97
                            }}
                        />
                    </Graphic>
                </GraphicsLayer>
            );
        }
        return (
            <div style={{ width: '80vw', height: '80vh' }}>
                <div style={{ display: 'inline-block', width: '100%', height: '100%' }}>
                    <Map
                        mapProperties={this.state.mapProperties}
                        viewProperties={this.state.viewProperties}
                        onLoad={this.handleMapLoad}
                        onDrag={this.handleDrag}
                        onMouseWheel={this.handleMouseWheel}
                    >
                        {graphics}
                    </Map>
                    <input type="range" min="1" max="50" value={this.state.symbolProperties.outline.width} onChange={this.handleRangeChange} />
                    <input type="text" value={this.state.symbolProperties.outline.color.join(',')} onChange={this.handleColorChange} />
                    <button onClick={this.toggleGraphics}>Toggle Graphics</button>
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

    private handleRangeChange(e) {
        e.preventDefault();
        this.setState({
            symbolProperties: {
                outline: {
                    color: this.state.symbolProperties.outline.color,
                    width: e.target.value
                }
            }
        });
    }

    private handleColorChange(e) {
        e.preventDefault();
        this.setState({
            symbolProperties: {
                outline: {
                    color: e.target.value.split(','),
                    width: this.state.symbolProperties.outline.width
                }
            }
        });
    }

    private toggleGraphics() {
        this.setState({
            showGraphics: !this.state.showGraphics
        });
    }
}

