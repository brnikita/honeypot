'use strict';

var tls = require('tls'),
    fs = require('fs'),
    net = require('net'),
    config = require('./config'),
    dbConnection = require('./dbConnection'),
    ConnectionsModel = require('./connectionsModel'),
    honeypotStream,
    options,
    server;

/**
 * Function reroutes request to honeypot
 *
 * @function
 * @name reRouteRequest
 * @param {string | Buffer} chunk
 * @param {tls.CleartextStream} clearTextStream
 * @returns {undefined}
 */
function reRouteRequest(chunk, clearTextStream) {
    var connection = new ConnectionsModel({
        port: clearTextStream.remotePort,
        host: clearTextStream.remoteAddress,
        requestBody: chunk
    });

    connection.save();
    honeypotStream.pipe(clearTextStream);
}

/**
 * Function handles incoming packets
 *
 * @function
 * @name packetsHandler
 * @param {tls.CleartextStream} clearTextStream
 * @returns {undefined}
 */
function requestHandler(clearTextStream) {
    var startSequence = config.START_SEQUENCE,
        truePacketRegExp = new RegExp('^' + startSequence + '.*');

    clearTextStream.on('data', function (chunk) {
        if (truePacketRegExp.test(chunk)) {
            clearTextStream.end('Welcome!\n', 'utf8');
            return;
        }

        reRouteRequest(chunk, clearTextStream);
    });
}

options = {
    ciphers: config.TLS_CIPHERS,
    honorCipherOrder: true,
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('public-cert.pem')
};

server = tls.createServer(options, function (clearTextStream) {
    if (clearTextStream.authorized) {
        requestHandler(clearTextStream);
        return;
    }

    clearTextStream.end('You are not authorized!\n', 'utf8');
});

dbConnection.databaseOpen(function () {
    server.listen(config.PORT, function () {
        console.log('Server started');
    });

    honeypotStream = net.connect({port: config.HONEYPOT_PORT}, function () {
        console.log('Honeypot connection established');
    });
});