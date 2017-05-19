import { esriPromise } from 'esri-promise';
import * as React from 'react';

export interface WidgetProps {
    scriptUri: string;
    map?: __esri.Map;
    view?: __esri.SceneView | __esri.MapView;
    position?: string;
    widgetProperties?: {
      [propName: string]: any;
    };
    onLoad?: (instance: __esri.Widget) => any;
    onFail?: (e: any) => any;
}

interface ComponentState {
    scriptUri: string;
    map: __esri.Map;
    view: __esri.View;
    instance: __esri.Widget;
}

export default class Widget extends React.Component<WidgetProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            instance: null,
            map: this.props.map,
            scriptUri: this.props.scriptUri,
            view: this.props.view,
        }
        this.renderWidget = this.renderWidget.bind(this);
    }

    public render() {
        return null;
    }

    private componentDidMount() {
      esriPromise([
        this.props.scriptUri
      ]).then(([
        Widget
      ]) => {
        this.renderWidget(Widget);
        if (this.props.onLoad) {
          this.props.onLoad(this.state.instance);
        }
      }).catch((e) => {
        if (this.props.onFail) {
          this.props.onFail(e);
        }
      });
    }

    private componentWillUnmount() {
      this.state.view.ui.remove(this.state.instance);
    }

    private renderWidget(Widget: __esri.WidgetConstructor) {
      const widgetProperties = { view: this.state.view, ...this.props.widgetProperties };
      const position = this.props.position ? this.props.position : 'manual';
      const instance = new Widget(widgetProperties);
      this.setState({ instance });
      this.state.view.ui.add(instance, { position });
    }

    private componentWillReceiveProps(nextProps: WidgetProps) {
        Object.keys(nextProps.widgetProperties).forEach((key) => {
            if (this.state.instance.get(key)) {
                this.state.instance.set(key, nextProps.widgetProperties[key]);
            }
        });
    }
};
