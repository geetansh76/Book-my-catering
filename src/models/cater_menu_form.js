const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

const catermenuSchema = new mongoose.Schema([
    {
    breakfast : [{
        //_id : mongoose.Schema.Types.ObjectId,
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            index : true,
            auto : true 
        },
        title : String,
        price : String
        
    }],
    lunch : [{
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            index : true,
            auto : true 
        },
        title : String,
        price : String 
    }],
    dinner : [{
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            index : true,
            auto : true 
        },
        title : String,
        price : String 
    }],
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Register",
        required : true 

    }
}])

const Catermenu = mongoose.model('Catermenu',catermenuSchema)
module.exports = Catermenu