import * as MapViews from './src/ts/components/MapComposites';
import * as WebViews from './src/ts/components/WebComposites';
import * as GeometryImport from './src/ts/components/geometry/GeometryComposites';
import GraphicImport from './src/ts/components/graphics/Graphic';
import * as LayersImport from './src/ts/components/layers/LayerComposites';
import * as SymbolsImport from './src/ts/components/symbols/SymbolComposites';
import * as WidgetsImport from './src/ts/components/widgets/WidgetComposites';
import PopupImport from './src/ts/components/popup/Popup';

const ReactArcGIS = {
    Geometry: GeometryImport,
    Graphic: GraphicImport,
    Layers: LayersImport,
    Map: MapViews.Map,
    Popup: PopupImport,
    Scene: MapViews.Scene,
    Symbols: SymbolsImport,
    WebMap: WebViews.WebMap,
    WebScene: WebViews.WebScene,
    Widgets: WidgetsImport,
};

export default ReactArcGIS;

export const WebMap = ReactArcGIS.WebMap;
export const WebScene = ReactArcGIS.WebScene;
export const Map = ReactArcGIS.Map;
export const Popup = ReactArcGIS.Popup;
export const Scene = ReactArcGIS.Scene;
export const Geometry = ReactArcGIS.Geometry;
export const Graphic = GraphicImport;
export const Layers = LayersImport;
export const Symbols = SymbolsImport;
export const Widgets = WidgetsImport;
