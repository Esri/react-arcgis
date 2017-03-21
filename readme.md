# React-ArcGIS

## Installation:

1. Run `npm i --save react-arcgis`

## Basic Usage:

React-ArcGIS works very well alongside the ArcGIS 4.x API @types definitions, but can be used with plain js as well.

Let's use it to render a simple map in React:

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Map } from 'react-arcgis';

ReactDOM.render(
  <Map />,
  document.getElementById('container')
);
```

Or, we can render a 3D web-scene:

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scene } from 'react-arcgis';

ReactDOM.render(
  <Scene />,
  document.getElementById('container')
);
```

If you want to change the style of the Map or Scene, pass a style object into the Map or Scene's properties:

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scene } from 'react-arcgis';

ReactDOM.render(
  <Scene style={{ width: '100vw', height: '100vh' }} />,
  document.getElementById('container')
);
```

You can also pass properties into the Map, MapView, or SceneView:

```js
import * as React from 'react';
import { Map } from 'react-arc-gis';
```
