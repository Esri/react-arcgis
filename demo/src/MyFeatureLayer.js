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
        // const { map } = this.props;
        loadModules(['esri/layers/FeatureLayer']).then(([ FeatureLayer ]) => {

            // Add the geometry and symbol to a new graphic
            const myFeatureLayer = new FeatureLayer({
                url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer/0"
              });

            this.setState({ myFeatureLayer });
            this.props.map.add(myFeatureLayer);
        }).catch((err) => console.error(err));
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.myFeatureLayer);
    }
}