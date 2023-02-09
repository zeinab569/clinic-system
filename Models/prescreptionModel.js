const { text } = require("express");
const mongoose=require("mongoose");
const autoIncrement=require("mongoose-sequence")(mongoose)
const prescreptionSchema=new mongoose.Schema(

{
   
_id:{type:Number},
creationDate:{type:Date ,default:Date.now()},
medicine:[
    {
        id:{type:Number,ref:"medicines"},
        quantity:{type:Number},
        period:{type:String,match:/^[0-9][d|w|m|y]$/},
        medicinedate:{type:Date,default:Date.now()}
    }
],
dosage:{
type:String,
required:true
},
patient_id:{ type:Number,
    required:true,
    ref:"patient"
},
doctor_id:{type:Number,
    required:true,
   ref:"doctor"
},
clinic_id:{
    type:Number,
    ref:"clinic"
},
dept_id:{
    type:Number,
   ref:"Department"
}
},{_id:false})
prescreptionSchema.plugin(autoIncrement,{id:"prescriptionId",inc_field:"_id"});
 mongoose.model("prescriptions",prescreptionSchema);