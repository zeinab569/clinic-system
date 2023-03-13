const mongoose=require("mongoose");
 require("./../Models/MedicineModel");
 const MedicineSchema=mongoose.model("medicine");

 exports.getAllmedicine=(request,response,next)=>{

    MedicineSchema.find().then((data)=>{

 response.status(200).json(data);
    }).catch(error=>next(error))
    
 }

    exports.getMedicinebyId = (req, res, next) => {
        MedicineSchema.findOne({ _id: req.params.id }).then(thedata=>{
          response.status(200).json({data:thedata})
      }).catch(error=>next(error))
    };

//adding new medicine
 exports.Addmedicine=(request,response,next)=>{
    let newmedicine=new MedicineSchema({
      
        Name: request.body.Name,
        production_Date:request.body.production_Date,
        expiary_Date:request.body.expiary_Date,
        price:request.body.price,
        Recommendation:request.body.Recommendation,
        quantity:request.body.quantity,
        //img: request.file.path,
        department_Id:request.body.department_Id
        
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
                quantity:request.body.quantity,
                Recommendation:request.body.Recommendation,
                img:request.file.path
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



        exports.Searchmedicine= async (request,response,next)=>{
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
              let query = MedicineSchema.find(JSON.parse(queryString))
              
             //sort
              if (request.query.sort) {
                const sortBy = request.query.sort.split(',').join(' ')
                query = query.sort(sortBy)
              } else {
                query = query.sort('Name')
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