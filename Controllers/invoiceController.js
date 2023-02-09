
const fs = require('fs-extra');
const mongoose=require("mongoose")
require('../Models/invoiceModel')
const invoiceSchema=mongoose.model("invoice")

const datePattern=/^\d{2}-\d{2}-\d{4}$/

// get invoices
exports.getAllInvoices=(req,res,next)=>{
    invoiceSchema.find().populate('appointmentID',{'date':1,'time':1,'_id':0}).populate('patientID',{'firstName':1,'_id':0 })
                        .populate('employeeID', {'name':1,'user_role':1,'_id':0})
                .then(data=>res.status(200).json(data))
                .catch(error=>next(error))
}


// post invoice
exports.addInvoice=(req,res,next)=>{
    let newInvoice=new invoiceSchema({
      _id:req.body.id,
      employeeID:req.body.employeeID,
      patientID:req.body.patientID ,
      date:req.body.date,
      amount:req.body.amount,
      paymentWay:req.body.payment_way,
      remainingAmount:req.body.remaining_amount,
      dueDate:req.body.due_date,
      appointmentID:req.body.appointmentID
    })
    newInvoice.save()
    .then((data)=>{

      if(data.paymentWay!="insurance credit")
        { 
          data.remainingAmount=0
         data.save()}
      else
          {
            data.remainingAmount=req.body.remaining_amount
            data.save()
          }

      res.status(201).json({message:"Add invoice is done "})
    })
    .catch(error=>next(error))
}


// update remainingAmount of invoice  by id
exports.updateInvoiceRe_Amount=(req,res,next)=>{
  invoiceSchema.updateOne({_id:req.params.id},
   {
       $set:{remainingAmount:req.body.remaining_amount}
   }
   ).then((result)=>{
       if(result.modifiedCount!=0)
       res.status(200).json({message:"this invoice is updated"})
       else
       throw new Error("This invoice is not exist")
   })
   .catch(error=>next(error))
   
}


// update dueDate of invoice by id
exports.updateInvoiceDueDate=(req,res,next)=>{
  invoiceSchema.updateOne({_id:req.params.id},
   {
       $set:{dueDate:req.body.due_date}
   }
   ).then((result)=>{
       if(result.modifiedCount!=0)
       res.status(200).json({message:"this invoice is updated"})
       else
       throw new Error("This invoice is not exist")
   })
   .catch(error=>next(error))
   
}

//delete invoice by id
exports.deleteInvoiceByID=(req,res,next)=>{
  invoiceSchema.deleteOne({_id:req.params.id})
  .then(result=>{
    if(result.deletedCount!=0)
       res.status(200).json({message:"this invoice is deleted"})
       else
       throw new Error("This invoice is not exist")
  })
  .catch(error=>next(error))
}


// get by id
exports.getInvoiceByID=(request,response,next)=>{
  invoiceSchema.findById(request.params.id)
              .then((data)=>{
               if(data!=null){response.status(200).json({data})}
               else{throw new Error("This invoice is not exist")}
              })
              .catch(error=>{next(error)})
            }


   // sort
exports.SortByDueDate=(req,res,next)=>
  {
   invoiceSchema.aggregate(
    [
      { $sort : { dueDate : 1 } }
    ]
   )
   .then((data)=>{
    res.status(200).json(data)
})
.catch(error=>{next(error)})
  }


  // filter and sort
  exports.filterbyKey=((req,res,next)=>{
    const sortBy=req.params.sortBy
    if(!(isNaN(req.params.filterKey)) && req.params.filterBy=="id")
    {
        invoiceSchema.find({patient:req.params.filterKey}).sort(sortBy)
                     .then((data) => res.status(200).json(data))
                     .catch(error=>next(error))
    }
    else if(datePattern.test(req.params.filterKey)&& req.params.filterBy=="date")
    {
        invoiceSchema.find({date:req.params.filterKey}).sort(sortBy)
                     .then((data) => res.status(200).json(data))
                     .catch(error=>next(error))
    }
    else if(datePattern.test(req.params.filterKey)&& req.params.filterBy=="dueDate")
    {
        invoiceSchema.find({dueDate:req.params.filterKey}).sort(sortBy)
                     .then((data) => res.status(200).json(data))
                     .catch(error=>next(error))
    }
    else if(!(isNaN(req.params.filterKey))&& req.params.filterBy=="amount")
    {
        invoiceSchema.find({amount:req.params.filterKey}).sort(sortBy)
                     .then((data) => res.status(200).json(data))
                     .catch(error=>next(error))
    }
    else if(!(isNaN(req.params.filterKey))&& req.params.filterBy=="remainingAmount")
    {
        invoiceSchema.find({remainingAmount:req.params.filterKey}).sort(sortBy)
                     .then((data) => res.status(200).json(data))
                     .catch(error=>next(error))
    }
    else if(req.params.filterBy=="paymentWay")
    {
        invoiceSchema.find({paymentWay:req.params.filterKey}).sort(sortBy)
                     .then((data) => {
                        if(data.length!=0)
                         {
                            res.status(200).json(data);
                        }
                        else
                        {
                          next(new Error("invalid "+ req.params.filterKey +" for paymentWay")) 
                        }
                     })
                     .catch(error=>next(error))
    }
    else
    {
        next(new Error("invalid property or value in appointmentSchema"))
    }
  })


  const filePath = '/path/to/InvoiceReport.json';
  // report 
 exports.fReport=(req,res,next)=>{
   invoiceSchema.find().populate('appointmentID',{'date':1,'time':1,'_id':0}).populate('patientID',{'firstName':1,'_id':0 })
                       .populate('employeeID', {'name':1,'user_role':1,'_id':0})
                   .then((data)=>
                   {
                     const formattedReports = data.map(function(report) {
                       return {
                         id: report._id,
                         date: report.date,
                         employee:report.employeeID,
                         patient: report.patientID,
                         amount:report.amount,
                         remain_amount:report.remainingAmount,
                         due_date:report.dueDate,
                         payment_way:report.paymentWay,
                         appointmentID:report.appointmentID
                       };
                     });
                     fs.writeFile(filePath, JSON.stringify(formattedReports), function(err) {
                       if (err) return console.error(err);
                       res.status(200).json({message:`Data was written to ${filePath}.`})
                     });
                   })
                   .catch(err=>next(err))
 }