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
   age:Number,
   gender:{
      type:String,
      enum:['female','male']
   },
   userName:{
    type:String,

    required:true,
    unique:true,
    matchRegx:/^[a-zA-Z]+((['_,. -][a-zA-Z ])?[a-zA-Z]*)*$/,
   },
   password:{
    type:String,
   //  required:true,
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
      type:Array,
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
  user_role:{type:String,
   required:true,lowercase:true,
   default:"doctor",
},
 patientid:{
    type:Array,
    ref:'patient',
 },
 prescreption:{
    type:Number,
    ref:'prescriptions'
 }

},{_id:false})//end of schema
 doctorSchema.plugin(AutoIncrement,
   {id:"doctorId",inc_field:"_id",start_seq:1}
   );
module.exports=mongoose.model("doctor",doctorSchema);