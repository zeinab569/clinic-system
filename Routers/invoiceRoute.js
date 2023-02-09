
const express=require("express")
const {param,body}=require("express-validator");
const router=express.Router()
const invoiceController=require("../Controllers/invoiceController")
const validator=require("../Middlelwares/error_validation")
const {invoiceValidation}=require("../Middlelwares/validation")
const idValidate=param("id").isInt().withMessage("id must be integer")
const remain_amount=body("remaining_amount").isInt().withMessage("remaining_amount must be integer")

router.route("/invoice")
      .get(invoiceController.getAllInvoices)
      .post(invoiceValidation,validator,invoiceController.addInvoice)
      

router.route("/invoice/:id")
    .get(idValidate,validator,invoiceController.getInvoiceByID)
    .delete(idValidate,validator,invoiceController.deleteInvoiceByID)

router.route("/invoiceRe_Amount/:id")
      .patch([idValidate,remain_amount],validator,invoiceController.updateInvoiceRe_Amount)

router.route("/invoiceDueDate/:id")
      .patch([idValidate,invoiceValidation[6]],validator,invoiceController.updateInvoiceDueDate)
       
router.route("/invoiceSort")              // sort with aggregate (DueDate)
      .get(invoiceController.SortByDueDate)

router.route("/:filterBy/:filterKey/:sortBy")
      .get(invoiceController.filterbyKey)

router.route("/InvoiceReport")
      .get(invoiceController.fReport)

module.exports=router