import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
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
    })
);
