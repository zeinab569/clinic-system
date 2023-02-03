const express=require("express");
const mongoose=require("mongoose");
const server=express(); 

require("dotenv").config();

let port=process.env.PORT||8080;

mongoose.set('strictQuery', true);


mongoose.connect(process.env.DB_URL)
      .then(()=>{
            console.log("DBconected");
            server.listen(port,()=>{
                console.log("I am listening..............", port);
            });
         })
        .catch(error=>{
            console.log("DBproblem"+ error)
        })


server.use((request,response,next)=>{
    if(true)
    {
            next();
    }
    else{
         next(new Error("Not Authenticated")) 
    }
});

// convert content to json 
server.use(express.json());

// routs



//Not Found
server.use((request,response,next)=>{
    response.status(404).json({data:"Not Fount"});
});
// Error MiddleWar
server.use((error,request,response,next)=>{
    response.status(500).json({message:"Error "+error});
});