import * as React from 'react';
import { esriPromise } from 'esri-promise';

export interface GraphicProps {
    map?: __esri.Map,
    view?: __esri.SceneView | __esri.MapView,
    layer?: __esri.Layer,
    graphicProperties?: {
      [propName: string]: any;
    }

    onLoad?: (instance: __esri.Graphic) => any,
    onFail?: (e: any) => any
}

interface ComponentState {
    map?: __esri.Map,
    view?: __esri.View,
    layer?: __esri.Layer,
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
      // Remove from layer or view..
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
      return childrenWithProps;
    }

    public renderGraphic() {
      if (this.state.constructor && this.state.symbol && this.state.geometry) {
        // Render the graphic
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