const mongoose=require("mongoose");
const postSheema=new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    image:{type:String, required:true},
    creator:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}
})

mongoose.model("Post", postSheema);