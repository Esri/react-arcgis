import { Promise } from 'es6-promise';

export function esriPromise(modules) {
    if (global['asyncSuccess']) {
        return Promise.resolve('success');
    }
    return Promise.reject(new Error('failed'));
};
