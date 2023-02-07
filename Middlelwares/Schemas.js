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
   //  date:{//هااخد الماتش من سماح 
   //         type:Date,
   //       //   unique:true,
   //      },
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

