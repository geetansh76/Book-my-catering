const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema ({
    name : {
        type : String,
        required : true,
        trim : true 
    },
    order_id : {
        type : String,
        require : true,
        trim : true
    },
    payment_status : {
        type : String,
        require : true,
        trim : true 
    },
    items : [{
        breakfast : [{
            id : String,
            title : String,
            price : String
            
        }],
        lunch : [{
            id : String,
            title : String,
            price : String 
        }],
        dinner : [{
            id : String,
            title : String,
            price : String 
        }]
    }],
    total_price : {
        type : String,
        required : true,
        trim : true 

    },
    address : {
        type : String,
        required : true,
        trim : true
    },
    city : {
        type : String,
        required : true,
        trim : true
    },
    state : {
        type : String,
        required : true,
        trim : true
    },
    zip_code : {
        type : String,
        required : true,
        trim : true
    },
    event_date : {
        type : String,
        required : true,
        trim : true 
    },
    order_date : {
        type : String,
        required : true,
        trim : true 
    },
    no_of_people : {
        type : String,
        required : true,
        trim : true 
    },
    no_of_caterer : {
        type : String,
        required : true,
        trim : true 
    },
    cater_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Register"
    },
    shift : {
        type : String,
       required : true,
        trim : true 
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Register"
    }
})

const Order =  mongoose.model('Order',orderSchema)

module.exports = Order