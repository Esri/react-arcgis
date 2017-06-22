import * as React from 'react';
import { BaseProps } from './ArcBase';
import { MapBase } from './ArcComposites';

interface MapProps extends BaseProps {
  viewProperties?: __esri.MapViewProperties;
}

interface SceneProps extends BaseProps {
  viewProperties?: __esri.SceneViewProperties;
}

export const Map = (props: MapProps) => (
  <MapBase
    dataFlow={props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime'}
    scriptUri={['esri/Map', 'esri/views/MapView']}
    {...props}
    mapProperties={{
      basemap: 'streets-vector',
      ...props.mapProperties
    }}
    viewProperties={{
      center: [-122.4443, 47.2529],
      zoom: 6,
      ...props.viewProperties
    }}
    userDefinedMapProperties={{...props.mapProperties}}
    userDefinedViewProperties={{...props.viewProperties}}
  />
);

export const Scene = (props: SceneProps) => (
  <MapBase
    dataFlow={props.dataFlow === 'oneWay' ? 'oneWay' : 'oneTime'}
    scriptUri={['esri/Map', 'esri/views/SceneView']}
    {...props}
    mapProperties={{
      basemap: 'satellite',
      ground: 'world-elevation',
      ...props.mapProperties
    }}
    viewProperties={{
      center: [-122.4443, 47.2529],
      scale: 500000,
      ...props.viewProperties
    }}
    userDefinedMapProperties={{...props.mapProperties}}
    userDefinedViewProperties={{...props.viewProperties}}
  />
);
