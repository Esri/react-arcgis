import * as React from 'react';
import Layer from './LayerBase';

export interface LayerCompositeProps {
    map?: __esri.Map,
    view?: __esri.SceneView | __esri.MapView,
    layerProperties?: {
      [propName: string]: any;
    }

    onLoad?: (instance: __esri.Layer) => any,
    onFail?: (e: any) => any
}

export const CSVLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/CSVLayer' />
);

export const ElevationLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/ElevationLayer' />
);

export const FeatureLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/FeatureLayer' />
);

export const GeoRSSLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/GeoRSSLayer' />
);

export const GraphicsLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/GraphicsLayer' />
);

export const GroupLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/GroupLayer' />
);

export const ImageryLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/ImageryLayer' />
);

export const IntegratedMeshLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/IntegratedMeshLayer' />
);

export const MapImageLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/MapImageLayer' />
);

export const OpenStreetMapLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/OpenStreetMapLayer' />
);

export const PointCloudLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/PointCloudLayer' />
);

export const SceneLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/SceneLayer' />
);

export const StreamLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/StreamLayer' />
);

export const TileLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/TileLayer' />
);

export const VectorTileLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/VectorTileLayer' />
);

export const WebTileLayer = (props: LayerCompositeProps) => (
    <Layer {...props} scriptUri='esri/layers/WebTileLayer' />
);