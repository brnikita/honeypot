'use strict';

module.exports = {
    /**
     * Initial sequence of correct entrance packets
     *
     * @constant
     * @name START_SEQUENCE
     * @type {string}
     */
    START_SEQUENCE: '0xABCD1234DEADBEEF',

    /**
     * Port of target server
     *
     * @constant
     * @name PORT
     * @type {number}
     */
    PORT: 8765,

    /**
     * Port of honeypot
     *
     * @constant
     * @name HONEYPOT_PORT
     * @type {number}
     */
    HONEYPOT_PORT: 8000,

    /**
     * Host of honeypot
     *
     * @constant
     * @name HONEYPOT_HOST
     * @type {number}
     */
    HONEYPOT_HOST: 'localhost',

    /**
     * Host of database
     *
     * @constant
     * @name DB_HOST
     * @type {string}
     */
    DB_HOST: 'mongodb://localhost/honeypot',

    /**
     * @constant
     * @name TLS_CIPHERS
     * @type {number}
     */
    TLS_CIPHERS: 'ECDHE-RSA-AES128-SHA256:AES128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH'
};