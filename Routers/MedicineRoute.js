const express=require("express");
const validator=require("./../Middlelwares/error_validation");

const Controller=require("../Controllers/MedicineController");
const validatemedicine=require("./../Middlelwares/validation").Medicine
const check_permission= require("../Middlelwares/check_users");
const router= express.Router();

router.route("/medicine")
   .all(check_permission.checkpharmasist)
    .get(Controller.getAllmedicine)
    .post(Controller.Addmedicine)
    .patch(Controller.updatemedicine)
  .delete(Controller.DeleteMedicine);

//getting medicine by id
router.get("/medicine/:id",check_permission.checkpharmasist,
Controller.getMedicinebyId
)


//Deleting medicine by id
router.delete("/medicine/:id",check_permission.checkpharmasist,
Controller.DeleteMedicineById
 );


module.exports=router;

