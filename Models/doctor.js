const mongoose=require("mongoose");

const schemas = require("../Middlelwares/Schemas");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const doctorSchema=new mongoose.Schema({
   _id:Number,
    fullName:{
    type:String,
    required:true,
    matchRegx:/^[a-zA-Z]+((['_,. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    unique:true
   },
   email:{
    type:String,
    required:true,
    unique:true,
    matchRegx:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/  
   },
   phoneNumber:{
    type:String,
    matchRegx:/^01[0125](-)?[0-9]{8}$/
   },
   Specialization:{
    type:String
   },
   gender:{
      type:String,
      enum:['female','male']
   },
   userName:{
    type:String,
    //required:true,
    unique:true,
    matchRegx:/^[a-zA-Z]+((['_,. -][a-zA-Z ])?[a-zA-Z]*)*$/,
   },
   password:{
    type:Number,
   // required:true,
    minLength:8,
   },
   doctorImage:{
    type:String,
   
   },
   salary:{
    type:Number,
    min:2000
   },
   address:schemas.addressSchema,
   clinicId:{
      type:Number,
      ref:'clinic',
   },
   departmentId:{
      type:Number,
      ref:'Department',
   },
   appointments:{
     type:Array,
     id:{type:Number},                              
     time:{type:String ,default:" "},
     date:{type:String,default:" "},
     ref:'appointment',
  },

})//end of schema
//  doctorSchema.plugin(AutoIncrement);
module.exports=mongoose.model("doctor",doctorSchema);