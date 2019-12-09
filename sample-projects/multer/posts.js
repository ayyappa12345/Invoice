const mongoose=require("mongoose");
//const Posts=mongoose.model("Post");
const express=require("express");
const router=express.Router();
router.post("/addpost", (req, res, next)=>{
    console.log("you are in posts page");
})

module.exports=router;  