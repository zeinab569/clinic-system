const express=require("express");
const validator=require("./../Middlelwares/error_validation");

const Controller=require("./../Controllers/ServiceController");
const validateservice=require("./../Middlelwares/validation").Service
const check_permission=require("../Middlelwares/check_users")

const router= express.Router();


router.route("/Service")
.all(check_permission.checkadmin)
    .get(Controller.getAllService)
    .post(validateservice,validator,Controller.AddService)
    .patch(validateservice,validator,Controller.updateService)
  .delete(Controller.DeleteService);


//getting service by Name
router.get("/Service/:Name",
check_permission.checkadmin,
Controller.getServicebyName
);


//getting Service by id
router.get("/Service/:_id",
check_permission.checkadmin,
Controller.getServicebyId

 );
 //updating Service
 router.patch("/Service/:_id",
 check_permission.checkadmin,
 Controller.updateService
 
  );
//Deleting by id
  router.delete("/Service/:_id",
  check_permission.checkadmin,
Controller.DeleteServiceById
 );

//searching
 router.post("/Service/Search",
 check_permission.checkadmin,
Controller.SearchRecord
 );

module.exports=router;
