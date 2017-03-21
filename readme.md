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

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scene } from 'react-arcgis';

ReactDOM.render(
  <Scene />,
  document.getElementById('container')
);
```

If you want to change the style of the `Ma`p or `Scene`, pass a style object into the Map or Scene's properties:

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scene } from 'react-arcgis';

ReactDOM.render(
  <Scene style={{ width: '100vw', height: '100vh' }} />,
  document.getElementById('container')
);
```

You can also pass properties into the `Map`, `MapView`, or `SceneView` via this viewProperties or mapProperties props:

```jsx
import * as React from 'react';
import { Map } from 'react-arcgis';

export default (props) => (
    <Map
        style={{ width: '100vw', height: '100vh' }}
        mapProperties={{ basemap: 'satellite' }}
    />
)
```

These properties bind directly to the available properties on the ArcGIS API constructors:

```jsx
import * as React from 'react';
import { Scene } from 'react-arcgis';

export default (props) => (
    <Scene
        style={{ width: '100vw', height: '100vh' }}
        mapProperties={{ basemap: 'satellite' }}
        viewProperties={{
            center: [-122.4443, 47.2529],
            zoom: 6
        }}
    />
)
```

If you want, you can also render some widgets on the map by nesting them in the `<Map />` or `<Scene />`:

```jsx
import * as React from 'react';
import { Scene, Widgets } from 'react-arcgis';

const SearchWidget = Widgets.Search;
const BasemapGallery = Widgets.BasemapGallery;

export default (props) => (
    <Scene
        style={{ width: '100vw', height: '100vh' }}
        mapProperties={{ basemap: 'satellite' }}
        viewProperties={{
            center: [-122.4443, 47.2529],
            zoom: 6
        }}
    >
        <SearchWidget position="top-right" />
        <BasemapGallery position="bottom-right" />
    </Scene>
)
```

Maybe you want to render some graphics as well? You can do that too. The desired `Symbol` and `Geometry` are simply nested within a `<Graphic></Graphic>` tag:

```jsx
import * as React from 'react';
import { Scene, Graphic, Symbols, Geometry } from 'react-arcgis';

const bermudaTriangle = (
    <Graphic>
        <Symbols.SimpleFillSymbol
            symbolProperties={{
                color: [227, 139, 79, 0.8],
                outline: {
                    color: [255, 255, 255],
                    width: 1
                }
            }}
        />
        <Geometry.Polygon
            geometryProperties={{
                rings: [
                    [-64.78, 32.3],
                    [-66.07, 18.45],
                    [-80.21, 25.78],
                    [-64.78, 32.3]
                ]
            }}
        />
    </Graphic>
);

export default (props) => (
    <Scene
        style={{ width: '100vw', height: '100vh' }}
        mapProperties={{ basemap: 'satellite' }}
    >
        {bermudaTriangle}
    </Scene>
)
```