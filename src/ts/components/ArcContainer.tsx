import * as React from 'react';

export interface ArcContainerProps {
    id: string,
    style?: {
        [propName: string]: any
    }
}

export default class ArcContainer extends React.Component<ArcContainerProps, undefined> {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div id={this.props.id} style={this.props.style}></div>
    }
}