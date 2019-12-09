const express=require("express");
const router=express.Router();
const usermodel=require("../model/user.model");
const userCtrl=require("../controller/user.controller");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);

module.exports=router;