import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Geometry from '../../../../src/ts/components/geometry/GeometryBase';

export default () => (
    describe('GeometryBase', () => {
        let geometry;
        beforeEach(() => {
            geometry = shallow(<Geometry scriptUri="foobar" />);
        });

        it('should exist', () => {
            expect(geometry).to.exist;
        });
    })
);
