import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../css/index.scss';
import { MapView } from './components/MapView';

ReactDOM.render(
  <MapView 
    style={{ width: '100vw', height: '100vh' }} 
    basemap="topo-vector"
  />,
  document.getElementById('react-container')
);
