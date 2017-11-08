import * as MapViews from './src/ts/components/MapComposites';
import * as WebViews from './src/ts/components/WebComposites';

const ReactArcGIS = {
    Map: MapViews.Map,
    Scene: MapViews.Scene,
    WebMap: WebViews.WebMap,
    WebScene: WebViews.WebScene
};

export default ReactArcGIS;

export const WebMap = ReactArcGIS.WebMap;
export const WebScene = ReactArcGIS.WebScene;
export const Map = ReactArcGIS.Map;
export const Scene = ReactArcGIS.Scene;
