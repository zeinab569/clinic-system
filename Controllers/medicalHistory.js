const { default: mongoose } = require('mongoose')
require('mongoose');
require('../Models/pateintMedicalHistoryModel')
const MedicalHistorySchema=mongoose.model("MedicalHistory");

exports.createMedicalHistory=((req,res,next)=>
{
 let addpateintMedicalHistory=new MedicalHistorySchema({
    patientId:req.body.patientId,
    "medicinesbefore.name":req.body.medicinesbefore.name,
    "medicinesbefore.quantity":req.body.medicinesbefore.quantity,
    "medicinesbefore.from":req.body.medicinesbefore.from,
    "medicinesbefore.to":req.body.medicinesbefore.to,
    medicine:req.body.prescriptionNumber,
    chronicdiseases:req.body.chronicdiseases,
    bloodType:req.body.bloodType,
    doctorId:req.body.doctorId

 });
 addpateintMedicalHistory.save().then(
    data=>{res.status(200).json({message:"medical history is added succesfully"})}
 ).catch(err=>next(err))
});
exports.editpateintMedicalHistory=((req,res,next)=>{
    MedicalHistorySchema.updateOne({_id:req.body.id},{
        $set:{
            _id:req.body.id,
            medicine:req.body.prescriptionNumber,
            chronicdiseases:req.body. chronicdiseases,
            "medicinesbefore.name":req.body.medicinesbefore.name,
            "medicinesbefore.quantity":req.body.medicinesbefore.quantity,
            "medicinesbefore.from":req.body.medicinesbefore.from,
            "medicinesbefore.to":req.body.medicinesbefore.to,
        }
      }).then(
        result=>{
            res.status(201).json({message:" MedicalHistory is updated"})}
      ).catch(
        error=>next(error)
      )
});
exports.getAllMedicalHistory=((req,res,next)=>{   
MedicalHistorySchema.find().populate({path:"patientId",select:'firstName lastName age gender'})
.populate({path:"doctorId",select:'fullName Specialization'})
.populate({path:"medicine",select:'medicine'})
.then(
(data)=>res.status(200).json(data) 
)
});
exports.getMedicalHistoryByPatientId=((req,res,next)=>{
    MedicalHistorySchema.findOne({patientId:req.params.id})
    .populate({path:"patientId",select:'firstName lastName age gender'})
    .populate({path:"doctorId",select:'fullName Specialization'}).
    populate({path:"medicine",select:'medicine'}).then(
    (data)=>res.status(200).json(data) 
    )
    })
exports.getMedicalHistoryByDoctorId=((req,res,next)=>{
        MedicalHistorySchema.find({doctorId:req.params.id}).
        populate({path:"patientId",select:'firstName lastName age gender'})
        .populate({path:"doctorId",select:'fullName Specialization'}).
        populate({path:"medicine",select:'medicine'}).then(
        (data)=>res.status(200).json(data) 
        )
        })
exports.getMedicalHistoryById=((req,res,next)=>{
            MedicalHistorySchema.findOne({_id:req.params.id})
            .populate({path:"patientId",select:'firstName lastName age gender'})
            .populate({path:"doctorId",select:'fullName Specialization'}).
            populate({path:"medicine",select:'medicine'})
           then(
            (data)=>res.status(200).json(data) 
            )
            })
 exports.deleteMedicalHistory =((req,res,next)=>  {
  MedicalHistorySchema.deleteOne({_id:req.body.id}).then(data=>res.status(200).json({message:"deleted is done"}))
  .catch(err=>next(err))
 })      
