import * as React from 'react';

import '../css/index.scss';
import Map from './components/Map';
import Scene from './components/Scene';
import Widget from './components/widgets/Widget';

export default (props) => (
    <div>
        <Scene 
            style={{ width: '80vw', height: '80vh', border: '1px solid black' }}
            mapProperties={{
                basemap: 'satellite'
            }}
        >
            <Widget />
            <Widget />
            <Widget />
        </Scene>
    </div>
)

