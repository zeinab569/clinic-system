const mongoose= require('mongoose')

exports.addressSchema=new mongoose.Schema({
    city:{type:String},
    street:{type:String},
    building:{type:Number},
})


