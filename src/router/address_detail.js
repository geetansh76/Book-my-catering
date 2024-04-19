const express = require('express')
const addressDetail = require('../models/address_detail')
const router = new express.Router()
const auth = require('../middleware/auth')


router.get('/services' ,(req,res)=>{
    res.render('services')
})

router.post('/services/data', auth,async(req,res)=>{
    try {
        //const address = new addressDetail(req.body)
        const address = new addressDetail({
            ...req.body,
            owner : req.user._id 
        })
        await address.save()
        res.status(200).send(address)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/services/data', async(req,res)=>{
    try {
        const data = await addressDetail.find({})
        if (!data) {
            return res.status(404).send()
        }
        res.status(200).send(data)
        console.log(data)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.get('/services/data/:id', async (req,res)=>{
    const _id = req.params.id 
    try {
        const data = await addressDetail.findById(_id)
        if(!data){
            res.status(201).send(data)
        }
        res.send(data)
    } catch (e) {
        res.status(500).send(e)
    }
})

const User = require('../models/users')
const res = require('express/lib/response')
router.get('/malik',auth, async (req,res)=>{
    const user = await User.findById(req.user._id)
    await user.populate('tasks')
   // console.log(user.tasks)
    res.send(user.tasks)
})



router.get('/caterer', async (req,res)=>{
    const user = await User.findById('626c50871fb8b44033987ef9')
    await user.populate('tasks')
   // console.log(user.tasks)
    res.send(user.tasks)
})




module.exports = router 
