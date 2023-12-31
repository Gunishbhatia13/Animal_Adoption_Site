const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose=require('passport-local-mongoose')

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
})

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'})
const User = mongoose.model('User', userSchema)

module.exports = User