const express=require("express");
const {body,query,param,validationResult}=require("express-validator");
const clinicController=require("./../Controllers/clinic");
const errorValidator=require("./../Middlelwares/error_validation");
const  Validator=require("./../Middlelwares/validation").importVIP;
const router=express.Router();


router.route("/clinic")
.get (clinicController.getAllClinic)
.post(Validator,errorValidator,clinicController.addClinic)



router.route("/clinic/:_id")
.get(param("_id").isInt().withMessage("id must be Number"),errorValidator,clinicController.getClinicById)
.delete(param("_id").isInt().withMessage("id must be Number"),errorValidator,clinicController.deleteClinicbyId)
.patch(param("_id").isInt().withMessage("id must be Number"),errorValidator,clinicController.updateClinic) 


// router.route("/clinicSort/:filterKey")
// .get(clinicController.filterbyKey)







module.exports=router;