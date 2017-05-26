import * as React from 'react';

export interface IArcContainerProps {
    id: string;
    style?: {
        [propName: string]: any;
    };
}

export default class ArcContainer extends React.Component<IArcContainerProps, undefined> {
    public render() {
        return <div id={this.props.id} style={this.props.style}></div>;
    }

    shouldComponentUpdate() {
        return false;
    }
}
