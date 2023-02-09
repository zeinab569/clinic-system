
const mongoose=require("mongoose")
const nodemailer = require('nodemailer')
const fs = require('fs-extra');
require("../Models/AppointmentModel")
const appointmentSchema=mongoose.model("appointment")
const doctorSchema=mongoose.model("doctor")

// get appointments with specified id and after it
exports.getAllAppointments=(req,res,next)=>{
  appointmentSchema.find().populate( 'patientID',{'firstName':1,'_id':0 }).populate('departmentID',{'Name':1,'Service':1,'_id':0 })
                   .populate('doctorID', {'fullName':1,'_id':0}).populate('employeeID', {'name':1,'user_role':1,'_id':0})
            .then((data)=>{
                res.status(200).json(data)
            })
            .catch(error=>{next(error)})
  }


   // sort
  exports.sort=(req,res,next)=>
  {
   appointmentSchema.aggregate(
    [
      { $sort : { date : 1, time: 1 } }
    ]
   )
   .then((data)=>{
    res.status(200).json(data)
})
.catch(error=>{next(error)})
  }



  function sendMail(date,time){
    const transporter = nodemailer.createTransport({
      host: "0.0.0.0",
       port:1025,
      secure: false,
      auth: {
      user: "eng.samahelgayar@gmail.com",
      pass:"********"
     }
    });
    
      const mailOptions = {
        from: 'eng.samahelgayar@gmail.com',
        to: 'hhhhh836@gmail.com',
        subject: 'New Appointment Scheduled',
        text: `A new appointment has been scheduled on ${date} at ${time}`
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }

  // post appointment
  exports.addAppointment=(req,res,next)=>{
 
  doctorSchema.findOne({_id:req.body.doctorID,$or:[{'appointments.time':{$ne:req.body.time}},{'appointments.date':{$ne:req.body.date}}]})
              .then((doctor)=>{
                if(doctor)
                {
                  let newAppointment=new appointmentSchema({
                    _id:req.body.id,
                    employeeID:req.body.employeeID,
                    patientID:req.body.patientID,
                    departmentID:req.body.departmentID,
                    doctorID:req.body.doctorID,
                    date:req.body.date,
                    time:req.body.time,
                    status:req.body.status
                })
                newAppointment.save()
                              .then((data)=>{
                                res.status(201).json(data)
                                sendMail(data.date,data.time)
                                doctor.appointments.push({id:data.id,time:data.time,date:data.date})
                                doctor.save()
                              })
                              .catch((error)=>{next(error)})
                }
                else
                {
                  next(new Error("invalid doctor or date and time"))
                }
              }) 
              .catch((error)=>{next(error)})      
            }


//delete appointment by id
exports.deleteAppointmentByID=(req,res,next)=>{
  appointmentSchema.deleteOne({_id:req.params.id})
  .then(result=>{
    if(result.deletedCount!=0)
       res.status(200).json({message:"this appointment is deleted"})
       else
       throw new Error("This appointment is not exist")
  })
  .catch(error=>next(error))
}


//delete appointment if status=Done
exports.deleteAppointments=(req,res,next)=>{
  appointmentSchema.deleteMany({status:req.params.status})
  .then(result=>{
    if(result.deletedCount!=0)
       res.status(200).json({message:"appointments are deleted"})
       else
       throw new Error("appointments are not exist")
  })
  .catch(error=>next(error))
}


// update appointmentDate by id
exports.updateAppointDateByID=(req,res,next)=>{
  appointmentSchema.updateOne({_id:req.params.id},
   {
       $set:{date:req.body.date}
   }
   ).then((result)=>{
       if(result.modifiedCount!=0)
       res.status(200).json({message:"this appointment is updated"})
       else
       throw new Error("This appointment is not exist")
   })
   .catch(error=>next(error))
   
}


// update appointmentStatus by id
exports.updateAppointStatusByID=(req,res,next)=>{
  appointmentSchema.updateOne({_id:req.params.id},
   {
       $set:{status:req.body.status}
   }
   ).then((result)=>{
       if(result.modifiedCount!=0)
       res.status(200).json({message:"this appointment is updated"})
       else
       throw new Error("This appointment is not exist")
   })
   .catch(error=>next(error))
   
}


// report
exports.report=(req,res,next)=>{
  appointmentSchema.find()
             .then((data)=>{
              let report = " ";
              for (const result of data) {
                report += `id: ${result.id}, patient: ${result.patientID}, service: ${result.departmentID}, date: ${result.date}, time: ${result.time}, doctor: ${result.doctorID} `;
                report+="                                          ";
              }
              console.log(report)
              res.status(200).json(report)
             })
             .catch(error=>{next(error)})
   }


   const filePath = '/path/to/ApppointmentReport.json';
   // report 
  exports.fReport=(req,res,next)=>{
    appointmentSchema.find().populate( 'patientID',{'firstName':1,'_id':0 }).populate('departmentID',{'Name':1,'Service':1,'_id':0 })
                     .populate('doctorID', {'fullName':1,'_id':0}).populate('employeeID', {'name':1,'user_role':1,'_id':0})
                    .then((data)=>
                    {
                      const formattedReports = data.map(function(report) {
                        return {
                          id: report.id,
                          date: report.date,
                          time: report.time,
                          employee:report.employeeID,
                          patient:report.patientID,
                          service:report.departmentID,
                          doctor:report.doctorID,
                          status:report.status
                        };
                      });
                      fs.writeFile(filePath, JSON.stringify(formattedReports), function(err) {
                        if (err) return console.error(err);
                        res.status(200).json({message:`Data was written to ${filePath}.`})
                      });
                    })
                    .catch(err=>next(err))
  }



  

 
