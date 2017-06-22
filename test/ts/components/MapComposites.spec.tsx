import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
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

        describe('the user sets the mapProperties to oneWay', () => {
            beforeEach(() => {
                map = shallow(<Map dataFlow="oneWay"  />);
            });

            it('should give a Map instance with dataFlow set to oneWay', () => {
                expect(map.instance().props.dataFlow).to.equal('oneWay');
            });
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

        describe('the user sets the dataFlow to oneWay', () => {
            beforeEach(() => {
                scene = shallow(<Scene dataFlow="oneWay" />);
            });

            it('should give a Scene instance with dataFlow set to oneWay', () => {
                expect(scene.instance().props.dataFlow).to.equal('oneWay');
            });
        });
    })
);
