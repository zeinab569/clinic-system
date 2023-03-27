const express=require("express");
const path  =require("path");
const mongoose=require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const loginRoute=require("./Routers/login_route");
const employeeRoute =require("./Routers/employeeRoute");
const doctorsRouter=require("./Routers/doctor");
const clinicRouter=require("./Routers/clinic");
const patientRouter=require("./Routers/patientRoute")
const MedicalHistoryRouter=require("./Routers/MedicalHistory")
const prescreptionRouter=require("./Routers/prescreptionRoute")
const DepartmentRouter=require("./Routers/DepartmentRoute")
const medicineRouter=require("./Routers/MedicineRoute")
const invoiceRoute=require("./Routers/invoiceRoute")
const appointmentRouter=require("./Routers/appointmentRoute")
const serviceRouter=require("./Routers/serivceRoute")
const reportRouter=require("./Routers/report")
const userRoutes = require('./Routers/user');


const server=express(); 
require("dotenv").config();
let port=process.env.PORT||8080;

mongoose.set('strictQuery', true);

server.use(cors(
    {
      origin: "http://localhost:4200",
      credentials:true,            //access-control-allow-credentials:true
      optionSuccessStatus:200
    }  
    ));
  
mongoose.connect(process.env.DB_URL)
      .then(()=>{
           
            server.listen(port,()=>{
                console.log("server is open now I am listening  ^_^", port);
            });
            console.log("DB successfully connected...");
         })
        .catch(error=>{
            console.log("DBproblem"+ error)
        })

// first middleware
server.use((request,response,next)=>{
    console.log("Hello from FirstMW", request.url,request.method);
     next();
  });

server.use(express.json());


server.use("/images" , express.static(path.join("images")));
/*
server.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With ,Content-Type,Authorization ,Accept",
      "HTTP/1.1 200 OK",
      "append,delete,entries,foreach,get,has,keys,set,values,Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PATCH,DELETE,OPTIONS,PUT"
    );
    next();
  });
*/
  // routes
//server.use(loginRoute);
server.use("/user",userRoutes);
server.use(employeeRoute);
server.use(doctorsRouter);
server.use(clinicRouter);
server.use(patientRouter);
server.use(prescreptionRouter)
server.use(MedicalHistoryRouter);
server.use(DepartmentRouter);
server.use(medicineRouter);
server.use(invoiceRoute)
server.use(appointmentRouter)
server.use(serviceRouter)
server.use(reportRouter);



//Not Found
server.use((request,response,next)=>{
    response.status(404).json({data:"Not Fount"});
});
// Error MiddleWar
server.use((error,request,response,next)=>{
    const status = error.status||500
    response.status(status).json({message:"Error "+error});
});