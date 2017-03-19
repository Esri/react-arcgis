import * as React from 'react';
import { esriPromise } from 'esri-promise';

export interface LayerProps {
    scriptUri: string,
    map?: __esri.Map,
    view?: __esri.SceneView | __esri.MapView,
    layerProperties?: {
      [propName: string]: any;
    }

    onLoad?: (instance: __esri.Layer) => any,
    onFail?: (e: any) => any
}

interface ComponentState {
    scriptUri: string,
    map: __esri.Map,
    view: __esri.View,
    instance: __esri.Layer,
    status: string
}

export default class Layer extends React.Component<LayerProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            status: 'loading',
            scriptUri: this.props.scriptUri,
            map: this.props.map,
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
        this.setState({ status: 'loaded' });
        if (this.props.onLoad) {
          this.props.onLoad(this.state.instance);
        }
      }).catch((e) => {
        this.setState({ status: 'failed' });
        if (this.props.onFail) {
          this.props.onFail(e);
        }
      });
    }

    componentWillUnmount() {
      this.state.map.remove(this.state.instance);
    }

    render() {
      if (this.state.status === 'loaded') {
        const childrenWithProps = React.Children.map(this.props.children, (child) => {
          const childEl = child as React.ReactElement<any>
          return React.cloneElement(childEl,
            { layer: this.state.instance }
          );
        });
        return (
          <div>
            {childrenWithProps}
          </div>
        );
      }
      return null;
    }

    private renderLayer(Layer: __esri.LayerConstructor) {
      const instance = new Layer(this.props.layerProperties);
      this.setState({ instance });
      this.state.map.add(instance);
    }
}