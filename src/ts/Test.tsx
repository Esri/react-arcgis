import * as React from 'react';
import { Map, Scene } from './components/MapComposites';
import { WebMap, WebScene } from './components/WebComposites';
import { BasemapToggle } from './components/widgets/WidgetComposites';
import { ElevationLayer } from './components/layers/LayerComposites';

interface ComponentState {
}

export default class TestComponent extends React.Component<null, ComponentState>{
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
                    <ElevationLayer
                        onLayerviewCreate={() => console.log('Created the elevation layer.')}
                        layerProperties={{
                            url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/OsoLandslide/OsoLandslide_After_3DTerrain/ImageServer'
                        }}
                    />
                </Scene>
                <WebMap
                    id="6627e1dd5f594160ac60f9dfc411673f"
                    className="half-map"
                    onLoad={(map, view) => { console.log(map, view); }}
                />
            </div>
        );
    }
}

export function foo() {
    return 'not bar';
}
