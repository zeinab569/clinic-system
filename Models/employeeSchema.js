const mongoose= require('mongoose')

const address_schema=new mongoose.Schema({
   city:{type:String},
   street:{type:String},
   building:{type:Number},
})

const EmployeeSchema= new mongoose.Schema({
    _id:Number,
    status:{type:Boolean,default:true,required:true},
    name:{type:String,required:true,lowercase:true,validate: /[a-z-A-Z]/,trim:true,unique:true},
    user_name:{type:String,required:true,lowercase:true,validate: /[a-z-A-Z]/,trim:true,unique:true},
    user_role:{type:String,required:true,lowercase:true},
    phoneno:{type:String,required:true,unique:true},
    email:{type:String,lowercase:true,unique:true,validate:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,trim:true},
    address: address_schema,
    password:{type:String,required:true,unique:true},
    attendence:{type:String},
    salary:{type:Number,required:true,min:3000},
    gender:{type:String,required:true},
    workHours:{type:Number,required:true},
    employeeImage: { type:String},
    clinictId:{type:Number},


})

module.exports=mongoose.model('employee',EmployeeSchema)
