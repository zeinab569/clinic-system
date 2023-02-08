const mongoose=require('mongoose');
const autoIncrement=require("mongoose-sequence")(mongoose)
const patientAddress_schema=new mongoose.Schema({
    city:{type:String,minlength:"4",required:true},
    street:{type:String,minlength:"4",required:true},
    building:{type:Number ,min:1}
},{ _id : false });
const appointmentSchema=new mongoose.Schema({
    appointmentid:{type:Number,ref:"appointment"}
},{_id:false})
const patientSchema= new mongoose.Schema(
    {
        _id:{
            type:Number 
          },
        firstName:{
            type:String,required:true,
            match:/^[a-z]{3,}$/i
        },
        lastName:{
            type:String,
            required:true,
            match:/^[a-z]{3,}$/i 
        },
        age:{
            type:Number,
            required:true,
            min:1
        },
        gender:{
            type:String,
            enum:['female','male']
         },
        address:patientAddress_schema,
        email:{type:String,
            match: /.+\@.+\..+/,
            unique: true},  
        insuranceNumber:{
            type:String,
            unique:true,
            minlength:14,
            maxlength:14}, 
        phoneNumber:{type:String,
            minlength:12
            ,maxlength:12,
            match:/^(010|011|012|015)+-+\d{8}$/
        },
        img:
        {
            data: Buffer,
            contentType: String
        },
        appointmentId:[
            appointmentSchema
        ],
        prescriptionId:{
            type:Number,
           ref:"prescriptions"
        },
        healthRecordId:{
            type:Number,
            ref:"MedicalHistory"
        },
        clinicId:{
            type:Number,
            ref:"clinic"
        } 
        
    },{_id:false}
)
//  patientSchema.plugin(autoIncrement);
 mongoose.model('patient',patientSchema)