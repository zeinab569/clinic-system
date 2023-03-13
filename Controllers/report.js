const { request, response, query } = require('express');
const mongoose =require('mongoose');
const appointmentSchema=mongoose.model("appointment")
const { jsPDF } = require("jspdf");
// require('jspdf-autotable');


exports.getAppointmentsReport=(req,res,next)=>{
    appointmentSchema.find().populate( 'patientID',{'firstName':1,'_id':0 }).populate('departmentID',{'Name':1,'Service':1,'_id':0 })
                     .populate('doctorID', {'fullName':1,'_id':0}).populate('employeeID', {'name':1,'user_role':1,'_id':0})
              .then((data)=>{
                generateTable(data);
                  res.status(200).json(data)
              })
              .catch(error=>{next(error)})
    }

   function generateTable(data) {
    const doc = new jsPDF();
    const startY = 40;
    const startX = 20;

    doc.setFont("times", "italic");
    doc.setTextColor("3A98B9");
    doc.text('Appointment Report', startX, startY - 10);
    var _header= [ 'Department', '  Doctor', 'Employee','  Date','time'];
    console.log(data);
    var _data= data.map(appointment => [
    //  `${appointment.patientID.firstName}`,
       `${appointment.departmentID.Name} `,
       `${appointment.doctorID.fullName}`,
      `${appointment.employeeID.name} `,
      `${appointment.date} `,
      `${appointment.time} `,
    ]);
    doc.setFont("courier", "normal");
    doc.setFillColor("EEEEEE");
    doc.rect(10, 38, 195, 15, "F");
    doc.setFontSize(15);
   
    for (var i = 0; i < _header.length; i++) {
      doc.setTextColor("3A98B9");
      doc.text(_header[i],15 + i * 35,46);
    }

    doc.setFontSize(12,"normal");
    doc.setTextColor("060047");
    for (var i = 0; i < _data.length; i++) {
        for (var j = 0; j < _data[i].length; j++) {
          doc.text(17 + j *34, 60 + i * 10, _data[i][j]);
        }
    }
    doc.save('appointment_report.pdf');
  }