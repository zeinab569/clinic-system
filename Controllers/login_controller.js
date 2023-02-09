const Employee_Schema = require("../Models/employeeSchema");
const Doctor_Schema=require("../Models/doctor")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

async function userLogin(request, response,next) {
    const usernameexist = await Employee_Schema.findOne({
      user_name: request.body.user_name,
      phoneno: request.body.phoneno,
      status: true,
    });
    if (!usernameexist) {
      const doctourusername = await Doctor_Schema.findOne({
        userName:request.body.user_name,
        phoneNumber:request.body.phoneno,
      })
      if(!doctourusername){
        return response.send({ error: "This user does not exist in clinicDB" });
      }else{
        token = jwt.sign(
          { id: doctourusername._id, role: doctourusername.role },
          process.env.jwt_secret,
          {expiresIn:"1h"}
        );
        response.json({
          success: await token,
          role: doctourusername.user_role,
          name: doctourusername.userName,
        });
      }
    }
    
    async function checkpassword() {
      dbpassword = await usernameexist.password;
      const validpassword = bcrypt.compareSync(
        request.body.password,
        await dbpassword
      );
      if (!validpassword) return false;
      return true;
    }
  
    if (usernameexist && (await checkpassword())) {
      token = jwt.sign(
        { id: usernameexist._id, role: usernameexist.role },
        process.env.jwt_secret,
        {expiresIn:"1h"}
      );
      response.json({
        success: await token,
        role: usernameexist.user_role,
        name: usernameexist.user_name,
      });
    } else return response.json({ error: "Wrong password try again" });
     
  }
  
  

   // Function to Verify Details of Employees
  async function verifyUserDetails(request, response,next) {
    try {
      const token = await request.body.token;
      const decoded = jwt.verify(await token, process.env.jwt_secret);
      try {
        const userdata = await Employee_Schema.findOne({
          _id: await decoded.id,
          role: await decoded.role,
          status: true,
        });
        if (userdata)
          return response.json({
            success: "Found user",
            name: userdata.user_name,
            role: userdata.user_role,
            id: userdata._id,
          });
      } catch (error) {
        return response.json({ error: "Could not find any user" });
      }
    } catch (error) {
      return response.json({ error: "Session expired, Login again to continue" });
    }
  }



  module.exports = {userLogin,verifyUserDetails}
  