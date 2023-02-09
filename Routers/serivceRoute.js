
const express=require("express")
const router=express.Router()
const serviceController=require("../Controllers/serviceController")

router.post("/service",serviceController.addService)

module.exports=router;