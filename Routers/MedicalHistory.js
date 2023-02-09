const express=require("express");
 const router=express.Router();
const medicalHistoryController=require("../Controllers/medicalHistory")
const {medicalHistoryValidation}=require("../Middlelwares/validation")
const validator=require("../Middlelwares/error_validation")
router.route('/MedicalRecord')
//.all() check for doctor only
.post(medicalHistoryValidation,validator,medicalHistoryController.createMedicalHistory)
.patch(medicalHistoryController.editpateintMedicalHistory).delete(medicalHistoryController.deleteMedicalHistory)
router.route('/MedicalRecord/:id')
//.all check for doctor
.get(medicalHistoryController.getMedicalHistoryById)
router.route('/MedicalRecord/patient/:id')
//.all check for doctor
.get(medicalHistoryController.getMedicalHistoryByPatientId)

router.route('/MedicalRecord/doctor/:id').get(medicalHistoryController.getMedicalHistoryByDoctorId)

router
//.all check for admin
.get('/MedicalRecord',medicalHistoryController.getAllMedicalHistory)
module.exports=router