const express = require("express")
const {body,param,query,validationResult}= require("express-validator")
const controller = require("./../Controllers/EmployeeController")
const validate = require("./../Middlelwares/error_validation")

const check_permission= require("../Middlelwares/check_users");
const thevalidate_object= require("./../Middlelwares/the_valid_object");
const { route } = require("express/lib/application");
const router = express.Router();


router.route("/employee")
  .all(check_permission.checkadmin)
  .get(controller.getAllEmployees)  
  .post(
    thevalidate_object.employee_is_valid,
    validate,
    controller.createUser
    )
  .patch(controller.update)  
  .delete(controller.deleteUser)

// get employee by id
// router.get("/employee/:id",
//   param("id").isInt().withMessage("your id should be integer"),
//   controller.getbyid
// )

// get all doctors
router.get("/doctorList",
 controller.getDoctorList
)

// get all reseptionist
router.get("/reseptionistList",check_permission.checkadmin,
 controller.getReseptionistList
)

// get all accountant
router.get("/accountantList",check_permission.checkadmin,
 controller.getAccountantList
)

//change password

module.exports = router;