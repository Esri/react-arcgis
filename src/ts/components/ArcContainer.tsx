import * as React from 'react';

interface ArcContainerProps {
    id: string;
    style?: {
        [propName: string]: any;
    };
}

interface ArcContainerState {};

export default class ArcContainer extends React.Component<ArcContainerProps, ArcContainerState> {
    constructor(props: ArcContainerProps) {
        super(props);
    }

    public render() {
        return <div id={this.props.id} style={this.props.style}></div>;
    }

    public shouldComponentUpdate() {
        return false;
    }
}
