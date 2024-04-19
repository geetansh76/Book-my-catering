const express = require('express')
const User = require('../models/users')
const Cater = require('../models/caterer_register_form')
const auth = require('../middleware/auth')
const async = require('hbs/lib/async')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const router = new express.Router()

//Register 
router.post('/register',async (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    const password = req.body.password
    const cpassword = req.body.cpassword
    if (password === cpassword) {
        try {
            await user.save()
            console.log(user)
            const token = user.generateAuthToken()
            res.cookie("jwt", token,{
                expires : new Date(Date.now() + 60000*50),
                httpOnly: true
            })
            //res.status(201).send({user,token})
            if(user.user_type === 'normal'){
                res.render('login')
            }
            else{
                res.render('cater_register_form')
            }
            //res.render('login')

        } catch (e) {
            res.status(400).send(e)
        }
    } else {
        res.send('password should be same')
    }

})

router.get('/register', (req, res) => {
    try {
        res.render('register')
    } catch (e) {
        res.send('not found')
    }
})


//Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie("jwt", token,{
            expires : new Date(Date.now() + 60000*50),
            httpOnly: true
        })
        //res.send({user,token})
        //res.render('welcome',{user})    //edit 

        //edit 
        if(user.user_type === 'normal'){
            res.render('welcome',{user})
        }else{
            res.render('cater_menu_form')
        }


    } catch (e) {
        res.status(401).send('you have enter invalid username or password!')
    }
})

router.get('/login', (req, res) => {
    try {
        res.render('login')
    } catch (e) {
        res.send('not found')
    }
})

//Logout
router.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        //res.send('logout')
        res.render('login')
    } catch (e) {
        res.status(500).send()

    }
})

//Geting all users 

router.get('/users', auth,async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).render('welcome') 
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})


router.get('/details',async (req, res) => {
    res.render('caterer_details')
})

router.get('/detail/:id',async (req, res) => {
    const _id = req.params.id 
    try {
        const user = await User.findById(_id)
        //const user = await Cater.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        console.log(user)
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router