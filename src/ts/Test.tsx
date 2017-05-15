import * as React from 'react';
import '../css/index.scss';
import { Scene } from './components/ArcComposites';
import { WebMap, WebScene } from './components/WebComposites';
import { BasemapGallery, Legend, Search } from './components/widgets/WidgetComposites';

interface ComponentState {
    myViewProperties: __esri.SceneViewProperties;
    myMapProperties: __esri.MapProperties;
}

export default class TestComponent extends React.Component<null, ComponentState>{
    constructor(props) {
        super(props);
        this.state = {
            myMapProperties: {},
            myViewProperties: {}
        };
        this.handleViewPropertyChange = this.handleViewPropertyChange.bind(this);
        this.resetZoom = this.resetZoom.bind(this);
        this.setBasemap = this.setBasemap.bind(this);
    }

    public render() {
        return (
            <div style={{ width: '100vw', height: '100vh' }}>
                <div style={{ display: 'inline-block', width: '100%', height: '100%' }}>
                    <WebScene
                        id='f8aa0c25485a40a1ada1e4b600522681'
                    >
                        <BasemapGallery position="bottom-left" />
                    </WebScene>
                </div>
            </div>
        );
    }

    private handleViewPropertyChange(key: string, value: any) {
        const newViewProperties = {...this.state.myViewProperties};
        newViewProperties[key] = value;
        this.setState({
            myViewProperties: newViewProperties
        });
    }

    private resetZoom() {
        this.setState({
            myViewProperties: { ...this.state.myViewProperties, zoom: 0 }
        });
    }

    private setBasemap(basemap: string) {
        this.setState({
            myMapProperties: { ...this.state.myMapProperties, basemap }
        });
    }

    private goto(latitude: number, longitude: number) {
        this.setState({
            myViewProperties: { ...this.state.myViewProperties, center: [latitude, longitude] }
        });
    }
}

