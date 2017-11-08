import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Map } from './components/MapComposites';
import { WebMap } from './components/WebComposites';

import "../css/test.css";

const TestMapComponent = (props) => (
    <WebMap
        style={{ width: '800px', height: '600px' }}
        id="f2e9b762544945f390ca4ac3671cfa72"
        viewProperties={{ center: [-122.4443, 47.2529] as __esri.PointProperties }}
    />
);

ReactDOM.render(
    <TestMapComponent />,
    document.getElementById('react-container')
);
