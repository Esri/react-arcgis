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
    <Geometry {...props} scriptUri="esri/geometry/Circle" boundProperties={{ ...props.boundProperties }} />
);

export const Extent = (props: ExtentProps) => (
    <Geometry {...props} scriptUri="esri/geometry/Extent" boundProperties={{ ...props.boundProperties }} />
);

export const Multipoint = (props: MultipointProps) => (
    <Geometry {...props} scriptUri="esri/geometry/Multipoint" boundProperties={{ ...props.boundProperties }} />
);

export const Point = (props: PointProps) => (
    <Geometry {...props} scriptUri="esri/geometry/Point" boundProperties={{ ...props.boundProperties }} />
);

export const Polygon = (props: PolygonProps) => (
    <Geometry {...props} scriptUri="esri/geometry/Polygon" boundProperties={{ ...props.boundProperties }} />
);

export const Polyline = (props: PolylineProps) => (
    <Geometry {...props} scriptUri="esri/geometry/Polyline" boundProperties={{ ...props.boundProperties }} />
);

export const ScreenPoint = (props: ScreenPointProps) => (
    <Geometry {...props} scriptUri="esri/geometry/ScreenPoint" boundProperties={{ ...props.boundProperties }} />
);

export const SpatialReference = (props: SpatialReferenceProps) => (
    <Geometry {...props} scriptUri="esri/geometry/SpatialReference" boundProperties={{ ...props.boundProperties }} />
);