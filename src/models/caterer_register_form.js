// get npm mongoose 
const mongoose = require('mongoose')
// get npm validator 
const validator = require('validator')

// creating cater schema 
const caterSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    mobile_no : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
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
    services : {
        type : String,
        required : true,
        trim : true
    },
    caters : {
        type : String,
        required : true,
        trim : true
    },
    register_date : {
        type : String,
        required : true,
        trim : true
    },
    available : {
        type : String,
        required : true,
        trim : true
    },
})

const Cater = mongoose.model('CatererRegistered',caterSchema)

module.exports = Cater 