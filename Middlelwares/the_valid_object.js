const express = require('express');
const {body,query,param,validationResult}= require("express-validator")

let employee_is_valid=[
    body("name").isAlpha().trim().withMessage("your name should be string"),
    body("user_name").isString().trim().withMessage("your user name should be string"),
    body("user_role").isAlpha().trim().withMessage("your user role should be string"),
    body("phoneno").isString().trim().withMessage("your user name should be string"),
    body("email").isEmail().normalizeEmail().withMessage("email should be end with @.com"),
    body("password").isString().withMessage("your password should be strong"),
    body("salary").isNumeric().withMessage("your salary must be numeric"),
    body("gender").isString().withMessage("gender  must be string"),
  ];


  
  module.exports={employee_is_valid}