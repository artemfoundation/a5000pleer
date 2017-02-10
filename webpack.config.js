var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Clean = require('clean-webpack-plugin');

var autoprefixer = require('autoprefixer');
var postcssNested = require('postcss-nested');
var postcssImport = require('postcss-import');
var postcssNext = require( 'postcss-cssnext' );
var pkg = require('./package.json');

var TARGET = process.env.npm_lifecycle_event;

var ROOT_PATH = path.resolve(__dirname);

var common = {
    entry: [
        'react-hot-loader',
        'webpack-hot-middleware/client?path=http://localhost:9000/__webpack_hmr',
        'webpack/hot/only-dev-server',
        path.resolve(ROOT_PATH, 'app')
    ],
    output: {
        path: path.resolve(ROOT_PATH, ''),
        filename: 'app.js',
        publicPath: '/www'
    }
};

var postcss = [
    postcssImport(),
    postcssNext(),
    postcssNested()
];

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devServer: {
            hot: true,
            inline: true,
            progress: true,
            historyApiFallback: true
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                loaders: ['react-hot-loader', 'babel-loader', '6to5-loader'],
                include: [
                    path.resolve(ROOT_PATH, 'app')
                ]
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader']
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file'
            }]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                cssnext: {
                    browsers: "last 2 versions",
                },
                postcss: postcss
            }),
            new webpack.ProvidePlugin( {
                _: 'lodash'
            } ),
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        entry: {
            app: path.resolve(ROOT_PATH, 'app')
        },
        /* important! */
        output: {
            path: path.resolve(ROOT_PATH, 'www'),
            filename: '[name].js'
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                loaders: ['react-hot-loader', 'babel-loader', '6to5-loader'],
                include: [
                    path.resolve(ROOT_PATH, 'app')
                ]
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader!postcss-loader')
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file'
            }]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                cssnext: {
                    browsers: "last 2 versions",
                },
                postcss: postcss
            }),
            new webpack.ProvidePlugin( {
                _: 'lodash'
            } ),
            new Clean(['www']),
            new ExtractTextPlugin('[name].css'),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}
