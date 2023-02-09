
const mongoose=require("mongoose")
require("../Models/serviceModel")
const serviceSchema=mongoose.model("Service")


exports.addService=(req,res,next)=>{
    let newService= new serviceSchema({
        _id:req.body.id,
        name:req.body.name,
        price:req.body.price,
        departmentID:req.body.departmentID
    })

newService.save(

    ).then(
        (result)=>res.status(200).json({message:"New service is added"})
    ).catch(error=>{next(error)})
    }