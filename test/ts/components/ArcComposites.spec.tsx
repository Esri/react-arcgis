import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import { MapBase, WebBase } from '../../../src/ts/components/ArcComposites';

export const MapBaseTests = () => (
    describe('MapBase', () => {
        let mapBase;
        beforeEach(() => {
            mapBase = shallow(<MapBase scriptUri={['foo', 'bar']} />);
        });

        it('should exist', () => {
            expect(mapBase).to.exist;
        });
    })
);

export const WebBaseTests = () => (
    describe('WebBase', () => {
        let webBase;
        beforeEach(() => {
            webBase = shallow(<WebBase id="foobar" scriptUri={['foo', 'bar']} />);
        });

        it('should exist', () => {
            expect(webBase).to.exist;
        });
    })
);
