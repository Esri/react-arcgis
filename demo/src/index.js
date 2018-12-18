import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Map } from 'react-arcgis';
import BermudaTriangle from './BermudaTriangle';
import MyFeatureLayer from './MyFeatureLayer';

ReactDOM.render(
  <Map
    mapProperties={{ basemap: 'satellite' }}
    viewProperties={{
        center: [-70, 25],
        zoom: 4
    }}>
    <BermudaTriangle />
    <MyFeatureLayer
      featureLayerProperties={{ 
        url: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer/0'
      }}
    >
    </MyFeatureLayer>
  </Map>,
  document.getElementById('root')
);