const express=require("express");
const {body,query,param,validationResult}=require("express-validator");
const errorValidator=require("./../Middlelwares/error_validation");
const check_permission= require("../Middlelwares/check_users");
const router=express.Router();
const Controller =require("../Controllers/report");



router.route("/AppointmentReport")
 .all(check_permission.checkadmin)
.get (Controller.getAppointmentsReport)

module.exports=router;