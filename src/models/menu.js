const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

const menuSchema = new mongoose.Schema([{
    breakfast : [{
        _id : String,
        title : String,
        price : String
        
    }],
    lunch : [{
        _id : String,
        title : String,
        price : String 
    }],
    dinner : [{
        _id : String,
        title : String,
        price : String 
    }]
}])

const Menu = mongoose.model('Menu',menuSchema)
module.exports = Menu