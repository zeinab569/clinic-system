const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports =(req,res,next) =>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.jwt_secret );
    next();
  }catch(error){
    res.status(401).json({message: "Auth failed!"})
  }
}