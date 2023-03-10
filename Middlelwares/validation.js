
const {body,query,param,validationResult}=require("express-validator");

let doctorValidation=[
   
    body("fullName").isString().withMessage("full name must be string").matches(/^[a-zA-Z]+((['_,. -][a-zA-Z ])?[a-zA-Z]*)*$/),
    body("email").isString().withMessage("it is not a valid email").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ),
    body("phoneNumber").isString().withMessage("it is not a matched format").matches(/^01[0125](-)?[0-9]{8}$/),
    body("Specialization").isString().withMessage("Specialization must be text or word"),
    body("gender").isAlpha().withMessage("gender must be one of two [female,male]"),
    body("userName").isString().withMessage("userName must be string"),
    body("password").isString().withMessage("password minimum length is 8"),
    body("userName").isString().withMessage("userName must be string"),
    body("salary").isInt().withMessage("salary must be more than 2000"),
    body("city").isAlpha().withMessage("city must be string"),
    body("street").isString().withMessage("street must be number"),
    body("clinicId").isInt().withMessage("clinicId must be number"),
    body("appointmentId").isInt().withMessage("appointmentId must be number"),
];
let importVIP=[
 
    body("email").isEmail().withMessage("it is not a valid email").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ),
];

let clinicValidation=[
    body("clinicName").isAlpha().withMessage("clinic name must be string"),
    body("email").isEmail().withMessage("it is not a valid email").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ),
   
];



let Department=[
 
    body("Name").isAlpha().trim().withMessage("your name should be string"),

   
    body("phoneNumber").isString().withMessage("it is not a matched format").matches(/^01[0125](-)?[0-9]{8}$/),

 
];
let Medicine=[

    body("Name").isAlpha().withMessage("Name must be String"), 
    body("production_Date").isString().withMessage("production_Date must be string"),
    body("expiary_Date").isString().withMessage("expiary_Date must be string"),
    body("price").isNumeric().withMessage("price must be number").matches(/^\d{0,8}[.]?\d{1,4}$/),
    body("Recommendation").isString().withMessage("Recommendation must be string"),
    body("quantity").isNumeric().withMessage("quantity must be Number")

]
let Service =[
 
    body("Name").isAlpha().withMessage("Name must be string"),
     body("price").isNumeric().withMessage("price must be Numeric"),
     body("description").isString().withMessage("description must be string")
     
     
]

module.exports={doctorValidation,clinicValidation,importVIP,Department,Medicine,Service}
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



module.exports.appointValidation=[
    
    body("employeeID").isInt().withMessage("employeeID should be Number ."),
    body("patientID").isInt().withMessage("patientId should be Number ."),
    body("departmentID").isInt().withMessage("serviceId should be Number ."),
    body("doctorID").isInt().withMessage("doctorId should be Number ."),
    body("date").isString().matches(/^\d{2}-\d{2}-\d{4}$/).withMessage("date should be date like this DD-MM-YYYY ."),
    body("time").isString().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).withMessage("time should be time like this HH:MM ."),
    body("status").default('unAssign')
]

module.exports.invoiceValidation=[

    body("employeeID").isInt().withMessage("employeeID should be Number ."),
    body("patientID").isInt().withMessage("patientId should be Number ."),
    body("date").isString().matches(/^\d{2}-\d{2}-\d{4}$/).withMessage("date should be date like this  DD-MM-YYYY ."),
    body("amount").isInt().withMessage("amount should be int"),
    body("payment_way").isIn(["cash","credit","insurance credit"]).withMessage("payment should be cash or credit or Insurance Card "),
    body("due_date").isString().matches(/^\d{2}-\d{2}-\d{4}$/).withMessage("due_date should be date like this  DD-MM-YYYY ."),
    body("appointmentID").isInt().withMessage("appointmentId should be Number ."),
]

module.exports.employeevalidation=[
    body("name").isAlpha().trim().withMessage("your name should be string"),
    body("user_name").isString().trim().withMessage("your user name should be string"),
    body("user_role").isAlpha().trim().withMessage("your user role should be string"),
    body("phoneno").isString().trim().withMessage("your user name should be string"),
    body("email").isEmail().normalizeEmail().withMessage("email should be end with @.com"),
    body("password").isString().withMessage("your password should be strong"),
    body("salary").isNumeric().withMessage("your salary must be numeric"),
    body("gender").isString().withMessage("gender  must be string"),
  ];

 