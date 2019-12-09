const express=require("express");
const router=express.Router();
const model=require("../model/employee.model");
const empCtrl= require("../controller/employee.controller");
const file=require("../model/file");
router.post("/addemployee", file, empCtrl.createEmployee);
router.get("/getemployees", empCtrl.getEmployees)
router.get("/getemployee/:id", empCtrl.getEmployee);
router.put("/updateemployee/:id", empCtrl.UpdateEmployee);
router.delete("/deleteemployee/:id", empCtrl.DeleteEmployee);



module.exports=router;