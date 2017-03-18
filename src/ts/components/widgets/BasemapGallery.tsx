import * as React from 'react';
import { esriPromise } from 'esri-promise';

export interface BasemapGalleryProps {
    view?: __esri.SceneView | __esri.MapView,
    position?: string,
    widgetProperties?: {
      activeBasemap?: __esri.BasemapProperties;
      source?: __esri.LocalBasemapsSource | __esri.PortalBasemapsSource;
      viewModel?: __esri.BasemapGalleryViewModelProperties;
    }
}

interface ComponentState {
    view: __esri.View,
    instance: __esri.BasemapGallery
}

export default class BasemapGallery extends React.Component<BasemapGalleryProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            view: this.props.view,
            instance: null
        }
        this.renderWidget = this.renderWidget.bind(this);
    }

    componentDidMount() {
      esriPromise([
        'esri/widgets/BasemapGallery'
      ]).then(([
        BasemapGallery
      ]) => {
        this.renderWidget(BasemapGallery)
      }).catch((e) => {
        // console.log(e);
      });
    }

    componentWillUnmount() {
      this.state.view.ui.remove(this.state.instance);
    }

    render() {
        return null;
    }

    private renderWidget(BasemapGallery) {
      const widgetProperties = { view: this.state.view, ...this.props.widgetProperties };
      const position = this.props.position ? this.props.position : 'manual';
      const instance = new BasemapGallery(widgetProperties);
      this.setState({ instance });
      this.state.view.ui.add(instance, { position });
    }
}