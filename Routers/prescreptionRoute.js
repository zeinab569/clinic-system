const express=require("express");
const validator=require("../Middlelwares/error_validation");
const prescriptionController=require("../Controllers/prescreptionController");
const {prescriptionValidation}=require("../Middlelwares/validation")
const check_permission= require("../Middlelwares/check_users");

const router= express.Router();

router.get("/prescreption",check_permission.checkdoctor,prescriptionController.getAllprescreptions)

router.route("/prescreption")
.all(check_permission.checkdoctor)
    .post(prescriptionValidation,validator,prescriptionController.createPrescreption)
    .patch(prescriptionController.updatePrescreptions)
    .delete(prescriptionController.deletePrescreption);

router.get("/prescreption",check_permission.checkdoctor,prescriptionController.getAllprescreptions)
//check  doctor
router.get('/prescreption/doctor/:id',check_permission.checkdoctor,prescriptionController.getPrescrptionBydoctorId)
router.get('/prescreption/patient/:id',check_permission.checkdoctor,prescriptionController.getPrescrptionByPatientId)
router.get('/prescreption/:id',check_permission.checkdoctor,prescriptionController.getPrescrptionById)
router.get('/prescrption/sort/:sortKey',check_permission.checkdoctor,prescriptionController.sort)
router.get('/prescrption/search/:filter',prescriptionController.searchPrescrption)


module.exports=router;
