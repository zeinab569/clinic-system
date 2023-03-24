const mongoose= require("mongoose")
require("../Models/employeeSchema")
require("../Models/doctor")
const nodemailer = require('nodemailer')
const Employee_Schema = mongoose.model("employee");
const Doctor_Schema= mongoose.model("doctor")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { request } = require("express");
const { response } = require("express");
dotenv.config();


function sendMail(username,pass){
  const transporter = nodemailer.createTransport({
    host: "0.0.0.0",
     port:1025,
    secure: false,
    auth: {
    user: "zeinabelazzab875@gmail.com",
    pass:"*******"
   }
  });
  
    const mailOptions = {
      from: 'zeinabelazzab875@gmail.com',
      to: 'emailtest@gmail.com',
      subject: 'welcome to our clinic',
      text: `Your password is ${pass} and your user name is ${username}`
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

// create user done
async function createUser(request, response,next) {

    if (request.body.user_role === "admin") {
      const checkadmin = await Employee_Schema.find({ user_role: "admin", status: true });
      if ((await checkadmin.length) >= 2) {
        return response.json({ error: "Can not create more than 2 administrators" });
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(request.body.password, salt);
  
    const newuser = new Employee_Schema({
      _id:request.body._id,
      user_name: request.body.user_name,
      user_role: request.body.user_role,
      name:request.body.name,
      phoneno: request.body.phoneno,
      //employeeImage: request.file.path,
      email: request.body.email,
      password: hashedpassword,
      salary:request.body.salary,
      gender:request.body.gender,
      workHours:request.body.workHours,
      age:request.body.age,
     // address:{
      //  city: request.body.city,
     //   street: request.body.street,
     //   building: request.body.building,
   // },
    
  
    });
  
    const isuser = await Employee_Schema.findOne({
      phoneno: request.body.phoneno,
      user_name: request.body.user_name,
      status: true,
    });
    // already found
    if (isuser) {
      return response.json({ error: "This user is already saved in Clinic_DB" });
    }
    // not found create
    if (!isuser) {
      const savednewuser = await newuser.save()
      .then(result=>{
        response.status(201).json(result)
        sendMail(result.user,result.password)
      })
     .catch(error=>next(error))
      } 
  }

// get all employees
async function getAllEmployees(request,response,next){
  await Employee_Schema.find()
  .then((data)=>{
      response.status(200).json(data);
   }).catch(error=>next(error))
}

//update
async function update(request,response,next){
   Employee_Schema.updateOne(
    {_id:request.body._id},
    { $set: {
      user_name: request.body.user_name,
      user_role: request.body.user_role,
      name:request.body.name,
      phoneno: request.body.phoneno,
      email: request.body.email,
      salary:request.body.salary,
      gender:request.body.gender,
      workHours:request.body.workHours,
        address:{
            city:request.body.address.city,
            street:request.body.address.street,
            building:request.body.address.building,
    }
    }}
).then(result=>{
    response.status(200).json({message:"updated the Employee"})
}).catch(error=>next(error))
}

// change employee password
async function changeUserPassword(request, response,next) {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(request.body.password, salt);
  try {
    const newdata = await Employee_Schema.findOneAndUpdate(
      { _id: request.body._id, status: true },
      {
        password: hashedpassword,
      },
      { useFindAndModify: false, new: true }
    );
    if (await newdata) {
      return response.json({ success: "Changed password" });
    } else {
       return response.json({
          error: "Error saving to database",
      });
    }
  } catch {
    (error) => {
      return response.json({ error: "No such user found" });
    };
  }
}

// get employee by id
async function getbyid(request,response,next){
    await Employee_Schema.findOne({ _id: request.params.id })
   .then(thedata=>{
       response.status(200).json({data:thedata})
   }).catch(error=>next(error))
}

//get all Doctors
async function getDoctorList(request, response,next) {
  try {
    const list = [];
    const datas = await Doctor_Schema.find(
      { user_role: "doctor" },
      { userName: 1, fullName:1 ,_id: 0 }
    );
    if (datas.length > 0) {
      return response.json({ success: datas });
    } else {
      return response.json({ error: "No doctors found" });
    }
  } catch {
    (error) =>next(error)
  }
}

// get list of reseption
async function getReseptionistList(request, response,next) {
  try {
    const list = [];
    const datas = await Employee_Schema.find(
      { status: true, user_role: "receptionist" },
      { user_name: 1 ,name:1, _id: 0 }
    );
    if (datas.length > 0) {
      return response.json({ success: datas });
    } else {
      return response.json({ error: "No reseptionist found" });
    }
  } catch {
    (error) =>next(error)
  }
}

// get list of accountant
async function getAccountantList(request, response,next) {
  try {
    const list = [];
    const datas = await Employee_Schema.find(
      { status: true, user_role: "accountant" },
      { user_name: 1,name:1, _id: 0 }
    );
    if (datas.length > 0) {
      return response.json({ success: datas });
    } else {
      return response.json({ error: "No accountant found" });
    }
  } catch {
    (error) =>next(error)
  }
}

// get list of pharmacist
async function getPharmacistList(request, response,next) {
  try {
    const list = [];
    const datas = await Employee_Schema.find(
      { status: true, user_role: "pharmacist" },
      { user_name: 1,name:1, _id: 0 }
    );
    if (datas.length > 0) {
      return response.json({ success: datas });
    } else {
      return response.json({ error: "No pharmacist found" });
    }
  } catch {
    (error) =>next(error)
  }
}
// delete by id
async function deleteUser(request, response,next) {
  await Employee_Schema.deleteOne({ _id: request.body.id },)
        .then(result=>{
              response.status(200).json({message:" delete the user successfuly"})
       }).catch(error=>next(error))
}


async function theDelete(request,response,next){
  try{
    let data=await Employee_Schema.findByIdAndDelete(request.params.id)
    if(data==null) throw new Error("Employee Is not Found!")
    response.status(200).json({message:"deleted"})
}catch(error)
{
    next(error)
}
     

}

async function theUpdate(request,response,next){

  Employee_Schema.findByIdAndUpdate(request.params.id,{
    $set:{
      user_name: request.body.user_name,
      user_role: request.body.user_role,
      name:request.body.name,
      phoneno: request.body.phoneno,
      email: request.body.email,
      salary:request.body.salary,
      gender:request.body.gender,
      workHours:request.body.workHours,
      age:request.body.age,
     }
    })
    .then(data=>{
       if(data==null) throw new Error("Employee Is not Found!")
           response.status(200).json(data)
          })
          .catch(error=>next(error))
}
//filter and sort
async function SearchEmployees(request,response,next){
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
    let query = Employee_Schema.find(JSON.parse(queryString))
    
   //sort
    if (request.query.sort) {
      const sortBy = request.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('salary')
    }

    const theQuery = await query
    response.status(200).json({
      status: 'success',
      results: theQuery.length,
      data: {
        theQuery
      }
    });
   
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

module.exports = {
  createUser,
  getDoctorList,
  getReseptionistList,
  getAccountantList,
  changeUserPassword,
  deleteUser,
  getAllEmployees,
  update,
  getbyid,
  getPharmacistList,
  SearchEmployees,
  theDelete,
  theUpdate
};