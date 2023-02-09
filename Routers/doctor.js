const express =require("express");
const router=express.Router();
const {body,query,param,validationResult}=require("express-validator");
const controller=require('./../Controllers/doctor')
const errorValidator=require("./../Middlelwares/error_validation")
const Validator=require("./../Middlelwares/validation").importVIP;

const check_permission=require("../Middlelwares/check_users")
//const Validator=require("./../Middlelwares/validation").doctorValidation;

const upload=require('./../Middlelwares/image');


router.route("/doctor")

.all(check_permission.checkadmin)
// .get(controller.getAllDoctors)
.get(controller.filterDocotr)

.post(upload.single('doctorImage'),Validator,errorValidator,controller.addDoctors)


router.route("/doctor/:_id")
      .all(check_permission.checkadmin)
      .get(param("_id").isInt().withMessage("_id must be Number"),errorValidator,controller.getDoctorById)
      .delete(param("_id").isInt().withMessage("_id must be Number"),errorValidator,controller.deleteDoctorbyID)
      .patch(param("_id").isInt().withMessage("_id must be Number"),errorValidator,controller.updateDoctor)

// router.route("/doctorSort/:filterKey")
//       .get(controller.filterbyKey)



module.exports=router;