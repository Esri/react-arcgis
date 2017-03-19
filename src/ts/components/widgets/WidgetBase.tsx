import * as React from 'react';
import { esriPromise } from 'esri-promise';

export interface WidgetProps {
    scriptUri: string,
    map?: __esri.Map,
    view?: __esri.SceneView | __esri.MapView,
    position?: string,
    widgetProperties?: {
      [propName: string]: any;
    }

    onLoad?: (instance: __esri.Widget) => any,
    onFail?: (e: any) => any
}

interface ComponentState {
    scriptUri: string,
    map: __esri.Map,
    view: __esri.View,
    instance: __esri.Widget
}

export default class Widget extends React.Component<WidgetProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            scriptUri: this.props.scriptUri,
            map: this.props.map,
            view: this.props.view,
            instance: null
        }
        this.renderWidget = this.renderWidget.bind(this);
    }

    componentDidMount() {
      esriPromise([
        this.props.scriptUri
      ]).then(([
        Widget
      ]) => {
        this.renderWidget(Widget)
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

    private renderWidget(Widget: __esri.WidgetConstructor) {
      const widgetProperties = { view: this.state.view, ...this.props.widgetProperties };
      const position = this.props.position ? this.props.position : 'manual';
      const instance = new Widget(widgetProperties);
      this.setState({ instance });
      this.state.view.ui.add(instance, { position });
    }
}