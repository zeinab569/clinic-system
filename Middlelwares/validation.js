
const {body,query,param,validationResult}=require("express-validator");

let doctorValidation=[
    body("_id").isInt().withMessage("_id must be integer"),
    body("fullName").isAlpha().withMessage("full name must be string"),
    body("email").isEmail().withMessage("it is not a valid email").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ),
    body("phoneNumber").isString().withMessage("it is not a matched format").matches(/^01[0125](-)?[0-9]{8}$/),
    body("Specialization").isAlpha().withMessage("Specialization must be text or word"),
    body("gender").isAlpha().withMessage("gender must be one of two [female,male]"),
    body("userName").isString().withMessage("userName must be string"),
    body("password").isString().withMessage("password minimum length is 8"),//make it encrbiمشفره
    body("image").isString().withMessage("image path isn't right"),//------------
    body("salary").isInt().withMessage("salary must be more than 2000"),
    body("address").isObject().withMessage("address must be object"),
    body("address.city").isAlpha().withMessage("city must be string"),
    body("address.street").isString().withMessage("street must be number"),
    body("address.buliding").isString().withMessage("buliding must be number"),
    body("clinicId").isInt().withMessage("clinicId must be number"),
    body("appointmentId").isInt().withMessage("buliding must be number"),
];
let doctorValidation1=[
    body("_id").isInt().withMessage("_id must be integer"),
    body("fullName").isAlpha().withMessage("full name must be string"),
    body("email").isEmail().withMessage("it is not a valid email").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ),
];

let clinicValidation=[
    body("clinicName").isAlpha().withMessage("clinic name must be string"),
    body("email").isEmail().withMessage("it is not a valid email").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ),
   // body("phoneNumber").isString().withMessage("it is not a matched format for phone number").matches(/^01[0125](-)?[0-9]{8}$/),// بيعمل ايرورس
   
];


module.exports={doctorValidation,clinicValidation}