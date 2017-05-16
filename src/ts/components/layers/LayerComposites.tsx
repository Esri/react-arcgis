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
    <Layer {...props} scriptUri="esri/layers/CSVLayer" boundProperties={{ ...props.boundProperties }} />
);

export const ElevationLayer = (props: ElevationLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/ElevationLayer" boundProperties={{ ...props.boundProperties }} />
);

export const FeatureLayer = (props: FeatureLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/FeatureLayer" boundProperties={{ ...props.boundProperties }} />
);

export const GeoRSSLayer = (props: GeoRSSLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/GeoRSSLayer" boundProperties={{ ...props.boundProperties }} />
);

export const GraphicsLayer = (props: GraphicsLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/GraphicsLayer" boundProperties={{ ...props.boundProperties }} />
);

export const GroupLayer = (props: GroupLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/GroupLayer" boundProperties={{ ...props.boundProperties }} />
);

export const ImageryLayer = (props: ImageryLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/ImageryLayer" boundProperties={{ ...props.boundProperties }} />
);

export const IntegratedMeshLayer = (props: IntegratedMeshLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/IntegratedMeshLayer" boundProperties={{ ...props.boundProperties }} />
);

export const MapImageLayer = (props: MapImageLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/MapImageLayer" boundProperties={{ ...props.boundProperties }} />
);

export const OpenStreetMapLayer = (props: OpenStreetMapLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/OpenStreetMapLayer" boundProperties={{ ...props.boundProperties }} />
);

export const PointCloudLayer = (props: PointCloudLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/PointCloudLayer" boundProperties={{ ...props.boundProperties }} />
);

export const SceneLayer = (props: SceneLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/SceneLayer" boundProperties={{ ...props.boundProperties }} />
);

export const StreamLayer = (props: StreamLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/StreamLayer" boundProperties={{ ...props.boundProperties }} />
);

export const TileLayer = (props: TileLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/TileLayer" boundProperties={{ ...props.boundProperties }} />
);

export const VectorTileLayer = (props: VectorTileLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/VectorTileLayer" boundProperties={{ ...props.boundProperties }} />
);

export const WebTileLayer = (props: WebTileLayerProps) => (
    <Layer {...props} scriptUri="esri/layers/WebTileLayer" boundProperties={{ ...props.boundProperties }} />
);
