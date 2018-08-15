import { loadModules } from 'esri-loader';
import * as React from 'react';
import ArcContainer from './ArcContainer';

export interface BaseProps {
    id?: string;
    children?: any;
    className?: string;
    style?: {
        [propName: string]: any
    };
    mapProperties?: __esri.MapProperties | __esri.WebMapProperties | __esri.WebSceneProperties;
    viewProperties?: __esri.MapViewProperties | __esri.SceneViewProperties;
    onClick?: (e: EventProperties) => any;
    onDoubleClick?: (e: EventProperties) => any;
    onDrag?: (e: EventProperties) => any;
    onHold?: (e: EventProperties) => any;
    onKeyDown?: (e: EventProperties) => any;
    onKeyUp?: (e: EventProperties) => any;
    onLayerViewCreate?: (e: EventProperties) => any;
    onLayerViewDestroy?: (e: EventProperties) => any;
    onMouseWheel?: (e: EventProperties) => any;
    onPointerDown?: (e: EventProperties) => any;
    onPointerMove?: (e: EventProperties) => any;
    onPointerUp?: (e: EventProperties) => any;
    onResize?: (e: EventProperties) => any;
    onLoad?: (map: __esri.Map, view: __esri.MapView | __esri.SceneView) => any;
    onFail?: (e: any) => any;
    loadElement?: any;
    failElement?: any;
    loaderOptions?: Object;
    childrenAsFunction?: (map?: __esri.Map, view?: __esri.MapView | __esri.SceneView) => JSX.Element;
}

export interface ArcProps extends BaseProps {
    loadMap: (modules: any[], containerId: string) => Promise<any>;
    scriptUri: string[];
}

export interface EventProperties {
    [propName: string]: any;
}

export interface ComponentState {
    mapContainerId: string;
    status: string;
    map?: __esri.Map;
    view?: __esri.MapView | __esri.SceneView;
}

export class ArcView extends React.Component<ArcProps, ComponentState> {
    constructor(props: ArcProps) {
        super(props);
        this.state = {
            mapContainerId: Math.random().toString(36).substring(0, 14),
            status: 'loading'
        };
    }

    public render() {
        const centerStyle = {
            left: '50%',
            marginRight: '-50%',
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        };

        const mapStyle = this.props.className ?
            this.props.style :
            {
                height: '100%',
                position: 'relative',
                width: '100%',
                ...this.props.style
            };

        const loadElement = (
            this.props.loadElement ? this.props.loadElement :
            <h3 id="react-arcgis-loading-text">Loading...</h3>
        );

        const failElement = (
            this.props.failElement ? this.props.failElement :
            <h3 id="react-arcgis-fail-text">The ArcGIS API failed to load.</h3>
        );

        if (this.state.status === 'loaded') {
            if (!!this.props.childrenAsFunction) {
                return this.props.childrenAsFunction(this.state.map, this.state.view);
            }
            const childrenWithProps = React.Children.map(this.props.children, (child) => {
                const childEl = child as React.ReactElement<any>;
                return React.cloneElement(childEl, {
                        map: this.state.map,
                        view: this.state.view
                    }
                );
            });
            return (
                <div id="base-container" style={mapStyle} className={this.props.className}>
                    <ArcContainer id={this.state.mapContainerId} style={{ width: '100%', height: '100%' }} />
                    {childrenWithProps}
                </div>
            );
        } else if (this.state.status === 'loading') {
            return (
                <div id="base-container" style={mapStyle} className={this.props.className}>
                    <ArcContainer id={this.state.mapContainerId} style={{ width: '100%', height: '100%' }} />
                    <div style={centerStyle as any}>
                        {loadElement}
                    </div>
                </div>
            );
        }
        return (
            <div id="base-container" style={mapStyle} className={this.props.className}>
                <ArcContainer id={this.state.mapContainerId} style={{ width: '100%', height: '100%' }} />
                <div style={centerStyle as any}>
                    {failElement}
                </div>
            </div>
        );
    }

    public componentDidMount() {
        loadModules(this.props.scriptUri, this.props.loaderOptions)
            .then((modules: any) => (
                this.props.loadMap(modules, this.state.mapContainerId)
                    .then(
                        ({ map, view }) => {
                            this.setState({
                                map,
                                view,
                                status: 'loaded'
                            });
                            if (this.props.onLoad) {
                                this.props.onLoad(map, view);
                            }
                        })
                    .catch((e) => {
                        throw e;
                    })
            )).catch((e: Error) => {
                this.setState({ status: 'failed' });
                if (this.props.onFail) {
                    this.props.onFail(e);
                }
            });
    }
}
