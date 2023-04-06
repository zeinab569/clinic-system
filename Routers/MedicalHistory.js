const express=require("express");
 const router=express.Router();
const medicalHistoryController=require("../Controllers/medicalHistory")
const {medicalHistoryValidation}=require("../Middlelwares/validation")
const validator=require("../Middlelwares/error_validation")
const check_permission= require("../Middlelwares/check_users");

router.route('/MedicalRecord')

//.all(check_permission.checkdoctor) 
.post(medicalHistoryController.createMedicalHistory)
// .post(medicalHistoryValidation,validator,medicalHistoryController.createMedicalHistory)
// .patch(medicalHistoryController.editpateintMedicalHistory)
.delete(medicalHistoryController.deleteMedicalHistory)
router.route('/MedicalRecord/:id')
.patch(medicalHistoryController.editpateintMedicalHistory)

//.all(check_permission.checkdoctor) 
.get(medicalHistoryController.getMedicalHistoryById)
router.route('/MedicalRecord/patient/:id')
//.all(check_permission.checkdoctor) 
.get(medicalHistoryController.getMedicalHistoryByPatientId)

router.route('/MedicalRecord/doctor/:id').get(medicalHistoryController.getMedicalHistoryByDoctorId)

router
//all(check_permission.checkadmin) 
.get('/MedicalRecord',medicalHistoryController.getAllMedicalHistory)
module.exports=router