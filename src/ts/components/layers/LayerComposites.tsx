import * as React from 'react';
import Layer from './LayerBase';

import {
    CSVLayerProps,
    ElevationLayerProps,
    FeatureLayerProps,
    GeoRSSLayerProps,
    GraphicsLayerProps,
    GroupLayerProps,
    ImageryLayerProps,
    IntegratedMeshLayerProps,
    MapImageLayerProps,
    OpenStreetMapLayerProps,
    PointCloudLayerProps,
    SceneLayerProps,
    StreamLayerProps,
    TileLayerProps,
    VectorTileLayerProps,
    WebTileLayerProps
} from './LayerInterfaces';

export const CSVLayer = (props: CSVLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/CSVLayer" layerProperties={{...props.layerProperties}} />
);

export const ElevationLayer = (props: ElevationLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/ElevationLayer" layerProperties={{...props.layerProperties}} />
);

export const FeatureLayer = (props: FeatureLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/FeatureLayer" layerProperties={{...props.layerProperties}} />
);

export const GeoRSSLayer = (props: GeoRSSLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/GeoRSSLayer" layerProperties={{...props.layerProperties}} />
);

export const GraphicsLayer = (props: GraphicsLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/GraphicsLayer" layerProperties={{...props.layerProperties}} />
);

export const GroupLayer = (props: GroupLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/GroupLayer" layerProperties={{...props.layerProperties}} />
);

export const ImageryLayer = (props: ImageryLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/ImageryLayer" layerProperties={{...props.layerProperties}} />
);

export const IntegratedMeshLayer = (props: IntegratedMeshLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/IntegratedMeshLayer" layerProperties={{...props.layerProperties}} />
);

export const MapImageLayer = (props: MapImageLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/MapImageLayer" layerProperties={{...props.layerProperties}} />
);

export const OpenStreetMapLayer = (props: OpenStreetMapLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/OpenStreetMapLayer" />
);

export const PointCloudLayer = (props: PointCloudLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/PointCloudLayer" />
);

export const SceneLayer = (props: SceneLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/SceneLayer" />
);

export const StreamLayer = (props: StreamLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/StreamLayer" />
);

export const TileLayer = (props: TileLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/TileLayer" />
);

export const VectorTileLayer = (props: VectorTileLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/VectorTileLayer" />
);

export const WebTileLayer = (props: WebTileLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/WebTileLayer" />
);
