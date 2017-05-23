import * as React from 'react';
import '../css/index.scss';
import { Map, Scene } from './components/ArcComposites';
import { WebMap, WebScene } from './components/WebComposites';
import { BasemapToggle } from './components/widgets/WidgetComposites'

interface ComponentState {
}

export default class TestComponent extends React.Component<null, ComponentState>{

    public render() {
        return (
            <div>
                <WebScene
                    className="half-map"
                    id="f8aa0c25485a40a1ada1e4b600522681"
                    onDoubleClick={() => { console.log('double-clicked on the map!')}}
                >
                    <BasemapToggle
                        position="top-right"
                        onToggle={() => {console.log('toggled the basemap!')}}
                    />
                </WebScene>
            </div>
        );
    }
}

