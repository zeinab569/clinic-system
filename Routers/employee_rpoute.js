const express = require("express")
const {body,param,query,validationResult}= require("express-validator")
const controller = require("./../Controller/EmployeeController")
const validate = require("./../Middlelwares/error_validation")
const thevalidate_object= require("./../Middlelwares/the_valid_object")
const router = express.Router();














module.exports = router;