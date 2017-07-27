import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { Promise } from 'es6-promise';
import * as React from 'react';
import * as sinon from 'sinon';
import { ArcView } from '../../../src/ts/components/ArcBase';

export default () => (
    describe('ArcBase', () => {
        describe('as a shallow component', () => {
            let arcView;
            beforeEach(() => {
                arcView = shallow(<ArcView dataFlow="oneTime" loadMap={sinon.stub()} scriptUri={['foo', 'bar']} userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
            });

            it('should exist', () => {
                expect(arcView).to.exist;
            });

            it('should render the default loading component', () => {
                expect(arcView.find('#react-arcgis-loading-text')).to.have.length(1);
            });

            describe('the user has included a custom loading component', () => {
                const customComponent = <h3 id="custom-load-component" />;
                beforeEach(() => {
                    arcView = mount(<ArcView dataFlow="oneTime" loadComponent={customComponent} loadMap={sinon.stub()} scriptUri={['foo', 'bar']} userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                });

                it('should not render the default loading component', () => {
                    expect(arcView.find('#react-arcgis-loading-text')).to.have.length(0);
                });

                it('should render the custom loading component', () => {
                    expect(arcView.find('#custom-load-component')).to.have.length(1);
                });
            });
        });

        describe('as a mounted component', () => {
            let arcView
            beforeEach(() => {
                sinon.spy(ArcView.prototype, 'componentDidMount');
                arcView = mount(<ArcView dataFlow="oneTime" loadMap={sinon.stub()} scriptUri={['foo', 'bar']} userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
            });

            it('should call componentDidMount', () => {
                expect(ArcView.prototype.componentDidMount['callCount']).to.equal(1);
            });

            describe('the user has included a custom className', () => {
                beforeEach(() => {
                    arcView = mount(<ArcView dataFlow="oneTime" loadMap={sinon.stub()} scriptUri={['foo', 'bar']} className="foobar" userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                });

                it('should give that className to the container div', () => {
                    expect(arcView.find('#base-container').hasClass('foobar')).to.be.true;
                });
            });

            describe('esriPromise succeeds', () => {
                before(() => {
                    global['asyncSuccess'] = true;
                });

                beforeEach(() => {
                    arcView = mount(<ArcView dataFlow="oneTime" loadMap={sinon.stub()} scriptUri={['foo', 'bar']} userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                });

                it('should call loadMap with the result of esriPromise', (done) => {
                    setTimeout(() => {
                        expect(arcView.props().loadMap.callCount).to.equal(1);
                        expect(arcView.props().loadMap.calledWith('success')).to.be.true;
                        done();
                    }, 1);
                });

                describe('the loadMap method succeeds', () => {
                    let loadMap;
                    beforeEach(() => {
                        loadMap = () => (Promise.resolve({ map: 'foo', view: 'bar' }));
                        arcView = mount(<ArcView dataFlow="oneTime" loadMap={loadMap} scriptUri={['foo', 'bar']} userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                    });

                    it('should not display the failed state for the application', (done) => {
                        setTimeout(() => {
                            expect(arcView.find('#react-arcgis-fail-text')).to.have.length(0);
                            done();
                        }, 1);
                    });

                    it('should set the state of the map and view based on the result of loadMap', (done) => {
                        setTimeout(() => {
                            expect(arcView.instance().state.map).to.equal('foo');
                            expect(arcView.instance().state.view).to.equal('bar');
                            done();
                        }, 1);
                    });

                    describe('the user has included a child component', () => {
                        const ChildComponent = (props) => <h3 id="child">{props.map}{props.view}</h3>;
                        beforeEach(() => {
                            arcView = mount(<ArcView dataFlow="oneTime" loadMap={loadMap} scriptUri={['foo', 'bar']} userDefinedMapProperties={{}} userDefinedViewProperties={{}} ><ChildComponent /></ArcView>);
                        });

                        it('should render the child component', (done) => {
                            setTimeout(() => {
                                expect(arcView.find('#child')).to.have.length(1);
                                done();
                            }, 1);
                        });

                        it('should give map and view props to the child component', (done) => {
                            setTimeout(() => {
                                expect(arcView.find('#child').text()).to.equal('foobar');
                                done();
                            }, 1);
                        });
                    });

                    describe('the user has included an onLoad callback', () => {
                        const onLoad = sinon.stub();
                        beforeEach(() => {
                            arcView = mount(<ArcView dataFlow="oneTime" loadMap={loadMap} scriptUri={['foo', 'bar']} onLoad={onLoad} userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                        });

                        it('should call onLoad with a reference to the map and view', (done) => {
                            setTimeout(() => {
                                const callback = arcView.instance().props.onLoad;
                                expect(callback.callCount).to.equal(1);
                                expect(callback.calledWith('foo', 'bar')).to.be.true;
                                done();
                            }, 1);
                        });
                    });

                    describe('the user updates the mapProperties or viewProperties', () => {
                        const getterSetter = {
                            set(key, value) {
                                if (this[key]) {
                                    this[key] = value;
                                }
                            },
                            get(key) {
                                if (this[key]) {
                                    return this[key];
                                }
                                return undefined;
                            }
                        };
                        beforeEach(() => {
                            loadMap = () => ({
                                then(callback, errback) {
                                    callback({
                                        map: {
                                            ...getterSetter,
                                            foo: 'bar'
                                        },
                                        view: {
                                            ...getterSetter,
                                            foo: 'bar',
                                            set(changeObj) {
                                                Object.keys(changeObj).forEach((key) => {
                                                    if (this[key]) {
                                                        this[key] = changeObj[key];
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        });
                        describe('the dataFlow is set to oneWay', () => {
                            beforeEach(() => {
                                arcView = mount(
                                    <ArcView
                                        dataFlow="oneWay" 
                                        loadMap={loadMap} scriptUri={['foo', 'bar']}
                                        userDefinedMapProperties={{
                                            foo: 'bar'
                                        } as __esri.MapProperties}
                                        userDefinedViewProperties={{
                                            foo: 'bar'
                                        } as __esri.ViewProperties}
                                    />
                                );
                            });

                            describe('the user updates the mapProperties with a valid key', () => {
                                it('should update the JS API accordingly', (done) => {
                                    setTimeout(() => {
                                        arcView.setProps({ userDefinedMapProperties: { foo: 'banana' } });
                                        expect(arcView.props().userDefinedMapProperties.foo).to.equal('banana');
                                        expect(arcView.instance().state.map.foo).to.equal('banana');
                                        done();
                                    }, 1);
                                });
                            });

                            describe('the user updates the mapProperties with an invalid key', () => {
                                it('should make no change to the JS API', (done) => {
                                    setTimeout(() => {
                                        arcView.setProps({ userDefinedMapProperties: { foo: 'bar', bar: 'foo' } });
                                        expect(arcView.props().userDefinedMapProperties.bar).to.equal('foo');
                                        expect(arcView.instance().state.map.foo).to.equal('bar');
                                        expect(arcView.instance().state.map.bar).to.not.exist;
                                        done();
                                    }, 1);
                                });
                            });

                            describe('the user updates the viewProperties with a valid key', () => {
                                it('should update the JS API accordingly', (done) => {
                                    setTimeout(() => {
                                        arcView.setProps({ userDefinedViewProperties: { foo: 'banana' } });
                                        expect(arcView.props().userDefinedViewProperties.foo).to.equal('banana');
                                        expect(arcView.instance().state.view.foo).to.equal('banana');
                                        done();
                                    }, 1);
                                });
                            });

                            describe('the user updates the mapProperties with an invalid key', () => {
                                it('should make no change to the JS API', (done) => {
                                    setTimeout(() => {
                                        arcView.setProps({ userDefinedViewProperties: { foo: 'bar', bar: 'foo' } });
                                        expect(arcView.props().userDefinedViewProperties.bar).to.equal('foo');
                                        expect(arcView.instance().state.view.foo).to.equal('bar');
                                        expect(arcView.instance().state.view.bar).to.not.exist;
                                        done();
                                    }, 1);
                                });
                            });
                        });

                        describe('this dataFlow is set to oneTime', () => {
                            beforeEach(() => {
                                arcView = mount(
                                    <ArcView
                                        dataFlow="oneTime"
                                        loadMap={loadMap} scriptUri={['foo', 'bar']}
                                        userDefinedMapProperties={{
                                            foo: 'bar'
                                        } as __esri.MapProperties}
                                        userDefinedViewProperties={{
                                            foo: 'bar'
                                        } as __esri.ViewProperties}
                                    />
                                );
                            });

                            describe('the user updates the mapProperties with a valid key', () => {
                                it('should make no change to the JS API', (done) => {
                                    setTimeout(() => {
                                        arcView.setProps({ userDefinedMapProperties: { foo: 'banana' } });
                                        expect(arcView.props().userDefinedMapProperties.foo).to.equal('banana');
                                        expect(arcView.instance().state.map.foo).to.not.equal('banana');
                                        done();
                                    }, 1);
                                });
                            });

                            describe('the user updates the mapProperties with an invalid key', () => {
                                it('should make no change to the JS API', (done) => {
                                    setTimeout(() => {
                                        arcView.setProps({ userDefinedMapProperties: { foo: 'bar', bar: 'foo' } });
                                        expect(arcView.props().userDefinedMapProperties.bar).to.equal('foo');
                                        expect(arcView.instance().state.map.foo).to.equal('bar');
                                        expect(arcView.instance().state.map.bar).to.not.exist;
                                        done();
                                    }, 1);
                                });
                            });

                            describe('the user updates the viewProperties with a valid key', () => {
                                it('should update the JS API accordingly', (done) => {
                                    setTimeout(() => {
                                        arcView.setProps({ userDefinedViewProperties: { foo: 'banana' } });
                                        expect(arcView.props().userDefinedViewProperties.foo).to.equal('banana');
                                        expect(arcView.instance().state.view.foo).to.not.equal('banana');
                                        done();
                                    }, 1);
                                });
                            });

                            describe('the user updates the mapProperties with an invalid key', () => {
                                it('should make no change to the JS API', (done) => {
                                    setTimeout(() => {
                                        arcView.setProps({ userDefinedViewProperties: { foo: 'bar', bar: 'foo' } });
                                        expect(arcView.props().userDefinedViewProperties.bar).to.equal('foo');
                                        expect(arcView.instance().state.view.foo).to.equal('bar');
                                        expect(arcView.instance().state.view.bar).to.not.exist;
                                        done();
                                    }, 1);
                                });
                            });
                        });
                    });
                });

                describe('the loadMap method fails', () => {
                    let loadMap;
                    beforeEach(() => {
                        loadMap = () => (Promise.reject(new Error('failed')));
                        arcView = mount(<ArcView dataFlow="oneTime" loadMap={loadMap} scriptUri={['foo', 'bar']} userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                    });

                    it ('should display the failed state for the application', (done) => {
                        setTimeout(() => {
                            expect(arcView.find('#react-arcgis-fail-text')).to.have.length(1);
                            done();
                        }, 1);
                    });
                });

                after(() => {
                    global['asyncSuccess'] = false;
                });
            });

            describe('esriPromise fails', () => {
                beforeEach(() => {
                    global['asyncSuccess'] = false;
                    arcView = mount(<ArcView dataFlow="oneTime" loadMap={sinon.stub()} scriptUri={['foo', 'bar']} userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                });

                it('should not call loadMap', (done) => {
                    setTimeout(() => {
                        expect(arcView.props().loadMap.callCount).to.equal(0);
                        done();
                    }, 1);
                });

                it('should display the default failed state for the application', (done) => {
                    setTimeout(() => {
                        expect(arcView.find('#react-arcgis-fail-text')).to.have.length(1);
                        done();
                    }, 1);
                });

                describe('the user has included a custom fail component', () => {
                    const failComponent = () => (<h3 id="custom-fail-component" />);
                    beforeEach(() => {
                        arcView = mount(<ArcView dataFlow="oneTime" failComponent={failComponent} loadMap={sinon.stub()} scriptUri={['foo', 'bar']} userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                    });

                    it('should not display the default failed state for the application', (done) => {
                        setTimeout(() => {
                            expect(arcView.find('#react-arcgis-fail-text')).to.have.length(0);
                            done();
                        }, 1);
                    });

                    it('should display the custom fail component', (done) => {
                        setTimeout(() => {
                            expect(arcView.find('#custom-fail-component')).to.have.length(1);
                            done();
                        }, 1);
                    });
                });

                describe('the user has included a custom fail callback', () => {
                    beforeEach(() => {
                        arcView = mount(<ArcView dataFlow="oneTime" onFail={sinon.stub()} loadMap={sinon.stub()} scriptUri={['foo', 'bar']} userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                    });

                    it('should call the failure callback', (done) => {
                        setTimeout(() => {
                            expect(arcView.props().onFail.callCount).to.equal(1);
                            done();
                        }, 1);
                    });
                })
            });

            afterEach(() => {
                ArcView.prototype.componentDidMount['restore']();
            });
        });
    })
);
