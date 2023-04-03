const { default: mongoose } = require('mongoose')
require('mongoose');
require('../Models/pateintMedicalHistoryModel')
const { jsPDF } = require("jspdf");
const MedicalHistorySchema=mongoose.model("MedicalHistory");

// exports.createMedicalHistory=((req,res,next)=>
// {
//  let addpateintMedicalHistory=new MedicalHistorySchema({
//     patientId:req.body.patientId,
//     "medicinesbefore.name":req.body.medicinesbefore.name,
//     "medicinesbefore.quantity":req.body.medicinesbefore.quantity,
//     "medicinesbefore.from":req.body.medicinesbefore.from,
//     "medicinesbefore.to":req.body.medicinesbefore.to,
//     medicine:req.body.prescriptionNumber,
//     chronicdiseases:req.body.chronicdiseases,
//     bloodType:req.body.bloodType,
//     doctorId:req.body.doctorId

//  });
//  addpateintMedicalHistory.save().then(
//     data=>{res.status(200).json({message:"medical history is added succesfully"})}
//  ).catch(err=>next(err))
// });
exports.editpateintMedicalHistory=((req,response,next)=>{

  MedicalHistorySchema.findByIdAndUpdate(req.params.id,{
    $set:{
      _id:req.body.id,
      // bloodType:req.body.bloodType,
      medicine:req.body.medicine,
      chronicdiseases:req.body. chronicdiseases,
      "medicinesbefore.name":req.body.medicinesbefore.name,
      "medicinesbefore.quantity":req.body.medicinesbefore.quantity,
      "medicinesbefore.from":req.body.medicinesbefore.from,
      "medicinesbefore.to":req.body.medicinesbefore.to,
     }
    })
    .then(data=>{
       if(data==null) throw new Error("medicalHistory Is not Found!")
           response.status(200).json(data)
          })
          .catch(error=>next(error))
});
exports.editpateintMedicalHistory=((req,res,next)=>{
    MedicalHistorySchema.updateOne({_id:req.body.id},{
        $set:{
            _id:req.body.id,
            medicine:req.body.prescriptionNumber,
            chronicdiseases:req.body. chronicdiseases,
            "medicinesbefore.name":req.body.medicinesbefore.name,
            "medicinesbefore.quantity":req.body.medicinesbefore.quantity,
            "medicinesbefore.from":req.body.medicinesbefore.from,
            "medicinesbefore.to":req.body.medicinesbefore.to,
        }
      }).then(
        result=>{
            res.status(201).json({message:" MedicalHistory is updated"})}
      ).catch(
        error=>next(error)
      )
});
exports.getAllMedicalHistory=((req,res,next)=>{ 
  MedicalHistorySchema.find().populate("patientId",{'firstName':1,'lastName':1,'phoneNumber':1,'email':1,'gender':1})  
// MedicalHistorySchema.find().populate({path:"patientId",select:'firstName lastName age gender'})
.populate({path:"doctorId",select:'fullName Specialization'})
// .populate({path:"medicine",select:'medicine'})
.then(
(data)=>
{res.status(200).json(data) ;
}
)
});
exports.getMedicalHistoryByPatientId=((req,res,next)=>{
    MedicalHistorySchema.findOne({patientId:req.params.id})
    .populate({path:"patientId",select:'firstName lastName age gender'})
    .populate({path:"doctorId",select:'fullName Specialization'})
    // .populate({path:"medicine",select:'medicine'})
    .then(
    (data)=>
    {
      res.status(200).json(data) 
      generateTable(data);
    }
    )
    })
exports.getMedicalHistoryByDoctorId=((req,res,next)=>{
        MedicalHistorySchema.find({doctorId:req.params.id}).
        populate({path:"patientId",select:'firstName lastName age gender'})
        .populate({path:"doctorId",select:'fullName Specialization'})
        // .
        // populate({path:"medicine",select:'medicine'})
        .then(
        (data)=>res.status(200).json(data) 
        )
        })
exports.getMedicalHistoryById=((req,res,next)=>{
            MedicalHistorySchema.findOne({_id:req.params.id})
            .populate({path:"patientId",select:'firstName lastName age gender'})
            .populate({path:"doctorId",select:'fullName Specialization'})
            // .
            // populate({path:"medicine",select:'medicine'})
           .then(
            (data)=>res.status(200).json(data) 
            )
            })
 exports.deleteMedicalHistory =((req,res,next)=>  {
  MedicalHistorySchema.deleteOne({_id:req.body.id}).then(data=>res.status(200).json({message:"deleted is done"}))
  .catch(err=>next(err))
 })  
 function generateTable(data) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const startY = 40;
  const startX = 20;
  doc.setFont("times", "italic");
  doc.setFontSize(20)
  doc.setTextColor("3A98B9");
  doc.text('Medical History Report', startX+50, startY -20);
  doc.setFontSize(15);
  doc.text( 'Pateint Name:- ' +data.patientId.firstName+" "+data.patientId.lastName,startX,startY)
  doc.text( 'Age:- ' +data.patientId.age+" year ",startX,startY+10)
  doc.text( 'Gender:- ' +data.patientId.gender,startX,startY+20)
  doc.text( 'Blood Type :- ' +data.bloodType,startX,startY+30)
  doc.text( 'Chronic Diseases :- ' +data.chronicdiseases,startX,startY+40)
  doc.text( 'medicine before :- ' ,startX,startY+50)
  doc.text( 'Name:- '+data.medicinesbefore.name ,startX+20,startY+60)
  doc.text( 'Quantity:- '+data.medicinesbefore.quantity ,startX+20,startY+70)
  doc.text( 'Start Date:- '+data.medicinesbefore.from ,startX+20,startY+80)
  doc.text( 'End Date:- '+data.medicinesbefore.to ,startX+20,startY+90)
  doc.setTextColor(255, 0, 0);
  doc.text( 'Doctor Name:- '+data.doctorId.fullName,startX+100,startY+120)
  doc.text( 'Doctor Signture:- '+data.doctorId.fullName,startX+100,startY+130)
  doc.rect(10, 10, doc.internal.pageSize.width-20 , doc.internal.pageSize.height-20 , 'S');
  // var _header= ['Name', 'Quantity', '  Start Date', 'End Date'];
  // var _data=[
  //   `${data.medicinesbefore.name}`,
  //   `${data.medicinesbefore.quantity}`,
  //   `${data.medicinesbefore.from}`,
  //   `${data.medicinesbefore.to}`

  // ]
  // var _data= data.map(medicalReport => [
  //   `${medicalReport.medicinesbefore.name}`,
  //   // `${appointment.departmentID} `,
  //   // `${appointment.patientID.firstName}`,
  //   // `${appointment.departmentID.Name} `,
  // //    `${appointment.doctorID.fullName}`,
  // //   `${appointment.employeeID} `,
  // //   `${appointment.date} `,
  // //   `${appointment.time} `,
  //  ]);
  // doc.setFont("courier", "normal");
  // doc.setFillColor("EEEEEE");
  // // doc.rect(10, 38, 195, 15, "F");
  // doc.setFontSize(15);
 
  // for (var i = 0; i < _header.length; i++) {
  //   doc.setTextColor("3A98B9");
  //   doc.text(_header[i],15 + i * 35,46);
  // }

  // doc.setFontSize(12,"normal");
  // doc.setTextColor("060047");
  // for (var i = 0; i < _data.length; i++) {
  //     for (var j = 0; j < _data[i].length; j++) {
  //       doc.text(17 + j *34, 60 + i * 10, _data[i][j]);
  //     }
  // }
  doc.save('Medical History_report.pdf');
}

