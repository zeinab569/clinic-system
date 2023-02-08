const { request, response } = require('express');
const mongoose =require('mongoose');
require("./../Models/doctor");
const doctorSchema=mongoose.model("doctor");


const filterByKey = (model, query) => {
  let filterKey = {};
  for (let key in query) {
    let value = key;
    if (value.includes("<")) {
      if(value.charAt(value.length - 1) == "<"){(filter[key.slice(0, key.indexOf("<"))] = { $lte: query[key] })}
      else{(filter[key.slice(0, key.indexOf("<"))] = {
        $lt: +value.slice(value.indexOf("<") + 1),
      });}
    
     
    } else if (value.includes(">")) {
      if(value.charAt(value.length - 1) == ">"){(filter[key.slice(0, key.indexOf(">"))] = { $gte: query[key] })}
      else{(filter[key.slice(0, key.indexOf(">"))] = {
        $gt: +value.slice(value.indexOf(">") + 1),
      });}
    } else {
      filterKey[key] = query[key];
    }
    console.log(key);
  }
  return model.find({ ...filterKey});
};

exports.filterDocotr=(request,response,next)=>{
   filterByKey(doctorSchema,request.query)
  .then((data) => {
    if (data ){ 
      response.status(200).json({message:"The Doctor with this Id.....",data});
      console.log(data);
    }else {
      next(new Error("Doctor Specialization is not  here -_-"));
    }
  })
  .catch((error) => next(error));
}
exports.getAllDoctors=(request,response,next)=>{
    doctorSchema.find({})
   .populate({path:"clinicId"})
   //.populate({path:"appointment"}).populate({path:"Department"})//select column
    .then((data )=>{
        response.status(200)
        .json({message:"All Doctors.....",data});
    })
    .catch(error=>{
      next(error);
    })

    }//done trueeeeeeee



exports.addDoctors=async(request,response,next)=>{
  const emailTest= await doctorSchema.findOne({email:request.body.email});
  if(emailTest){
    return response.status(400).json({message:"email is already here ^_^"});
  }
  
    let doctorObject=new doctorSchema({
        _id:        request.body._id,
        fullName:       request.body.fullName,
        doctorImage:     request.file.path,
        email:          request.body.email,
        Specialization:request.body.Specialization,
        address:{
          city:request.body.city,
          // street:request.body.street,
          // building:request.body.building
      }

      
    });
    doctorObject.save()
                  .then(()=>{response.status(201).json({message:"Add is done successfully ^_^"}) })
                  .catch(error=>{next(error)})
    }//done trueeeeeeeeeee









exports.updateDoctor=(request,response,next)=>{
        doctorSchema.updateOne({_id:request.params._id},{
            $set:{ fullName:    request.body.fullName,
                userName:    request.body.userName,
                password:   request.body.password,
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
    }// done trueeeeeeeeee
     
    
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
    }//done trueeeeeeeeeee
            
    
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
    }//done trueeeeeeeeeeeeee



// exports.getDoctorByName=(request,response,next)=>{
//         doctorSchema.find({ fullName:request.params.fullName})
//         .then((data) => {
//                   // response.status(200).json({message:"The Doctor with this Id.....",data});

//           if (data ){ 
//             response.status(200).json({message:"The Doctor with this Id.....",data});
//           }else {
//             next(new Error("Doctor name is not  here -_-"));
//           }
//         })
//         .catch((error) => next(error));
//     }///معتبر ده واللى فوقها حاجه واحده






    //------------sort------------------------//


exports.filterbyKey=((req,res,next)=>{
        if(!(isNaN(req.params.filterKey)))
        {
          doctorSchema.find().sort({fullName:1}).then(
                (data) => res.status(200).json(data)
                ).catch(
                 error=>next(error)
                )
        }
        else if((req.params.filterKey=="female"||req.params.filterKey=="male"))
        {
            doctorSchema.find({gender:req.params.filterKey},{}).sort({fullName:1}).then(
                (data) => res.status(200).json(data)
                ).catch(
                 error=>next(error)
                )
        }

        else
        {
            doctorSchema.find({Specialization:req.params.filterKey},{}).sort({age:1}).then(
                (data) => {
                    if(data.length!=0)
                    {
                        res.status(200).json(data);
                    }
                    else{
                        res.status(200).json({message:"invalid Specialization D:"})
                    }

                 }
                ).catch(
                 error=>next(error)
                ) 
        }
    })

