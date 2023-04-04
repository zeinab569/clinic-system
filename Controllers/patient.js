const { default: mongoose } = require('mongoose')
require('../Models/patient');
const patientSchema=mongoose.model("patient");
exports.getAllPatient=(req,res,next)=>{
    patientSchema.find()
    .populate({path:"appointmentId.appointmentid",select:{date:1, time:1, status:1,_id:0}})
    .populate({path:"healthRecordId",select:{patientId:0}})
    .populate({path:"prescriptionId",select:{_id:0}})
    .populate({path:"clinicId",select:{clinicName:1}})
    .then((data)=>{
        res.status(200).json(data)
       // console.log(Buffer.from(data[0].img).toString())
        // console.log(data.img.data);
        // const b=Buffer.from(data.img.data)
        // console.log(b.toString())
    })
    .catch(error=>{next(error)})
}
exports.getPatientById=(req,res,next)=>{
    patientSchema.findOne({_id:req.params.id})
    .populate({path:"appointmentId.appointmentid",select:{date:1, time:1, status:1,_id:0}})
    .populate({path:"healthRecordId",select:{patientId:0}})
    .populate({path:"prescriptionId",select:{_id:0}})
    .populate({path:"clinicId",select:{clinicName:1}})
   
    .then((data)=>{
        
        res.status(200).json(data)
    })
    .catch(error=>{next(error)})
}
exports.getPatientByDoctorId=(req,res,next)=>{
    patientSchema.findOne({doctor_id:req.params.id})
    .populate({path:"appointmentId.appointmentid",select:{date:1, time:1, status:1,_id:0}})
    .populate({path:"healthRecordId",select:{patientId:0}})
    .populate({path:"prescriptionId",select:{_id:0}})
    .populate({path:"clinicId",select:{clinicName:1}})
   
    .then((data)=>{
        
        res.status(200).json(data)
    })
    .catch(error=>{next(error)})
}
exports.createPatient=(req,res,next)=>{
    let addPatientSchema=new patientSchema({
         firstName:req.body.patientFirstName,
         lastName:req.body.patientLastName,
         age:req.body.patientAge,
         gender:req.body.patientGender,
         "address.city":req.body.address.city,
         "address.street":req.body.address.street,
         "address.building":req.body.address.building,
         email:req.body.patientEmail, 
        insuranceNumber:req.body.patientInsuranceNumber,
        // insuranceCompany:parseInt(req.body.insuranceCompany),
        phoneNumber:req.body.patientPhoneNumber,
        appointmentId:[{appointmentid:req.body.appointmentId}],
        healthRecordId:req.body.healthRecordId,
        clinicId:req.body.clinicId,
        img: "http://localhost:8080/"+Buffer.from(req.file.path)
        
    });
    addPatientSchema.save(

    ).then(
        (result)=>res.status(200).json({message:"New patient is added"})
    ).catch(error=>{next(error)})

}
exports.deletePatient=((req,res,next)=>{
    patientSchema.deleteOne({_id:req.params.id}).then(result=>
       
        {
            res.status(200).json({message:"patient is deleted"});
    
        }).catch(error=>next(error))
  });
  exports.editPatient=((req,res,next)=>{
      patientSchema.updateOne({_id:req.params.id},{
        $set:{
            age:req.body.patientAge,
            "address.city":req.body.address.city,
            "address.street":req.body.address.street,
            "address.building":req.body.address.building,
            email:req.body.patientEmail,
            phoneNumber:req.body.patientPhoneNumber, 
        },
        // $push: { appointmentId:{appointmentid:req.body.appointmentId}},
      }).then(
        result=>{
            res.status(201).json({message:" patient is updated"})}
      ).catch(
        error=>next(error)
      )
  });
  exports.filterbyKey=((req,res,next)=>{
    if(!(isNaN(req.params.filterKey)))
    {
        patientSchema.find({age:req.params.filterKey},{})
        .populate({path:"appointmentId.appointmentid",select:{date:1, time:1, status:1,_id:0}})
    .populate({path:"healthRecordId",select:{patientId:0}})
    .populate({path:"prescriptionId",select:{_id:0}})
    .populate({path:"clinicId",select:{clinicName:1}})
        .sort({firstName:1}).then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )
    }
    else if((req.params.filterKey=="female"||req.params.filterKey=="male"))
    {
        patientSchema.find({gender:req.params.filterKey},{})
        .populate({path:"appointmentId.appointmentid",select:{date:1, time:1, status:1,_id:0}})
        .populate({path:"healthRecordId",select:{patientId:0}})
        .populate({path:"prescriptionId",select:{_id:0}})
        .populate({path:"clinicId",select:{clinicName:1}}).sort({firstName:1}).then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )
    }
    else
    {
        patientSchema.find({firstName:req.params.filterKey},{})
        .populate({path:"appointmentId.appointmentid",select:{date:1, time:1, status:1,_id:0}})
        .populate({path:"healthRecordId",select:{patientId:0}})
        .populate({path:"prescriptionId",select:{_id:0}})
        .populate({path:"clinicId",select:{clinicName:1}}).sort({age:1}).then(
            (data) => {
                if(data.length!=0)
                {
                    res.status(200).json(data);
                }
                else{
                    patientSchema.find({lastName:req.params.filterKey},{}).sort({age:1}).then(
                        (data)=>{
                            res.status(200).json(data);
                        }
                    ).catch(
                        error=>next(error)
                       )  
                }
             }
            ).catch(
             error=>next(error)
            ) 
    }
  
  
    
  })
