import * as React from 'react';

export interface ArcContainerProps {
    id: string;
    style?: {
        [propName: string]: any;
    };
}

export interface ArcContainerState {};

export default class ArcContainer extends React.Component<ArcContainerProps, ArcContainerState> {
    constructor(props: ArcContainerProps) {
        super(props);
    }

    public render() {
        return <div id={this.props.id} style={this.props.style} />;
    }

    public shouldComponentUpdate() {
        return false;
    }
}
