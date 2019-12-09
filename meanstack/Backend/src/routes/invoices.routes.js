const express=require("express");
const router=express.Router();
const invoiceCtrl=require("../controller/invoice.controller");

router.get("/invoice", invoiceCtrl.getInvoices);
router.post("/invoice", invoiceCtrl.createInvoice);
router.get("/invoice/:id", invoiceCtrl.getInvoice);
router.put("/invoice/:id", invoiceCtrl.updateInvoice);
router.delete("/invoice/:id", invoiceCtrl.deleteInvoice);



module.exports=router;