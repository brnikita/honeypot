'use strict';

var tls = require('tls'),
    fs = require('fs'),
    config = require('./config');

/**
 * Function sends message to server
 *
 * @function
 * @name sendMessage
 * @param message
 * @param callback
 * @returns {undefined}
 */
function sendMessage(message, callback) {
    var clearTextStream = tls.connect(config.PORT, {
        ca: [fs.readFileSync('public-cert.pem')]
    });

    clearTextStream.setEncoding('utf8');
    clearTextStream.on('data', function (data) {
        callback(data);
        clearTextStream.end();
    });
    clearTextStream.write(message);
}

module.exports = sendMessage;