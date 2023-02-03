const Employee = require("../Models/employeeSchema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function userLogin(request, response,next) {
    const { error } = validation.userloginvalidation(request.body);
    if (error) return response.send({ error: error.details[0].message });
  
    const usernameexist = await user.findOne({
      user_name: request.body.user_name,
      phoneno: request.body.phoneno,
      status: true,
    });
    if (!usernameexist) return response.send({ error: "This user does not exist" });
  
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
        process.env.jwt_secret
      );
      res.send({
        success: await token,
        role: usernameexist.user_role,
        name: usernameexist.user_name,
      });
    } else return res.send({ error: "Wrong password" });
  }
  
  /**
   * Function to Verify Details
   */
  async function verifyUserDetails(req, res) {
    try {
      const token = await req.body.token;
      const payload = jwt.verify(await token, process.env.jwt_master_secret);
      try {
        const userdata = await user.findOne({
          _id: await payload.id,
          role: await payload.role,
          status: true,
        });
        if (userdata)
          return res.send({
            success: "Found user",
            name: userdata.user_name,
            role: userdata.user_role,
            id: userdata._id,
          });
      } catch (err) {
        return res.send({ error: "Could not find any user" });
      }
    } catch (err) {
      return res.send({ error: "Session expired, Login again to continue" });
    }
  }




  