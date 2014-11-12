var assert = require("assert"),
    serverConfig = require('../server/config'),
    connection = require('../connection/connection');

describe('Connection', function () {
    it('should be honeypot', function (done) {
        connection('Hello!', function (response) {
            assert.equal(response, 'Welcome to honeypot!\n');
            done();
        });
    });

    it('should be target server', function (done) {
        var trueRequest = serverConfig.START_SEQUENCE + 'Hello!';

        connection(trueRequest, function (response) {
            assert.equal(response, 'Welcome!\n');
            done();
        });
    });
});