exports.sortbykey=((req,res,next)=>{
    if(req.params.sortKey=="age")
    {
        patientSchema.find({},{})
        .populate({path:"appointmentId.appointmentid",select:{date:1, time:1, status:1,_id:0}})
    .populate({path:"healthRecordId",select:{patientId:0}})
    .populate({path:"prescriptionId",select:{_id:0}})
    .populate({path:"clinicId",select:{clinicName:1}}).sort({age:1}).then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )
    }
    else if(req.params.sortKey=="fN")
    {
        patientSchema.find({},{})
        .populate({path:"appointmentId.appointmentid",select:{date:1, time:1, status:1,_id:0}})
    .populate({path:"healthRecordId",select:{patientId:0}})
    .populate({path:"prescriptionId",select:{_id:0}})
    .populate({path:"clinicId",select:{clinicName:1}}).sort({firstName:1}).then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )   
    }
    else if(req.params.sortKey=="LN")
    {
        patientSchema.find({},{})
        .populate({path:"appointmentId.appointmentid",select:{date:1, time:1, status:1,_id:0}})
    .populate({path:"healthRecordId",select:{patientId:0}})
    .populate({path:"prescriptionId",select:{_id:0}})
    .populate({path:"clinicId",select:{clinicName:1}}).sort({lastName:1}).then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )   
    }
    else if(req.params.sortKey=="app")
    {
        patientSchema.find({},{})
        .populate({path:"appointmentId.appointmentid",select:{date:1, time:1, status:1,_id:0},sort: [{'date':'asc' }]})
        .populate({path:"healthRecordId",select:{patientId:0}})
        .populate({path:"prescriptionId",select:{_id:0}})
        .populate({path:"clinicId",select:{clinicName:1}}).then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )   
    }
})

exports. searchPatient=async(req,res,next)=>{
    try {
      const queryObj = { ...req.query }
      const excludedFields = ['page', 'sort', 'limit', 'fields']
      excludedFields.forEach(el => delete queryObj[el])
      console.log(queryObj)
      // Advanced filtering
      let queryString = JSON.stringify(queryObj)
      console.log(queryString)
      queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)  
      let query = patientSchema.find(JSON.parse(queryString))
      
     //sort
      if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
      } else {
        query = query.sort('firstName')
      }
  
      const searchFilterKey = await query
      res.status(200).json({status: 'success',results: searchFilterKey.length,data:searchFilterKey});
     } 
     catch (err) {next(err) }
  } 