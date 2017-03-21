import * as Views from './src/ts/components/ArcComposites';
import * as GeometryImport from './src/ts/components/geometry/GeometryComposites';
import GraphicImport from './src/ts/components/graphics/Graphic';
import * as LayersImport from './src/ts/components/layers/LayerComposites';
import * as SymbolsImport from './src/ts/components/symbols/SymbolComposites';
import * as WidgetsImport from './src/ts/components/widgets/WidgetComposites';

const ReactArcGIS = {
    Geometry: GeometryImport,
    Graphic: GraphicImport,
    Layers: LayersImport,
    Map: Views.Map,
    Scene: Views.Scene,
    Symbols: SymbolsImport,
    Widgets: WidgetsImport,
};

export default ReactArcGIS;

export const Map = ReactArcGIS.Map;
export const Scene = ReactArcGIS.Scene;
export const Geometry = ReactArcGIS.Geometry;
export const Graphic = GraphicImport;
export const Layers = LayersImport;
export const Symbols = SymbolsImport;
export const Widgets = WidgetsImport;
