const jwt = require("jsonwebtoken")
const httpStatusText = require("../utils/httpsStatusText")
const appError = require("../utils/appError")
User = require('../models/userSchema.model')

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers['Authorization']|| req.headers['authorization']
    if(!authHeader) {
        const error = appError.create("token is required",401, httpStatusText.ERROR)
        return next(error)
    }
    const token = authHeader.split(' ')[1]

    

    try {
       const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY)
       req.currentUser = currentUser
       User.findOne({_id : currentUser.id,loggedIn : true})
       .then((user) => {
        if(!user){
            const error = appError.create("invalid token",401, httpStatusText.ERROR)
            return next(error)
        }
        req.currentUser = user
        next()
      

       })
       .catch((e)=>{
            console.log(e)
            const error = appError.create("invalid token",401, httpStatusText.ERROR)
            return next(error)

        })
        

    } catch (err) {
        
        const error = appError.create("invalid token",401, httpStatusText.ERROR)
        return next(error)
    }
   
}
module.exports= verifyToken