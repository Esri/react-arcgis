# React-ArcGIS

React-ArcGIS is a library of React components which use the ArcGIS API for JavaScript v.4.3. React-ArcGIS components will handle fetching of the required AMD scripts and render themselves when ready. (Please note that this fetching process will give window['require'] to the dojo loader)

## Installation:

1. Run `npm i --save react-arcgis`


## Recently added stuff:

- You can now add custom loader components to a `<Map />` or `<Scene />` through the `loadComponent` and `failComponent` props.
- The loading component will be displayed until the `<Map />` or `<Scene />` is finished rendering.


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

If you want to change the style of the `Map` or `Scene`, pass a style object into the Map or Scene's props:

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scene } from 'react-arcgis';

ReactDOM.render(
  <Scene style={{ width: '100vw', height: '100vh' }} />,
  document.getElementById('container')
);
```

You can also pass properties into the `Map`, `MapView`, or `SceneView` via this viewProperties or mapProperties props:

```js
import * as React from 'react';
import { Map } from 'react-arcgis';

export default (props) => (
    <Map
        style={{ width: '100vw', height: '100vh' }}
        mapProperties={{ basemap: 'satellite' }}
    />
)
```

These properties passed directly to the available properties on the corresponding [ArcGIS API classes](https://developers.arcgis.com/javascript/latest/api-reference/index.html):

```js
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

```js
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

You can render some graphics too if you want. The desired `Symbol` and `Geometry` are simply nested within a `<Graphic></Graphic>` tag:

```js
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

```js
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

```js
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

The `<Map />` or `<Scene />` is a big ball of internal state in a React application. The best we can do to gain control of its state in the react app (as far as I'm aware) is treat the entire map like a giant text-box, and try to make it a "controlled component" by routing all of its state changes through the parent. We can do this much like we would with an ordinary text-box, using the `onMapStateChange` and `onViewStateChange` events included in the components (these work by mapping all of the available watchers to a single callback, so you probably dont want to do any heavy lifting there):

```js
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

This way you can control the map in response to events in your UI, time, some stream of data, or whatever other crazy things your application may be doing.

If you want to access the events on the `Map` or `View`, those are all available through the `<Map />` or `<Scene />` components by way of a react-style camelCase prop corresponding to the name of the event on the ArcGIS JS API class in question. For example:

```js
import * as React from 'react';
import { Scene } from 'react-arcgis';

export default (props) => (
    <Scene
        onClick={myAwesomeCallback}
        onDoubleClick={myAwesomeCallback}
        onDrag={myAwesomeCallback}
        onHold={myAwesomeCallback}
        onKeyDown={myAwesomeCallback}
        onKeyUp={myAwesomeCallback}
        onLayerViewCreate={myAwesomeCallback}
        onLayerViewDestroy={myAwesomeCallback}
        onMouseWheel={myAwesomeCallback}
        onPointerDown={myAwesomeCallback}
        onPointerMove={myAwesomeCallback}
        onPointerUp={myAwesomeCallback}
        onResize={myAwesomeCallback}
    />
)
```

This would call `myAwesomeCallback` when the user does just about anything with the map.


All of the components in the library fire off a request for their dependencies in the ArcGIS API when they are first created. If you want to do something when the scripts are loaded (or when they fail to load), you can attach a callback to the `onLoad` and/or `onFail` events of the component:

```js
export default (props) => (
    <Map
        onLoad={celebrateCallback}
        onFail={cryCallback}
    />
)
```

If you want the map/scene to look a certain way before it loads or fails, attach a custom component to the `loadComponent` or `failComponent` props of the `<Map />` or `<Scene />`:

```js
export default (props) => {
    const SpecialLoadComponent = () => (
        <h3>Special load underway..</h3>
    );

    const SpecialFailComponent = () => (
        <h3>Epic Fail!</h3>
    );
    
    return <Scene loadComponent={SpecialLoadComponent} failComponent={SpecialFailComponent} />
}
```




Hopefully this package helps you incorporate Esri's awesome ArcGIS API for JavaScript into your ReactJS applications!

Happy coding! :]