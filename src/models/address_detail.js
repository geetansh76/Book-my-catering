const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        trim : true, 
    },

    mobile_no : {
        type : String,
        require : true,
        trim : true
    },

    email : {
        type : String,
        require : true,
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

    service : {
        type : String,
        required : true,
        trim : true
    },

    caters : {
        type : String,
        required : true,
        trim : true
    },

    date : {
        type : String,
        required : true,
        trim : true
    },

    shift : {
        type : String,
        required : true,
        trim : true
    },
     
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Register"
    },

    //edit
    caterer_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Register"
    }
})

const addressDetail = mongoose.model('Address_Detail',addressSchema)

module.exports = addressDetail