import * as React from 'react';

import '../css/index.scss';
import Map from './components/Map';
import Scene from './components/Scene';
import Widget from './components/widgets/Widget';

export default (props) => (
    <div>
        <Scene 
            style={{ width: '50vw', height: '50vh', border: '1px solid black' }}
        >
            <Widget />
            <Widget />
            <Widget />
        </Scene>
    </div>
)

