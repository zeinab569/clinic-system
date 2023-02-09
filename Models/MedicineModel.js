const { text } = require("express");
const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);



const MedicineSchema=new mongoose.Schema(
{
    _id:Number,
Name:{type:String,required:true,unique:true},
production_Date:{type:Date,required:true},
expiary_Date:{type:Date,required:true},
price:{type:Number,required:true},
Recommendation:{type:String,required:true},
quantity:{type:Number,required:true},
img:{type:String,required:false},
patient_Id:{type:Number,ref:'patient'},
department_Id:{type:Number,ref:'Department'}
},
{_id:false}
)

MedicineSchema.plugin(AutoIncrement,
    {id:"medicineId",inc_field:"_id",start_seq:1}
    );
 mongoose.model("medicine",MedicineSchema);