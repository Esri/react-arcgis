import * as React from 'react';
import { BaseProps } from './ArcBase';
import { MapBase } from './ArcComposites';

export interface MapProps extends BaseProps {
  mapProperties?: __esri.MapProperties;
  viewProperties?: __esri.MapViewProperties;
}

export interface SceneProps extends BaseProps {
  mapProperties?: __esri.MapProperties;
  viewProperties?: __esri.SceneViewProperties;
}

export const Map = (props: MapProps) => (
  <MapBase
    scriptUri={['esri/Map', 'esri/views/MapView']}
    {...props}
    mapProperties={{
      basemap: 'streets-vector' as __esri.BasemapProperties,
      ...props.mapProperties
    }}
    viewProperties={{
      center: [-122.4443, 47.2529] as __esri.PointProperties,
      zoom: 6,
      ...props.viewProperties
    }}
  />
);

export const Scene = (props: SceneProps) => (
  <MapBase
    scriptUri={['esri/Map', 'esri/views/SceneView']}
    {...props}
    mapProperties={{
      basemap: 'satellite' as __esri.BasemapProperties,
      ground: 'world-elevation' as __esri.GroundProperties,
      ...props.mapProperties
    }}
    viewProperties={{
      center: [-122.4443, 47.2529] as __esri.PointProperties,
      zoom: 6,
      ...props.viewProperties
    }}
  />
);
