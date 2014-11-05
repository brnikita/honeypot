'use strict';

var tls = require('tls'),
    fs = require('fs'),
    config = require('./config'),
    options,
    server;

/**
 * Function handles incoming packets
 *
 * @function
 * @name packetsHandler
 * @param {string} packet
 * @param {tls.CleartextStream} clearTextStream
 * @returns {undefined}
 */
function packetsHandler(packet, clearTextStream) {
    var startSequence = config.START_SEQUENCE,
        truePacketRegExp = new RegExp('^' + startSequence + '.*');

    if (truePacketRegExp.test(packet)) {
        console.log(clearTextStream.remoteAddress);
        console.log(clearTextStream.remotePort);
        return;
    }

    console.log('fooo');
}

options = {
    ciphers: 'ECDHE-RSA-AES128-SHA256:AES128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH',
    honorCipherOrder: true,
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('public-cert.pem')
};

server = tls.createServer(options, function (clearTextStream) {
    if (!clearTextStream.authorized) {
        clearTextStream.on('data', function (packet) {
            packetsHandler(packet, clearTextStream);
        });
        return;
    }

    clearTextStream.write('welcome!\n');
    clearTextStream.setEncoding('utf8');
    clearTextStream.pipe(clearTextStream);
});

server.listen(8765, function () {
    console.log('server started');
});