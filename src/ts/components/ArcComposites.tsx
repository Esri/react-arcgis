import { ArcView, BaseProps } from './ArcBase';

export interface MapBaseProps extends BaseProps {
    scriptUri: string[];

    [index: string]: any;
}

export interface WebBaseProps extends BaseProps {
    scriptUri: string[];
    id: string;

    [index: string]: any;
}

export interface EventMap {
    onClick: 'click' | string;
    onDoubleClick: 'double-click' | string;
    onDrag: 'drag' | string;
    onHold: 'hold' | string;
    onKeyDown: 'key-down' | string;
    onKeyUp: 'key-up' | string;
    onLayerViewCreate: 'layerview-create' | string;
    onLayerViewDestroy: 'layerview-destroy' | string;
    onMouseWheel: 'mouse-wheel' | string;
    onPointerDown: 'pointer-down' | string;
    onPointerMove: 'pointer-move' | string;
    onPointerUp: 'pointer-up' | string;
    onResize: 'resize' | string;

    [index: string]: string;
}

const eventMap: EventMap = {
    onClick: 'click',
    onDoubleClick: 'double-click',
    onDrag: 'drag',
    onHold: 'hold',
    onKeyDown: 'key-down',
    onKeyUp: 'key-up',
    onLayerViewCreate: 'layerview-create',
    onLayerViewDestroy: 'layerview-destroy',
    onMouseWheel: 'mouse-wheel',
    onPointerDown: 'pointer-down',
    onPointerMove: 'pointer-move',
    onPointerUp: 'pointer-up',
    onResize: 'resize'
};

export const MapBase = (props: MapBaseProps) => (
  <ArcView
    {...props}
    loadMap={
      ([Map, View], containerId) => {
        const mapData = new Promise((resolve, reject) => {
            try {
                const map: __esri.Map = new Map(props.mapProperties);  // Make the map
                const viewProperties: any = {
                    map,
                    container: containerId,
                    ...props.viewProperties
                };
                const view: __esri.View = new View(viewProperties);  // Make the view
                const typedView = view as __esri.MapView | __esri.SceneView;
                Object.keys(eventMap).forEach((key) => {  // Set view events to any user defined callbacks
                    if (props[key]) {
                        typedView.on(eventMap[key], props[key]);
                    }
                });
                view.when(() => {
                    resolve({ map, view });
                },        (err: Error) => {
                    reject(err);
                });
            } catch (err) {
                reject(err);
            }
        });
        return mapData;
      }
    }
  />
);

export const WebBase = (props: WebBaseProps) => (
  <ArcView
    {...props}
    loadMap={
      ([WebConstructor, ViewConstructor, all], containerId) => {
        const mapData = new Promise((resolve, reject) => {
            try {
                const map: __esri.WebMap | __esri.WebScene = new WebConstructor({
                    portalItem: {
                        id: props.id
                    },
                    ...props.mapProperties
                });
                map.load()
                    .then(() => {
                        return map.basemap.load();
                    })
                    .then(() => {
                        const allLayers = map.allLayers;
                        const promises = allLayers.map((layer) => layer.load());
                        return all(promises.toArray());
                    })
                    .then(() => {
                        const view = new ViewConstructor({
                            container: containerId,
                            map,
                            ...props.viewProperties
                        });
                        Object.keys(eventMap).forEach((key) => {  // Set view events to any user defined callbacks
                            if (props[key]) {
                                view.on(eventMap[key], props[key]);
                            }
                        });
                        resolve({ map, view });
                    }).catch((err) => {
                        reject(err);
                    });
            } catch (err) {
                reject(err);
            }
        });
        return mapData;
      }
    }
  />
);
