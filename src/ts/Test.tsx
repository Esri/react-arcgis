import * as React from 'react';
import '../css/index.scss';
import { Scene } from './components/ArcComposites';
import { BasemapGallery } from './components/widgets/WidgetComposites';

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
            <div>
                <Scene
                    style={{ width: '80vw', height: '80vh' }}
                    mapProperties={this.state.myMapProperties}
                    viewProperties={this.state.myViewProperties}
                    onViewPropertyChange={this.handleViewPropertyChange}
                >
                    <BasemapGallery position="top-right" />
                </Scene>
            </div>
        );
    }

    private handleViewPropertyChange(key: string, value: any) {
        console.log(key, value);
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

