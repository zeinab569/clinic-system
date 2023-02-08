const { text } = require("express");
const mongoose=require("mongoose");
const prescreptionSchema=new mongoose.Schema(

{
   
_id:{type:Number},
creationDate:{type:Date ,default:Date.now()},
medicine:[
    {
        id:{type:Number,ref:"medicines"},
        quantity:{type:Number},
        period:{type:String,match:/^[0-9][d|W|M|Y]$/},
        medicinedate:{type:Date,default:Date.now()}
    }
],
dosage:{
type:String,
required:true
},
patient_id:{ type:Number,
    required:true,
   // ref:"patient"
},
doctor_id:{type:Number,
    required:true
   //ref:"doctor"
},
clinic_id:{
    type:Number,
  //  ref:"clinic"
},
services_id:{
    type:Number,
 //   ref:"clincService"
}
},{_id:false})
 mongoose.model("prescriptions",prescreptionSchema);