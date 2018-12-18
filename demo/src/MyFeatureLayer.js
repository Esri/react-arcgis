import * as React from 'react';
import { loadModules } from 'react-arcgis';

export default class MyFeatureLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myFeatureLayer: null
        };
    }

    render() {
        return null;
    }

    componentWillMount() {
        loadModules(['esri/layers/FeatureLayer']).then(([ FeatureLayer ]) => {
            const myFeatureLayer = new FeatureLayer({
                url: this.props.featureLayerProperties.url
              });

            this.setState({ myFeatureLayer });
            this.props.map.add(myFeatureLayer);
        }).catch((err) => console.error(err));
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.myFeatureLayer);
    }
}