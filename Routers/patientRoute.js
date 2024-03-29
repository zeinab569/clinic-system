const express=require("express");
 const router=express.Router();
const patientController=require("../Controllers/patient")
const {patientValidation}=require("../Middlelwares/validation")
const validator=require("../Middlelwares/error_validation")
const upload=require('./../Middlelwares/image');
const check_permission= require("../Middlelwares/check_users");
//check for doctor

router.route('/patient')
//.all(check_permission.checkreception)
.post(upload.single('img'),patientValidation,validator,patientController.createPatient)
.get(
    patientController.getAllPatient
)


router.route('/patient/:id',/*check_permission.checkreception*/).get(patientController.getPatientById).delete(patientController.deletePatient)
.patch(patientController.editPatient);
router.route('/patient/filter/:filterKey',check_permission.checkreception).get(patientController.filterbyKey);
router.route('/patient/sort/:sortKey',check_permission.checkreception).get(patientController.sortbykey);
router.get('/patient/search/:searchkey',patientController.searchPatient)
router.get('/patient/doctor/:id').get(patientController.getPatientByDoctorId)
module.exports=router