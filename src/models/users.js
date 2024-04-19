// get npm mongoose 
const mongoose = require('mongoose')
// get npm validator 
const validator = require('validator')

//get npm bcryptjs for hashing
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// creating user schema 
const userSchema = new mongoose.Schema({
    name : {
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
    password : {
        type : String,
        required : true, 
        trim : true,
        minlength :7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Passowrd cannot contain password!')
            }
        }

    },
    user_type : {
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
   mobile_no : {
       type : String,
       require : true,
       trim : true,
       unique : true,
       validate(value){
           if(!validator.isMobilePhone(value)){
               throw new Error('Mobile No. is invalid!')
           }
       }
   },

    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
})

userSchema.virtual('tasks',{
    ref : "Address_Detail",
    localField : "_id",
    foreignField : "owner"
})
//edit
userSchema.virtual('order',{
    ref : "Order",
    localField : "_id",
    foreignField : "user_id"
})

//edit 
userSchema.virtual('catere_id',{
    ref : "Address_Detail",
    localField : "_id",
    foreignField : "caterer_id"
})

//edit 2
userSchema.virtual('cater',{
    ref :"Order",
    localField : "_id",
    foreignField : "cater_id"
})

userSchema.virtual('cater_menu',{
    ref :"Catermenu",
    localField : "_id",
    foreignField : "user_id"
})


// generateAuthToken method 
userSchema.methods.generateAuthToken = async function() {
    const user = this 
    const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse', {expiresIn:'7 day'})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

// find by credential function used for login 
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
    return user
}

// hashing plain passowrd before storing
userSchema.pre('save', async function(next) {
    const user = this 
    //console.log('just before saving')
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8) 
    }
    next()
})

const User = mongoose.model('Register',userSchema)

module.exports = User