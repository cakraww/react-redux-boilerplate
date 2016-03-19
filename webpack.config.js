const path = require('path');
const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;
console.log('BABEL_ENV:', process.env.BABEL_ENV);
console.log('NODE_ENV:', process.env.NODE_ENV);

const FOLDER_PATHS = {
    app: path.join(__dirname, 'src', 'app'),
    build: path.join(__dirname, 'build'),
    client: path.join(__dirname, 'src', 'client')
};

const webpack = require('webpack');

const commons = {
    entry: [
        `${FOLDER_PATHS.client}/scripts/`
    ],
    output: {
        path: `${FOLDER_PATHS.build}/static`,
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

if (TARGET === 'start' || !TARGET) {
    const devParams = Object.assign({}, commons, {
        entry: [
            ...commons.entry,
            'webpack-hot-middleware/client'
        ],
        devtool: '#eval-source-map',
        devServer: {
            contentBase: FOLDER_PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            ...commons.plugins,
            new webpack.NoErrorsPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    });
    console.log('DEV', devParams);
    module.exports = devParams;
}

// Prod config
if (TARGET && TARGET.startsWith('build')) {
    const prodParams = Object.assign({}, commons, {
        devtool: 'source-map',
        plugins: [
            ...commons.plugins,
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            })
        ]
    });
    console.log('PROD', prodParams);
    module.exports = prodParams;
}

