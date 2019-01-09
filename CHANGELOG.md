# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

### [Unreleased][HEAD]

## [4.0.0] - January 9th 2019

### Changed
- `react-arcgis` has been moved into the @esri namespace on npm.

```shell
npm install @esri/react-arcgis
```
```js
import { Map, Scene } from '@esri/react-arcgis';
```
- React-arcgis will now load version 4.10 of the ArcGIS API for JavaScript by default

## 3.3.3

- React-arcgis will now load version 4.9 of the ArcGIS JS API by default
- Fixed issue with the `zoom` prop on `Scene` components

## 3.3.2

- React-arcgis components now accept a `childrenAsFunction` prop:

```ts
    render() {
        return (
            <Scene
                className="scene__container"
                childrenAsFunction={(map: __esri.Map, view: __esri.SceneView) => (
                    <BermudaTriangle map={map} view={view} />
                )}
            />
        );
    }
```

This is helpful for TypeScript users, as it allows the compiler to understand the relationship between parent and child components. If you are not using TypeScript, there is no benefit to using this prop over specifying children in the usual manner.

## 3.3.1

- React-arcgis will now load version 4.8 by default
- Issue with using `mapProperties` in the `WebMap` and `WebScene` components has been fixed

## 3.3.0

- React-arcgis will now load version 4.7 by default
- `loadModules` from [https://github.com/Esri/esri-loader](https://github.com/Esri/esri-loader) can now also be imported as `loadModules` instead of just `esriPromise` for consistency. For example:

```js
import { loadModules, esriPromise } from 'react-arcgis';

loadModules === esriPromise // true
```

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

[4.0.1]: https://github.com/Esri/arcgis-rest-js/compare/v4.0.0...v4.0.1 "v4.0.1"
[HEAD]: https://github.com/Esri/react-arcgis/compare/v4.0.0...HEAD "Unreleased Changes"