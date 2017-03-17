# Webpack ArcGIS JS API Application Boilerplate

## Includes: 

- Dojo & ArcGIS JS API 4.3 type definitions,
- SASS & customizable build of [Calcite Web](https://esri.github.io/calcite-web/) (entrypoint at `./src/css/index.scss`, built to `./dist/bundle.css`),
- Asynchronous resolution of Esri & Dojo modules via AMD (dojo) using [esri-promise](https://www.npmjs.com/package/esri-promise),
- Synchronous resolution & bundling of local TypeScript (& node) modules with [Webpack 2](https://webpack.github.io/),
- Type safe (mostly) boilerplate for building applications with the ArcGIS JS API.

## Installation:

1. Clone the repository
2. Run `npm i` from the root directory
3. Run `npm start` to serve the appliation with hot-reloading from `http://localhost:8000`
4. Run `npm run build` to build the application to `./dist`

### Webpack?

[Webpack](https://webpack.github.io/) is the most popular bundler in the React/Redux community, and it is gaining considerable mindshare amongst users of Angular 2 and other popular application frameworks. With the recent release of Webpack 2, it now offers features like lazy-loading, code splitting into separate bundles, and tree-shaking to remove unused code from bundles. All of these things make it fairly likely that the popularity of webpack will continue to grow (at least for a few days until the next hot js tool comes along).

While the cleanest way to integrate your application with the ArcGIS JS API would arguably be to allow Dojo's AMD loader to handle the resolution of all modules, that is a pretty big tech buy-in if you are not already using Dojo as your application framework.

By employing a dedicated module to wrap the Dojo loader and lazy-load the ArcGIS API modules on-the-fly, the rest of the build is free to use whatever loading/bundling/module resolution strategy you like. This also makes it a lot easier to avoid pulling the entire ArcGIS API into your unit tests.

For more info, see [Tom Wayson's excellent blog article about this issue](http://tomwayson.com/2016/11/27/using-the-arcgis-api-for-javascript-in-applications-built-with-webpack/).


#### Don't want to use Webpack?

If you just want to use TypeScript and let dojo's loader handle everything, [esri-boilerplate-ts](https://github.com/nicksenger/esri-boilerplate-ts) may be a better place to start. May the force be with you!