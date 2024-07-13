const mongoose = require("mongoose")
const validator = require('validator')
const userRoles = require('../utils/userRoles')

const userSchema = new mongoose.Schema({
fullName:{
    type:String,
    required:true,
    trim:true,
    max:64
},
email: {
    type:String,
    required:true,
    unique:true,
    trim:true,
    max:64
},
password: {
    type:String,
    required:true,

},
token:{
    type:String
},
loggedIn:{
    type:Boolean,
    default:false

},
role:{
    type: String,
    enum: [userRoles.USER, userRoles.ADMIN1,userRoles.ADMIN2,userRoles.ADMIN3, userRoles.MANGER],
    default: userRoles.USER
},
verified : {
    type:Boolean
}
// isVerified: {type:Boolean, required:true,minLength:3,maxLength:1024},
// emailToken: {type:String},


});


const User = mongoose.model("users",userSchema)

module.exports=User