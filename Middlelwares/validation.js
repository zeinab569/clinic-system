
const {body,query,param,validationResult}=require("express-validator");

let doctorValidation=[
    body("_id").isInt().withMessage("_id must be integer"),
    body("fullName").isAlpha().withMessage("full name must be string"),
    body("email").isEmail().withMessage("it is not a valid email").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ),
    body("phoneNumber").isString().withMessage("it is not a matched format").matches(/^01[0125](-)?[0-9]{8}$/),
    body("Specialization").isString().withMessage("Specialization must be text or word"),
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
let importVIP=[
    body("_id").isInt().withMessage("_id must be integer"),
    body("email").isEmail().withMessage("it is not a valid email").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ),
    body("phoneNumber").isString().withMessage("it is not a matched format").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),

];

let clinicValidation=[
    body("clinicName").isAlpha().withMessage("clinic name must be string"),
    body("email").isEmail().withMessage("it is not a valid email").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ),
   
];


module.exports={doctorValidation,clinicValidation,importVIP}
module.exports.patientValidation=[
    body("patientFirstName").isString().matches(/^[a-z]{3,}$/i).withMessage("Patient Name should be alphabtic"),
    body("patientLastName").isString().matches(/^[a-z]{3,}$/i).withMessage("Patient Name should be alphabtic"),
    body("patientAge").isNumeric().withMessage("patient age should be a number"),
    body("patientGender").isAlpha().withMessage("gender must be one of two [female,male]"),
    body("patientEmail").isString().matches(/.+\@.+\..+/).withMessage(" invalid Email"),
    body("patientInsuranceNumber").isString(),
    body("patientPhoneNumber").isString().matches(/^(010|011|012|015)+-+\d{8}$/).withMessage("please Enter valid phone Number")

]
module.exports.medicalHistoryValidation=[
    body("id").isInt(),
body("patientId").isInt().withMessage("patient Id must be a Number"),
body("medicinesbefore.name").isString().withMessage("medicine name must be alpha"),
body("medicinesbefore.quantity").isInt().withMessage("medicine quantity should be a number"),
body("medicinesbefore.from").isString().withMessage("date should be date like this YYYY-MM-DD ."),
body("medicinesbefore.to").isString().withMessage("date should be date like this YYYY-MM-DD ."),
body("prescriptionNumber").isInt().withMessage("prescription Number  should be number"),
body("chronicdiseases").isString()
]
module.exports.prescriptionValidation=[
    body("medicine").isObject().withMessage("medicine should be an object"),
    body("medicine.id").isInt().withMessage("medicine.id should be a number"),
    body("dosage").isString().withMessage("dosage should be string"),
    body("patient_id").isInt().withMessage("patient id should be integer"),
    body("doctor_id").isInt().withMessage("doctor id should be integer")
]
let Department=[
    body("id").isInt().withMessage("id must be int"),
    body("Name").isAlpha().trim().withMessage("your name should be string"),
   
    body("Service").isArray().withMessage("Service must be array of object"),
    body("Service.serviceName").isAlpha().withMessage("serviceName must be string"),
    body("Service.price").isNumeric().withMessage("price must be Numeric").matches(/^\d{0,8}[.]?\d{1,4}$/),
];



let Medicine=[
    body("id").isInt().withMessage("it must be int"),
    body("Name").isAlpha().withMessage("Name must be String"), 
    body("production_Date").isDate().withMessage("production_Date must be Date"),
    body("expiary_Date").isDate().withMessage("expiary_Date must be Date"),
    body("price").isNumeric().withMessage("price must be number").matches(/^\d{0,8}[.]?\d{1,4}$/),
    body("Recommendation").isAlpha().withMessage("Recommendation must be string"),
    body("quantity").isNumeric().withMessage("quantity must be Number"),
    body("img").isString().withMessage("img must be string")
]