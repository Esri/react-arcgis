import * as React from 'react';
import Geometry from './GeometryBase';

export interface GeometryCompositeProps {
    graphic?: __esri.Graphic,
    geometryProperties?: {
      [propName: string]: any;
    }

    registerGeometry?: (intance: __esri.Geometry) => any,
    onLoad?: (instance: __esri.Geometry) => any,
    onFail?: (e: any) => any
}

export const Circle = (props: GeometryCompositeProps) => (
    <Geometry {...props} scriptUri='esri/geometry/Circle' />
);

export const Extent = (props: GeometryCompositeProps) => (
    <Geometry {...props} scriptUri='esri/geometry/Extent' />
);

export const Multipoint = (props: GeometryCompositeProps) => (
    <Geometry {...props} scriptUri='esri/geometry/Multipoint' />
);

export const Point = (props: GeometryCompositeProps) => (
    <Geometry {...props} scriptUri='esri/geometry/Point' />
);

export const Polygon = (props: GeometryCompositeProps) => (
    <Geometry {...props} scriptUri='esri/geometry/Polygon' />
);

export const Polyline = (props: GeometryCompositeProps) => (
    <Geometry {...props} scriptUri='esri/geometry/Polyline' />
);

export const ScreenPoint = (props: GeometryCompositeProps) => (
    <Geometry {...props} scriptUri='esri/geometry/ScreenPoint' />
);

export const SpatialReference = (props: GeometryCompositeProps) => (
    <Geometry {...props} scriptUri='esri/geometry/SpatialReference' />
);