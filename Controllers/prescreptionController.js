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
    //.populate({path:"medicine.id",select:{Name:1,Recommendation:1,price:1}})
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
                 .then((data)=>{response.status(201).json(data) })
                 .catch(error=>{next(error)})

   
   }


   // deleting
exports.deletePrescreption=(request,response,next)=>{

prescreptionSchema.deleteOne({
       _id:request.params.id,
 
   }
   ).then(result=>
       
       {
        console.log(result)
           response.status(200).json({message:"prescription is deleted ^_^"});
   
       }).catch(error=>next(error))
   
   
   }

   //updating
exports.updatePrescreptions=(request,response,next)=>{
    prescreptionSchema.updateOne({_id:request.params.id},{
             $push: {medicine:{id:request.body.medicine.id ,
                quantity:request.body.medicine.quantity,
                period:request.body.medicine.period }},

        

        
    })
    .then((data)=>{
        console.log(request.id)
        response.status(201).json({message:"prescription is updated successfuly"})
    })
    .catch(error=>{next(error)})
}
module.exports.getPrescrptionBydoctorId=((req,res,next)=>{
       prescreptionSchema.find({doctor_id:req.params.id},{})
       .populate({path:"patient_id",select:{firstName:1,lastName:1,age:1,gender:1,img:1}})
    .populate({path:"doctor_id",select:{fullName:1}})
    .populate({path:"clinic_id",select:{_id:0}})
    .populate({path:"medicine.id",select:{Name:1,Recommendation:1,price:1}})
    .populate({path:"dept_id",select:{_id:0,Name:1}})
    .sort({doctor_id:1})
       .then(
            (data) =>
            { 
                
                res.status(200).json(data)
            }

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
        .populate({path:"dept_id",select:{_id:0,Name:1},sort: [{'Name':'asc' }]})
        
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
        .sort({doctor_id:1})
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
});
exports.searchPrescrption=async(req,res,next)=>{
   try {
     const queryObj = { ...req.query }
     const excludedFields = ['page', 'sort', 'limit', 'fields']
     excludedFields.forEach(el => delete queryObj[el])
     console.log(queryObj)
     // Advanced filtering
     let queryString = JSON.stringify(queryObj)
     console.log(queryString)
     queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)  
     let query = prescreptionSchema.find(JSON.parse(queryString))
     
    //sort
     if (req.query.sort) {
       const sortBy = req.query.sort.split(',').join(' ')
       query = query.sort(sortBy)
     } else {
       query = query.sort('_id')
     }
 
     const searchFilterKey = await query
     res.status(200).json({status: 'success',results: searchFilterKey.length,data:searchFilterKey});
    } 
    catch (err) {next(err) }
 }  
    