import * as React from 'react';
import '../css/index.scss';
import { Map, Scene } from './components/ArcComposites';
import { WebMap, WebScene } from './components/WebComposites';
import { BasemapToggle } from './components/widgets/WidgetComposites';
import { ElevationLayer } from './components/layers/LayerComposites';

interface ComponentState {
}

export default class TestComponent extends React.Component<null, ComponentState>{

    public render() {
        return (
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
                <ElevationLayer
                    onLayerviewCreate={() => console.log('Created the elevation layer.')}
                    layerProperties={{
                        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/OsoLandslide/OsoLandslide_After_3DTerrain/ImageServer'
                    }}
                />
            </Scene>
        );
    }
}

