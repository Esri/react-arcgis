import * as React from 'react';

import '../css/index.scss';
import Map from './components/Map';
import Scene from './components/Scene';
import Widget from './components/widgets/Widget';

export default (props) => (
    <div>
        <Map style={{ width: '100vw', height: '100vh' }}>
            <Widget />
        </Map>
    </div>
)

