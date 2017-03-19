import * as React from 'react';
import { esriPromise } from 'esri-promise';

export interface GraphicProps {
    map?: __esri.Map,
    view?: __esri.SceneView | __esri.MapView,
    layer?: __esri.GraphicsLayer,
    graphicProperties?: {
      [propName: string]: any;
    }

    onLoad?: (instance: __esri.Graphic) => any,
    onFail?: (e: any) => any
}

interface ComponentState {
    map?: __esri.Map,
    view?: __esri.View,
    layer?: __esri.GraphicsLayer,
    constructor: __esri.GraphicConstructor,
    instance: __esri.Graphic,
    geometry: __esri.Geometry,
    symbol: __esri.Symbol
}

export default class Graphic extends React.Component<GraphicProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            map: this.props.map,
            view: this.props.view,
            layer: this.props.layer,
            constructor: null,
            instance: null,
            geometry: null,
            symbol: null
        }
        this.renderGraphic = this.renderGraphic.bind(this);
        this.registerSymbol = this.registerSymbol.bind(this);
        this.registerGeometry = this.registerGeometry.bind(this);
    }

    componentDidMount() {
      esriPromise([
        'esri/Graphic'
      ]).then(([
        Graphic
      ]) => {
        this.setState({ constructor: Graphic });
        this.renderGraphic();
      }).catch((e) => {
        if (this.props.onFail) {
          this.props.onFail(e);
        }
      });
    }

    componentWillUnmount() {
      if (this.state.layer) {
        this.state.layer.graphics.remove(this.state.instance);
      } else if (this.state.view) {
        this.state.view.graphics.remove(this.state.instance);
      }
    }

    render() {
      const childrenWithProps = React.Children.map(this.props.children, (child) => {
          let childEl = child as React.ReactElement<any>
          return React.cloneElement(childEl,
          {
              registerSymbol: this.registerSymbol,
              registerGeometry: this.registerGeometry
          });
      });
      return (
        <div>
          {childrenWithProps}
        </div>
      );
    }

    public renderGraphic() {
      if (this.state.constructor && this.state.symbol && this.state.geometry) {
        const graphic = new this.state.constructor({
          geometry: this.state.geometry,
          symbol: this.state.symbol,
          ...this.props.graphicProperties
        });
        this.setState({
          instance: graphic
        });
        if (this.state.layer) {
          this.state.layer.graphics.add(graphic);
        } else if (this.state.view) {
          this.state.view.graphics.add(graphic);
        }
        if (this.props.onLoad) {
          this.props.onLoad(graphic);
        }
      }
    }

    public registerSymbol(symbol: __esri.Symbol) {
      this.setState({ symbol });
      this.renderGraphic();
    }

    public registerGeometry(geometry: __esri.Geometry) {
      this.setState({ geometry });
      this.renderGraphic();
    }
}