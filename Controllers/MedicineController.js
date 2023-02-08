const mongoose=require("mongoose");
 require("./../Models/MedicineModel");
 const MedicineSchema=mongoose.model("medicines");
 //getting all medicines
 exports.getAllmedicine=(request,response,next)=>{

    MedicineSchema.find()
//.populate({ path: "patient" ,select:"id"})
.then((data)=>{

 response.status(200).json(data);
    }).catch(error=>next(error))
    
 }
//getting medicine by id

    exports.getMedicinebyId = (req, res, next) => {
        DepartmentSchema.findOne({ id: req.params.id })
        //.populate({ path: "patient" })
    
            .then((data) => {
                if (data == null) throw new Error("there is No medicine with this id");
                res.status(200).json(data);
            })
            .catch((err) => {
                next(err);
            });
    };




//adding new medicine
 exports.Addmedicine=(request,response,next)=>{
    let newmedicine=new MedicineSchema({
        id:request.body.id,
        Name: request.body.Name,
        production_Date:request.body.production_Date,
        expiary_Date:request.body.expiary_Date,
        price:request.body.price,
        Recommendation:request.body.Recommendation,
        quantity:request.body.quantity,
        img:request.body.img,
        
    });
    newmedicine.save()
                  .then(()=>{response.status(201).json({message:"new item added to the pharmathiest"}) })
                  .catch(error=>{next(error)})

    
    }

//Deleting medicine by id
 exports.DeleteMedicineById= async (request,response,next)=>{
    const id=request.params.id;

      try{
 const result= await MedicineSchema.findOneAndDelete(id);
 response.status(200).json({message:` this medicine 'DELETED SUCCESSFULLY'`});
 console.log(result);
 response.send(result);
 
      }
catch(error){

    console.log(error.message);
}
            
            
    }


    // deleting
exports.DeleteMedicine=(request,response,next)=>{
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
    //updating


    exports.updatemedicine=(request,response,next)=>{

        MedicineSchema.updateOne({_id:request.body.id},{
            $set:{Name:request.body.Name,
                production_Date:request.body.production_Date,
                expiary_Date:request.body.expiary_Date,
                price:request.body.price,
                Recommendation:request.body.Recommendation,
                img:request.body.img
                }
        })
        .then((data)=>{
            if(data.modifiedCount==0){
                throw new Error("not found")
            }
            console.log(data),
            response.status(201).json({message:"medicine is updated successfuly"})
        })
        .catch(error=>{next(error)})
    }
    exports.getMedicinebyId=(request,response,next)=>{
        response.status(201).json({data:request.params})}