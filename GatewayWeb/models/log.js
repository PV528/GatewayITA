const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    url: { // Change "endpoint" to "url"
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
