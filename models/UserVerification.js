const mongoose = require("mongoose")
const validator = require('validator')

const UserVerificationSchema = new mongoose.Schema({
userId:{
    type:String,
},
uniqueString: {
    type:String,
},
createdAt: {
    type:Date

},
expiresAt: {
    type:Date

}

});


const UserVerification = mongoose.model("UserVerification",UserVerificationSchema)

module.exports=UserVerification