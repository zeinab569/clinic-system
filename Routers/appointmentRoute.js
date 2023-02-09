
const express=require("express")
const router=express.Router()
const {param, body}= require("express-validator")
const appointmentController=require("../Controllers/appointmentController")
const {appointValidation}=require("../Middlelwares/validation")
const validator=require("../Middlelwares/error_validation")
const idValidate=param("id").isInt().withMessage("id must be integer")
const statusValidate=param("status").isIn([['Done','Cancel','Postpone','unAssign']])
                                    .withMessage("status should be ['Done','Cancel','Postpone','unAssign']")
const status=body("status").isIn([['Done','Cancel','Postpone','unAssign']])
                                    .withMessage("status should be ['Done','Cancel','Postpone','unAssign']")

router.route('/appointment')
      .post(appointValidation,validator,appointmentController.addAppointment)
      .get(appointmentController.getAllAppointments)


router.get("/appointment/sort",appointmentController.sort)

router.get("/appointment/fileReport",appointmentController.fReport)

router.route('/appointmentDelete/:id')
      .delete(idValidate,validator,appointmentController.deleteAppointmentByID)

router.route('/appointmentStatus/:status')
      .delete(statusValidate,validator,appointmentController.deleteAppointments)

router.route('/appointmentDate/:id')
      .patch([idValidate,appointValidation[5]],validator,appointmentController.updateAppointDateByID)

router.route('/appointmentStatus/:id')
       .patch([idValidate,status],validator,appointmentController.updateAppointStatusByID)

router.get("/searhApp/:filterNumbers",appointmentController.searchAppointments)

module.exports=router