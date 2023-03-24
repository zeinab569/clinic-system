const mongoose= require('mongoose')
const address_schema=new mongoose.Schema({
   city:{type:String},
   street:{type:String},
   building:{type:Number},
},{_id:false})

const EmployeeSchema= new mongoose.Schema({
    _id:Number,
    status:{type:Boolean,default:true,required:true},
    name:{type:String,required:true,lowercase:true,validate:/^[a-zA-Z]+((['_,. -][a-zA-Z ])?[a-zA-Z]*)*$/,trim:true,unique:true},
    user_name:{type:String,required:true,lowercase:true,validate: /[a-z-A-Z]/,trim:true,unique:true},
    user_role:{type:String,
        enum: ['admin','receptionist','accountant','pharmacist'],
        required:true,lowercase:true,
        default:"receptionist",
    },
    phoneno:{type:String,required:true,unique:true,validate:/^01[0125](-)?[0-9]{8}$/},
    email:{type:String,lowercase:true,unique:true,validate:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,trim:true},
    address: address_schema,
    password:{type:String,required:true,unique:true},
    salary:{type:Number,required:true,min:3000},
    gender:{type:String,required:true,
        enum:['female','male']
     },
    workHours:{type:Number,required:true},
    employeeImage: { type:String},
    age:{type:Number,min:18},
    clinictId:{type:Array,ref:'clinic'},
    dept_id:{type:Number,ref:'Department'}
    
},{_id:false})


module.exports=mongoose.model('employee',EmployeeSchema)
