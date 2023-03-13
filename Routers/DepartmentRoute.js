const express=require("express");
const validator=require("../Middlelwares/error_validation");

const Controller=require("./../Controllers/DepartmentController");
const validateDepartment=require("./../Middlelwares/validation").Department
const check_permission= require("../Middlelwares/check_users");

const router= express.Router();


router.route("/Department")
     .all(check_permission.checkadmin)
    .get(Controller.getAllDepartment)
    .post(validateDepartment,validator,Controller.AddDepartment)
    .patch(validateDepartment,validator,Controller.updateDepartment)
  .delete(Controller.DeleteDepartment);


//sorting
router.get("/Department/SortByName",check_permission.checkadmin,
Controller.SortByName
 );
//getting department by id
router.get("/Department/:_id",
check_permission.checkadmin,
Controller.getDepartmentbyId

 );
 //updating dep
 router.patch("/Department/:_id",check_permission.checkadmin,
 Controller.updateDepartment
 
  );
//Deleting by id
  router.delete("/Department/:_id",check_permission.checkadmin,
Controller.DeleteDepartmentById
 );

//searching
 router.post("/Search",check_permission.checkadmin,
Controller.SearchRecord
 );


 router.get("/searchforr/:res",check_permission.checkadmin,
 Controller.SearchDepartment
 
 )


module.exports=router;
