import * as React from 'react';

import '../css/index.scss';
import Map from './components/Map';
import Scene from './components/Scene';
import BasemapGallery from './components/widgets/BasemapGallery';

interface ComponentState {
    active: boolean;
}

export default class Home extends React.Component<null, ComponentState>{
    constructor(props) {
        super(props);
        this.state = {
            active: true
        }
    }

    render() {
        return (
            <div>
                <Scene 
                    style={{ width: '80vw', height: '80vh', border: '1px solid black' }}
                    mapProperties={{
                        basemap: 'satellite'
                    }}
                >
                    <BasemapGallery position="bottom-right" />
                </Scene>
                <button onClick={() => this.setState({ active: !this.state.active })}>Toggle</button>
            </div>
        )
    }
}

