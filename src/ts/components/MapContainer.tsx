import * as React from 'react';

export interface MapContainerProps {
    id: string,
    style?: {
        [propName: string]: any
    }
}

export default class MapContainer extends React.Component<MapContainerProps, undefined> {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div id={this.props.id} style={this.props.style}></div>
    }
}