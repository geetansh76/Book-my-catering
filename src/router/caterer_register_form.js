const express = require('express')
const Cater = require('../models/caterer_register_form')
const auth = require('../middleware/auth')
const router = new express.Router()

//register 
router.get('/caterRegister', (req,res)=>{
    res.render('cater_register_form')
})

router.post('/caterRegister', async (req,res)=>{
    const cater = new Cater(req.body)
    try {
        await cater.save()
        //res.render('cater_menu_form',{cater})  // edit login page
        res.render('login',{cater})

    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/menuform', (req,res)=>{
    res.render('cater_menu_form')
})

router.get('/cater', auth,async (req, res) => {
    try {
        const users = await Cater.find({})
        res.status(200).render('welcome') 
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/cater', async (req, res) => {
    try {
        const users = await Cater.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router