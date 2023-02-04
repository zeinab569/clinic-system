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
        return response.json({ error: "Cannot create more than 2 administrators" });
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
      email: request.body.email,
      password: hashedpassword,
      salary:request.body.salary,
      gender:request.body.gender,
      address:{
        city: request.body.address.city,
        street: request.body.address.street,
        building: request.body.address.building,
    },

    });
  
    const isuser = await Employee_Schema.findOne({
      phoneno: request.body.phoneno,
      user_name: request.body.user_name,
      status: true,
    });
    // already found
    if (isuser) {
      return response.json({ error: "This user is already saved" });
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

// get all employee
async function getallemp(request,response,next){
  Employee_Schema.find().then((data)=>{
      response.status(200).json(data);
   }).catch(error=>next(error))
}

//update
async function update(request,response,next){
   Employee_Schema.updateOne(
    {_id:request.body.id},
    { $set: {
      user_name: request.body.user_name,
      user_role: request.body.user_role,
      name:request.body.name,
      phoneno: request.body.phoneno,
      email: request.body.email,
      password: hashedpassword,
      salary:request.body.salary,
      gender:request.body.gender,
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

// get employee date
async function getUserData(request, response,next) {
  
  // send username or phonenumber from frontend
  if (request.body.user_name != undefined && request.body.phoneno != undefined) {
     const datas = await Employee_Schema.find({
      user_name: request.body.user_name,
      phoneno: request.body.phoneno,
      status: true,
    });
    if (datas) {
      return res.json({ success: datas });
    } else {
      return res.json({ error: "No such user found" });
    }
  }

  if (request.body.user_name != undefined && request.body.phoneno === undefined) {
    const datas = await Employee_Schema.find({
      user_name: request.body.user_name,
      status: true,
    });
    if (datas) {
      return response.json({ success: datas });
    } else {
      return response.json({ error: "No such user found" });
    }
  }
  if (request.body.user_name === undefined && request.body.phoneno !== undefined) {
    const datas = await Employee_Schema.find({ phoneno: request.body.phoneno, status: true });
    if (datas) {
      return response.json({ success: datas });
    } else {
      return response.json({ error: "No such user found" });
    }
  } else {
    const datas = await Employee_Schema.find({ status: true });
    if (datas) {
      return response.json({ success: datas });
    } else {
      return response.json({ error: "No such user found" });
    }
  }
}

// change emp  Data 
async function changeUserData(request, response,next) {
  //sending user_id from frontend is must
  const finduser = await Employee_Schema.findOne({ _id: request.body.user_id });
  if (finduser.user_role === "admin" && request.body.user_role != "admin") {
    const checkadmin = await Employee_Schema.find({ user_role: "admin", status: true });
    if (checkadmin.length >= 2) {
      return response.json({ error: "Cannot create more than 2 administrators" });
    } else if (checkadmin.length === 1) {
      return response.json({ error: "At least one administrator is required" });
    }
  } else {
    const usernameexist = await Employee_Schema.findOne({
      _id: { $ne: request.body.user_id },
      user_name: request.body.user_name,
      phoneno: request.body.phoneno,
      status: true,
    });
    if (!usernameexist) {
      try {
        const newdata = await Employee_Schema.findOneAndUpdate(
          { _id: request.body.user_id, status: true },
          {
            user_name: request.body.user_name,
            user_role: request.body.user_role,
            phoneno: request.body.phoneno,
            email: request.body.email,
            address: request.body.address,
          },
          { useFindAndModify: false, new: true }
        );
        if ((await newdata)) {
          return response.json({
            success: "updated successfully",
            newdata: newdata,
          });
        } else {
          /* redirect to error page */ return response.json({
            error: "Error saving to database",
          });
        }
      } catch {
        (error) => {
          return response.json({ error: "No such user found" });
        };
      }
    } else {
      return response.json({ error: "Another user with same details found" });
    }
  }
}

// change emp password
async function changeUserPassword(req, res) {
  //sending user_id and password from frontend is must
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(request.body.password, salt);
  try {
    const newdata = await Employee_Schema.findOneAndUpdate(
      { _id: request.body.user_id, status: true },
      {
        password: hashedpassword,
      },
      { useFindAndModify: false, new: true }
    );
    if (await newdata) {
      return response.json({ success: "Changed password" });
    } else {
      /* redirect to error page */ return response.json({
        error: "Error saving to database",
      });
    }
  } catch {
    (error) => {
      return response.json({ error: "No such user found" });
    };
  }
}
// getemp by id
 function getbyid(request,response,next){
  response.status(200).json({data: request.params._id})
}

//get all Doctors
async function getDoctorList(request, response,next) {
  try {
    const list = [];
    const datas = await Employee_Schema.find(
      { status: true, user_role: "doctor" },
      { user_name: 1, _id: 0 }
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

// delete
async function deleteUser(request, response,next) {
  const finduser = await Employee_Schema.findOne({ _id: request.body.user_id });
  if (finduser.user_role === "admin") {
    const checkadmin = await user.find({ user_role: "admin", status: true });
    if (checkadmin.length === 1) {
      return response.json({ error: "At least one administrator is required" });
    } else {
      try {
        const deleteuser = await Employee_Schema.findOneAndUpdate(
          { _id: request.body.user_id, status: true },
          {
            status: false,
          },
          { useFindAndModify: false, new: true }
        );
        if (await deleteuser) {
          return response.json({ success: "Deleted user" });
        } else {
          /* redirect to error page */ return response.json({
            error: "Error deleting user from database",
          });
        }
      } catch {
        (err) => {
          return res.send({ error: "No such user found" });
        };
      }
    }
  } else {
    try {
      const deleteuser = await user.findOneAndUpdate(
        { _id: request.body.user_id, status: true },
        {
          status: false,
        },
        { useFindAndModify: false, new: true }
      );
      if (await deleteuser) {
        return response.json({ success: "Deleted user" });
      } else {
        /* redirect to error page */ return response.json({
          error: "Error deleting user from database",
        });
      }
    } catch {
      (error) => {
        return response.json({ error: "No such user found" });
      };
    }
  }
}

// sort

module.exports = {
  createUser,
  getUserData,
  getDoctorList,
  changeUserData,
  changeUserPassword,
  deleteUser,
  getallemp,
  update,
  getbyid,
};