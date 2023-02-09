const { request, response, query } = require('express');
const mongoose =require('mongoose');

require("./../Models/clinic");
require("./../Models/doctor");
const clinicSchema=mongoose.model("clinic");


// sort fun too use it while getting
const clinicSort=(data,query)=>{
    let sortKey=query.sortKey||'clinicName';
    let order = query.order||'asc';
    let orderValue = order==='asc'? 1:-1
    return data.sort((a,b)=>{
        if(a[sortKey]<b[sortKey]) return -1*orderValue
        if(a[sortKey]>b[sortKey]) return  1*orderValue

    })
}//done trueeeeeeeeeee




//get all clinic
exports.getAllClinic=(request,response,next)=>{
  
    clinicSchema.find({})//call filter here
 
     .populate({path:"schedule.doctorId",select:'fullName'})
     .populate({path:"schedule.departmentId",select:'Name'})
    .then((data )=>{ 
        sortedData=clinicSort(data,request.query)
        response.status(200).json({message:"All Clinic sorted by name.....",sortedData});
    })
    .catch(error=>{
      next(error);
    })
}//done trueeeeeeeeeee


//add a new clinic  
exports.addClinic=(request,response,next)=>{
        let clinicObject=new clinicSchema({
         
            clinicName: request.body.clinicName,
            contact:{
                email: request.body.email,
                phoneNumber:request.body.phoneNumber
            },
            location:{
                city:request.body.city,
                street:request.body.street,
                building:request.body.building
            },
            schedule:{
                date:request.body.date,
                departmentId:request.body.departmentId,
                doctorId:[request.body.doctorId],
            }
        });
        clinicObject.save()
                        .then(()=>{response.status(201).json({message:"Add is done successfully ^_^"}) })
                        .catch(error=>{next(error)})
          }//done trueeeeeeeeeee
      


//update clinic with id
exports.updateClinic=(request,response,next)=>{
        clinicSchema.updateOne({_id:request.params._id},{
            $set:{ clinicName:   request.body.clinicName,
                  contact:{
                    email: request.body.email,
                    phoneNumber:request.body.phoneNumber},
            },
        })
        .then((data)=>{
            if(data.modifiedCount==0){
                throw new Error("not fount yet -_-")
            }
            console.log(data),
            response.status(201).json({message:"update is done successfully ^_^"})
        }).catch(error=>{next(error)}) 
    }//done trueeeeeeeeeee

// get clinic by id   
exports.getClinicById=(request,response,next)=>{
    clinicSchema.findOne({ _id: request.params._id })
        .then((data) => {
          if (data != null){ 
            response.status(200).json({message:"The Clinic with this Id.....",data});
          }else {
            next(new Error("Clinic is not  here -_-"));
          }
        })
        .catch((error) => next(error));
    }//done trueeeeeeeeeeee

//delete clinic by id 
exports.deleteClinicbyId=(request,response,next)=>{
    clinicSchema.deleteOne({_id:request.params._id})
        .then((data)=>{
            // console.log(data)
            if(data.deletedCount!=0){
               response.status(201).json({message:"delete is done successfully ^_^"}) 
            }
            else{
                next(new Error("Not found.."+request.params.id))
            }
        })
     }//done trueeeeeeeeeeeeeeeee
        



     //------------sort----------------//
// exports.filterbyKey=((req,res,next)=>{
//         if((isNaN(req.params.filterKey)))
//         {
//             clinicSchema.find().sort({clinicName:1}).then(
//                 (data) => res.status(200).json(data)
//                 ).catch(
//                  error=>next(error)
//                 )
//         }
//         else
//         {
//             clinicSchema.find({city:req.params.filterKey},{}).sort({city:1}).then(
//                 (data) => {
//                     if(data.length!=0)
//                     {
//                         res.status(200).json(data);
//                     }
//                     else{
//                         res.status(200).json({message:"invalid city D:"})
//                     }

//                  }
//                 ).catch(
//                  error=>next(error)
//                 ) 
//         }
//     })

