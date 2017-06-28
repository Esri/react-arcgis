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
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/CSVLayer"
        layerProperties={{...props.layerProperties}}
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const ElevationLayer = (props: ElevationLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/ElevationLayer"
        layerProperties={{...props.layerProperties}}
        addLocation={['map', 'ground', 'layers']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const FeatureLayer = (props: FeatureLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/FeatureLayer"
        layerProperties={{...props.layerProperties}}
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const GeoRSSLayer = (props: GeoRSSLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/GeoRSSLayer"
        layerProperties={{...props.layerProperties}}
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const GraphicsLayer = (props: GraphicsLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/GraphicsLayer"
        layerProperties={{...props.layerProperties}}
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const GroupLayer = (props: GroupLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/GroupLayer"
        layerProperties={{...props.layerProperties}}
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const ImageryLayer = (props: ImageryLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/ImageryLayer"
        layerProperties={{...props.layerProperties}}
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const IntegratedMeshLayer = (props: IntegratedMeshLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/IntegratedMeshLayer"
        layerProperties={{...props.layerProperties}}
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const MapImageLayer = (props: MapImageLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/MapImageLayer"
        layerProperties={{...props.layerProperties}}
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const OpenStreetMapLayer = (props: OpenStreetMapLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/OpenStreetMapLayer"
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const PointCloudLayer = (props: PointCloudLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/PointCloudLayer"
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const SceneLayer = (props: SceneLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/SceneLayer"
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const StreamLayer = (props: StreamLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/StreamLayer"
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const TileLayer = (props: TileLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/TileLayer"
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const VectorTileLayer = (props: VectorTileLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/VectorTileLayer"
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);

export const WebTileLayer = (props: WebTileLayerProps) => (
    <Layer
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/layers/WebTileLayer"
        addLocation={['map']}
        eventMap={{
            onLayerviewCreate: 'layerview-create',
            onLayerviewDestroy: 'layerview-destroy'
        }}
    />
);
