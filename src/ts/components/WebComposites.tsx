import * as React from 'react';
import { WebView, BaseProps } from './WebBase';

interface MapProps extends BaseProps {
    viewProperties?: __esri.WebMapProperties;
}

interface SceneProps extends BaseProps {
    viewProperties?: __esri.WebSceneProperties;
}

export const WebMap = (props: MapProps) => (
    <WebView
        scriptUri={['esri/WebMap', 'esri/views/MapView']}
        {...props}
        viewProperties = {{...props.viewProperties}}
        mapProperties = {{...props.mapProperties}}
    />
);

export const WebScene = (props: SceneProps) => (
    <WebView
        scriptUri={['esri/WebScene', 'esri/views/SceneView']}
        {...props}
        viewProperties = {{...props.viewProperties}}
        mapProperties = {{...props.mapProperties}}
    />
);
