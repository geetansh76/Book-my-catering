const User = require('../models/users')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next)=>{
    try {
       // const token = req.header('Authorization').replace('Bearer ','')
       // console.log(token)
        const token = req.cookies.jwt
        const decode = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({_id:decode._id, 'tokens.token':token})

        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
        
    } catch (e) {
        res.status(401).send('error! Please Authenticate')
    }
}

module.exports = auth