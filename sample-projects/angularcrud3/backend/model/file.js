const multer=require("multer");
const MIME_TYPES={
    "image/jpeg":'jpg',
    "image/png":'png',
    "image/jpg":'jpg',
}

const storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        const isvalid=MIME_TYPES[file.mimetype];
        let error=new Error("invalid mime type");
        if(isvalid){
            error=null;
        }
        cb(error, "backend/uploads")
    },
    filename:(req, file, cb)=>{
        const ext=MIME_TYPES[file.mimetype];
        const name=file.originalname.split(" ").join("-")
        cb(null, new Date().toISOString() +  file.originalname+"." +ext);
    }
})

const upload=multer({storage:storage});

module.exports=upload.single("productImage");