'use strict';

var config = require('./config'),
    Mongoose = require('mongoose');

module.exports = {
    /**
     * Database starter
     *
     * @public
     * @method
     * @name DbConnection.databaseOpen
     * @param {Function} callback
     * @return {undefined}
     */
    databaseOpen: function (callback) {
        Mongoose.connect(config.DB_HOST);
        var database = Mongoose.connection;
        database.on('error', console.error.bind(console, 'connection error:'));
        database.once('open', function () {
            console.log('Database was opened successfully');
            callback();
        });
    }
};