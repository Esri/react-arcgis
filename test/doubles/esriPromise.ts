import { Promise } from 'es6-promise';

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
                            map() {
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
                class Geometry {}
            ]);
        }
        return Promise.resolve('success');
    }
    return Promise.reject(new Error('failed'));
};
