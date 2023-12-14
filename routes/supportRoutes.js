const express = require('express')
const router = express.Router()
const Query = require('../models/query')
const support_mail = require('../controllers/support_mail')
const { isAuthenticated } = require('../config/passport-config')

router.get('/support', isAuthenticated, (req, res) => {
    res.render('myPet')
})

router.post('/support', isAuthenticated, async (req, res) => {
    const newQuery = new Query({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        query: req.body.query
    })

    try {
        await newQuery.save()
        support_mail(req.body.name, req.body.email, req.body.query, req.body.contact)
        res.redirect('/')
    } catch(e) {
        console.log(e)
    }
})

module.exports = router