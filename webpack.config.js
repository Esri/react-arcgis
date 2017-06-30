const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: [
            './src/ts/app.tsx'
        ],
        index: [
            './index.ts'
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        library: 'react-arcgis',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    // externals: {
    //     'react': 'commonjs react',
    //     'esri-promise': 'commonjs esri-promise'
    // },

    devtool: 'source-map',

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' },
            {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            { test: /\.(ico|jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg)$/i, use: 'file-loader?name=assets/[name].[ext]'}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: 'src/index.html'
        }),
        new ExtractTextPlugin('bundle.css')
        // new CopyWebpackPlugin([
        //     { from: 'src/config', to: 'config' }
        // ])
    ],

    devServer: {
        contentBase: __dirname + '/dist',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8000
    }
};
