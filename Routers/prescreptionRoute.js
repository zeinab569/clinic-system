const express=require("express");
const validator=require("../Middlelwares/error_validation");
const prescriptionController=require("../Controllers/prescreptionController");
const {prescriptionValidation}=require("../Middlelwares/validation")

const router= express.Router();

router.route("/prescreption")
//.all() check for admin
.get(prescriptionController.getAllprescreptions)
router.route("/prescreption")
//.all() check for doctor
    .post(prescriptionValidation,validator,prescriptionController.createPrescreption)
    .patch(prescriptionController.updatePrescreptions).delete(prescriptionController.deletePrescreption);

//check  doctor
router.get('/prescreption/doctor/:id',prescriptionController.getPrescrptionBydoctorId)
router.get('/prescreption/patient/:id',prescriptionController.getPrescrptionByPatientId)
router.get('/prescreption/:id',prescriptionController.getPrescrptionById)
router.get('/prescrption/sort/:sortKey',prescriptionController.sort)


module.exports=router;
