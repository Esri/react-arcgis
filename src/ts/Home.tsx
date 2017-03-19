import * as React from 'react';

import '../css/index.scss';
import Map from './components/Map';
import Scene from './components/Scene';
import { Locate } from './components/widgets/WidgetComposites';

interface ComponentState {
    active: boolean;
}

export default class HomeComponent extends React.Component<null, ComponentState>{
    constructor(props) {
        super(props);
        this.state = {
            active: true
        }
    }

    render() {
        return (
            <div>
                <Scene style={{ width: '100vw', height: '100vh' }} >
                    <Locate position="top-right" />
                </Scene>
            </div>
        )
    }
}

