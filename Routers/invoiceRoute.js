
const express=require("express")
const {param,body}=require("express-validator");
const router=express.Router()
const invoiceController=require("../Controllers/invoiceController")
const validator=require("../Middlelwares/error_validation")
const {invoiceValidation}=require("../Middlelwares/validation")
const check_permission= require("../Middlelwares/check_users");
const idValidate=param("id").isInt().withMessage("id must be integer")
const remain_amount=body("remaining_amount").isInt().withMessage("remaining_amount must be integer")

router.route("/invoice")
      .all(check_permission.checkaccount)
      .get(invoiceController.getAllInvoices)
      .post(invoiceValidation,validator,invoiceController.addInvoice)
      

router.route("/invoice/:id")
    .all(check_permission.checkaccount)
    .get(idValidate,validator,invoiceController.getInvoiceByID)
    .delete(idValidate,validator,invoiceController.deleteInvoiceByID)

router.route("/invoiceRe_Amount/:id",check_permission.checkaccount)
      .patch([idValidate,remain_amount],validator,invoiceController.updateInvoiceRe_Amount)

router.route("/invoiceDueDate/:id",check_permission.checkaccount)
      .patch([idValidate,invoiceValidation[6]],validator,invoiceController.updateInvoiceDueDate)
       
router.route("/invoiceSort",check_permission.checkaccount)             // sort with aggregate (DueDate)
      .get(invoiceController.SortByDueDate)

router.route("/:filterBy/:filterKey/:sortBy",check_permission.checkaccount)
      .get(invoiceController.filterbyKey)

router.route("/InvoiceReport",check_permission.checkaccount)
      .get(invoiceController.fReport)

module.exports=router