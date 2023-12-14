const express = require('express')
const path = require('path')
const ejs = require('ejs')
const engine = require('ejs-mate')
const app = express();
const mongoose = require('mongoose')
const seedDB = require('./seed')
const passport = require('passport')
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')
const LocalStrategy = require('passport-local')
const session = require('express-session')
const User = require('./models/User')

// Database
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/RR', 
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("DB Connected"))
.catch((e) => console.log(e))

// Basic Configs
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.engine('ejs', engine)
app.set('views', path.join(__dirname, 'views/pages'))
app.use(methodOverride('_method'));

// Routes
const home_route = require('./routes/homeRoutes')
const auth_routes = require('./routes/auth')
const petRoutes = require('./routes/petRoutes')
const supportRoutes = require('./routes/supportRoutes');
const { initializePassport, isAuthenticated } = require('./config/passport-config');

// Passport configs
initializePassport(passport)
app.use(session({
    secret: 'my name is td',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(home_route)
app.use(auth_routes)
app.use(petRoutes)
app.use(supportRoutes)

// seedDB()

app.listen(3000, () => {
    console.log('listening on port 3000!')
})