const multer=require("multer");
const MIME_TYPES={
    "image/png":"png",
    "image/jpeg":"jpg",
    "image/jpg":"jpg"
}
const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
       const isvalid=MIME_TYPES[file.mimetype];
        var error=new Error("Invalid mime type");
        if(isvalid){
            error=null
        }
        cb(error, "uploads/")
    },
    filename:(req, file, cb)=>{
        const now=Date.now();
        const ext=MIME_TYPES[file.mimetype];
        const filename=file.originalname.toLowerCase().split(" ").join("-");
        cb(null,filename+now+"."+ext);
    }
});
const upload=multer({storage:storage});
module.exports= upload.single("photoPath");