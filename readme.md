![Version 3.2.0](https://img.shields.io/badge/npm-v3.2.0-blue.svg) ![100% Code Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

# React-ArcGIS

React-ArcGIS is a library of React components which use the ArcGIS API for JavaScript. React-ArcGIS uses [esri-loader](https://github.com/Esri/esri-loader) internally to load and interact with the AMD ArcGIS API for JavaScript, and provide a base for building mapping applications.

## Installation:

1. Run `npm i react-arcgis` (if you decide you like it, you can even include `--save`)

## Version 3.2.0:

- You can now include loader options directly in react-arcgis components. This provides an easy way to migrate to esri's newer async/await compatible promises in your react-arcgis application. For example:

```js
render() {
    return (
        <Map
            loaderOptions={{
                dojoConfig: {
                    has: {
                    "esri-promise-compatibility": 1
                    }
                }
            }}
        />
    );
}
```

Please see [this blog post](https://blogs.esri.com/esri/arcgis/2017/12/14/making-better-promises/) for more information regarding changes to the promise implementation in the ArcGIS API for JavaScript.

## Version 3.1.2:

- Fixed some issues with the distribution. The package is now shipped as both ESM and bundled UMD formats. Please note that I am only officially supporting the latest version of react with this package, but will try my best to keep things backward-compatible. The peer dependency is set to `"react": "*"`.

## Version 3.1.0:

- React ArcGIS now uses [esri-loader](https://github.com/Esri/esri-loader) under the hood, as it accomplishes the same thing as [esri-promise](https://github.com/nicksenger/esri-promise) and is being more actively maintained. React-arcgis provides `loadModules` from esri-loader as `esriPromise` so as to not break existing applications.

## Changed in version 3.0.0:

- React ArcGIS provides 4 core components - `<Map />`, `<Scene />`, `<WebMap />`, and `<WebScene />`

While having a declarative html-like syntax for doing everything in the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) would be great, the surface area of the api is very large, and it is regularly updated with new features and functionality. Rather than attempting to wrap the entire thing in a react-like syntax, I have decided to just handle the essentials, and provide clear examples for how to perform more complex tasks by using the api directly (still within your react app of course).

Because you will be less abstracted from Esri's API, you will actually be in a better position to utilize its full functionality!


## Basic Usage:

*Don't forget to load the js api stylesheet! [https://js.arcgis.com/4.6/esri/css/main.css](https://js.arcgis.com/4.6/esri/css/main.css)*

*If you need to support browsers lacking a native promise implementation, you will have to add a global `Promise` constructor polyfill to your project, as react-arcgis does not include one. I recommend [es6-promise](https://www.npmjs.com/package/es6-promise).*

Render a simple map in React:

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Map } from 'react-arcgis';

ReactDOM.render(
  <Map />,
  document.getElementById('container')
);
```

![map](https://user-images.githubusercontent.com/16542714/27751340-a9e440b4-5d90-11e7-84bc-6281f2a2f59b.jpg)

Or, render a 3D web-scene:

```jsimport * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scene } from 'react-arcgis';

ReactDOM.render(
  <Scene />,
  document.getElementById('container')
);
```

You can also add webmaps and webscenes from ArcGIS Online:

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { WebMap, WebScene } from 'react-arcgis';

ReactDOM.render(
    <div style={{ width: '100vw', height: '100vh' }}>
        <WebMap id="6627e1dd5f594160ac60f9dfc411673f" />
        <WebScene id="f8aa0c25485a40a1ada1e4b600522681" />
    </div>,
  document.getElementById('container')
);
```
![webmap](https://user-images.githubusercontent.com/16542714/27751438-26e02b78-5d91-11e7-8e5d-9198cd390e57.jpg)

If you want to change the style of the `Map` or `Scene`, just give it a class:

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scene } from 'react-arcgis';

ReactDOM.render(
  <Scene className="full-screen-map" />,
  document.getElementById('container')
);
```

You can also pass properties into the `Map`, `MapView`, or `SceneView` via the viewProperties or mapProperties props:

```js
import * as React from 'react';
import { Map } from 'react-arcgis';

export default (props) => (
    <Map
        class="full-screen-map"
        mapProperties={{ basemap: 'satellite' }}
    />
)
```
![map-properties](https://user-images.githubusercontent.com/16542714/27751672-3e31bcc8-5d92-11e7-8e2b-3afab88c7154.jpg)

These properties are passed directly to the available properties on the corresponding [ArcGIS API classes](https://developers.arcgis.com/javascript/latest/api-reference/index.html):

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
![scene](https://user-images.githubusercontent.com/16542714/27750977-088b94ac-5d8f-11e7-997a-088a3c717cf6.jpg)

If you want to access the `map` and `view` instances directly after they are loaded, pass in an `onLoad` handler:

```js
import * as React from 'react';
import { Map } from 'react-arcgis';

export default class MakeAMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            view: null
        };

        this.handleMapLoad = this.handleMapLoad.bind(this)
    }

    render() {
        return <Map className="full-screen-map" onLoad={this.handleMapLoad} />;
    }

    handleMapLoad(map, view) {
        this.setState({ map, view });
    }
}
```

Don't forget an `onFail` handler in case something goes wrong:

```js
import * as React from 'react';
import { WebScene } from 'react-arcgis';

