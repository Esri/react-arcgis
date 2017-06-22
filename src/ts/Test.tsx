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
                location: [-122.4443, 47.2529],
                title: 'My Popup'
            }
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
    }

    public render() {
        return (
            <div>
                <Scene
                    className="half-map"
                    mapProperties={{ basemap: 'topo', ground: 'world-elevation' }}
                    onClick={this.handleMapClick}
                >
                    <Popup
                        popupProperties={this.state.popup}
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
                content: 'This is another random popup.',
                title: 'My New Popup'
            }
        });
    }

    private handleMapClick(e) {
        setTimeout(() => {
            this.setState({
                popup: {
                    content: 'yay!',
                    location: e.mapPoint,
                    title: 'Popups everywhere'
                }
            });
        }, 100);
    }
}
