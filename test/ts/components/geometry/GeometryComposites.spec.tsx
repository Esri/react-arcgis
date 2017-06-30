import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import * as GeometryComposites from '../../../../src/ts/components/geometry/GeometryComposites';

export default () => (
    describe('The Geometry composites', () => {
        Object.keys(GeometryComposites).forEach((geometryName) => {

            describe(geometryName, () => {
                const GeometryElement = GeometryComposites[geometryName]
                let geometry;

                describe('the dataFlow is set to oneTime', () => {
                    beforeEach(() => {
                        geometry = shallow(<GeometryElement />);
                    });

                    it('should exist', () => {
                        expect(geometry).to.exist;
                    });
                });

                describe('the dataFlow is set to oneWay', () => {
                    beforeEach(() => {
                        geometry = shallow(<GeometryElement dataFlow="oneWay" />);
                    });

                    it('should exist', () => {
                        expect(geometry).to.exist;
                    });
                });
            });

        });
    })
);
