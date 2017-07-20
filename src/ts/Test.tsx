import * as React from 'react';
import { Map } from './components/MapComposites';
import { WebMap } from './components/WebComposites';

export default (props) => (
    <WebMap
        style={{ width: '100vw', height: '100vh' }}
        id="f2e9b762544945f390ca4ac3671cfa72"
        viewProperties={{ center: [-122.4443, 47.2529] as __esri.PointProperties }}
    />
);
