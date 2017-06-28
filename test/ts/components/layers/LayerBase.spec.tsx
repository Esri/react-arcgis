import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Layer from '../../../../src/ts/components/layers/LayerBase';

export default () => (
    describe('LayerBase', () => {
        let layer;
        describe('as a shallow component', () => {
            beforeEach(() => {
                layer = shallow(<Layer eventMap={{ foo: 'bar' }} addLocation={['foo', 'bar']} scriptUri="foobar" dataFlow="oneTime" />);
            });

            it('should exist', () => {
                expect(layer).to.exist;
            });
        });

        describe('as a mounted component', () => {
            beforeEach(() => {
                sinon.spy(Layer.prototype, 'componentDidMount');
                layer = mount(<Layer scriptUri="foobar" addLocation={['foo', 'bar']} eventMap={{ foo: 'bar' }} dataFlow="oneTime" />);
            });

            it('should call componentDidMount', () => {
                expect(Layer.prototype.componentDidMount['callCount']).to.equal(1);
            });

            describe('esriPromise succeeds', () => {
                before(() => {
                    global['asyncSuccess'] = true;
                    global['generateLayer'] = true;
                });

                beforeEach(() => {
                    layer = mount(<Layer scriptUri="foobar" addLocation={['foo', 'bar']} eventMap={{ foo: 'bar' }} dataFlow="oneTime" />);
                    layer.instance().setState({ foo: { bar: { add: () => null } } });
                    sinon.spy(layer.instance(), 'renderLayer');
                });

                it('should call renderLayer', () => {
                    setTimeout(() => {
                        expect(layer.instance().renderLayer.callCount).to.equal(1);
                    }, 1);
                });

                describe('the user updates the layerProperties', () => {
                    describe('the user updates the layer properties with a valid key', () => {
                        beforeEach(() => {
                            layer = mount(
                                <Layer 
                                    scriptUri="foobar"
                                    addLocation={['foo', 'bar']}
                                    eventMap={{ foo: 'bar' }}
                                    layerProperties={{ foo: 'bar' }}
                                    dataFlow="oneWay"
                                />
                            );
                            layer.instance().setState({ foo: { bar: { add: () => null } } });
                        });

                        it('should update the ArcGIS JS API accordingly', (done) => {
                            setTimeout(() => {
                                layer.setProps({ layerProperties: { foo: 'banana' } });
                                expect(layer.props().layerProperties.foo).to.equal('banana');
                                expect(layer.instance().state.instance.foo).to.equal('banana');
                                done();
                            }, 1);
                        });
                    });

                    describe('the user updates the layerProperties with an invalid key', () => {
                        beforeEach(() => {
                            layer = mount(
                                <Layer 
                                    scriptUri="foobar"
                                    addLocation={['foo', 'bar']}
                                    eventMap={{ foo: 'bar' }}
                                    layerProperties={{ foo: 'bar' }}
                                    dataFlow="oneWay"
                                />
                            );
                            layer.instance().setState({ foo: { bar: { add: () => null } } });
                        });

                        it('should update the ArcGIS JS API accordingly', (done) => {
                            setTimeout(() => {
                                layer.setProps({ layerProperties: { foo: 'bar', bar: 'banana' } });
                                expect(layer.props().layerProperties.foo).to.equal('bar');
                                expect(layer.instance().state.instance.foo).to.equal('bar');
                                expect(layer.instance().state.instance.bar).to.not.exist;
                                done();
                            }, 1);
                        });
                    });

                    describe('the user unmounts the layer', () => {
                        beforeEach(() => {
                            const map = {
                                remove: sinon.stub()
                            };
                            layer = mount(
                                <Layer 
                                    scriptUri="foobar"
                                    addLocation={['foo', 'bar']}
                                    eventMap={{ onLayerviewCreate: 'bar' }}
                                    map={map as any}
                                    onLayerviewCreate={sinon.stub()}
                                    dataFlow="oneTime"
                                />
                            );
                            layer.instance().setState({ foo: { bar: { add: () => null } } });
                        });

                        it('should remove the layer from the map', () => {
                            setTimeout(() => {
                                layer.instance().componentWillUnmount();
                                expect(layer.instance().state.map.remove.callCount).to.equal(1);
                            }, 1);
                        });
                    });
                });

                describe('the user included child element(s)', () => {
                    const Child = (props) => (
                        <h3 id="child">{props.layer.foo}</h3>
                    );

                    beforeEach(() => {
                        layer = mount(
                            <Layer
                                scriptUri="foobar"
                                addLocation={['foo', 'bar']}
                                eventMap={{ foo: 'bar' }}
                                dataFlow="oneTime"
                            >
                                <Child />
                            </Layer>
                        );
                        layer.instance().setState({ foo: { bar: { add: () => null } } });
                    });

                    it('should render the child component', (done) => {
                        setTimeout(() => {
                            expect(layer.find('#child')).to.have.length(1);
                            done();
                        }, 1);
                    });

                    it('should pass a reference of itself to the child component', (done) => {
                        setTimeout(() => {
                            expect(layer.find('#child').text()).to.equal('bar');
                            done();
                        }, 1);
                    });
                });

                describe('the user included an onLoad callback', () => {
                    beforeEach(() => {
                        layer = mount(
                            <Layer
                                scriptUri="foobar"
                                addLocation={['foo', 'bar']}
                                eventMap={{ foo: 'bar' }}
                                onLoad={sinon.stub()}
                                dataFlow="oneTime"
                            />
                        );
                        layer.instance().setState({ foo: { bar: { add: () => null } } });
                    });

                    it('should call onLoad', (done) => {
                        setTimeout(() => {
                            expect(layer.props().onLoad.callCount).to.equal(1);
                            done();
                        }, 1);
                    });
                });

                after(() => {
                    global['asyncSuccess'] = false;
                    global['generateLayer'] = false;
                });
            });

            describe('esriPromise fails', () => {
                before(() => {
                    global['asyncSuccess'] = false;
                });

                beforeEach(() => {
                    layer = mount(<Layer scriptUri="foobar" addLocation={['foo', 'bar']} eventMap={{ foo: 'bar' }} dataFlow="oneTime" />);
                });

                it('should not call renderLayer', () => {
                    layer.instance().renderLayer = sinon.stub();
                    setTimeout(() => {
                        expect(layer.instance().renderLayer.callCount).to.equal(0);
                    }, 1);
                });

                describe('the user included an onFail callback', () => {
                    beforeEach(() => {
                        layer = mount(<Layer scriptUri="foobar" addLocation={['foo', 'bar']} eventMap={{ foo: 'bar' }} onFail={sinon.stub()} dataFlow="oneTime" />);
                    });

                    it('should call onFail', (done) => {
                        setTimeout(() => {
                            expect(layer.props().onFail.callCount).to.equal(1);
                            done();
                        }, 1);
                    })
                });

                after(() => {
                    global['asyncSuccess'] = false;
                });
            });

            afterEach(() => {
                Layer.prototype.componentDidMount['restore']();
            });
        });
    })
);
