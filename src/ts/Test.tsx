import * as React from 'react';
import '../css/index.scss';
import { WebMap, WebScene } from './components/WebComposites';

interface ComponentState {
}

export default class TestComponent extends React.Component<null, ComponentState>{

    public render() {
        return (
            <div>
                <WebMap id="6627e1dd5f594160ac60f9dfc411673f" className="half-map" />
                <WebScene id="f8aa0c25485a40a1ada1e4b600522681" className="half-map" />
            </div>
        );
    }
}

