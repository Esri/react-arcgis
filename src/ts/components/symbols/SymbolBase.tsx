import * as React from 'react';
import { esriPromise } from 'esri-promise';

export interface SymbolProps {
    scriptUri: string,
    graphic?: __esri.Graphic,
    symbolProperties?: {
      [propName: string]: any;
    }

    registerSymbol?: (intance: __esri.Symbol) => any,
    onLoad?: (instance: __esri.Symbol) => any,
    onFail?: (e: any) => any
}

interface ComponentState {
    scriptUri: string,
    graphic: __esri.Graphic,
    instance: __esri.Symbol
}

export default class Symbol extends React.Component<SymbolProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            scriptUri: this.props.scriptUri,
            graphic: this.props.graphic,
            instance: null
        }
        this.createSymbol = this.createSymbol.bind(this);
    }

    componentDidMount() {
      esriPromise([
        this.props.scriptUri
      ]).then(([
        Symbol
      ]) => {
        this.createSymbol(Symbol)
        if (this.props.onLoad) {
          this.props.onLoad(this.state.instance);
        }
      }).catch((e) => {
        if (this.props.onFail) {
          this.props.onFail(e);
        }
      });
    }

    render() {
        return null;
    }

    private createSymbol(Symbol: __esri.SymbolConstructor) {
      const instance = new Symbol(this.props.symbolProperties);
      this.setState({ instance });
      this.props.registerSymbol(instance);
    }
}