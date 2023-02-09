const express=require("express");
const {body,query,param,validationResult}=require("express-validator");
const clinicController=require("./../Controllers/clinic");
const errorValidator=require("./../Middlelwares/error_validation");
const  Validator=require("./../Middlelwares/validation").clinicValidation;
const check_permission= require("../Middlelwares/check_users");
const router=express.Router();


router.route("/clinic")
.all(check_permission.checkadmin)
.get (clinicController.getAllClinic)
.post(Validator,errorValidator,clinicController.addClinic)



router.route("/clinic/:_id")
.all(check_permission.checkadmin)
.get(param("_id").isInt().withMessage("id must be Number"),errorValidator,clinicController.getClinicById)
.delete(param("_id").isInt().withMessage("id must be Number"),errorValidator,clinicController.deleteClinicbyId)
.patch(param("_id").isInt().withMessage("id must be Number"),errorValidator,clinicController.updateClinic) 


// router.route("/clinicSort/:filterKey")
// .get(clinicController.filterbyKey)







module.exports=router;