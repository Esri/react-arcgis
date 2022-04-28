import { expect } from 'chai';
import { render, act, RenderResult } from '@testing-library/react';
import * as sinon from 'sinon';
import { ArcView } from '../../../src/ts/components/ArcBase';
import { MapBase, WebBase } from '../../../src/ts/components/ArcComposites';

function renderMapBase({
    scriptUri = ['foo', 'bar'],
    ...restProps
}: Partial<React.ComponentProps<typeof MapBase>> = {}): RenderResult {
    return render(<MapBase scriptUri={scriptUri} {...restProps} />);
};

function renderWebBase({
    id = "foobar",
    scriptUri = ['foo', 'bar'],
    ...restProps
}: Partial<React.ComponentProps<typeof WebBase>> = {}): RenderResult {
    return render(<WebBase id={id} scriptUri={scriptUri} {...restProps} />);
};

export const MapBaseTests = () => (
    describe('MapBase', () => {

        describe('as a shallow component', () => {
            it('should exist', async () => {
                const { container } = renderMapBase();

                await act(async () => {
                    expect(container.querySelector('#base-container')).to.exist;
                });
            });
        });

        describe('as a mounted component', () => {
            beforeEach(() => {
                sinon.spy(ArcView.prototype, 'componentDidMount');
            });

            it('should call componentDidMount', async () => {
                renderMapBase();

                await act(async () => {
                    expect(ArcView.prototype.componentDidMount['callCount']).to.equal(1);
                });
            });

            describe('esriPromise succeeds', () => {
                describe('loadMap successfully creates the map and view', () => {
                    before(() => {
                        global['asyncSuccess'] = true;
                        global['generateMap'] = true;
                    });

                    it('should display the loaded state of the application', async () => {
                        const mapBase = renderMapBase();

                        // Wait for implicit async state update in componentDidUpdate
                        await act(async () => {});

                        const { container } = mapBase;
                        expect(container.querySelector('#react-arcgis-fail-text')).to.not.exist;
                        expect(container.querySelector('#react-arcgis-loading-text')).to.not.exist;
                    });

                    describe('the user has included custom event handlers', () => {
                        const handler = () => 'foobar';

                        it('should display the loaded state of the application', async () => {
                            const mapBase = renderMapBase({ onMouseWheel: handler });

                            // Wait for implicit async state update in componentDidUpdate
                            await act(async () => {});

                            const { container } = mapBase;
                            expect(container.querySelector('#react-arcgis-fail-text')).to.not.exist;
                            expect(container.querySelector('#react-arcgis-loading-text')).to.not.exist;
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

                    it('should display the failed state of the application', async () => {
                        const mapBase = renderMapBase();

                        // Wait for implicit async state update in componentDidUpdate
                        await act(async () => {});

                        const { container } = mapBase;
                        expect(container.querySelector('#react-arcgis-fail-text')).to.exist;
                        expect(container.querySelector('#react-arcgis-loading-text')).to.not.exist;
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

                    it('should display the failed state for the application', async () => {
                        const mapBase = renderMapBase();

                        // Wait for implicit async state update in componentDidUpdate
                        await act(async () => {});

                        const { container } = mapBase;
                        expect(container.querySelector('#react-arcgis-fail-text')).to.exist;
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

        describe('as a shallow component', () => {
            it('should exist', async () => {
                const { container } = renderWebBase();

                await act(async () => {
                    expect(container.querySelector('#base-container')).to.exist;
                });
            });
        });

        describe('as a mounted component', () => {
            beforeEach(() => {
                sinon.spy(ArcView.prototype, 'componentDidMount');
            });

            it('should call componentDidMount', async () => {
                renderWebBase();

                await act(async () => {
                    expect(ArcView.prototype.componentDidMount['callCount']).to.equal(1);
                });
            });

            describe('loadMap successfully creates the map and view', () => {
                before(() => {
                    global['asyncSuccess'] = true;
                    global['generateWebMap'] = true;
                });

                it('should display the loaded state of the application', async () => {
                    const webBase = renderWebBase();

                    // Wait for implicit async state update in componentDidUpdate
                    await act(async () => {});

                    const { container } = webBase;
                    expect(container.querySelector('#react-arcgis-fail-text')).to.not.exist;
                    expect(container.querySelector('#react-arcgis-loading-text')).to.not.exist;
                });

                describe('the user has included custom event handlers', () => {
                    const handler = () => 'foobar';

                    it('should display the loaded state of the application', async () => {
                        const webBase = renderWebBase({ onMouseWheel: handler });

                        // Wait for implicit async state update in componentDidUpdate
                        await act(async () => {});

                        const { container } = webBase;
                        expect(container.querySelector('#react-arcgis-fail-text')).to.not.exist;
                        expect(container.querySelector('#react-arcgis-loading-text')).to.not.exist;
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

                it('should display the failed state for the application', async () => {
                    const webBase = renderWebBase();

                    // Wait for implicit async state update in componentDidUpdate
                    await act(async () => {});

                    const { container} = webBase;
                    expect(container.querySelector('#react-arcgis-fail-text')).to.exist;
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

                it('should display the failed state for the application', async () => {
                    const webBase = renderWebBase();

                    // Wait for implicit async state update in componentDidUpdate
                    await act(async () => {});

                    const { container} = webBase;
                    expect(container.querySelector('#react-arcgis-fail-text')).to.exist;
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
