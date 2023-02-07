const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    groupMembers: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Group', groupSchema);