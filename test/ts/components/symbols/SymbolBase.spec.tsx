import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Symbol from '../../../../src/ts/components/symbols/SymbolBase';

export default () => (
    describe('SymbolBase', () => {
        let symbol;

        describe('as a shallow component', () => {
            beforeEach(() => {
                symbol = shallow(<Symbol scriptUri="foobar" dataFlow="oneTime" />);
            });

            it('should exist', () => {
                expect(symbol).to.exist;
            });
        });

        describe('as a mounted component', () => {
            beforeEach(() => {
                sinon.spy(Symbol.prototype, 'componentDidMount');
                symbol = mount(<Symbol scriptUri="foobar" dataFlow="oneTime" />);
            });

            it('should call componentDidMount', () => {
                expect(Symbol.prototype.componentDidMount['callCount']).to.equal(1);
            });

            describe('esriPromise succeeds', () => {
                before(() =>{
                    global['asyncSuccess'] = true;
                    global['generateSymbol'] = true;
                });

                beforeEach(() => {
                    symbol = mount(<Symbol scriptUri="foobar" registerSymbol={sinon.stub()} dataFlow="oneTime" />);
                    sinon.spy(symbol.instance(), 'createSymbol');
                });

                it('should call createSymbol', (done) => {
                    setTimeout(() => {
                        expect(symbol.instance().createSymbol.callCount).to.equal(1);
                        done();
                    }, 1);
                });

                it('should call registerSymbol', () => {
                    setTimeout(() => {
                        expect(symbol.props().registerSymbol.callCount).to.equal(1);
                    });
                });

                describe('the user has included an onLoad callback', () => {
                    beforeEach(() => {
                        symbol = mount(<Symbol scriptUri="foobar" registerSymbol={sinon.stub()} onLoad={sinon.stub()} dataFlow="oneTime" />);
                    });

                    it('should call onLoad', (done) => {
                        setTimeout(() => {
                            expect(symbol.props().onLoad.callCount).to.equal(1);
                            done();
                        }, 1);
                    });
                });

                describe('the user updates symbolProperties', () => {
                    beforeEach(() => {
                        symbol = mount(
                            <Symbol
                                scriptUri="foobar"
                                registerSymbol={sinon.stub()}
                                onLoad={sinon.stub()}
                                symbolProperties={{ foo: 'bar' }}
                                dataFlow="oneWay"
                            />
                        );
                    });

                    describe('with a valid key', () => {
                        it('should update the API accordingly', (done) => {
                            setTimeout(() => {
                                symbol.setProps({ symbolProperties: { foo: 'banana' } });
                                expect(symbol.instance().state.instance.foo).to.equal('banana');
                                expect(symbol.props().symbolProperties.foo).to.equal('banana');
                                done();
                            }, 1);
                        });
                    });

                    describe('with an invalid key', () => {
                        it('should not make any changes to the API', (done) => {
                            setTimeout(() => {
                                symbol.setProps({ symbolProperties: { foo: 'bar', bar: 'banana' } });
                                expect(symbol.instance().state.instance.foo).to.equal('bar');
                                expect(symbol.props().symbolProperties.foo).to.equal('bar');
                                expect(symbol.instance().state.instance.bar).to.not.exist;
                                done();
                            }, 1);
                        });
                    });
                });

                after(() => {
                    global['asyncSuccess'] = false;
                    global['generateSymbol'] = false;
                });
            });

            describe('esriPromise fails', () => {
                before(() => {
                    global['asyncSuccess'] = false;
                });

                beforeEach(() => {
                    symbol = mount(<Symbol scriptUri="foobar" dataFlow="oneTime" />);
                    sinon.spy(symbol.instance(), 'createSymbol');
                });

                it('should not call renderLayer', () => {
                    setTimeout(() => {
                        expect(symbol.instance().createSymbol.callCount).to.equal(0);
                    }, 1);
                });

                describe('the user has included an onFail callback', () => {
                    beforeEach(() => {
                        symbol = mount(<Symbol scriptUri="foobar" onFail={sinon.stub()} dataFlow="oneTime" />);
                    });

                    it('should call onFail', (done) => {
                        setTimeout(() => {
                            expect(symbol.props().onFail.callCount).to.equal(1);
                            done();
                        }, 1);
                    });
                });

                after(() => {
                    global['asyncSuccess'] = false;
                });
            });

            afterEach(() => {
                Symbol.prototype.componentDidMount['restore']();
            });
        });
    })
);
