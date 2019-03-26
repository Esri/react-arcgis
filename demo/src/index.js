import React from 'react';
import ReactDOM from 'react-dom';

import { Map } from '@esri/react-arcgis';
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
        url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Time_Zones/FeatureServer/0'
      }}
    >
    </MyFeatureLayer>
  </Map>,
  document.getElementById('root')
);