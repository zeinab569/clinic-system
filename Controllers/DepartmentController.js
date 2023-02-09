const { query } = require("express");
const mongoose=require("mongoose");
 require("./../Models/departmentModel");
 const DepartmentSchema=mongoose.model("Department");
 //getting all Departments//Done
 exports.getAllDepartment=(request,response,next)=>{

    DepartmentSchema.find()
    .populate({
        path: 'doctor',select: 'fullName'
    })
 .populate('patient')
    .then((data)=>{

        response.status(200).json(data);
    }).catch(error=>next(error))
    
 }
//adding new Department //Done
 exports.AddDepartment=(request,response,next)=>{
    let NewDepartment=new DepartmentSchema({
  
        Name: request.body.Name,   
        Service:request.body.Service,
      doctor:request.body.doctor,
      patient:request.body.patient,
      phoneNumber:request.body.phoneNumber,
      medicine:request.body.medicine
    });

    NewDepartment.save()
        .then(()=> 
            { response.status(201).json({message:"new Department added to the clinic"})})
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




    exports.DeleteDepartment=(request,response,next)=>{
        let Name=request.body.Name;
        DepartmentSchema.delete({
                _id:request.body.id,
                Name:request.body.Name
            }
            ).then(result=>
                
                {
                    response.status(200).json({message:`${Name} is deleted from the pharmacy`});
            
                }).catch(error=>next(error))
            
            
            }


 //updating department//Done
exports.updateDepartment= async(req,res,next)=>{
try{
const _id=req.params._id;
const update=req.body;
const options={new :true}
const result= await  DepartmentSchema.findByIdAndUpdate(id,update,options).populate('doctor');

res.send(result);
response.status(200).json({message:` UPDATED SUCCESSFULLY`});

}
       catch(error){
        console.log(error.message);
        next(error);
    }
    
}


    
//Getting Department by ID
    exports.getDepartmentbyId = (req, res, next) => {
        DepartmentSchema.findOne({ _id: req.params._id }).populate({ path: "doctor" }).populate({ path: "patient" })
    
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


    exports.SearchDepartment= async (request,response,next)=>{
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
          let query = DepartmentSchema.find(JSON.parse(queryString))
          
         //sort
          if (request.query.sort) {
            const sortBy = request.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
          } else {
            query = query.sort('Name')
          }
      
          const res =  await query
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




