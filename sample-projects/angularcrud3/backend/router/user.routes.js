const express=require("express");
const router=express.Router();

const ctrlUser=require("../controller/user.controller");

router.post("/register", ctrlUser.register);
router.post("/login", ctrlUser.login);

module.exports=router;