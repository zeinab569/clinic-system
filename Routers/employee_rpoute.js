const express = require("express")
const {body,param,query,validationResult}= require("express-validator")
const controller = require("./../Controller/EmployeeController")
const validate = require("./../Middlelwares/error_validation")

const check_permission= require("../Middlelwares/check_users");
const thevalidate_object= require("./../Middlelwares/the_valid_object")
const router = express.Router();



router.route("/employee")
  .all(check_permission.checkadmin)
  .get(controller.getallemp)  
  .post(controller.createUser)
  .patch(controller.update)  
  .delete(controller.deleteUser)


module.exports = router;