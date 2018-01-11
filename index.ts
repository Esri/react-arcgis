import * as MapViews from './src/ts/components/MapComposites';
import * as WebViews from './src/ts/components/WebComposites';
import { loadModules } from 'esri-loader';

const ReactArcGIS = {
    Map: MapViews.Map,
    Scene: MapViews.Scene,
    WebMap: WebViews.WebMap,
    WebScene: WebViews.WebScene,
    esriPromise: loadModules
};

export default ReactArcGIS;

export const WebMap = ReactArcGIS.WebMap;
export const WebScene = ReactArcGIS.WebScene;
export const Map = ReactArcGIS.Map;
export const Scene = ReactArcGIS.Scene;
export const esriPromise = loadModules;
