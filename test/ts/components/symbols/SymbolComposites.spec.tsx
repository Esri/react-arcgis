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

                describe('the dataFlow is set to oneTime', () => {
                    beforeEach(() => {
                        symbol = shallow(<SymbolElement />);
                    });

                    it('should exist', () => {
                        expect(symbol).to.exist;
                    });
                });

                describe('the dataFlow is set to oneWay', () => {
                    beforeEach(() => {
                        symbol = shallow(<SymbolElement dataFlow="oneWay" />);
                    });

                    it('should exist', () => {
                        expect(symbol).to.exist;
                    });
                });
            });

        });
    })
);
