const express = require('express')
const async = require('hbs/lib/async')
const router = new express.Router()
const User = require('../models/users')
const Order = require('../models/orders')
const auth = require('../middleware/auth')

router.post('/orders',auth,async(req,res)=>{
   // console.log('Data Requested')
   //console.log(req.body.items[0]['breakfast']);
    // res.status(200).send(req.body)
    const order = new Order({
        ...req.body,
        user_id : req.user._id
    })
    try {
        console.log(order)
        await order.save()
        
        res.status(200).send(order)
    } catch (e) {
        res.status(400).send(e)
    }
    
})

router.put('/orderUpdate/:id', async (req,res)=>{
    const _id = req.params.id 
    console.log(_id)
    // const updates = Object.keys(req.body)
    try { 
        // updates.forEach((update)=> req.user[update]=req.body[update])
        // await req.user.save()
        //res.send(req.user)
        Order.updateOne( {order_id :_id },{ "payment_status": "success" }, function(
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

//edit 
router.get('/order/data/' ,async(req,res)=>{
    try {
        const data = await Order.find({})
        if (!data) {
            return res.status(404).send()
        }
        res.status(200).send(data)
       // console.log(data)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/order/data/me',auth,async (req,res)=>{
    //console.log(req.user._id)
    const user = await User.findById(req.user._id)
    if(user.user_type === "normal"){
        try {
            await user.populate('order')
            //await user.populate('cater')
            //console.log(user.order)
            res.send(user.order)
        } catch (e) {
            res.status(400).send('e')
        }
    }else{
        try {
            await user.populate('cater')
            res.send(user.cater)
        } catch (e) {
            res.status(400).send('e')
        }
    }
})

router.get('/order/data/:id', async (req, res) => {
    const _id = req.params.id 
    try {
        const data = await Order.findById(_id)
        if(!data){
            res.status(201).send(data)
        }
        res.send(data)
    } catch (e) {
        res.status(500).send(e)
    }
})

// router.get('/caterName/me', auth,async(req,res)=>{
//     const cater = await User.findById(req.user._id)
//     try {
//         await cater.populate('cater')
//         //console.log(cater.caterName)
//         res.send(cater.cater)
//     } catch (e) {
//         res.status(400).send('e')
//     }
// })

module.exports = router