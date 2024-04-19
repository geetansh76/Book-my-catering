const express = require('express')
const cater_menu_form = require('../models/cater_menu_form')
const auth = require('../middleware/auth')
const router = new express.Router()



router.get('/cater_menu_form', (req, res) => {
    res.status(200).render('cater_menu_form')
})

// router.post('/cater_menu_form', auth, async (req, res) => {
//     const cater_menu = new cater_menu_form({
//         ...req.body,
//         user_id: req.user._id
//     })
//     try {
//         await cater_menu.save()
//         res.status(200).send(cater_menu)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

router.get('/catermenuformdata/me', auth, async (req, res) => {
    try {
        const data = await Catermenu.findById(req.user._id)
        if (!data) {
            return res.status(404).send()
        }
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send(e)
    }
})


const User = require('../models/users')
const Catermenu = require('../models/cater_menu_form')
router.get('/shiva', auth, async (req, res) => {
    //console.log(req.user._id)
    const user = await User.findById(req.user._id)
    try {
        await user.populate('cater_menu')
        //await user.populate('cater')
       // console.log(user.cater_menu)
        res.send(user.cater_menu)
    } catch (e) {
        res.status(400).send('e')
    }
})

//edit 

router.put('/updatemenu' ,auth,async (req,res)=>{
    try {
        //console.log("hello", req.body)
        const mp = req.body 
        console.log("hello", mp)
        Catermenu.updateOne( {user_id : req.user._id},{$push:mp}, {upsert : true},function(
            err,
            result
          ) {
            if (err) {
                console.log('Error')
              res.send(err);
            } else {
                console.log('Hello',result)
              res.json(result);
            }
          });
    } catch (e) {
        res.status(500).send(e)
    }
    console.log(req.body)
    
})
router.put('/updatemenu/delete',auth ,async (req,res)=>{
    try {
        const meal = req.body 
        console.log(meal)
        Catermenu.updateOne( {user_id : req.user._id},{$pull:meal}, { "multi" : true } ,function(
            err,
            result
          ) {
            if (err) {
                console.log('Error')
              res.send(err);
            } else {
                console.log('Hello',result)
              res.json(result);
            }
          });
    } catch (e) {
        res.status(500).send(e)
    }
    
})


module.exports = router
