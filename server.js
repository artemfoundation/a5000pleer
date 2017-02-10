var webpack = require('webpack');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var app = new require('express')();
var port = 9000;

var static_path = path.join(__dirname, '');

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
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
