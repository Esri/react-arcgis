import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import { WebMap, WebScene } from '../../../src/ts/components/WebComposites';

export const WebMapTests = () => (
    describe('WebMap', () => {
        let webMap;
        beforeEach(() => {
            webMap = shallow(<WebMap id="foobar" />);
        });

        it('should exist', () => {
            expect(webMap).to.exist;
        });

        describe('the user sets the mapProperties to oneWay', () => {
            beforeEach(() => {
                webMap = shallow(<WebMap id="foobar" dataFlow="oneWay"  />);
            });

            it('should give a Map instance with dataFlow set to oneWay', () => {
                expect(webMap.instance().props.dataFlow).to.equal('oneWay');
            });
        });
    })
);

export const WebSceneTests = () => (
    describe('WebScene', () => {
        let webScene;
        beforeEach(() => {
            webScene = shallow(<WebScene id="foobar" />);
        });

        it('should exist', () => {
            expect(webScene).to.exist;
        });

        describe('the user sets the mapProperties to oneWay', () => {
            beforeEach(() => {
                webScene = shallow(<WebScene id="foobar" dataFlow="oneWay"  />);
            });

            it('should give a Map instance with dataFlow set to oneWay', () => {
                expect(webScene.instance().props.dataFlow).to.equal('oneWay');
            });
        });
    })
);
