import * as React from 'react';
import { Map, Scene } from './components/MapComposites';
import { WebMap, WebScene } from './components/WebComposites';
import { BasemapToggle } from './components/widgets/WidgetComposites';
import { ElevationLayer } from './components/layers/LayerComposites';
import Popup from './components/popup/Popup';

interface ComponentState {
    popup: {
        title: string;
        content: string;
        location: number[];
    };
}

export default class TestComponent extends React.Component<null, ComponentState> {
    constructor() {
        super();
        this.state = {
            popup: {
                content: 'This is a random popup that I made.',
                location: [-121.83, 48.279],
                title: 'My Popup'
            }
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    public render() {
        return (
            <div>
                <Scene
                    className="half-map"
                    mapProperties={{ basemap: 'topo', ground: 'world-elevation' }}
                    viewProperties={{
                        camera: {
                            heading: 300,
                            position: [-121.83, 48.279, 1346],
                            tilt: 60
                        }
                    }}
                >
                    <Popup
                        popupProperties={this.state.popup}
                    />
                    <ElevationLayer
                        onLayerviewCreate={() => console.log('Created the elevation layer.')}
                        layerProperties={{
                            url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/OsoLandslide/OsoLandslide_After_3DTerrain/ImageServer'
                        }}
                    />
                    <BasemapToggle position="top-right" />
                </Scene>
                <button onClick={this.handleButtonClick}>
                    Change the popup
                </button>
            </div>
        );
    }

    private handleButtonClick() {
        this.setState({
            popup: {
                ...this.state.popup,
                title: 'My New Popup'
            }
        });
    }
}
