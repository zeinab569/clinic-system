const { default: mongoose } = require('mongoose')
require('../Models/patient');
const patientSchema=mongoose.model("patient");
exports.getAllPatient=(req,res,next)=>{
//     patientSchema.aggregate(
//         [{$addFields: {
//           firstVisit:"$prescriptionId",
//           lastVisit: "p"
//     },
    
// },
// // {$lookup:
// //     {
// //         from:"MedicalHistory" ,
// //         localField: "healthRecordId",
// //         foreignField: "_id",
// //         pipeline:[{ $project:  {patientId:0,medicine:0,_id:0}}  ],
// //         as :"patientMedicalHisto"
// //      }
     
//    // },
// ],
//       ).then(data=>{
        
//         res.status(200).json(data);

//     }).catch(err=>next(err))
    patientSchema.find().
    populate({path:"appointmentId",select:{ date:1,status:1}})
    .populate({path:"healthRecordId",select:{patientId:0,medicine:0,_id:0}})
    .populate({path:"prescriptionId",select:{_id:0}}).populate({path:clinicId,select:clinicName})
    .then((data)=>{
        res.status(200).json(data)
    })
    .catch(error=>{next(error)})
}
exports.getPatientById=(req,res,next)=>{
    patientSchema.findOne({_id:req.params.id}).populate({path:"appointmentId",select:{ patient:1}})
    .populate({path:"healthRecordId",select:{_id:1,patientId:1}}).populate({path:"prescriptionId"})
    .populate({path:clinicId,select:clinicName}).then((data)=>{
        res.status(200).json(data)
    })
    .catch(error=>{next(error)})
}
exports.createPatient=(req,res,next)=>{
    let addPatientSchema=new patientSchema({
        _id:req.body.id,
         firstName:req.body.firstName,
         lastName:req.body.lastName,
         age:req.body.age,
         gender:req.body.gender,
        "address.city":req.body.address.city,
        "address.street":req.body.address.street,
        "address.building":req.body.address.building,
         email:req.body.email,
        insuranceNumber:req.body.insuranceNumber,
        phoneNumber:req.body.patientPhoneNumber,

       appointmentId:[{appointmentid:req.body.appointmentId}],
    //    img:req.file.path
        healthRecordId:req.body.healthRecordId
       // img:req.file.path
        
    });
    addPatientSchema.save(

    ).then(
        (result)=>res.status(200).json({message:"New patient is added"})
    ).catch(error=>{next(error)})

}
exports.deletePatient=((req,res,next)=>{
    patientSchema.deleteOne({_id:req.body.id}).then(result=>
       
        {
            res.status(200).json({message:"patient is deleted"});
    
        }).catch(error=>next(error))
  });
  exports.editPatient=((req,res,next)=>{
      patientSchema.updateOne({_id:req.body.id},{
        $set:{
            age:req.body.patientAge,
            "address.city":req.body.address.city,
            "address.street":req.body.address.street,
            "address.building":req.body.address.building,
            email:req.body.patientEmail,
            phoneNumber:req.body.patientPhoneNumber, 
        },
        $push: { appointmentId:{appointmentid:req.body.appointmentId}},
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
        patientSchema.find({age:req.params.filterKey},{}).populate({path:"appointmentId",select:{ patient:1}})
        .populate({path:"healthRecordId",select:{_id:1,patientId:1}}).populate({path:"prescriptionId"}).sort({firstName:1}).then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )
    }
    else if((req.params.filterKey=="female"||req.params.filterKey=="male"))
    {
        patientSchema.find({gender:req.params.filterKey},{}).populate({path:"appointmentId",select:{ patient:1}})
        .populate({path:"healthRecordId",select:{_id:1,patientId:1}}).populate({path:"prescriptionId"}).sort({firstName:1}).then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )
    }
    else
    {
        patientSchema.find({firstName:req.params.filterKey},{}).
        populate({path:"appointmentId",select:{ patient:1}}).populate({path:"healthRecordId",select:{_id:1,patientId:1}}).populate({path:"prescriptionId"}).sort({age:1}).then(
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
        patientSchema.find({},{}).populate({path:"appointmentId",select:{ patient:1}})
        .populate({path:"healthRecordId",select:{_id:1,patientId:1}}).populate({path:"prescriptionId"}).sort({age:1}).then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )
    }
    else if(req.params.sortKey=="fN")
    {
        patientSchema.find({},{}).populate({path:"appointmentId",select:{ patient:1}})
        .populate({path:"healthRecordId",select:{_id:1,patientId:1}}).populate({path:"prescriptionId"}).sort({firstName:1}).then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )   
    }
    else if(req.params.sortKey=="LN")
    {
        patientSchema.find({},{}).populate({path:"appointmentId",select:{ patient:1}})
        .populate({path:"healthRecordId",select:{_id:1,patientId:1}}).populate({path:"prescriptionId"}).sort({lastName:1}).then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )   
    }
    else if(req.params.sortKey=="app")
    {
        patientSchema.find({},{}).populate({path:"appointmentId",select:{ patient:0}},{sort: [{'appointdate':'asc' }]})
        .populate({path:"healthRecordId",select:{_id:1,patientId:1}}).populate({path:"prescriptionId"}).then(
            (data) => res.status(200).json(data)
            ).catch(
             error=>next(error)
            )   
    }
})

