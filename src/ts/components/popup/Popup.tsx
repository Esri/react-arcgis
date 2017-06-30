import { esriPromise } from 'esri-promise';
import * as React from 'react';


export interface PopupProps {
    map?: __esri.Map;
    view?: __esri.SceneView | __esri.MapView;
    popupProperties: PopupProperties;
};

interface PopupProperties extends __esri.PopupOpenOptions {
    location: __esri.Geometry | number[] | any;
};

interface ComponentState {
    map?: __esri.Map;
    mounted: boolean;
    view?: __esri.View;
};

export default class Popup extends React.Component<PopupProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            map: this.props.map,
            mounted: false,
            view: this.props.view,
        };
    }

    public render() {
      return null;
    }

    public componentDidMount() {
        if (this.props.popupProperties) {
            this.state.view.popup.open(this.props.popupProperties);
            this.setState({
                mounted: true
            });
        } else {
            console.warn('React-arcgis attempted to display a popup without any content. Please include popupProperties in order to see the popup.');
        }
    }

    public componentWillUnmount() {
        if (this.state.mounted) {
            this.state.view.popup.close();
            this.setState({
                mounted: false
            });
        }
    }

    public componentWillReceiveProps(nextProps) {
        if (nextProps.popupProperties && this.state.mounted && nextProps.popupProperties !== this.props.popupProperties) {
            this.state.view.popup.close();
            this.state.view.popup.open(nextProps.popupProperties);
        }
    }
}
