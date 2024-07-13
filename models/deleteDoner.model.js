const mongoose = require("mongoose")
const validator = require('validator')

const DeleteDonor = new mongoose.Schema({
    fullName:{
        type:String,
        
    },
    phoneNumber: {
        type: String,
    },    
    age:{
        type:Number,
        
    },
    city:{
        type:String,
        

    },
    bloodAmount:{
        type:Number,
        
    },

    bloodType:{

        type:String,
        

    },
    hospital:{
        type:String,
        

    },

  
    gender:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now
    },
    code: {
        type: String,}




});


const Delete = mongoose.model("DeleteDonor",DeleteDonor)

module.exports=Delete