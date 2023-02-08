const mongoose=require("mongoose");

exports.addressSchema=new mongoose.Schema({
    city:String,
    street:String,
    building:Number,
   
 },{_id:false})

 exports.contactSchema=new mongoose.Schema({
    email:{type:String,
           unique:true,
           required:true,
           matchRegx:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/  
        },
    phoneNumber:{
            type:String,
            unique:true,
            // matchRegx:/^01[0125](-)?[0-9]{8}$/
           matchRegx:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

        },
       
 },{_id:false})

 exports.scheduleSchema=new mongoose.Schema({
    date:{
           type:String,
           unique:true,
   matchRegx:/s+(?:0[1-9]|[12][0-9]|3[01])[-/.](?:0[1-9]|1[012])[-/.](?:19\d{2}|20[01][0-9]|2020)/,
        },
    departmentId:{
            type:Number,
             ref:'Department',
            default:'null',
         },
    doctorId:{
           type:Array,
           ref:'doctor',
         },
         _id:false
 },{_id:false})

