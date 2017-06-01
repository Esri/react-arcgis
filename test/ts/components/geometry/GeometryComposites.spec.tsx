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
                beforeEach(() => {
                    geometry = shallow(<GeometryElement />);
                });

                it('should exist', () => {
                    expect(geometry).to.exist;
                });
            });

        });
    })
);
