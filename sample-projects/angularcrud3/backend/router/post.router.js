const express=require("express");
const router=express.Router();
const extractfile=require("../model/file")
const checkAuth=require("../model/check-auth");


const ctrlPosts=require("../controller/post.controller");

router.post("/addposts", ctrlPosts.addposts);
router.get("/getposts", ctrlPosts.getPosts);
router.get("/getpost/:id", checkAuth, ctrlPosts.getPost);
router.delete("/deletepost/:id", checkAuth, ctrlPosts.deletePost);
router.put("/updatepost/:id", checkAuth, ctrlPosts.updatePost);

module.exports=router;