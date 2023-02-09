const { text } = require("express");
const mongoose=require("mongoose");

//create schema for medicine collection
const MedicineSchema=new mongoose.Schema(

{

//_id: mongoose.Types.ObjectId,//will generate object id in runtime
id:{type:Number,required:true,unique:true},
Name:{type:String,required:true,unique:true},
production_Date:{type:Date,required:true},
expiary_Date:{type:Date,required:true},
price:{type:Number,required:true},
Recommendation:{type:String,required:true},
quantity:{type:Number,required:true},
img:{type:String,required:true},
patient_Id:{type:mongoose.Schema.Types.ObjectId,ref:'patient'}


})

//mapping schema bind collection  -- modeling
 mongoose.model("medicines",MedicineSchema);