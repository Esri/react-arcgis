import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import * as LayerComposites from '../../../../src/ts/components/layers/LayerComposites';

export default () => (
    describe('The Layer composites', () => {
        Object.keys(LayerComposites).forEach((layerName) => {

            describe(layerName, () => {
                const LayerElement = LayerComposites[layerName];
                let layer;

                describe('the dataFlow is set to oneTime', () => {
                    beforeEach(() => {
                        layer = shallow(<LayerElement />);
                    });

                    it('should exist', () => {
                        expect(layer).to.exist;
                    });
                });

                describe('the dataFlow is set to oneWay', () => {
                    beforeEach(() => {
                        layer = shallow(<LayerElement dataFlow="oneWay" />);
                    });

                    it('should exist', () => {
                        expect(layer).to.exist;
                    });
                });
            });

        });
    })
);
