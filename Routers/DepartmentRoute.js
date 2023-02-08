const express=require("express");
const validator=require("./../Middlelwares/error_validation");

const Controller=require("./../Controllers/DepartmentController");
const validateDepartment=require("./../Middlelwares/the_valid_object").Department

const router= express.Router();


router.route("/Department")
    .get(Controller.getAllDepartment)
    .post(validator,Controller.AddDepartment)
    .patch(validator,Controller.updateDepartment)
  //.delete(Controller.DeleteDepartment);


//getting department by Name
// router.get("/Department/:Name",
// Controller.getDepartmentbyName
// );

//sorting

router.get("/Department/SortByName",
Controller.SortByName
 );
//getting department by id
router.get("/Department/:id",
Controller.getDepartmentbyId

 );
 //updating dep
 router.patch("/Department/:id",Controller.updateDepartment
 
  );
//Deleting by id
  router.delete("/Department/:id",
Controller.DeleteDepartmentById
 );

//searching
 router.post("/Search",
Controller.SearchRecord
 );

module.exports=router;
