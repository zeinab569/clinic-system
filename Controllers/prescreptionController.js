const { body } = require("express-validator");
const mongoose=require("mongoose");
 require("./../Models/prescreptionModel");
const prescreptionSchema=mongoose.model("prescriptions");
//for admin premission
exports.getAllprescreptions=(request,response,next)=>{
    prescreptionSchema.find()
    .populate({path:"patient_id",select:{firstName:1,lastName:1,age:1,gender:1}})
    .populate({path:"doctor_id",select:{fullName:1}})
    .populate({path:"clinic_id",select:{_id:0}})
    .populate({path:"medicine.id",select:{Name:1,Recommendation:1,price:1}})
    .populate({path:"dept_id",select:{_id:0,Name:1}})
    .then((data)=>{
       response.status(200).json(data);
   }).catch(error=>
    {next(error);
    })
   
}
//Adding 
exports.createPrescreption=(request,response,next)=>{
   let newprescreption=new prescreptionSchema({
       _id:request.body.id,
       medicine:[{id:request.body.medicine.id ,
         quantity:request.body.medicine.quantity,
         period:request.body.medicine.period }],
       dosage:request.body.dosage , 
      patient_id:request.body.patient_id,
      doctor_id:request.body.doctor_id,
      clinic_id:request.body.clinic_id,
      dept_id:request.body.dept_id,
      
       
   });
   newprescreption.save()
                 .then(()=>{response.status(201).json({message:"New Prescreption is Created"}) })
                 .catch(error=>{next(error)})

   
   }


   // deleting
exports.deletePrescreption=(request,response,next)=>{

prescreptionSchema.deleteOne({
       _id:request.body.id,
 
   }
   ).then(result=>
       
       {
           response.status(200).json({message:"prescription is deleted"});
   
       }).catch(error=>next(error))
   
   
   }

   //updating
exports.updatePrescreptions=(request,response,next)=>{

    prescreptionSchema.updateOne({_id:request.body.id},{
    
            $push: {medicine:{id:request.body.medicine.id ,
                quantity:request.body.medicine.quantity,
                period:request.body.medicine.period }},
        

        
    })
    .then((data)=>{
        response.status(201).json({message:"prescription is updated successfuly"})
    })
    .catch(error=>{next(error)})
}
module.exports.getPrescrptionBydoctorId=((req,res,next)=>{
       prescreptionSchema.find({doctor_id:req.params.id},{})
       .populate({path:"patient_id",select:{firstName:1,lastName:1,age:1,gender:1}})
    .populate({path:"doctor_id",select:{fullName:1}})
    .populate({path:"clinic_id",select:{_id:0}})
    .populate({path:"medicine.id",select:{Name:1,Recommendation:1,price:1}})
    .populate({path:"dept_id",select:{_id:0,Name:1}})
    sort({doctor_id:1})
       .then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )
    
});
module.exports.getPrescrptionByPatientId=((req,res,next)=>{
    prescreptionSchema.find({patient_id:req.params.id},{})
    .populate({path:"patient_id",select:{firstName:1,lastName:1,age:1,gender:1}})
    .populate({path:"doctor_id",select:{fullName:1}})
    .populate({path:"clinic_id",select:{_id:0}})
    .populate({path:"medicine.id",select:{Name:1,Recommendation:1,price:1}})
    .populate({path:"dept_id",select:{_id:0,Name:1}})
    .then(
         (data) => res.status(200).json(data)
         ).catch(
          error=>next(error)
         )
 
});
module.exports.getPrescrptionById=((req,res,next)=>{
    prescreptionSchema.findOne({_id:req.params.id},{})
    .populate({path:"patient_id",select:{firstName:1,lastName:1,age:1,gender:1}})
    .populate({path:"doctor_id",select:{fullName:1}})
    .populate({path:"clinic_id",select:{_id:0}})
    .populate({path:"medicine.id",select:{Name:1,Recommendation:1,price:1}})
    .populate({path:"dept_id",select:{_id:0,Name:1}})
    .then(
         (data) => res.status(200).json(data)
         ).catch(
          error=>next(error)
         )
 
});

module.exports.sort=((req,res,next)=>{
    if(req.params.sortKey=="PN")
    {
        prescreptionSchema.find({},{})
           .populate({path:"patient_id",select:{firstName:1,lastName:1,age:1,gender:1},sort: [{'firstName':'asc' }]},
        )
        .populate({path:"doctor_id",select:{fullName:1}})
        .populate({path:"clinic_id",select:{_id:0}})
        .populate({path:"medicine.id",select:{Name:1,Recommendation:1,price:1}})
        .populate({path:"dept_id",select:{_id:0,Name:1}})
           .then(
                (data) => res.status(200).json(data)
                ).catch(
                 error=>next(error)
                )   
    }
    else if(req.params.sortKey=="DN")
    {
        prescreptionSchema.find({},{})
        .populate({path:"patient_id",select:{firstName:1,lastName:1,age:1,gender:1}})
        .populate({path:"doctor_id",select:{fullName:1}})
        .populate({path:"clinic_id",select:{_id:0}})
        .populate({path:"medicine.id",select:{Name:1,Recommendation:1,price:1}})
        .populate({path:"dept_id",select:{_id:0,Name:1}})
           .then(
                (data) => res.status(200).json(data)
                ).catch(
                 error=>next(error)
                )
    }
    else if(req.params.sortKey=="PID")
    {
        prescreptionSchema.find({},{})
        .populate({path:"patient_id",select:{firstName:1,lastName:1,age:1,gender:1}})
        .populate({path:"doctor_id",select:{fullName:1}})
        .populate({path:"clinic_id",select:{_id:0}})
        .populate({path:"medicine.id",select:{Name:1,Recommendation:1,price:1}})
        .populate({path:"dept_id",select:{_id:0,Name:1}})
        .sort({patient_id:1})
           .then(
                (data) => res.status(200).json(data)
                ).catch(
                 error=>next(error)
                )
    }
    else if(req.params.sortKey=="DID")
    {
        prescreptionSchema.find({},{})
        .populate({path:"patient_id",select:{firstName:1,lastName:1,age:1,gender:1}})
        .populate({path:"doctor_id",select:{fullName:1}})
        .populate({path:"clinic_id",select:{_id:0}})
        .populate({path:"medicine.id",select:{Name:1,Recommendation:1,price:1}})
        .populate({path:"dept_id",select:{_id:0,Name:1}})
        sort({doctor_id:1})
           .then(
                (data) => res.status(200).json(data)
                ).catch(
                 error=>next(error)
                )
    }
    else
    {
        prescreptionSchema.find().populate({path:"patient_id",select:{firstName:1,lastName:1,age:1,gender:1}})
        .populate({path:"patient_id",select:{firstName:1,lastName:1,age:1,gender:1}})
        .populate({path:"doctor_id",select:{fullName:1}})
        .populate({path:"clinic_id",select:{_id:0}})
        .populate({path:"medicine.id",select:{Name:1,Recommendation:1,price:1}})
        .populate({path:"dept_id",select:{_id:0,Name:1}})
        .then((data)=>{
           response.status(200).json(data);
       }).catch(error=>next(error))
    }
})
    