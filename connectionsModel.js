var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema,

    /**
     * Shema of incoming connections
     *
     * @class
     * @name ConnectionShema
     * @type {Schema}
     */
    ConnectionShema = new Schema({
        host: {
            type: String,
            default: null
        },
        port: {
            type: Number,
            default: null
        },
        requestBody: {
            type: String,
            default: null
        }
    });

module.exports = Mongoose.model('connections', ConnectionShema);