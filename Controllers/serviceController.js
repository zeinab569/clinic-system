const { query } = require("express");
const mongoose=require("mongoose");
 require("./../Models/serviceModel");
 const ServiceSchema=mongoose.model("Service");
 //getting all Service
 exports.getAllService=(request,response,next)=>{

    ServiceSchema.find().then((data)=>{
        response.status(200).json(data);
    }).catch(error=>next(error))
    
 }

//deleting
 exports.DeleteService=(request,response,next)=>{
    let Name=request.body.Name;
        MedicineSchema.delete({
            _id:request.body.id,
            Name:request.body.Name
        }
        ).then(result=> 
            {
                response.status(200).json({message:`${Name} is deleted from the pharmacy`});
        
            }).catch(error=>next(error))
        }
//adding new Service 

exports.AddService=(request,response,next)=>{
    let NewService=new ServiceSchema({
      
       name: request.body.name,   
       price:request.body.price,
       description:request.body.description
    });
    NewService.save()
        .then(()=> 
            { response.status(201).json({message:"new Service added to the Department"})})
            .catch(error=>{next(error)})
    }

  //deleting Service by id 
    exports.DeleteServiceById= async (request,response,next)=>{
    const id=request.params.id;

      try{
 const result= await ServiceSchema.findOneAndDelete(id);
 response.status(200).json({message:` this Department is no longer in the clinic 'DELETED SUCCESSFULLY'`});
 console.log(result);
 response.send(result);
 
      }
catch(error){

    console.log(error.message);
}
            
            
    }

 //updating Service
exports.updateService= async(req,res,next)=>{
try{
const id=req.params._id;
const update=req.body;
const options={new :true}
const result= await  DepartmentSchema.findByIdAndUpdate(id,update,options);

res.send(result);
response.status(200).json({message:` UPDATED SUCCESSFULLY`});

}
       catch(error){
        console.log(error.message);
        next(error);
    }
    
}

//getting Service By Name
    exports.getServicebyName= (req, res, next) => {
        ServiceSchema.findOne({ Name: req.params.Name })
            .then((data) => {
                if (data == null) throw new Error("We have no service with that Name");
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            });
    };
    
//Getting Service by ID
    exports.getServicebyId = (req, res, next) => {

ServiceSchema.findOne({ _id: req.params._id })
.then((data) => {
                if (data == null) throw new Error("there is No Service with this id");
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            });
    };

//sortBy price
exports.SortByprice=(req, res, next)=>{
   try{
    ServiceSchema.find().sort({price:-1}).exec((error,docs)=>{

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
                ServiceSchema.find({Name:{$regex:`^${req.body.Name}`,$options:'i'}},(error,docs)=>{

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


   

