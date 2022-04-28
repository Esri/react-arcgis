const webpack = require('webpack');

module.exports = {
    entry: {
        index: [
            './src/ts/index.ts'
        ]
    },
    output: {
        path: __dirname + '/dist/umd',
        filename: '[name].js',
        library: 'react-arcgis',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
        ]
    }
};
