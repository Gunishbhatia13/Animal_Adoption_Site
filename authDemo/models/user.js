let mongoose=require('mongoose')

let userSchema=new mongoose.Schema({
    username: String,
    password: String
})

let user = mongoose.model('User', userSchema)
module.exports = user