![Version 3.0.0](https://img.shields.io/badge/npm-v3.0.0-blue.svg) ![100% Code Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

# React-ArcGIS

React-ArcGIS is a library of React components which use the ArcGIS API for JavaScript. React-ArcGIS uses [esri-promise](https://www.npmjs.com/package/esri-promise) internally to load and interact with the AMD ArcGIS API for JavaScript, and provide a base for building mapping applications.

## Installation:

1. Run `npm i react-arcgis` (if you decide you like it, you can even include `--save`)


## Changed in version 3.0.0:

### *The scope of the library has been reduced significantly (but trust me it's for the better)*

- React ArcGIS now provides only 4 core components - `<Map />`, `<Scene />`, `<WebMap />`, and `<WebScene />`

The reason for this "shrinking" of react-arcgis is to promote focus in the library, and avoid concealing the underlying ArcGIS JS API.

While having a declarative html-like syntax for working with maps is great, the surface area of the [ArcGIS JS API](https://developers.arcgis.com/javascript/) is very large, and it is regularly updated with new features and functionality. Rather than attempting to wrap the entire thing in a react-like syntax, I have decided to just handle the essentials, and provide clear examples for how to do more complex tasks by using the [ArcGIS API](https://developers.arcgis.com/javascript/) directly (still within your react app of course).

Because you will be less abstracted from Esri's API, you will actually be in a better position to utilize its full functionality!


## Basic Usage:

*Don't forget to load the js api stylesheet! [https://js.arcgis.com/4.5/esri/css/main.css](https://js.arcgis.com/4.5/esri/css/main.css)*

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

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scene } from 'react-arcgis';

ReactDOM.render(
  <Scene />,
  document.getElementById('container')
);
```
![scene](https://user-images.githubusercontent.com/16542714/27750977-088b94ac-5d8f-11e7-997a-088a3c717cf6.jpg)

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

Worried about the JS API not loading? Pass in an onFail handler:

```js
import * as React from 'react';
import { WebMap } from 'react-arcgis';

export default class MakeAMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'loading'
        };

        this.handleFail = this.handleFail.bind(this);
    }

    render() {
        return <WebMap className="full-screen-map" id="foobar" onFail={this.handleFail} />;
    }

    handleFail(e) {
        console.error(e);
        this.setState({ status: 'failed' });
    }
}
```





Happy coding! :] <br />
Nick
