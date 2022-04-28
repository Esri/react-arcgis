import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';

const MyFeatureLayer = (props) => {
    const [myFeatureLayer, setMyFeatureLayer] = useState(null);
    useEffect(() => {
        loadModules(['esri/layers/FeatureLayer']).then(([FeatureLayer]) => {
            const myFeatureLayer = new FeatureLayer({
                url: props.featureLayerProperties.url
            });

            setMyFeatureLayer(myFeatureLayer);
            props.map.add(myFeatureLayer);
        }).catch((err) => console.error(err));

        return function cleanup() {
            props.map.remove(myFeatureLayer);
        }
    }, [ props ]);

    return null;
}

export default MyFeatureLayer;