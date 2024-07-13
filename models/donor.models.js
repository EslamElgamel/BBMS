const mongoose = require("mongoose")
const validator = require('validator')

const donorSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^(010|011|012|015)\d{8}$/,
        message: 'Invalid Egyptian phone number'
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
    code: {
        type: String,
        default: function() {
          const currentDate = new Date();
          const expiredPriod = new Date(currentDate.setDate(currentDate.getDate() + 24 * 60 * 60 * 1000));
          const isoDate = expiredPriod.toISOString();
          return 'start: '+ this.date.toISOString().slice(2,4) +'/'+ this.date.toISOString().slice(5,7)+'/'+
          + this.date.toISOString().slice(8,10)+ '\nexpired: ' + isoDate.slice(2, 4) + '/'
          + isoDate.slice(5, 7) + '/' + isoDate.slice(8, 10) + '\nType: '+ this.bloodType + isoDate.slice(0,10)
      }}




});


const Donor = mongoose.model("AllDonor",donorSchema)

module.exports=Donor