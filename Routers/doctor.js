const express =require("express");
const router=express.Router();
const {body,query,param,validationResult}=require("express-validator");
const controller=require('./../Controllers/doctor')
const errorValidator=require("./../Middlelwares/error_validation")
const doctorValidator=require("./../Middlelwares/validation").doctorValidation;
const upload=require('./../Middlelwares/image');


router.route("/doctor")
// .get(controller.getAllDoctors)
.get(controller.filterDocotr)
// .post(errorValidator,controller.addDoctors)
.post(upload.single('doctorImage'),errorValidator,controller.addDoctors)


// router.route("/doctor/Specialization")
//       .get(controller.getDoctorBySpecialization)
// router.route("/doctor/:fullName")
//       .get(controller.getDoctorByName)

router.route("/doctor/:_id")
      .get(param("_id").isInt().withMessage("_id must be Number"),errorValidator,controller.getDoctorById)
      .delete(param("_id").isInt().withMessage("_id must be Number"),errorValidator,controller.deleteDoctorbyID)
      .patch(errorValidator,controller.updateDoctor)



router.route("/doctorSort/:filterKey")
      .get(controller.filterbyKey)



module.exports=router;