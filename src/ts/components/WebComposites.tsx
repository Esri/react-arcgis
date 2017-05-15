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
        viewWatchables={[
            'center',
            'constraints',
            'extent',
            'resizeAlign',
            'rotation',
            'scale',
            'zoom'
        ]}
        onViewPropertyChange = {
            ( props.onViewPropertyChange ? props.onViewPropertyChange : () => null )
        }
        onMapPropertyChange = {
            ( props.onMapPropertyChange ? props.onMapPropertyChange : () => null )
        }
    />
);

export const WebScene = (props: SceneProps) => (
    <WebView
        scriptUri={['esri/WebScene', 'esri/views/SceneView']}
        {...props}
        viewProperties = {{...props.viewProperties}}
        mapProperties = {{...props.mapProperties}}
        viewWatchables={[
            'camera',
            'center',
            'clippingArea',
            'constraints',
            'environment',
            'extent',
            'qualityProfile',
            'scale',
            'viewingMode',
            'viewpoint',
            'zoom'
        ]}
        onViewPropertyChange = {
            ( props.onViewPropertyChange ? props.onViewPropertyChange : () => null )
        }
        onMapPropertyChange = {
            ( props.onMapPropertyChange ? props.onMapPropertyChange : () => null )
        }
    />
);
