const mongoose= require("mongoose")
require("../Models/employeeSchema")
const Employee_Schema = mongoose.model("employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// create user
async function createUser(request, response,next) {
    const { error } = validation.createuservalidation(request.body);
    if (error) return response.send({ error: error.details[0].message });
  
    if (request.body.user_role === "admin") {
      const checkadmin = await user.find({ user_role: "admin", status: true });
      if ((await checkadmin.length) >= 2) {
        return response.send({ error: "Cannot create more than 2 administrators" });
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(request.body.password, salt);
  
    const newuser = new user({
      user_name: request.body.user_name,
      user_role: request.body.user_role,
      phoneno: request.body.phoneno,
      email: request.body.email,
      address: request.body.address,
      password: hashedpassword,
    });
  
    const isuser = await user.findOne({
      phoneno: request.body.phoneno,
      user_name: request.body.user_name,
      status: true,
    });
    // already found
    if (isuser) {
      return response.send({ error: "This user is already saved" });
    }
    // not found create
    if (!isuser) {
      const savednewuser = await newuser.save();
      if (savednewuser) {
        const isattendence = await new attendence({
          user_id: await savednewuser._id,
          user_name: request.body.user_name,
          user_role: request.body.user_role,
          phoneno: request.body.phoneno,
        }).save();

        
      } else {
        return res.send({ error: "Error saving to database" });
      }
    }
  }

// get emp date
// change emp  Data 
// change emp password
// Delete emp 
//get all Doctors

