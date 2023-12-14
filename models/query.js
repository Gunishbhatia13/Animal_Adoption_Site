const mongoose = require('mongoose')
const Schema = mongoose.Schema

const querySchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    }
})

const Query = mongoose.model('Query', querySchema)
module.exports = Query