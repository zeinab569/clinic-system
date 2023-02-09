const Employee_Schema = require("../Models/employeeSchema");
const DoctorSchema=require("../Models/doctor")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


  async function checkadmin(req, res, next) {
    const admin = ["admin"];
    try {
      const token = await req.get("Authorization").replace("Bearer ", "");
      const decodedToken = jwt.verify(await token, process.env.jwt_secret);
     
        const userdata = await Employee_Schema.findOne({
          _id: await decodedToken.id,
          role: await decodedToken.role,
          status: true,
        });
        if (admin.findIndex((x) => x === userdata.user_role) === -1)
          return res.json({ error: "not admin" });

      } catch (error) {
        error.status=403;
        error.message="not authorized";
        next(error)
    } 
    next();
  }
  

  async function checkreception(req, res, next) {
    const admin = ["admin", "receptionist"];
    try {
      const token = await req.get("Authorization").replace("Bearer ", "");
      const decodedToken = jwt.verify(await token, process.env.jwt_secret);
     
      try {
        const userdata = await Employee_Schema.findOne({
          _id: await decodedToken.id,
          role: await decodedToken.role,
          status: true,
        });
        if (admin.findIndex((x) => x === userdata.user_role) === -1)
          return res.json({ error: "not authorized" });
      } catch (err) {
        return res.json({ error: "not authorized" });
      }
    } catch (err) {
      return res.json({ error: "not authorized" });
    }
   
    next();
  }

  async function checkdoctor(req, res, next) {
    try {
      const token = await req.get("Authorization").replace("Bearer ", "");
      const decodedToken = jwt.verify(await token, process.env.jwt_secret);
        const userdata = await Employee_Schema.findOne({
          _id: await decodedToken.id,
          role: await decodedToken.role,
          status: true,
        });

    } catch (err) {
      return res.json({ error: "not authorized" });
    }
    
    next();
  }
 

  async function checkaccount(req, res, next) {
    const admin = ["admin", "accountant"];
    try {
      const token = await req.get("Authorization").replace("Bearer ", "");
      const decodedToken = jwt.verify(await token, process.env.jwt_secret);
      try {
        const userdata = await Employee_Schema.findOne({
          _id: await decodedToken.id,
          role: await decodedToken.role,
          status: true,
        });
        if (admin.findIndex((x) => x === userdata.user_role) === -1)
          return res.json({ error: "not authorized" });
      } catch (err) {
        return res.json({ error: "not authorized" });
      }
    } catch (err) {
      return res.json({ error: "not authorized" });
    }}

   
    
 async function checkpharmasist(req, res, next) {
      const admin = ["admin", "pharmacist"];
      try {
        const token = await req.get("Authorization").replace("Bearer ", "");
        const decodedToken = jwt.verify(await token, process.env.jwt_secret);
        try {
          const userdata = await Employee_Schema.findOne({
            _id: await decodedToken.id,
            role: await decodedToken.role,
            status: true,
          });
          if (admin.findIndex((x) => x === userdata.user_role) === -1)
            return res.json({ error: "not authorized" });
        } catch (err) {
          return res.json({ error: "not authorized" });
        }
      } catch (err) {
        return res.json({ error: "not authorized" });
    }}


  module.exports = { checkadmin, checkreception, checkdoctor ,checkaccount,checkpharmasist};