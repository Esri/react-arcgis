import * as React from 'react';
import { loadModules } from 'react-arcgis';

export default class BermudaTriangle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphic: null
        };
    }

    render() {
        return null;
    }

    componentWillMount() {
        loadModules(['esri/Graphic']).then(([ Graphic ]) => {
            // Create a polygon geometry
            const polygon = {
                type: "polygon", // autocasts as new Polygon()
                rings: [
                [-64.78, 32.3],
                [-66.07, 18.45],
                [-80.21, 25.78],
                [-64.78, 32.3]
                ]
            };

            // Create a symbol for rendering the graphic
            const fillSymbol = {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [227, 139, 79, 0.8],
                outline: { // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 1
                }
            };

            // Add the geometry and symbol to a new graphic
            const graphic = new Graphic({
                geometry: polygon,
                symbol: fillSymbol
            });
            this.setState({ graphic });
            this.props.view.graphics.add(graphic);
        }).catch((err) => console.error(err));
    }

    componentWillUnmount() {
        this.props.view.graphics.remove(this.state.graphic);
    }
}