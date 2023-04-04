const express=require("express");
const validator=require("../Middlelwares/error_validation");
const prescriptionController=require("../Controllers/prescreptionController");
const {prescriptionValidation}=require("../Middlelwares/validation")
const check_permission= require("../Middlelwares/check_users");

const router= express.Router();

router.get("/prescreption",prescriptionController.getAllprescreptions)

router.route("/prescreption")
 //.all(check_permission.checkdoctor)
    .post(prescriptionValidation,validator,prescriptionController.createPrescreption)
    
    router.route("/prescreption/:id").delete(prescriptionController.deletePrescreption).patch(prescriptionController.updatePrescreptions);

// router.get("/prescreption",check_permission.checkdoctor,prescriptionController.getAllprescreptions)
//check  doctor
router.get('/prescreption/doctor/:id',prescriptionController.getPrescrptionBydoctorId)
router.get('/prescreption/patient/:id',prescriptionController.getPrescrptionByPatientId)
router.get('/prescreption/:id',prescriptionController.getPrescrptionById)
router.get('/prescrption/sortt/:sortKey',prescriptionController.sort)
router.get('/prescrption/search/:filter',prescriptionController.searchPrescrption)



module.exports=router;
