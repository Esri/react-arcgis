import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import * as SymbolComposites from '../../../../src/ts/components/symbols/SymbolComposites';

export default () => (
    describe('The Symbol composites', () => {
        Object.keys(SymbolComposites).forEach((symbolName) => {

            describe(symbolName, () => {
                const SymbolElement = SymbolComposites[symbolName];
                let symbol;
                beforeEach(() => {
                    symbol = shallow(<SymbolElement />);
                });

                it('should exist', () => {
                    expect(symbol).to.exist;
                });
            });

        });
    })
);
