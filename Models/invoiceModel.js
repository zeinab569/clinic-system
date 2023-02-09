

const mongoose =require("mongoose")
const autoIncrement=require("mongoose-sequence")(mongoose)


// Create Schema

const schema= new mongoose.Schema({        //constructor to define object
   _id:Number,
   employeeID:{type:Number,ref:"employee",required:true},
   patientID:{type:Number,ref:"patient",required:true},
   date:{type:String,required:true,validate:/^\d{2}-\d{2}-\d{4}$/},
   amount:{type:Number,required:true},
   remainingAmount:{type:Number},
   paymentWay:{type:String,required:true,enum:['cash','credit','insurance credit']},
   dueDate:{type:String,required:true,validate:/^\d{2}-\d{2}-\d{4}$/},
   appointmentID:{type:Number,ref:"appointment",required:true},
})

//schema.plugin(autoIncrement , {_id:'invoiceCounter'});
mongoose.model("invoice",schema)