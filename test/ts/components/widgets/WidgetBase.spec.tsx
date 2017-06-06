import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Widget from '../../../../src/ts/components/widgets/WidgetBase';

export default () => (
    describe('WidgetBase', () => {
        let widget;

        describe('as a shallow component', () => {
            beforeEach(() => {
                widget = shallow(<Widget scriptUri="foobar" />);
            });

            it('should exist', () => {
                expect(widget).to.exist;
            });
        });

        describe('as a mounted component', () => {
            beforeEach(() => {
                sinon.spy(Widget.prototype, 'componentDidMount');
                widget = mount(<Widget scriptUri="foobar" />);
            });

            it('should call componentDidMount', () => {
                expect(Widget.prototype.componentDidMount['callCount']).to.equal(1);
            });

            describe('esriPromise succeeds', () => {
                before(() => {
                    global['asyncSuccess'] = true;
                    global['generateWidget'] = true;
                });

                beforeEach(() => {
                    widget = mount(<Widget scriptUri="foobar" view={{ ui: { add: sinon.stub() } } as any} eventMap={{ foo: 'bar' }} />);
                    sinon.spy(widget.instance().renderWidget);
                });

                it('should call renderWidget', () => {
                    setTimeout(() => {
                        expect(widget.instance().renderWidget.callCount).to.equal(1);
                    }, 1);
                });

                it('should add itself to the view', () => {
                    setTimeout(() => {
                        expect(widget.instance().state.view.ui.add.callCount).to.equal(1);
                    }, 1);
                });

                describe('the user includes a position for the widget', () => {
                    beforeEach(() => {
                        widget = mount(
                            <Widget
                                scriptUri="foobar"
                                view={{ ui: { add: sinon.stub() } } as any}
                                eventMap={{ foo: 'bar' }}
                                onLoad={sinon.stub()}
                                position="top-right"
                            />
                        );
                    });

                    it('should add to the view with the desired position', () => {
                        setTimeout((done) => {
                            expect(widget.props().view.ui.add.callCount).to.equal(1);
                            done();
                        }, 1);
                    });
                });

                describe('the user provides a callback for a widget event', () => {
                    beforeEach(() => {
                        widget = mount(<Widget scriptUri="foobar" view={{ ui: { add: sinon.stub() } } as any} eventMap={{ foo: 'bar' }} foo={() => null} />);
                    });

                    it('should call the instance on() function with the event name', () => {
                        setTimeout(() => {
                            expect(widget.instance().on.callCount).to.equal(1);
                        }, 1);
                    });
                });

                describe('the user updates the widgetProperties', () => {
                    beforeEach(() => {
                        widget = mount(
                            <Widget
                                scriptUri="foobar"
                                view={{ ui: { add: sinon.stub() } } as any}
                                eventMap={{ foo: 'bar' }}
                                widgetProperties={{ foo: 'bar' }}
                            />
                        );
                    });

                    describe('with a valid key', () => {
                        it('should update the API accordingly', (done) => {
                            setTimeout(() => {
                                widget.setProps({ widgetProperties: { foo: 'banana' } });
                                expect(widget.instance().state.instance.foo).to.equal('banana');
                                expect(widget.props().widgetProperties.foo).to.equal('banana');
                                done();
                            }, 1);
                        });
                    });

                    describe('with an invalid key', () => {
                        it('should make no change to the API', (done) => {
                            setTimeout(() => {
                                widget.setProps({ widgetProperties: { foo: 'bar', bar: 'banana' } });
                                expect(widget.instance().state.instance.foo).to.equal('bar');
                                expect(widget.instance().state.instance.bar).to.not.exist;
                                done();
                            }, 1);
                        });
                    });
                });

                describe('the user included an onLoad callback', () => {
                    beforeEach(() => {
                        widget = mount(
                            <Widget
                                scriptUri="foobar"
                                view={{ ui: { add: sinon.stub() } } as any}
                                eventMap={{ foo: 'bar' }}
                                onLoad={sinon.stub()}
                            />
                        );
                    });

                    it('should call onLoad with the widget instance', (done) => {
                        setTimeout(() => {
                            expect(widget.props().onLoad.callCount).to.equal(1);
                            done();
                        }, 1);
                    });
                });

                describe('the user unmounts the component', () => {
                    beforeEach(() => {
                        widget = mount(
                            <Widget
                                scriptUri="foobar"
                                view={{ ui: { add: sinon.stub(), remove: sinon.stub() } } as any}
                                eventMap={{ foo: 'bar' }}
                            />
                        );
                    });

                    it('should remove itself from the view', () => {
                        setTimeout(() => {
                            widget.instance().componentWillUnmount();
                            expect(widget.props().remove.callCount).to.equal(1);
                        }, 1);
                    });
                });

                after(() => {
                    global['asyncSuccess'] = false;
                    global['generateWidget'] = false;
                });
            });

            describe('esriPromise fails', () => {
                before(() => {
                    global['asyncSuccess'] = false;
                });

                it('should not call renderWidget', () => {
                    setTimeout(() => {
                        expect(widget.instance().renderWidget.callCount).to.equal(1);
                    }, 1);
                });

                describe('the user included an onFail callback', () => {
                    beforeEach(() => {
                        widget = mount(
                            <Widget
                                scriptUri="foobar"
                                view={{ ui: { add: sinon.stub() } } as any}
                                eventMap={{ foo: 'bar' }}
                                onFail={sinon.stub()}
                            />
                        );
                    });

                    it('should call onFail', (done) => {
                        setTimeout(() => {
                            expect(widget.props().onFail.callCount).to.equal(1);
                            done();
                        }, 1);
                    });
                });

                after(() => {
                    global['asyncSuccess'] = false;
                });
            });

            afterEach(() => {
                if(Widget.prototype.componentDidMount['restore']) {
                    Widget.prototype.componentDidMount['restore']();
                }
            });
        });
    })
);
