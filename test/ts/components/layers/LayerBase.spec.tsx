import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Layer from '../../../../src/ts/components/layers/LayerBase';

export default () => (
    describe('LayerBase', () => {
        let layer;
        beforeEach(() => {
            layer = shallow(<Layer eventMap={{ foo: 'bar' }} addLocation={['foo', 'bar']} scriptUri="foobar" />);
        });

        it('should exist', () => {
            expect(layer).to.exist;
        });
    })
);
