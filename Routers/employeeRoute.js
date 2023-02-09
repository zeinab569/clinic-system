const express = require("express")
const {body,param,query,validationResult}= require("express-validator")
const controller = require("../Controllers/EmployeeController")
const validate = require("../Middlelwares/error_validation")
const upload=require('../Middlelwares/image');
const check_permission= require("../Middlelwares/check_users");
const {employeevalidation}= require("../Middlelwares/validation");
const { route } = require("express/lib/application");
const router = express.Router();

router.route("/employee")
  .all(check_permission.checkadmin)
  .get(controller.getAllEmployees)  
  .post(
    upload.single('employeeImage'),
    employeevalidation,
    validate,
    controller.createUser
    )
  .patch(controller.update)  
  .delete(controller.deleteUser)

// get employee by id
router.get("/employee/:id",check_permission.checkadmin,
  param("id").isInt().withMessage("your id should be integer"),
  controller.getbyid
)

// get all doctors
router.get("/doctorList",check_permission.checkadmin,
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

// get all pharmacist
router.get("/pharmacistList",check_permission.checkadmin,
 controller.getPharmacistList
)

// filter and sort
router.get("/employee/:search/:theQuery",check_permission.checkadmin,
controller.SearchEmployees

)
module.exports = router;