const { request, response, query } = require('express');
const mongoose =require('mongoose');
require("./../Models/clinic");
require("./../Models/doctor");
const clinicSchema=mongoose.model("clinic");


//get all clinic
exports.getAllClinic=(request,response,next)=>{
    clinicSchema.find({})
     .populate({path:"schedule.doctorId",select:'fullName'})
     .populate({path:"schedule.departmentId",select:'Name'})
     .then((data )=>{ 
        response.status(200).json({message:"All Clinic sorted by name.....",data});
    })
    .catch(error=>{
      next(error);
    })
}

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
}
      
//update clinic (id)
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
}

//get clinic(id) 
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
}

//delete clinic(id) 
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
}

//filter & sort 
exports.SearchClinic=async(request,response,next)=>{
    try {
      //  Filtering
      const queryObj = { ...request.query }
      const excludedFields = ['page', 'sort', 'limit', 'fields']
      excludedFields.forEach(el => delete queryObj[el])
      console.log(queryObj)
  
      // Advanced filtering
      let queryString = JSON.stringify(queryObj)
      console.log(queryString)
      queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)  
      let query = clinicSchema.find(JSON.parse(queryString))
      
     //sort
      if (request.query.sort) {
        const sortBy = request.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
      } else {
        query = query.sort('clinicName')
      }
  
      const res = await query
      response.status(200).json({
        status: 'success',
        results: res.length,
        data: {
          res
        }
      });
     
    } catch (err) {
      response.status(400).json({
        status: 'fail',
        message: err
      })
    }
}
        



