const express=require("express");
 const router=express.Router();
const patientController=require("../Controllers/patient")
const {patientValidation}=require("../Middlelwares/validation")
const validator=require("../Middlelwares/error_validation")
const upload=require('./../Middlelwares/image');
const check_permission= require("../Middlelwares/check_users");
//check for doctor

router.route('/patient').post(upload.single('img'),patientValidation,validator,patientController.createPatient).get(
    patientController.getAllPatient
).delete(patientController.deletePatient).patch(patientController.editPatient)
router.route('/patient/:id').get(patientController.getPatientById);
router.route('/patient/filter/:filterKey').get(patientController.filterbyKey);
router.route('/patient/sort/:sortKey').get(patientController.sortbykey);
module.exports=router