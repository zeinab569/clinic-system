const { query } = require("express");
const mongoose=require("mongoose");
 require("./../Models/departmentModel");
 const DepartmentSchema=mongoose.model("Department");
 //getting all Departments//Done
 exports.getAllDepartment=(request,response,next)=>{

    DepartmentSchema.find()
    //.populate('doctor')
    //.populate('patient')
    .then((data)=>{

        response.status(200).json(data);
    }).catch(error=>next(error))
    
 }
//adding new Department //Done
 exports.AddDepartment=(request,response,next)=>{
    let NewDepartment=new DepartmentSchema({
        _id:request.body._id,
        Name: request.body.Name,   
        Service:request.body.Service
,
      doctor_id:request.body.doctor_id,
      patient_id:request.body.patient_id


        
    });

    NewDepartment.save()
        .then((data)=> 
            {
                    response.status(201).json({message:"new Department added to the clinic"}) })
            .catch(error=>{next(error)})

    
    }

  //deleting department by id //Done
    exports.DeleteDepartmentById= async (request,response,next)=>{
    const id=request.params.id;

      try{
 const result= await DepartmentSchema.findOneAndDelete(id);
 response.status(200).json({message:` this Department is no longer in the clinic 'DELETED SUCCESSFULLY'`});
 console.log(result);
 response.send(result);
 
      }
catch(error){

    console.log(error.message);
}
            
            
    }

 //updating department//Done
exports.updateDepartment= async(req,res,next)=>{
try{
const _id=req.params._id;
const update=req.body;
const options={new :true}
const result= await  DepartmentSchema.findByIdAndUpdate(_id,update,options);

res.send(result);
response.status(200).json({message:` UPDATED SUCCESSFULLY`});

}
       catch(error){
        console.log(error.message);
        next(error);
    }
    
}

//getting Department By Name//Done
    // exports.getDepartmentbyName= (req, res, next) => {
    //     DepartmentSchema.findOne({ Name: req.params.Name })
    //         .then((data) => {
    //             if (data == null) throw new Error("We have no D with that Name");
    //             res.status(200).json(data);
    //         })
    //         .catch((err) => {
    //             next(err);
    //         });
    // };
    
//Getting Department by ID//Done
    exports.getDepartmentbyId = (req, res, next) => {
        DepartmentSchema.findOne({ _id: req.params._id })
            // .populate({ path: "doctor" })
    
            .then((data) => {
                if (data == null) throw new Error("there is No department with this id");
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            });
    };

//sortBy Name
exports.SortByName=(req, res, next)=>{
   try{
        DepartmentSchema.find().sort({Name:1}).exec((error,docs)=>{

            if(error){
                responseobject={
                    "status":"error",
                    "msg":"input is missing",
                    "body":{}
                }
                res.status(500).send(responseobject);
            }

            else{
                responseobject={
                    "status":"success",
                    "msg":"Record Found",
                    "body":docs
                }
                res.status(200).send(responseobject);
            }

        
    })


   }
catch(error){
console.log(error);
}


}
    //Search Record || Filter By Name
    exports.SearchRecord=(req, res, next)=>{

        try{

            if(!req.body){
                responseobject={
                    "status":"error",
                    "msg":"input is missing",
                    "body":{}
                }
                res.status(500).send(responseobject);
            }else{
                //exact match
                DepartmentSchema.find({Name:{$regex:`^${req.body.Name}`,$options:'i'}},(error,docs)=>{

                    if(error){
                        responseobject={
                            "status":"error",
                            "msg":"input is missing",
                            "body":{}
                        }
                        res.status(500).send(responseobject);
                    }

                    else{
                        responseobject={
                            "status":"success",
                            "msg":"Record Found",
                            "body":docs
                        }
                        res.status(200).send(responseobject);
                    }
                })
            }

        }
        catch(error){
console.log("error:",error)
        }
        
    }







