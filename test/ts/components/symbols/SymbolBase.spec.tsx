import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Symbol from '../../../../src/ts/components/symbols/SymbolBase';

export default () => (
    describe('SymbolBase', () => {
        let symbol;
        beforeEach(() => {
            symbol = shallow(<Symbol scriptUri="foobar" />);
        });

        it('should exist', () => {
            expect(symbol).to.exist;
        });
    })
);
