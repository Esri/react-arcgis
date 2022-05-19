import { expect } from 'chai';
import { render, act, RenderResult } from '@testing-library/react';
import * as sinon from 'sinon';
import ChildComponent from '../../doubles/ChildComponent';
import { ArcView } from '../../../src/ts/components/ArcBase';

function renderArcView({
    loadMap = sinon.stub(),
    scriptUri = ['foo', 'bar'],
    ...restProps
}: Partial<React.ComponentProps<typeof ArcView>> = {}): RenderResult & { instance: ArcView | null } {
    const renderResult = {} as RenderResult & { instance: ArcView | null };

    const rendered = render(<ArcView ref={(node) => renderResult.instance = node} loadMap={loadMap} scriptUri={scriptUri} {...restProps} />);

    Object.assign(renderResult, rendered);

    return renderResult;
};

export default () => (
    describe('ArcBase', () => {
        describe('as a shallow component', () => {
            it('should exist', async () => {
                const { container } = renderArcView();

                await act(() => {
                    expect(container.querySelector('#base-container')).to.exist;
                });
            });

            it('should render the default loading component', async () => {
                const { container } = renderArcView();

                await act(() => {
                    expect(container.querySelector('#react-arcgis-loading-text')).to.exist;
                });
            });

            describe('the user has included a custom loading element', () => {
                const loadElement = <h3 id="custom-load-component" />;

                it('should not render the default loading component', async () => {
                    const { container } = renderArcView({ loadElement });

                    await act(() => {
                        expect(container.querySelector('#react-arcgis-loading-text')).to.not.exist;
                    });
                });

                it('should render the custom loading component', async () => {
                    const { container } = renderArcView({ loadElement });

                    await act(() => {
                        expect(container.querySelector('#custom-load-component')).to.exist;
                    });
                });
            });
        });

        describe('as a mounted component', () => {
            beforeEach(() => {
                sinon.spy(ArcView.prototype, 'componentDidMount');
            });

            it('should call componentDidMount', async () => {
                renderArcView();

                await act(async () => {
                    expect(ArcView.prototype.componentDidMount['callCount']).to.equal(1);
                });
            });

            describe('the user has included a custom className', () => {
                it('should give that className to the container div', () => {
                    const { container, unmount } = renderArcView({ className: 'foobar' });

                    expect(container.querySelector('#base-container').classList.contains('foobar')).to.be.true;

                    unmount();
                });
            });

            describe('esriPromise succeeds', () => {
                before(() => {
                    global['asyncSuccess'] = true;
                });

                it('should call loadMap with the result of esriPromise', async () => {
                    let loadMap = sinon.stub();

                    renderArcView({ loadMap });

                    // Wait for implicit async state update in componentDidUpdate
                    await act(async () => {});

                    expect(loadMap.calledWith('success')).to.be.true;
                    expect(loadMap.callCount).to.equal(1);
                });

                describe('the loadMap method succeeds', () => {
                    let loadMap;
                    let childrenAsFunction;

                    beforeEach(() => {
                        loadMap = () => (Promise.resolve({ map: 'foo', view: 'bar' }));
                    });

                    it('should not display the failed state for the application', async () => {
                        const { container } = renderArcView({ loadMap });

                        // Wait for implicit async state update in componentDidUpdate
                        await act(async () => {});

                        expect(container.querySelector('#react-arcgis-fail-text')).to.not.exist
                    });

                    it('should set the state of the map and view based on the result of loadMap', async () => {
                        const { instance } = renderArcView({ loadMap });

                        // Wait for implicit async state update in componentDidUpdate
                        await act(async () => {});

                        expect(instance.state.map).to.equal('foo');
                        expect(instance.state.view).to.equal('bar');
                    });

                    describe('the user has included "childrenAsFunction" prop', () => {
                        beforeEach(() => {
                            childrenAsFunction = (map: __esri.Map, view: __esri.MapView) => (
                                <ChildComponent map={map} view={view} />
                            )
                        });

                        it('should render the children', async () => {
                            const { container } = renderArcView({ loadMap, childrenAsFunction })
                            
                            // Wait for implicit async state update in componentDidUpdate
                            await act(async () => {});

                            expect(container.querySelector('#child')).to.exist;
                        });

                        it('should give map and view props to the children', async () => {
                            const { container } = renderArcView({ loadMap, childrenAsFunction })

                            // Wait for implicit async state update in componentDidUpdate
                            await act(async () => {});

                            expect(container.querySelector('#child').textContent).to.equal('foobar');
                        });
                    });

                    describe('the user has included a child component', () => {
                        it('should render the child component', async () => {
                            const { container } = renderArcView({ loadMap, children: <ChildComponent /> })

                            // Wait for implicit async state update in componentDidUpdate
                            await act(() => {});

                            expect(container.querySelector('#child')).to.exist;
                        });

                        it('should give map and view props to the child component', async () => {
                            const { container } = renderArcView({ loadMap, children: <ChildComponent /> })

                            // Wait for implicit async state update in componentDidUpdate
                            await act(() => {});

                            expect(container.querySelector('#child').textContent).to.equal('foobar');
                        });
                    });

                    describe('the user has included an onLoad callback', () => {
                        it('should call onLoad with a reference to the map and view', async () => {
                            const onLoad = sinon.stub();

                            renderArcView({ loadMap, onLoad })

                            // Wait for implicit async state update in componentDidUpdate
                            await act(async () => {});

                            expect(onLoad.callCount).to.equal(1);
                            expect(onLoad.calledWith('foo', 'bar')).to.be.true;
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

                        describe('this dataFlow is set to oneTime', () => {
                            describe('the user updates the mapProperties with a valid key', () => {
                                it('should make no change to the JS API', async () => {
                                    const { instance } = renderArcView({ loadMap });

                                    // Wait for implicit async state update in componentDidUpdate
                                    await act(async () => {});

                                    expect(instance.state.map.get('foo')).to.not.equal('banana');
                                });
                            });

                            describe('the user updates the mapProperties with an invalid key', () => {
                                it('should make no change to the JS API', async () => {
                                    const { instance } = renderArcView({ loadMap });

                                    // Wait for implicit async state update in componentDidUpdate
                                    await act(async () => {});

                                    expect(instance.state.map.get('foo')).to.equal('bar');
                                    expect(instance.state.map.get('bar')).to.not.exist;
                                });
                            });

                            describe('the user updates the viewProperties with a valid key', () => {
                                it('should update the JS API accordingly', async () => {
                                    const { instance } = renderArcView({
                                        loadMap,
                                        ...{ userDefinedViewProperties: { foo: 'banana' } }
                                    });

                                    // Wait for implicit async state update in componentDidUpdate
                                    await act(async () => {});

                                    const { userDefinedViewProperties } = instance.props as any;
                                    expect(userDefinedViewProperties.foo).to.equal('banana');
                                    expect(instance.state.view.get('foo')).to.not.equal('banana');
                                });
                            });

                            describe('the user updates the mapProperties with an invalid key', () => {
                                it('should make no change to the JS API', async () => {
                                    const { instance } = renderArcView({
                                        loadMap,
                                        ...{ userDefinedViewProperties:{ foo: 'bar', bar: 'foo' } }
                                    });
                                    
                                    // Wait for implicit async state update in componentDidUpdate
                                    await act(async () => {});

                                    const { userDefinedViewProperties } = instance.props as any;
                                    expect(userDefinedViewProperties.bar).to.equal('foo');
                                    expect(instance.state.view.get('foo')).to.equal('bar');
                                    expect(instance.state.view.get('bar')).to.not.exist;
                                });
                            });
                        });
                    });
                });

                describe('the loadMap method fails', () => {
                    let loadMap;

                    beforeEach(() => {
                        loadMap = () => (Promise.reject(new Error('failed')));
                    });

                    it ('should display the failed state for the application', async () => {
                        const { container } = renderArcView({ loadMap });

                        // Wait for implicit async state update in componentDidUpdate
                        await act(async () => {});

                        expect(container.querySelector('#react-arcgis-fail-text')).to.exist;
                    });
                });

                after(() => {
                    global['asyncSuccess'] = false;
                });
            });

            describe('esriPromise fails', () => {
                let loadMap;

                beforeEach(() => {
                    global['asyncSuccess'] = false;
                    loadMap = sinon.stub();
                });

                it('should not call loadMap', async () => {
                    renderArcView({ loadMap });

                    // Wait for implicit async state update in componentDidUpdate
                    await act(async () => {});

                    expect(loadMap.callCount).to.equal(0);
                });

                it('should display the default failed state for the application', async () => {
                    const { container } = renderArcView({ loadMap });

                    // Wait for implicit async state update in componentDidUpdate
                    await act(async () => {});

                    expect(container.querySelector('#react-arcgis-fail-text')).to.exist;
                });

                describe('the user has included a custom fail component', () => {
                    const failElement = <h3 id="custom-fail-component" />;

                    it('should not display the default failed state for the application', async () => {
                        const { container } = renderArcView({ loadMap, failElement });

                        // Wait for implicit async state update in componentDidUpdate
                        await act(async () => {});

                        expect(container.querySelector('#react-arcgis-fail-text')).to.not.exist;
                    });

                    it('should display the custom fail component', async () => {
                        const { container } = renderArcView({ loadMap, failElement });

                        // Wait for implicit async state update in componentDidUpdate
                        await act(async () => {});

                        expect(container.querySelector('#custom-fail-component')).to.exist;
                    });
                });

                describe('the user has included a custom fail callback', () => {
                    let onFail = sinon.stub();

                    it('should call the failure callback', async () => {
                        renderArcView({ onFail });

                        // Wait for implicit async state update in componentDidUpdate
                        await act(async () => {});

                        expect(onFail.callCount).to.equal(1);
                    });
                })
            });

            afterEach(() => {
                ArcView.prototype.componentDidMount['restore']();
            });
        });
    })
);
