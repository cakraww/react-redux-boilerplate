const path = require('path');
const express = require('express');
const app = express();

app.use('/app/?*', express.static(path.join(__dirname, 'src', 'client')));
app.use('/', express.static(path.join(__dirname, '')));

const TARGET = process.env.npm_lifecycle_event;
if (!TARGET || TARGET === 'start') {
    const webpackConfig = require('./webpack.config');
    const webpack = require('webpack');
    const compiler = webpack(webpackConfig);

    const webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

    const webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackHotMiddleware(compiler));
}

app.set('port', (process.env.PORT || 3131));
app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
