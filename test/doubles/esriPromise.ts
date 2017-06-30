import { Promise } from 'es6-promise';
import * as sinon from 'sinon';

class GetterSetter {
    public set(key, value) {
        if (this[key]) {
            this[key] = value;
        }
    }

    public get(key) {
        if (this[key]) {
            return this[key];
        }
        return undefined;
    }
};

export function esriPromise(modules) {
    if (global['asyncSuccess']) {
        if (global['generateMap']) {
            return Promise.resolve([
                class Map {
                },
                class View {
                    on() {
                        return null;
                    };
                    then(callback, errback) {
                        callback();
                    }
                }
            ])
        } else if (global['generateBrokenMap']) {
            return Promise.resolve([
                class Map {
                },
                class View {
                    on() {
                        return null;
                    };
                    then(callback, errback) {
                        errback( new Error('failed'));
                    }
                }
            ])
        } else if (global['generateBadWebMap']) {
            return Promise.resolve([
                class Map {
                    load() {
                        throw new Error('failed');
                    }
                }
            ])
        } else if (global['generateWebMap']) {
            return Promise.resolve([
                class WebMap {
                    basemap: any;
                    allLayers: any;

                    constructor() {
                        this.basemap = {
                            load() {
                                return null;
                            }
                        }
                        this.allLayers = {
                            map(callback) {
                                callback({ load() {} });
                                return {
                                    toArray() {
                                        return null;
                                    }
                                }
                            }
                        }
                    }

                    public load() {
                        return ({
                            then(callback) {
                                callback();
                                return {
                                    then(callback) {
                                        callback();
                                        return {
                                            then(callback) {
                                                callback();
                                                return {
                                                    otherwise(errback) {
                                                        errback();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        })
                    }
                },
                class WebView {
                    on() {
                        return null;
                    }
                },
                () => null
            ])
        } else if (global['generateGeometry']) {
            return Promise.resolve([
                class Geometry extends GetterSetter {
                    foo: string;

                    constructor() {
                        super();
                        this.foo = 'bar';
                    }
                }
            ]);
        } else if (global['generateGraphic']) {
            return Promise.resolve([
                class Graphic extends GetterSetter {
                    foo: string;

                    constructor() {
                        super();
                        this.foo = 'bar';
                    }

                    add() {}
                }
            ]);
        } else if (global['generateLayer']) {
            return Promise.resolve([
                class Layer extends GetterSetter {
                    foo: string;

                    constructor() {
                        super();
                        this.foo = 'bar';
                    }

                    on() {}
                }
            ])
        } else if (global['generateSymbol']) {
            return Promise.resolve([
                class Symbol extends GetterSetter {
                    foo: string;

                    constructor() {
                        super();
                        this.foo = 'bar';
                    }
                }
            ]);
        } else if (global['generateWidget']) {
            return Promise.resolve([
                class Widget extends GetterSetter {
                    foo: string;
                    on: any;

                    constructor() {
                        super();
                        this.foo = 'bar';
                        this.on = sinon.stub();
                    }

                }
            ]);
        }
        return Promise.resolve('success');
    }
    return Promise.reject(new Error('failed'));
};
