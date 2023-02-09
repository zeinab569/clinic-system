
const express=require("express")
const router=express.Router()
const {param, body}= require("express-validator")
const appointmentController=require("../Controllers/appointmentController")
const {appointValidation}=require("../Middlelwares/validation")
const validator=require("../Middlelwares/error_validation")
const idValidate=param("id").isInt().withMessage("id must be integer")
const check_permission= require("../Middlelwares/check_users");

const statusValidate=param("status").isIn([['Done','Cancel','Postpone','unAssign']])
                                    .withMessage("status should be ['Done','Cancel','Postpone','unAssign']")
const status=body("status").isIn([['Done','Cancel','Postpone','unAssign']])
                                    .withMessage("status should be ['Done','Cancel','Postpone','unAssign']")

router.route('/appointment')
      .all(check_permission.checkreception)
      .post(appointValidation,validator,appointmentController.addAppointment)
      .get(appointmentController.getAllAppointments)



router.route("/appointment/sort",check_permission.checkreception)
      .get(appointmentController.sort)

router.route("/appointment/fileReport",check_permission.checkreception)
      .get(appointmentController.fReport)

router.route('/appointmentDelete/:id',check_permission.checkreception)
      .delete(idValidate,validator,appointmentController.deleteAppointmentByID)

router.route('/appointmentStatus/:status',check_permission.checkreception)
      .delete(statusValidate,validator,appointmentController.deleteAppointments)

router.route('/appointmentDate/:id',check_permission.checkreception)
      .patch([idValidate,appointValidation[5]],validator,appointmentController.updateAppointDateByID)

router.route('/appointmentStatus/:id',check_permission.checkreception)
       .patch([idValidate,status],validator,appointmentController.updateAppointStatusByID)

router.get("/searhApp/:filterNumbers",appointmentController.searchAppointments)

module.exports=router