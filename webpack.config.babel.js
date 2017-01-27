const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let isDev = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev');

let devConfig = {
    devtool: 'eval-source-map',

    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8082',
            'webpack/hot/only-dev-server',
            './src/index.js',
        ],
        vendor: [
            'babel-polyfill',
            'react',
            'react-dom',
            'immutable',
            'isomorphic-fetch',
            'react-addons-css-transition-group',
            'redux',
            'react-redux',
            'redux-thunk',
            'react-router',
            'react-tap-event-plugin',
            'rxjs',
            'material-ui'
        ],
    },

    devServer: {
        inline: true,
        port: 8082,
        hot: true,
        historyApiFallback: true
    },
    output: {
        path: path.join(__dirname, '/build/'),
        filename: 'app.js',
        publicPath: '/build',
    },

    // resolve: {
    //     extensions: ['', '.js', '.jsx'],
    //     modules: [
    //         'src',
    //         'node_modules',
    //     ],
    // },

    module: {
        loaders: [{
            test: /\.s[ac]ss$/,
            loaders: [
                'style',
                'css',
                'sass'
            ]
        }, {
            test: /\.jsx*$/,
            exclude: [/node_modules/],
            loader: 'babel',
        }, {
            test: /\.(jpe?g|gif|png|svg)$/i,
            loader: 'url-loader?limit=10000',
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.js',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, 'index.html'),
            template: path.join(__dirname, 'index-tpl.html')
        }),
    ]
};

let prodConfig = {
    devtool: 'hidden-source-map',

    entry: {
        app: [
            './src/index.js',
        ],
        vendor: [
            'babel-polyfill',
            'react',
            'react-dom',
            'immutable',
            'isomorphic-fetch',
            'react-addons-css-transition-group',
            'redux',
            'react-redux',
            'redux-thunk',
            'react-router',
            'react-tap-event-plugin',
            'rxjs',
            'material-ui'
        ]
    },

    output: {
        path: path.join(__dirname, '/build/'),
        filename: '[name].[chunkhash].js',
        publicPath: '/build/',
    },

    // resolve: {
    //     extensions: ['', '.js', '.jsx'],
    //     modules: [
    //         'src',
    //         'node_modules',
    //     ],
    // },

    module: {
        loaders: [{
            test: /\.s[ac]ss$/,
            loaders: [
                'style',
                'css',
                'sass'
            ]
        }, {
            test: /\.jsx*$/,
            exclude: [/node_modules/],
            loader: 'babel',
        }, {
            test: /\.(jpe?g|gif|png|svg)$/i,
            loader: 'url-loader?limit=10000',
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.js',
        }),
        new ExtractTextPlugin('app.[chunkhash].css', { allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, 'index.html'),
            template: path.join(__dirname, 'index-tpl.html')
        }),
    ]
};

module.exports = isDev ? devConfig : prodConfig;
