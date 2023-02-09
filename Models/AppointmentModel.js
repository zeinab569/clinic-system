
const mongoose =require("mongoose")
const autoIncrement=require("mongoose-sequence")(mongoose)


// Create Schema

const schema= new mongoose.Schema({        //constructor to define object
   _id:Number,
   employeeID:{type:Number,ref:"employee",required:true},
   patientID:{type:Number,ref:"patient",required:true},
   departmentID:{type:Number,ref:"Department",required:true},
   doctorID:{type:Number ,ref:"doctor",required:true},
   date:{type:String,required:true,validate:/^\d{2}-\d{2}-\d{4}$/},
   time:{type:String,required:true,validate:/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/},
   status:{type:String,default:"unAssign",enum:['Done','Cancel','Postpone','unAssign']}
})

//schema.plugin(autoIncrement , {_id:'appointmentCounter'})
mongoose.model("appointment",schema) 