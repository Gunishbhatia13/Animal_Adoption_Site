const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petSchema = new Schema({
    pet_name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
    }
})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet