import { esriPromise } from 'esri-promise';
import * as React from 'react';

export interface SymbolProps {
    scriptUri: string;
    graphic?: __esri.Graphic;
    symbolProperties?: {
      [propName: string]: any;
    };
    registerSymbol?: (intance: __esri.Symbol) => any;
    onLoad?: (instance: __esri.Symbol) => any;
    onFail?: (e: any) => any;
}

interface ComponentState {
    scriptUri: string;
    graphic: __esri.Graphic;
    instance: __esri.Symbol;
}

export default class Symbol extends React.Component<SymbolProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            graphic: this.props.graphic,
            instance: null,
            scriptUri: this.props.scriptUri,
        }
        this.createSymbol = this.createSymbol.bind(this);
    }

    public render() {
        return null;
    }

    private componentDidMount() {
      esriPromise([
        this.props.scriptUri
      ]).then(([
        Symbol
      ]) => {
        this.createSymbol(Symbol);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.instance);
        }
      }).catch((e) => {
        if (this.props.onFail) {
          this.props.onFail(e);
        }
      });
    }

    private createSymbol(Symbol: __esri.SymbolConstructor) {
      const instance = new Symbol(this.props.symbolProperties);
      this.setState({ instance });
      this.props.registerSymbol(instance);
    }
}