const mongoose=require("mongoose");
 require("./../Models/serviceModel");
 const ServiceSchema=mongoose.model("Service");
 //getting all services
 exports.getAllService=(request,response,next)=>{

    ServiceSchema.find()
.then((data)=>{

 response.status(200).json(data);
    }).catch(error=>next(error))
    
 }


//adding new Service
 exports.AddService=(request,response,next)=>{
    let newService=new ServiceSchema({
    _id:request.body._id,
        Name: request.body.Name,
        price:request.body.price,
        description:request.body.description
    });
    newService.save()
                  .then(()=>{response.status(201).json({message:"new service added to the Department"}) })
                  .catch(error=>{next(error)})

    }



 
      // getting service by id
      exports.getServicebyId = (req, res, next) => {
        ServiceSchema.findOne({ _id: req.params.id }).then(thedata=>{
          res.status(200).json({data:thedata})
      }).catch(error=>next(error))
    };





//Deleting service by id
 exports.DeleteServiceById= async (request,response,next)=>{
    const id=request.params.id;

      try{
 const result= await ServiceSchema.findOneAndDelete(id);
 response.status(200).json({message:` this Service 'DELETED SUCCESSFULLY'`});
 console.log(result);
 response.send(result);
 
      }
catch(error){

    console.log(error.message);
}
            
            
    }
   



    // deleting
exports.DeleteService=(request,response,next)=>{
let Name=request.body.Name;
    ServiceSchema.delete({
        _id:request.body._id,
        Name:request.body.Name,
        description:request.body.description
    
    }
    ).then(result=>
        
        {
            response.status(200).json({message:`${Name} is deleted from the Department`});
    
        }).catch(error=>next(error))
    
    
    }
    //updating
    exports.updateService= async(request, res)=>{
        try{
            const result= await   ServiceSchema.findByIdAndUpdate({_id: request.params.id},
                           {

                            Name:request.body.Name,
                                  price:request.body.price,
                                  description:request.body.description
                                  
                           }
            ) 
            res.status(200).json({message:` this service 'updated SUCCESSFULLY'`});
            console.log(result);
            response.send(result);}
       catch(error){
       
           console.log(error.message);
       }
    }
                   
     



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







