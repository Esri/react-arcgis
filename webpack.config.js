const webpack = require('webpack');

module.exports = {
    entry: {
        index: [
            './index.ts'
        ]
    },
    output: {
        path: __dirname,
        filename: '[name].js',
        library: 'react-arcgis',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        'react': 'commonjs react',
        'esri-promise': 'commonjs esri-promise'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
        ]
    }
};
