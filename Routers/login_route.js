const express = require("express")
const {body,param,query,validationResult}= require("express-validator")
const controller = require("./../Controllers/login_controller")
const validate = require("./../Middlelwares/error_validation")
const thevalidate_object= require("./../Middlelwares/the_valid_object")
const router = express.Router();


 router.post("/login", async (req, res) => {
              controller.userLogin(req, res);
        });
    
              
module.exports = router;