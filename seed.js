const mongoose = require('mongoose')
const User = require('./models/User')

const users = [
    {
        fullname: "Tirthangkar Das",
        username:"tirthangkards",
        email:"tirthangkardas@gmail.com",
        password:"hello",
        phone:"8135811476"

    },
    {
        fullname: "Gunish Bhatia",
        username:"gunish",
        email:"tirthangkardas@gmail.com",
        password:"hello",
        phone:"8135811476"
    }
]

async function seedDB() {
    await User.deleteMany({})
    await User.insertMany(users)
    console.log("Seeded Successfully")
}
module.exports = seedDB