const express  = require('express')
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/authDemo')
.then(()=>{console.log("db connected")})
.catch((e)=>{console.log(e)})

app.set('view engine' , "ejs");
app.use(express.urlencoded({extended:true}));

app.get('/secret' , (req,res)=>{
    res.send("secret bata dunga ab mai");
})

app.get('/register' , (req,res)=>{
    res.render('signup');
})

app.post('/register', async (req, res) => {
    const {username, password} = (req.body)
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)
    const newUser = new User({username, password:hash})
    await newUser.save()
    res.redirect('/login')
})

app.get('/login' , (req,res)=>{
    res.render('login');
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username})

    if(user) {
        const validUser = await bcrypt.compare(password, user.password)

        if(!validUser) {
            return res.send('invalid user')
        }
    }
    res.redirect('/secret')
})

app.listen(3000 , ()=>{
    console.log("server connected at port 3000");
})