const mongoose= require("mongoose")
require("../Models/employeeSchema")
const Employee_Schema = mongoose.model("employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { request } = require("express");
const { response } = require("express");
dotenv.config();


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
      employeeImage: request.file.path,
      email: request.body.email,
      password: hashedpassword,
      salary:request.body.salary,
      gender:request.body.gender,
      workHours:request.body.workHours,
      address:{
        city: request.body.city,
        street: request.body.street,
        building: request.body.building,
    },
    
  
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
      })
     .catch(error=>next(error))
      } 
  }

// get all employees
async function getAllEmployees(request,response,next){
  Employee_Schema.find().then((data)=>{
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
   await Employee_Schema.findOne({data: request.params.id},)
   .then(thedata=>{
       response.status(200).json({data:thedata})
   }).catch(error=>next(error))
}

//get all Doctors
async function getDoctorList(request, response,next) {
  try {
    const list = [];
    const datas = await Employee_Schema.find(
      { status: true, user_role: "doctor" },
      { user_name: 1,name:1 ,_id: 0 }
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
      { status: true, user_role: "reseptionast" },
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

// get list of account
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
// delete
async function deleteUser(request, response,next) {
  await Employee_Schema.deleteOne({ _id: request.body.id },)
        .then(result=>{
              response.status(200).json({message:" delete the user successfuly"})
       }).catch(error=>next(error))
}
// sort
async function sortEmployees(request,response,next){
  Employee_Schema.aggregate(
    [
      { $sort : { salary : 1 } }
    ]
 ).then(data=>{
    response.status(200).json(data)
 }).catch(error=>next(error))
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
  sortEmployees,
};