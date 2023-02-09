const { request, response } = require('express');
const mongoose =require('mongoose');
require("./../Models/doctor");
const doctorSchema=mongoose.model("doctor");


exports.getAllDoctors=(request,response,next)=>{
    doctorSchema.find({})
    .populate({path:"clinicId",select:'clinicName'})
    .populate("departmentId",{'Name':1})
    .populate("prescreption",{'_id':1 })
    .populate("patientid",{'firstName':1,'lastName':1})
    // .populate({path:"appointments"})


  .then((data) => {
    if (data ){ 
      response.status(200).json({message:"The Doctor with this Id.....",data});
      console.log(data);
    }else {
      next(new Error("Doctor  is not  here -_-"));
    }
  })
  .catch((error) => next(error));
}


exports.addDoctors=async(request,response,next)=>{
  const emailTest= await doctorSchema.findOne({email:request.body.email});
  if(emailTest){
    return response.status(400).json({message:"email is already here ^_^"});
  }
  
    let doctorObject=new doctorSchema({

        fullName:       request.body.fullName,
        userName:request.body.userName,
        email:          request.body.email,
       // doctorImage:     request.file.path,
        Specialization:request.body.Specialization,
        salary:request.body.salary,
        departmentId:request.body.departmentId,
        phoneNumber:request.body.phoneNumber,
        address:
        {
          city:request.body.city,
          street:request.body.street,
          building:request.body.building
         }

      
    });
    doctorObject.save()
                  .then(()=>{response.status(201).json({message:"Add is done successfully ^_^"}) })
                  .catch(error=>{next(error)})
    }//done 


exports.updateDoctor=(request,response,next)=>{
        doctorSchema.updateOne({_id:request.params._id},{
            $set:{
              fullName:  request.body.fullName,
              email:     request.body.email,
              userName:request.body.userName,
              password:request.body.password,
              clinicId:request.body.clinicId,
              salary:request.body.salary,
              departmentId:request.body.departmentId,
              phoneNumber:request.body.phoneNumber,
              address:
              {
                city:request.body.city,
                street:request.body.street,
                building:request.body.building
               }
            },
        })
        .then((data)=>{
            if(data.modifiedCount==0){
                throw new Error("not fount yet -_-")
            }
            console.log(data),
            response.status(201).json({message:"update is done successfully ^_^"})
        })
        .catch(error=>{next(error)})
    }// done 
     
    
exports.deleteDoctorbyID=(request,response,next)=>{
            doctorSchema.deleteOne({_id:request.params._id})
            .then((data)=>{
                console.log(data)
                if(data.deletedCount!=0){
                   response.status(201).json({message:"delete is done successfully ^_^"}) 
                }
                else{
                    next(new Error("Not found.."+request.params._id))
                }
            })
    }//done 
            
    
exports.getDoctorById=(request,response,next)=>{
        doctorSchema.findOne({ _id: request.params._id })
        .then((data) => {
          if (data){ 
            response.status(200).json({message:"The Doctor with this Id.....",data});
          }else {
            next(new Error("Doctor is not  here -_-"));
          }
        })
        .catch((error) => next(error));


    }//done 

 
exports.SearchDoctor=(request,response,next)=>{
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
        let query = doctorSchema.find(JSON.parse(queryString))
        
       //sort
        if (request.query.sort) {
          const sortBy = request.query.sort.split(',').join(' ')
          query = query.sort(sortBy)
        } else {
          query = query.sort('salary')
        }
    
        const res = query
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
    
    


