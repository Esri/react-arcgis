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
    <Geometry {...props} scriptUri="esri/geometry/Circle" />
);

export const Extent = (props: ExtentProps) => (
    <Geometry {...props} scriptUri="esri/geometry/Extent" />
);

export const Multipoint = (props: MultipointProps) => (
    <Geometry {...props} scriptUri="esri/geometry/Multipoint" />
);

export const Point = (props: PointProps) => (
    <Geometry {...props} scriptUri="esri/geometry/Point" />
);

export const Polygon = (props: PolygonProps) => (
    <Geometry {...props} scriptUri="esri/geometry/Polygon" />
);

export const Polyline = (props: PolylineProps) => (
    <Geometry {...props} scriptUri="esri/geometry/Polyline" />
);

export const ScreenPoint = (props: ScreenPointProps) => (
    <Geometry {...props} scriptUri="esri/geometry/ScreenPoint" />
);

export const SpatialReference = (props: SpatialReferenceProps) => (
    <Geometry {...props} scriptUri="esri/geometry/SpatialReference" />
);