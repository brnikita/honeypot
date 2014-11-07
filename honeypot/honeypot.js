'use strict';

var net = require('net'),
    config = require('./config'),
    server;

server = net.createServer(function (stream) {
    stream.end('Welcome to honeypot!\n');
});

server.listen(config.PORT, function () {
    console.log('Honeypot started');
});