const express = require('express')
const router = express.Router()
const multer = require('multer')
const Pet = require('../models/pet')
const { isAuthenticated } = require('../config/passport-config')
const surrender_mailer = require('../controllers/surrender_mails')
const adoption_mail = require('../controllers/adopt_mail')

const storage=multer.memoryStorage()

const upload = multer({storage: storage})

router.get('/NewMembers', async (req, res) => {
    try {
        const Pets = await Pet.find().sort({_id:-1})
        res.render('NewMembers', {Pets:Pets})
    } catch (e) {
        res.send("Status code 500")
    }
})

router.get('/new_pet', isAuthenticated, async (req, res) => {
    res.render('NewPet')
})

router.post('/new_pet', upload.single('image'), isAuthenticated ,async (req, res) => {
    
    const new_pet = new Pet({
        pet_name: req.body.pet_name,
        location: req.body.location,
        age: req.body.age,
        about: req.body.about,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    })

    try {
        await new_pet.save()
        const user = req.user.fullname
        surrender_mailer(req.user.email, req.user.fullname, req.body.pet_name, req.body.about, req.user.phone)
        res.redirect('/')
    } catch(e) {
        console.log(e)
    }
})

router.get('/pet/:id', async (req, res) => {
    const {id} = req.params
    const curr_pet = await Pet.findById(id);
    res.render('FindPets', {curr_pet})
})

router.post('/pet/:id', isAuthenticated, async (req, res) => {
    const {id} = req.params
    const curr_pet=await Pet.findById(id)
    adoption_mail(curr_pet.pet_name, curr_pet.about, id, req.user.phone, req.user.email)
    res.render('success')
})

module.exports = router