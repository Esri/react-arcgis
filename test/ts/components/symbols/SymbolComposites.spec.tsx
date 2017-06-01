import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import * as SymbolComposites from '../../../../src/ts/components/symbols/SymbolComposites';

export default () => (
    describe('The Symbol composites', () => {
        let symbol;
        Object.keys(SymbolComposites).forEach((symbolName) => {
            it(`${symbolName} symbol should exist`, () => {
                const SymbolElement = SymbolComposites[symbolName]
                symbol = shallow(<SymbolElement />);
                expect(symbol).to.exist;
            });
        });
    })
);
