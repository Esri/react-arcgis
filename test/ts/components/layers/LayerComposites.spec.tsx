import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import * as LayerComposites from '../../../../src/ts/components/layers/LayerComposites';

export default () => (
    describe('The Layer composites', () => {
        let layer;
        Object.keys(LayerComposites).forEach((layerName) => {
            it(`${layerName} layer should exist`, () => {
                const LayerElement = LayerComposites[layerName]
                layer = shallow(<LayerElement />);
                expect(layer).to.exist;
            });
        });
    })
);
