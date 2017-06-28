import * as React from 'react';
import Geometry from './GeometryBase';

import {
    CircleProps,
    ExtentProps,
    MultipointProps,
    PointProps,
    PolygonProps,
    PolylineProps,
    ScreenPointProps,
    SpatialReferenceProps
} from './GeometryInterfaces';

export const Circle = (props: CircleProps) => (
    <Geometry
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/geometry/Circle"
        geometryProperties={{...props.geometryProperties}}
    />
);

export const Extent = (props: ExtentProps) => (
    <Geometry
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/geometry/Extent"
        geometryProperties={{...props.geometryProperties}}
    />
);

export const Multipoint = (props: MultipointProps) => (
    <Geometry
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/geometry/Multipoint"
        geometryProperties={{...props.geometryProperties}}
    />
);

export const Point = (props: PointProps) => (
    <Geometry
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/geometry/Point"
        geometryProperties={{...props.geometryProperties}}
    />
);

export const Polygon = (props: PolygonProps) => (
    <Geometry
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/geometry/Polygon"
        geometryProperties={{...props.geometryProperties}}
    />
);

export const Polyline = (props: PolylineProps) => (
    <Geometry
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/geometry/Polyline"
        geometryProperties={{...props.geometryProperties}}
    />
);

export const ScreenPoint = (props: ScreenPointProps) => (
    <Geometry
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/geometry/ScreenPoint"
        geometryProperties={{...props.geometryProperties}}
    />
);

export const SpatialReference = (props: SpatialReferenceProps) => (
    <Geometry
        {...props}
        dataFlow={ props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime' }
        scriptUri="esri/geometry/SpatialReference"
        geometryProperties={{...props.geometryProperties}}
    />
);