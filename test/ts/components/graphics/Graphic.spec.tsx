import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Graphic from '../../../../src/ts/components/graphics/Graphic';

export default () => (
    describe('Graphic', () => {
        let graphic;
        beforeEach(() => {
            graphic = shallow(<Graphic />);
        });

        it('should exist', () => {
            expect(graphic).to.exist;
        });
    })
);
