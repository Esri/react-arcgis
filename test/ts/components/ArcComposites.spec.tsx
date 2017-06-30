import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import { ArcView } from '../../../src/ts/components/ArcBase';
import { MapBase, WebBase } from '../../../src/ts/components/ArcComposites';

export const MapBaseTests = () => (
    describe('MapBase', () => {
        let mapBase;
        describe('as a shallow component', () => {
            beforeEach(() => {
                mapBase = shallow(<MapBase scriptUri={['foo', 'bar']} dataFlow="oneTime" userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
            });

            it('should exist', () => {
                expect(mapBase).to.exist;
            });
        });

        describe('as a mounted component', () => {
            beforeEach(() => {
                sinon.spy(ArcView.prototype, 'componentDidMount');
                mapBase = mount(<MapBase scriptUri={['foo', 'bar']} dataFlow="oneTime" userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
            });

            it('should call componentDidMount', () => {
                expect(ArcView.prototype.componentDidMount['callCount']).to.equal(1);
            });

            describe('esriPromise succeeds', () => {
                describe('loadMap successfully creates the map and view', () => {
                    before(() => {
                        global['asyncSuccess'] = true;
                        global['generateMap'] = true;
                    });

                    beforeEach(() => {
                        mapBase = mount(<MapBase scriptUri={['foo', 'bar']} dataFlow="oneTime" userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                    });

                    it('should display the loaded state of the application', (done) => {
                        setTimeout(() => {
                            expect(mapBase.find('#react-arcgis-fail-text')).to.have.length(0);
                            expect(mapBase.find('#react-arcgis-loading-text')).to.have.length(0);
                            done();
                        }, 1);
                    });

                    describe('the user has included custom event handlers', () => {
                        const handler = () => 'foobar';
                        beforeEach(() => {
                            mapBase = mount(<MapBase scriptUri={['foo', 'bar']} dataFlow="oneTime" userDefinedMapProperties={{}} userDefinedViewProperties={{}} onMouseWheel={handler} />);
                        });

                        it('should display the loaded state of the application', (done) => {
                            setTimeout(() => {
                                expect(mapBase.find('#react-arcgis-fail-text')).to.have.length(0);
                                expect(mapBase.find('#react-arcgis-loading-text')).to.have.length(0);
                                done();
                            }, 1);
                        });

                        it('should pass the event handler to the ArcGIS JS API', (done) => {
                            setTimeout(() => {
                                done();
                            }, 1);
                        });
                    });

                    after(() => {
                        global['asyncSuccess'] = false;
                        global['generateMap'] = false;
                    });
                });

                describe('loadMap returns a map which fails to load', () => {
                    before(() => {
                        global['asyncSuccess'] = true;
                        global['generateMap'] = false;
                        global['generateBrokenMap'] = true;
                    });

                    beforeEach(() => {
                        mapBase = mount(<MapBase scriptUri={['foo', 'bar']} dataFlow="oneTime" userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                    });

                    it('should display the failed state of the application', (done) => {
                        setTimeout(() => {
                            expect(mapBase.find('#react-arcgis-fail-text')).to.have.length(1);
                            expect(mapBase.find('#react-arcgis-loading-text')).to.have.length(0);
                            done();
                        }, 1);
                    });

                    after(() => {
                        global['asyncSuccess'] = false;
                        global['generateMap'] = false;
                        global['generateBrokenMap'] = false;
                    });
                });

                describe('loadMap fails before the view is instantiated', () => {
                    before(() => {
                        global['asyncSuccess'] = true;
                        global['generateMap'] = false;
                    });

                    beforeEach(() => {
                        mapBase = mount(<MapBase scriptUri={['foo', 'bar']} dataFlow="oneTime" userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                    });

                    it('should display the failed state for the application', (done) => {
                        setTimeout(() => {
                            expect(mapBase.find('#react-arcgis-fail-text')).to.have.length(1);
                            done();
                        }, 1);
                    });

                    after(() => {
                        global['asyncSuccess'] = false;
                        global['generateMap'] = false;
                    });
                });
            });

            afterEach(() => {
                ArcView.prototype.componentDidMount['restore']();
            });
        });
    })
);

export const WebBaseTests = () => (
    describe('WebBase', () => {
        let webBase;
        describe('as a shallow component', () => {
            beforeEach(() => {
                webBase = shallow(<WebBase id="foobar" scriptUri={['foo', 'bar']} dataFlow="oneTime" userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
            });

            it('should exist', () => {
                expect(webBase).to.exist;
            });
        });

        describe('as a mounted component', () => {
            beforeEach(() => {
                sinon.spy(ArcView.prototype, 'componentDidMount');
                webBase = mount(<WebBase id="foobar" scriptUri={['foo', 'bar']} dataFlow="oneTime" userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
            });

            it('should call componentDidMount', () => {
                expect(ArcView.prototype.componentDidMount['callCount']).to.equal(1);
            });

            describe('loadMap successfully creates the map and view', () => {
                before(() => {
                    global['asyncSuccess'] = true;
                    global['generateWebMap'] = true;
                });

                beforeEach(() => {
                    webBase = mount(<WebBase id="foobar" scriptUri={['foo', 'bar']} dataFlow="oneTime" userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                });

                it('should display the loaded state of the application', (done) => {
                    setTimeout(() => {
                        expect(webBase.find('#react-arcgis-fail-text')).to.have.length(0);
                        expect(webBase.find('#react-arcgis-loading-text')).to.have.length(0);
                        done();
                    }, 1);
                });

                describe('the user has included custom event handlers', () => {
                    const handler = () => 'foobar';
                    beforeEach(() => {
                        webBase = mount(<WebBase id="foobar" scriptUri={['foo', 'bar']} onMouseWheel={handler} dataFlow="oneTime" userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                    });

                    it('should display the loaded state of the application', (done) => {
                        setTimeout(() => {
                            expect(webBase.find('#react-arcgis-fail-text')).to.have.length(0);
                            expect(webBase.find('#react-arcgis-loading-text')).to.have.length(0);
                            done();
                        }, 1);
                    });

                    it('should pass the event handler to the ArcGIS JS API', (done) => {
                        setTimeout(() => {
                            done();
                        }, 1);
                    });
                });

                after(() => {
                    global['asyncSuccess'] = false;
                    global['generateWebMap'] = false;
                });
            });

            describe('loadMap returns a map which fails to load', () => {
                before(() => {
                    global['asyncSuccess'] = true;
                    global['generateBadWebMap'] = true;
                });

                beforeEach(() => {
                    webBase = mount(<WebBase id="foobar" scriptUri={['foo', 'bar']} dataFlow="oneTime" userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                });

                it('should display the failed state for the application', (done) => {
                    setTimeout(() => {
                        expect(webBase.find('#react-arcgis-fail-text')).to.have.length(1);
                        done();
                    }, 1);
                });

                after(() => {
                    global['asyncSuccess'] = false;
                    global['generateBadWebMap'] = false;
                });
            });

            describe('loadMap fails before the view is instantiated', () => {
                before(() => {
                    global['asyncSuccess'] = true;
                    global['generateMap'] = false;
                });

                beforeEach(() => {
                    webBase = mount(<WebBase id="foobar" scriptUri={['foo', 'bar']} dataFlow="oneTime" userDefinedMapProperties={{}} userDefinedViewProperties={{}} />);
                });

                it('should display the failed state for the application', (done) => {
                    setTimeout(() => {
                        expect(webBase.find('#react-arcgis-fail-text')).to.have.length(1);
                        done();
                    }, 1);
                });

                after(() => {
                    global['asyncSuccess'] = false;
                    global['generateMap'] = false;
                });
            });

            afterEach(() => {
                ArcView.prototype.componentDidMount['restore']();
            });
        });
    })
);
