import * as React from 'react';
import { esriPromise } from 'esri-promise';

export interface WidgetProps {
    scriptUri: string,
    view?: __esri.SceneView | __esri.MapView,
    layerProperties?: {
      [propName: string]: any;
    }

    onLoad?: (instance: __esri.Widget) => any,
    onFail?: (e: any) => any
}

interface ComponentState {
    scriptUri: string,
    view: __esri.View,
    instance: __esri.Widget
}

export default class Layer extends React.Component<WidgetProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            scriptUri: this.props.scriptUri,
            view: this.props.view,
            instance: null
        }
        this.renderLayer = this.renderLayer.bind(this);
    }

    componentDidMount() {
      esriPromise([
        this.props.scriptUri
      ]).then(([
        Layer
      ]) => {
        this.renderLayer(Layer)
        if (this.props.onLoad) {
          this.props.onLoad(this.state.instance);
        }
      }).catch((e) => {
        if (this.props.onFail) {
          this.props.onFail(e);
        }
      });
    }

    componentWillUnmount() {
      this.state.view.ui.remove(this.state.instance);
    }

    render() {
        return null;
    }

    private renderLayer(Layer) {
      const layerProperties = { view: this.state.view, ...this.props.layerProperties };
      const instance = new Layer(layerProperties);
      this.setState({ instance });
      this.state.view.ui.add(instance);
    }
}