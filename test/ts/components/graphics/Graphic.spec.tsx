import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Graphic from '../../../../src/ts/components/graphics/Graphic';

export default () => (
    describe('Graphic', () => {
        describe('as a shallow component', () => {
            let graphic;
            beforeEach(() => {
                graphic = shallow(<Graphic />);
            });

            it('should exist', () => {
                expect(graphic).to.exist;
            });
        });

        describe('as a mounted component', () => {
            let graphic
            beforeEach(() => {
                sinon.spy(Graphic.prototype, 'componentDidMount');
                graphic = mount(<Graphic />);
            });

            it('should call componentDidMount', () => {
                expect(Graphic.prototype.componentDidMount['callCount']).to.equal(1);
            });

            describe('esriPromise succeeds', () => {
                before(() => {
                    global['asyncSuccess'] = true;
                });

                beforeEach(() => {
                    graphic = mount(<Graphic />);
                });

                it('should call renderGraphic', (done) => {
                    graphic.instance().renderGraphic = sinon.stub();
                    setTimeout(() => {
                        expect(graphic.instance().renderGraphic.callCount).to.equal(1);
                        done();
                    }, 1);
                });

                describe('a symbol is registered', () => {
                    beforeEach(() => {
                        graphic = mount(<Graphic />);
                        graphic.instance().renderGraphic = sinon.stub();
                        graphic.instance().registerSymbol('foobar');
                    });

                    it('should add the symbol to its state', () => {
                        expect(graphic.instance().state.symbol).to.equal('foobar');
                    });

                    it('should call renderGraphic', () => {
                        expect(graphic.instance().renderGraphic.callCount).to.equal(1);
                    });
                });

                describe('a geometry is registered', () => {
                    beforeEach(() => {
                        graphic = mount(<Graphic />);
                        graphic.instance().renderGraphic = sinon.stub();
                        graphic.instance().registerGeometry('foobar');
                    });

                    it('should add the geometry to its state', () => {
                        expect(graphic.instance().state.geometry).to.equal('foobar');
                    });

                    it('should call renderGraphic', () => {
                        expect(graphic.instance().renderGraphic.callCount).to.equal(1);
                    });
                });

                describe('the user updates the graphicProperties', () => {
                    before(() => {
                        global['generateGraphic'] = true;
                    });

                    beforeEach(() => {
                        graphic = mount(<Graphic dataFlow="oneWay" />);
                        graphic.instance().registerGeometry('foobar');
                        graphic.instance().registerSymbol('foobar');
                    });

                    describe('the user updates the graphicProperties with a valid key', () => {
                        it('should update the graphic API accordingly', (done) => {
                            setTimeout(() => {
                                graphic.setProps({ graphicProperties: { foo: 'banana' } });
                                expect(graphic.props().graphicProperties.foo).to.equal('banana');
                                expect(graphic.instance().state.instance.foo).to.equal('banana');
                                done();
                            }, 1);
                        });
                    });

                    describe('the user updates the graphicProperties with an invalid key', () => {
                        it('should make no changes to the JS API', (done) => {
                            setTimeout(() => {
                                graphic.setProps({ graphicProperties: { foo: 'bar', bar: 'banana' } });
                                expect(graphic.props().graphicProperties.bar).to.equal('banana');
                                expect(graphic.instance().state.instance.foo).to.equal('bar');
                                expect(graphic.instance().state.instance.bar).to.not.exist;
                                done();
                            }, 1);
                        });
                    });

                    describe('the user did not include any graphicProperties', () => {
                        it('should make no changes to the JS API', (done) => {
                            setTimeout(() => {
                                graphic.setProps({ foo: 'bar' });
                                done();
                            }, 1);
                        });
                    });

                    describe('the graphic is rendered to a layer', () => {
                        beforeEach(() => {
                            const layer = {
                                graphics: {
                                    add: sinon.stub(),
                                    remove: sinon.stub()
                                }
                            };
                            graphic = mount(<Graphic layer={layer as any} />);
                            graphic.instance().registerGeometry('foobar');
                            graphic.instance().registerSymbol('foobar');
                        });

                        it('should add itself to the layer', (done) => {
                            setTimeout(() => {
                                expect(graphic.instance().state.layer.graphics.add.callCount).to.equal(1);
                                done();
                            }, 1);
                        });

                        describe('the user unmounts the Graphic', () => {
                            it('should remove itself from the containing layer', (done) => {
                                setTimeout(() => {
                                    graphic.instance().componentWillUnmount();
                                    expect(graphic.instance().state.layer.graphics.remove.callCount).to.equal(1);
                                    done();
                                })
                            });
                        });
                    });

                    describe('the graphic is rendered to a view', () => {
                        beforeEach(() => {
                            const view = {
                                graphics: {
                                    add: sinon.stub(),
                                    remove: sinon.stub()
                                }
                            };
                            graphic = mount(<Graphic view={view as any} />);
                            graphic.instance().registerGeometry('foobar');
                            graphic.instance().registerSymbol('foobar');
                        });

                        it('should add itself to the view', (done) => {
                            setTimeout(() => {
                                expect(graphic.instance().state.view.graphics.add.callCount).to.equal(1);
                                done();
                            }, 1);
                        });

                        describe('the user unmounts the Graphic', () => {
                            it('should remove itself from the containing view', (done) => {
                                setTimeout(() => {
                                    graphic.instance().componentWillUnmount();
                                    expect(graphic.instance().state.view.graphics.remove.callCount).to.equal(1);
                                    done();
                                }, 1);
                            });
                        });
                    });

                    describe('the graphic isnt rendered to anything', () => {
                        describe('the user unmounts the Graphic', () => {
                            beforeEach(() => {
                                graphic = mount(<Graphic />);
                                graphic.instance().registerGeometry('foobar');
                                graphic.instance().registerSymbol('foobar');
                            });

                            describe('the user unmounts the Graphic', () => {
                                it('should not remove itself from anything', (done) => {
                                    setTimeout(() => {
                                        graphic.instance().componentWillUnmount();
                                        expect(graphic.instance().state.layer).to.not.exist;
                                        expect(graphic.instance().state.view).to.not.exist;
                                        done();
                                    }, 1);
                                });
                            });
                        });
                    });

                    describe('the user has included a child component', () => {
                        const Child = (props) => (
                            <h3 id="child" onClick={props.registerGeometry} onKeyDown={props.registerSymbol} >foobar</h3>
                        );

                        beforeEach(() => {
                            graphic = mount(<Graphic><Child /></Graphic>);
                            sinon.spy(graphic.instance(), 'registerGeometry');
                            sinon.spy(graphic.instance(), 'registerSymbol');
                        });

                        it('should pass registerGeometry to the child element', (done) => {
                            setTimeout(() => {
                                graphic.find('#child').simulate('click');
                                expect(graphic.instance().registerGeometry.callCount).to.equal(1);
                                done();
                            }, 1);
                        });

                        it('should pass registerSymbol to the child component', (done) => {
                            setTimeout(() => {
                                graphic.find('#child').simulate('keydown');
                                expect(graphic.instance().registerSymbol.callCount).to.equal(1);
                                done();
                            }, 1);
                        });
                    });

                    describe('the user has incluided an onLoad callback', () => {
                        beforeEach(() => {
                            graphic = mount(<Graphic onLoad={sinon.stub()} />);
                            graphic.instance().registerGeometry('foobar');
                            graphic.instance().registerSymbol('foobar');
                        });

                        it('should call the onLoad callback', (done) => {
                            setTimeout(() => {
                                expect(graphic.instance().props.onLoad.callCount).to.equal(1);
                                done();
                            }, 1);
                        });
                    });

                    after(() => {
                        global['generateGraphic'] = false;
                    });
                });

                after(() => {
                    global['asyncSuccess'] = false;
                });
            });

            describe('esriPromise fails', () => {
                before(() => {
                    global['asyncSuccess'] = false;
                });

                beforeEach(() => {
                    graphic = mount(<Graphic />);
                });

                it('should not call renderGraphic', (done) => {
                    graphic.instance().renderGraphic = sinon.stub();
                    setTimeout(() => {
                        expect(graphic.instance().renderGraphic.callCount).to.equal(0);
                        done();
                    }, 1);
                });

                describe('the user has included an onFail callback', () => {
                    beforeEach(() => {
                        graphic = mount(<Graphic onFail={sinon.stub()} />);
                    });

                    it('should call onFail', (done) => {
                        setTimeout(() => {
                            expect(graphic.props().onFail.callCount).to.equal(1);
                            done();
                        }, 1);
                    });
                });

                after(() => {
                    global['asyncSuccess'] = false;
                });
            });

            afterEach(() => {
                Graphic.prototype.componentDidMount['restore']();
            });
        });
    })
);
