const mongoose = require('mongoose')

const DbSchema = new mongoose.Schema({
    queryName: {
        type: String,
        required: true
    },
    queryResponse: {
        type: String,
        required: true
    },
    dns_enumeration_A: {
        type: String
    },
    dns_enumeration_AAAA: {
        type: String
    },
    dns_enumeration_MX: {
        type: String
    }
})

module.exports = new mongoose.model("item", DbSchema)