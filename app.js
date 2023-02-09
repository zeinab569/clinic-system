const express=require("express");
const mongoose=require("mongoose");
const loginRoute=require("./Routers/login_route");
const employeeRoute =require("./Routers/employee_rpoute");
const doctorsRouter=require("./Routers/doctor");
const clinicRouter=require("./Routers/clinic");
const patientRouter=require("./Routers/patientRoute")
const MedicalHistoryRouter=require("./Routers/MedicalHistory")
const prescreptionRouter=require("./Routers/prescreptionRoute")
const DepartmentRouter=require("./Routers/DepartmentRoute")
const medicineRouter=require("./Routers/MedicineRoute")
const invoiceRoute=require("./Routers/invoiceRoute")
const appointmentRouter=require("./Routers/appointmentRoute")

const server=express(); 
require("dotenv").config();
let port=process.env.PORT||8080;

mongoose.set('strictQuery', true);
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
// routs

server.use(loginRoute);
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


//Not Found
server.use((request,response,next)=>{
    response.status(404).json({data:"Not Fount"});
});
// Error MiddleWar
server.use((error,request,response,next)=>{
    const status = error.status||500
    response.status(status).json({message:"Error "+error});
});