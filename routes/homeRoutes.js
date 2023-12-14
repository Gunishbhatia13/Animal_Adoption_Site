const express = require('express')
const { isAuthenticated } = require('../config/passport-config')
const User = require('../models/User')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('Home')
})

router.get('/trial', (req, res) => {
    res.render('trial')
})

router.get('/foster', (req, res) => {
    res.render('foster')
})

router.get('/family', (req, res) => {
    res.render('family')
})

router.get('/pet_supply', (req, res) => {
    res.render('petSupply')
})

router.get('/aboutus', (req, res) => {
    res.render('AboutUs')
})

router.get('/profile', isAuthenticated, (req,res) => {
    try {
        res.render('Profile', {
            fullname: req.user.fullname, 
            username: req.user.username,
            email: req.user.email,
            phone: req.user.phone
        })
    } catch(e) {
        console.log(e)
    }
})

router.patch('/profile', isAuthenticated, async (req, res) => {
    try {
        const id = req.user._id
        const { fullname, username, email, phone } = req.body
        await User.findByIdAndUpdate(id, {fullname, username, email, phone})
        res.redirect('/profile')
    } catch(e) {
        console.log(e)
    }
})

module.exports = router
