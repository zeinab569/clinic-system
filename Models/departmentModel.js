const { text } = require("express");
const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);



const DepartmentSchema=new mongoose.Schema(
{
_id:Number,
Name:{type:String,required:true,unique:true},
doctor:[{type:Number,ref:"doctor"}],
patient:[{type:Number,ref:'patient'}],
Service:[{type:Number,ref:'Service'}],
phoneNumber:{type:Number,required:true,unique:true},
medicine:[{type:Number,ref:'medicine'}]
}
,{_id:false}
)

DepartmentSchema.plugin(AutoIncrement,
    {id:"DepartmentId",inc_field:"_id",start_seq:1}
    );

 mongoose.model("Department",DepartmentSchema);