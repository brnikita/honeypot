'use strict';

var tls = require('tls'),
    fs = require('fs'),
    net = require('net'),
    config = require('./config'),
    dbConnection = require('./dbConnection'),
    ConnectionsModel = require('./models/connectionsModel'),
    options,
    server;

/**
 * Function reroutes request to honeypot
 *
 * @function
 * @name reRouteRequest
 * @param {string} chunk
 * @param {tls.CleartextStream} clearTextStream
 * @returns {undefined}
 */
function reRouteRequest(chunk, clearTextStream) {
    var connection = new ConnectionsModel({
            port: clearTextStream.remotePort,
            host: clearTextStream.remoteAddress,
            requestBody: chunk
        }),
        honeypotStream = net.connect({port: config.HONEYPOT_PORT});

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
            clearTextStream.end('Welcome!\n');
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
    clearTextStream.setEncoding('utf-8');
    clearTextStream.on('error', function () {
        clearTextStream.end('Something is wrong!\n');
    });

    requestHandler(clearTextStream);
});

dbConnection.databaseOpen(function () {
    server.listen(config.PORT, function () {
        console.log('Server started');
    });
});