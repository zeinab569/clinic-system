

const { text } = require("express");
const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
 
const ServiceSchema= new mongoose.Schema(
{
    _id:Number,
    name:{type:String,required:true,unique:true},
    price:{type:Number,required:true},
    description:{type:String,required:true}
}
,{
    _id:false
}
)

ServiceSchema.plugin(AutoIncrement,
   {id:"ServiceId",inc_field:"_id",start_seq:1}
   );

 mongoose.model("Service",ServiceSchema);