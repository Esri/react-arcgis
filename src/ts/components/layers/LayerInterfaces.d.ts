export interface LayerCompositeProps {
    children?: any;
    dataFlow?: 'oneWay' | 'oneTime';
    map?: __esri.Map;
    view?: __esri.SceneView | __esri.MapView;
    layerProperties?: {
        [propName: string]: any;
    };
    onLoad?: (instance: __esri.Layer) => any;
    onFail?: (e: any) => any;
    onLayerviewCreate?: (e: any) => any;
    onLayerviewDestroy?: (e: any) => any;
}

export interface CSVLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.CSVLayerProperties
}

export interface ElevationLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.ElevationLayerProperties
}

export interface FeatureLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.FeatureLayerProperties
}

export interface GeoRSSLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.GeoRSSLayerProperties
}

export interface GraphicsLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.GraphicsLayerProperties
}

export interface GroupLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.GroupLayerProperties
}

export interface ImageryLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.ImageryLayerProperties
}

export interface IntegratedMeshLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.IntegratedMeshLayerProperties
}

export interface MapImageLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.MapImageLayerProperties
}

export interface OpenStreetMapLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.OpenStreetMapLayerProperties
}

export interface PointCloudLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.PointCloudLayerProperties
}

export interface SceneLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.SceneLayerProperties
}

export interface StreamLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.StreamLayerProperties
}

export interface TileLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.TileLayerProperties
}

export interface VectorTileLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.VectorTileLayerProperties
}

export interface WebTileLayerProps extends LayerCompositeProps {
    // layerProperties: __esri.WebTileLayerProperties
}