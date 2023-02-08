const express=require("express");
const validator=require("./../Middlelwares/error_validation");

const Controller=require("../Controllers/MedicineController");
const validatemedicine=require("./../Middlelwares/the_valid_object").Medicine

const router= express.Router();


router.route("/medicine")
    .get(Controller.getAllmedicine)
    .post(Controller.Addmedicine)
    .patch(Controller.updatemedicine)
  .delete(Controller.DeleteMedicine);


//getting medicine by id
router.get("/medicine/:id",
Controller.getMedicinebyId
)


//Deleting medicine by id
router.delete("/medicine/:id",
Controller.DeleteMedicineById
 );


module.exports=router;

