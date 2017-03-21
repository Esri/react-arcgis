# React-ArcGIS

React-ArcGIS is a library of React components which use the ArcGIS API for JavaScript v.4.3. React-ArcGIS components will handle fetching of the required AMD scripts and render themselves into the DOM. (Please note that this fetching process will give window['require'] to the dojo loader)

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
        viewProperties={{ scale: 500000000 }}
    >
        {bermudaTriangle}
    </Scene>
)
```

You can also nest graphics inside of a GraphicsLayer:

```jsx
import * as React from 'react';
import { Scene, Layers } from 'react-arcgis';

const titanic = (
    <Graphic>
        <Symbols.SimpleMarkerSymbol
            symbolProperties={{
                color: [226, 119, 40],
                outline: {
                    color: [255, 255, 255],
                    width: 2
                }
            }}
        />
        <Geometry.Point
            geometryProperties={{
                latitude: 41.73,
                longitude: -49.97
            }}
        />
    </Graphic>
);

export default (props) => (
    <Scene
        style={{ width: '100vw', height: '100vh' }}
        mapProperties={{ basemap: 'satellite' }}
        viewProperties={{ scale: 500000000 }}
    >
        <Layers.GraphicsLayer>
            {titanic}
        </Layers.GraphicsLayer>
    </Scene>
);
```

The other types of layers, like `FeatureLayer`, can also be created:

```jsx
import * as React from 'react';
import { Scene, Layers } from 'react-arcgis';

export default (props) => (
    <Scene
        style={{ width: '100vw', height: '100vh' }}
        mapProperties={{ basemap: 'satellite' }}
        viewProperties={{
            center: [-82.4423, 35.6111],
            scale: 5000
        }}
    >
        <Layers.FeatureLayer
            layerProperties={{
                url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0'
            }}
        />
    </Scene>
);

```


## Advanced Usage:

The `<Map />` or `<Scene />` is a big ball of internal state in a React application that does not necessarily follow React's intended unidirectional data-flow. The best we can do (as far as I'm aware) is treat the entire map like a giant text-box, and try to make it a "controlled component" by routing all of its state changes through the parent. We can do this much like we would with an ordinary text-box, using the `onMapStateChange` and `onViewStateChange` events:

```jsx
import * as React from 'react';
import { Scene } from 'react-arcgis';

interface ComponentState {
    myViewProperties: __esri.SceneViewProperties;
}

export default class TestComponent extends React.Component<null, ComponentState>{
    constructor(props) {
        super(props);
        this.state = {
            myViewProperties: {
                zoom: 0
            }
        };
        this.handleViewPropertyChange = this.handleViewPropertyChange.bind(this);
        this.goto = this.goto.bind(this);
    }

    public render() {
        return (
            <div>
                <Scene
                    style={{ width: '80vw', height: '80vh' }}
                    viewProperties={this.state.myViewProperties}
                    onViewPropertyChange={this.handleViewPropertyChange}
                >
                </Scene>
                <button onClick={() => this.goto(-122.4443, 47.2529)}>Go to Tacoma</button>
            </div>
        );
    }

    private handleViewPropertyChange(key: string, value: any) {
        const newViewProperties = {...this.state.myViewProperties};
        newViewProperties[key] = value;
        this.setState({
            myViewProperties: newViewProperties
        });
    }

    private goto(latitude: number, longitude: number) {
        this.setState({
            myViewProperties: { ...this.state.myViewProperties, center: [latitude, longitude] }
        });
    }
}
```

This way you can control the map in response to events in your UI, time, some stream of data, etc.

Hopefully this package helps you incorporate Esri's awesome ArcGIS API for JavaScript into your React applications!

Happy coding! :]