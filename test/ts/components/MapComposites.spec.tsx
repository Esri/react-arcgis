import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Map, Scene } from '../../../src/ts/components/MapComposites';

export const MapTests = () => (
    describe('Map', () => {
        let map;
        beforeEach(() => {
            map = shallow(<Map />);
        });

        it('should exist', () => {
            expect(map).to.exist;
        });
    })
);

export const SceneTests = () => (
    describe('Scene', () => {
        let scene;
        beforeEach(() => {
            scene = shallow(<Scene />);
        });

        it('should exist', () => {
            expect(scene).to.exist;
        });
    })
);
