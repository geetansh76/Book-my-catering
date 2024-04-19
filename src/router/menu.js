const express = require('express')
const async = require('hbs/lib/async')
const Menu = require('../models/menu')
const auth = require('../middleware/auth')
const Catermenu = require('../models/cater_menu_form')
const router = new express.Router()



router.post('/menus', async (req,res)=>{
    const menu = new Menu({
        "breakfast": [
            {
                "id": "1",
                "title": "Jalebi",
                "price": "10"
            },
            {
                "_id": "2",
                "title": "Poha",
                "price": "30"
            },
            {
                "_id": "3",
                "title": "Samosa",
                "price": "12"
            },
            {
                "_id": "4",
                "title": "Chola",
                "price": "20"
            }
        ],
        "lunch": [
            {
                "id": "5",
                "title": "Jalebi",
                "price": "10"
            },
            {
                "id": "6",
                "title": "Poha",
                "price": "30"
            },
            {
                "id": "7",
                "title": "Samosa",
                "price": "12"
            },
            {
                "id": "8",
                "title": "Chola",
                "price": "20"
            }
        ],

        "dinner": [
            {
                "id": "9",
                "title": "Jalebi",
                "price": "10"
            },
            {
                "id": "10",
                "title": "Poha",
                "price": "30"
            },
            {
                "id": "11",
                "title": "Samosa",
                "price": "12"
            },
            {
                "id": "12",
                "title": "Chola",
                "price": "20"
            }
        ]
        
    })
    try {
        await menu.save()
        res.status(200).render('menu')
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/menu/data', async(req,res)=>{
    try {
        const data = await Menu.find({})
        if (!data) {
            return res.status(404).send()
        }
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send(e)
    }
})
// router.get('/menu/data/me',async(req,res)=>{
//     try {
//         const data = await Catermenu.findById('627552198bc56cb3d69277e5')
//         if (!data) {
//             return res.status(404).send()
//         }
//         res.status(200).send(data)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

router.get('/menu',(req,res)=>{
    res.render('menu')
})

module.exports = router 