interface GeometryCompositeProps {
  dataFlow?: 'oneWay' | 'oneTime';
  graphic?: __esri.Graphic;
  geometryProperties?: {
    [propName: string]: any;
  };
  registerGeometry?: (intance: __esri.Geometry) => any;
  onLoad?: (instance: __esri.Geometry) => any;
  onFail?: (e: any) => any;
}

export interface CircleProps extends GeometryCompositeProps {
  // geometryProperties: __esri.CircleProperties;
}

export interface ExtentProps extends GeometryCompositeProps {
  // geometryProperties: __esri.ExtentProperties;
}

export interface MultipointProps extends GeometryCompositeProps {
  // geometryProperties: __esri.MultipointProperties;
}

export interface PointProps extends GeometryCompositeProps {
  // geometryProperties: __esri.PointProperties;
}

export interface PolygonProps extends GeometryCompositeProps {
  // geometryProperties: __esri.PolygonProperties;
}

export interface PolylineProps extends GeometryCompositeProps {
  // geometryProperties: __esri.PolylineProperties;
}

export interface ScreenPointProps extends GeometryCompositeProps {
  // geometryProperties: __esri.ScreenPointProperties;
}

export interface SpatialReferenceProps extends GeometryCompositeProps {
  // geometryProperties: __esri.SpatialReferenceProperties;
}