import * as React from 'react';
import { BaseProps } from './ArcBase';
import { WebBase } from './ArcComposites';

interface MapProps extends BaseProps {
    id: string;
    viewProperties?: __esri.MapViewProperties;
}

interface SceneProps extends BaseProps {
    id: string;
    viewProperties?: __esri.SceneViewProperties;
}

export const WebMap = (props: MapProps) => (
    <WebBase
        scriptUri={['esri/WebMap', 'esri/views/MapView', 'dojo/promise/all']}
        {...props}
        viewProperties={props.viewProperties}
        mapProperties={props.mapProperties}
        userDefinedMapProperties={{...props.mapProperties}}
        userDefinedViewProperties={{...props.viewProperties}}
    />
);

export const WebScene = (props: SceneProps) => (
    <WebBase
        scriptUri={['esri/WebScene', 'esri/views/SceneView', 'dojo/promise/all']}
        {...props}
        viewProperties={props.viewProperties}
        mapProperties={props.mapProperties}
        userDefinedMapProperties={{...props.mapProperties}}
        userDefinedViewProperties={{...props.viewProperties}}
    />
);
