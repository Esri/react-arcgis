import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../css/index.scss';
import Map from './components/Map';
import Scene from './components/Scene';

ReactDOM.render(
  <Scene 
    style={{ width: '50vw', height: '100vh' }}
  />,
  document.getElementById('react-container')
);
