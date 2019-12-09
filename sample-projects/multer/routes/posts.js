const express=require("express");
const router=express.Router();
const multer=require("multer");

const MIME_TYPES={
    "image/png":"png",
    "image/jpeg":"jpg",
    "image/jpg":"jpg"
}
const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        const isvalid=MIME_TYPES[file.mimetype];
        let error=new Error("invalid mime type")
        if(isvalid){
            error=null;
        }
        cb(error, "uploads");
    },
    filename:(req,file, cb)=>{
        const name=file.originalname.toLowerCase().split(" ").join("-");
        const now=Date.now();
        const ext=MIME_TYPES[file.mimetype];
        cb(null, now+"-"+name);
    }
})
router.post("/api/addposts", multer({storage:storage}).single("image"), (req, res, next)=>{
    console.log(req.file);
    const url = req.protocol + "://" + req.get("host");
    const posts=new Posts({
        title:req.body.title,
        content:req.body.content,
        imagePath:url+"/uploads/"+req.file.filename
    });
    posts.save().then(result=>{
        res.status(200).json({
            message:'Post saved in db',
            response:result
        })
    })
    });
    
    router.get("/api/getposts", (req, res, next)=>{
        Posts.find().then(result=>{
            if(result){
                res.status(200).json({
                    message:'postst get from db',
                    id:result._id,
                    post:{
                        ...result
                    }
                })
            }
        })
    })


    module.exports=router;