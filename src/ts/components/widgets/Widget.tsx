import * as React from 'react';
import { esriPromise } from 'esri-promise';

export interface WidgetProps {
    view?: __esri.View
}

interface ComponentState {
    view: __esri.View
}

export default class Widget extends React.Component<WidgetProps, ComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            view: this.props.view
        }
    }

    render() {
        return null;
    }
}