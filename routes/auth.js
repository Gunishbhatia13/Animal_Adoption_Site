const express=require('express')
const router=express.Router()
const User=require('../models/User')
const passport=require('passport')
const { isAuthenticated, notLoggedIn } = require('../config/passport-config')
const { body, validationResult } = require('express-validator');


// Sign Up Routes
router.get('/signup', notLoggedIn, (req, res) => {
    res.render('SignUp')
})

router.post('/signup', [ body('phone').trim().isLength({ min: 10, max: 10 }) ], notLoggedIn, async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send("Invalid Number");
        }

        const user = await User.findOne({email: req.body.email})
        if(user) res.status(400).send("User Exists")

        if(!req.body.fullname) return res.status(400).send("Enter Name");
        if(!req.body.username) return res.status(400).send("Enter Username");
        if(!req.body.email) return res.status(400).send("Enter Email");
        if(!req.body.password) return res.status(400).send("Enter Password");
        if(!req.body.phone) return res.status(400).send("Enter Phone Number");

        const newUser = User.create(req.body)
        res.redirect('/login');

    } catch(e) {
        res.redirect('/signup')
        console.log(e)
        return res.status(400).send("Check Credentials");
    }
})

// Login Routes
router.get('/login',async(req,res)=>{
    res.render('Login');
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }), (req, res) => {
    console.log(req.user)
    res.redirect('/')
})

// Logout
router.get('/logout', (req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

module.exports = router