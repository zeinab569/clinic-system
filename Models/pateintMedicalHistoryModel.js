const mongoose =require("mongoose")
const autoIncrement=require("mongoose-sequence")(mongoose)
const medicineSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        },
        quantity:
        {
            type:Number
        },
        from:{
            type:String,
            required:true,
            match:/^\d{4}-\d{2}-\d{2}$/,
        },
        to:{
            type:String,
            required:true,
            match:/^\d{4}-\d{2}-\d{2}$/,
        }

},{_id:false})
const MedicalHistory=new mongoose.Schema(
        {
            _id:{type:Number},
          medicinesbefore:medicineSchema,
          medicine:{type:Number,  ref:"prescriptions"},
          chronicdiseases:{type:String,required:true},
          bloodType:{
            type:String,
            enum:['AB-','A+','B+','O+','A-','B-','O-','AB+']
          },
          patientId:{type:Number,
            required:true,ref:"patient"},
          doctorId:{type:Number,
            required:true,ref:"doctor"}
        },{_id:false}
    )
mongoose.model('MedicalHistory',MedicalHistory)  