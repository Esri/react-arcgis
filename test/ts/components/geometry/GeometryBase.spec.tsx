import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Geometry from '../../../../src/ts/components/geometry/GeometryBase';

export default () => (
    describe('GeometryBase', () => {
        describe('as a shallow component', () => {
            let geometry;
            beforeEach(() => {
                geometry = shallow(<Geometry scriptUri="foobar" dataFlow="oneTime" />);
            });

            it('should exist', () => {
                expect(geometry).to.exist;
            });
        });

        describe('as a mounted component', () => {
            let geometry;
            beforeEach(() => {
                sinon.spy(Geometry.prototype, 'componentDidMount');
                geometry = mount(<Geometry scriptUri="foobar" dataFlow="oneTime" />);
            });

            it('should call componentDidMount', () => {
                expect(Geometry.prototype.componentDidMount['callCount']).to.equal(1);
            });

            describe('esriPromise succeeds', () => {
                before(() => {
                    global['asyncSuccess'] = true;
                });

                beforeEach(() => {
                    geometry = mount(<Geometry scriptUri="foobar" dataFlow="oneTime" />);
                });

                it('should call createGeometry', (done) => {
                    geometry.instance().createGeometry = sinon.stub();
                    setTimeout(() => {
                        expect(geometry.instance().createGeometry.callCount).to.equal(1);
                        done();
                    }, 1);
                });

                describe('the user set the dataFlow to oneWay', () => {
                    before(() => {
                        global['generateGeometry'] = true;
                    });

                    beforeEach(() => {
                        geometry = mount(<Geometry scriptUri="foobar" registerGeometry={() => null} dataFlow="oneWay" geometryProperties={{ foo: 'bar' }} />);
                    });

                    it('should update changed properties', (done) => {
                        setTimeout(() => {
                            geometry.setProps({ geometryProperties: { foo: 'banana' } });
                            expect(geometry.props().geometryProperties.foo).to.equal('banana');
                            expect(geometry.instance().state.instance.foo).to.equal('banana');
                            done();
                        }, 1);
                    });

                    after(() => {
                        global['generateGeometry'] = false;
                    });
                });

                describe('the user set the dataFlow to oneTime', () => {
                    before(() => {
                        global['generateGeometry'] = true;
                    });

                    beforeEach(() => {
                        geometry = mount(<Geometry scriptUri="foobar" registerGeometry={() => null} dataFlow="oneTime" geometryProperties={{ foo: 'bar' }} />);
                    });

                    it('should not update changed properties', (done) => {
                        setTimeout(() => {
                            geometry.setProps({ geometryProperties: { foo: 'banana' } });
                            expect(geometry.props().geometryProperties.foo).to.equal('banana');
                            expect(geometry.instance().state.instance.foo).to.equal('bar');
                            done();
                        }, 1);
                    });

                    after(() => {
                        global['generateGeometry'] = false;
                    });
                });

                describe('the user included an onLoad callback' ,() => {
                    let onLoad;

                    before(() => {
                        global['generateGeometry'] = true;
                    })

                    beforeEach(() => {
                        onLoad = sinon.stub();
                        geometry = mount(<Geometry onLoad={onLoad} scriptUri="foobar" registerGeometry={() => null} dataFlow="oneTime" />);
                    })

                    it('should call onLoad', (done) => {
                        setTimeout(() => {
                            expect(onLoad.callCount).to.equal(1);
                            done();
                        }, 1);
                    });

                    after(() => {
                        global['generateGeometry'] = false;
                    })
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
                    geometry = mount(<Geometry scriptUri="foobar" dataFlow="oneTime" />);
                });

                it('should not call createGeometry', (done) => {
                    geometry.instance().createGeometry = sinon.stub();
                    setTimeout(() => {
                        expect(geometry.instance().createGeometry.callCount).to.equal(0);
                        done();
                    }, 1);
                });

                describe('the user included an onFail callback', () => {
                    let onFail;

                    beforeEach(() => {
                        onFail = sinon.stub();
                        geometry = mount(<Geometry scriptUri="foobar" onFail={onFail} dataFlow="oneTime" />);
                    });

                    it('should call onFail', (done) => {
                        setTimeout(() => {
                            expect(onFail.callCount).to.equal(1);
                            done();
                        }, 1);
                    });
                });

                after(() => {
                    global['asyncSuccess'] = false;
                });
            });

            afterEach(() => {
                Geometry.prototype.componentDidMount['restore']();
            });
        });
    })
);
