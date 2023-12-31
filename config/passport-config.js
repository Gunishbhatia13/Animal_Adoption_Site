const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

exports.initializePassport = (passport) => {
    passport.use(new LocalStrategy({usernameField: 'email'},async (email, password, done) => {
        try {
            const user = await User.findOne({email})

            if(!user) return done(null, false)
            if(user.password!==password) return done(null, false)
            return done(null, user) 
        } catch(e) {
            return done(e, false)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id)
            done(null, user)
        } catch(e) {
            dont(e, false)  
        }
    })
}

exports.isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()) return next()
    res.redirect('/login')
}

exports.notLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()) return next()
    res.redirect('/logout')
}