const express = require('express')
const mongoose = require('./db/mongoose')
const userRouter = require('./router/users')
const orderRouter = require('./router/orders')
const menuRouter = require('./router/menu')
const caterRouter = require('./router/caterer_register_form')
const addreDetailRouter = require('./router/address_detail')
const caterMenuRouter = require('./router/cater_menu_form')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const auths = require('./middleware/auth')


const app = express()

const port = 3000


//app.use(express.json())
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(publicDirectoryPath))
app.use(cookieParser())

app.use(userRouter)
app.use(orderRouter)
app.use(menuRouter)
app.use(addreDetailRouter)
app.use(caterRouter)
app.use(caterMenuRouter)

app.get("/list_movies", (req, res) => {
    fs.readFile(__dirname + '/' + 'movies.json', 'utf8', (err, data) => {
        res.end(data);
    });
});


app.get('/orderPreview', auths, (req, res) => {
    //console.log(req.user._id)
    //console.log(req.user.name)
    res.render('orders_preview')
})

app.get('/orderDetails', (req, res) => {
    res.render('order_details')
})


//razor pay 

const Razorpay = require('razorpay');
const auth = require('./middleware/auth')
const async = require('hbs/lib/async')
const Order = require('./models/orders')

var instance = new Razorpay({
    key_id: 'rzp_test_B18jSv3TMrkWsp',
    key_secret: 'OgFGzUV3ZKlzUy0ArOoK3kDW',
});

app.get('/success_page', (req, res) => {
    res.render("success_page")
})

app.post('/create/orderId', (req, res) => {
    console.log('create order id request', req.body)
    //console.log('total price', req.body.total_price)
    var options = {
        amount: req.body.amount,
        currency: "INR",
        
    }
    instance.orders.create(options, function (err, order) {
        console.log(order)
        res.send({ orderId: order.id })
    })
})

app.post("/api/payment/verify", (req, res) => {

    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'OgFGzUV3ZKlzUy0ArOoK3kDW')
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", req.body.response.razorpay_signature);
    console.log("sig generated ", expectedSignature);
    var response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.response.razorpay_signature) {
        
        response = { "signatureIsValid": true }
    }
    res.send(response);
});


app.listen(port, () => {
    console.log('Server started.')
})

// const User = require('./models/users')
// const main = async (req,res)=>{
//     const cater = await User.findById('626cf5d2426ac406ca61ef64')
//     //console.log(cater)
//     try {
//         await cater.populate('cater')
//         //console.log(user.order[0].cater_id)
//        // res.send(cater.order)
//       // console.log(cater.cater)
//     } catch (e) {
//         res.status(400).send('e')
//     }
// }

// main()