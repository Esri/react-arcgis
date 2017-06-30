import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scene } from './components/MapComposites';
import Popup from './components/popup/Popup';

export default (props) => (
    <Scene
        style={{ width: '100vw', height: '100vh' }}
        viewProperties={{
            center: [-122.4443, 47.2529] as __esri.PointProperties,
            zoom: 6
        }}
    >
        <Popup
            popupProperties={{
                content: 'This is a random popup that I made.',
                location: [-122.4443, 47.2529],
                title: 'My Popup'
            }}
        />
    </Scene>
)
