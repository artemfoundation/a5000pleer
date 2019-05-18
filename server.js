var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = new require('express')();
var port = process.env.PORT || 9000;

if(process.env.NODE_ENV === 'development') {
    (() => {
        var webpack = require('webpack');
        var webpackDevMiddleware = require('webpack-dev-middleware');
        var webpackHotMiddleware = require('webpack-hot-middleware');
        var config = require('./webpack.config');

        var compiler = webpack(config);
        app.use(webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath
        }));
        app.use(webpackHotMiddleware(compiler));
    })()
}

var static_path = path.join(__dirname, '');
app.use(bodyParser.json());

app.use(express.static(static_path))
    .get('*', function(req, res) {
        res.sendFile('index.html', {
            root: static_path
        });
    });

app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
});
