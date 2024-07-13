const mongoose = require("mongoose")
const validator = require('validator')

const patiantSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    
    age:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true

    },
    bloodAmount:{
        type:Number,
        required:true
    },

    bloodType:{

        type:String,
        required:true

    },
    hospital:{
        type:String,
        required:true

    },

  
    gender:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },




});


const Patiant = mongoose.model("AllPatiant",patiantSchema)

module.exports=Patiant