export default class MakeAScene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'loading'
        };

        this.handleFail = this.handleFail.bind(this);
    }

    render() {
        return <WebScene className="full-screen-map" id="foobar" onFail={this.handleFail} />;
    }

    handleFail(e) {
        console.error(e);
        this.setState({ status: 'failed' });
    }
}
```


## "Advanced" Usage:

The functionality available through the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) goes well beyond just rendering maps, and if your application needs to do more with the map than simply show it, you will quickly find that you need access to the rest of Esri's API.

React-arcgis provides the children of `<Map />`, `<Scene />`, `<WebMap />`, and `<WebScene />` with access to their parent's `map` and `view` instances through props. Combined with `esriPromise`, we can use this to easily get other functionality from the ArcGIS JS API and use it within our react application.

For example, let's convert a Bermuda Triangle graphic from [this example](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=intro-graphics) into a react component:

```js
import * as React from 'react';
import { esriPromise } from 'react-arcgis';

export default class BermudaTriangle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphic: null
        };
    }

    render() {
        return null;
    }

    componentWillMount() {
        esriPromise(['esri/Graphic']).then(([ Graphic ]) => {
            // Create a polygon geometry
            const polygon = {
                type: "polygon", // autocasts as new Polygon()
                rings: [
                [-64.78, 32.3],
                [-66.07, 18.45],
                [-80.21, 25.78],
                [-64.78, 32.3]
                ]
            };

            // Create a symbol for rendering the graphic
            const fillSymbol = {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [227, 139, 79, 0.8],
                outline: { // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 1
                }
            };

            // Add the geometry and symbol to a new graphic
            const graphic = new Graphic({
                geometry: polygon,
                symbol: fillSymbol
            });

            this.setState({ graphic });
            this.props.view.graphics.add(graphic);
        })).catch((err) => console.error(err));
    }

    componentWillUnmount() {
        this.props.view.graphics.remove(this.state.graphic);
    }
}
```

Now we can use the `<BermudaTriangle />` component within our `<Map />`, `<Scene />`, `<WebMap />`, or `<WebScene />`, and the `map` and `view` props will automatically be supplied by react-arcgis:

```js
import * as React from 'react';
import { Scene } from 'react-arcgis';
import BermudaTriangle from './BermudaTriangle'; // The Graphic component we just made 

export default (props) => (
    <Scene class="full-screen-map">
        <BermudaTriangle />
    </Scene>
)
```
![bermuda-triangle](https://user-images.githubusercontent.com/16542714/27752141-5f000034-5d94-11e7-83bc-c88428f99053.jpg)


## Contributions

Anyone is welcome to contribute to this package. My only "rule" is that your contribution must either pass the existing unit tests, or include additional unit tests to cover new functionality.

Here are some commands that may be helpful for development:

- `npm test`: Runs the unit tests
- `npm run build`: Builds the application


## License

MIT
