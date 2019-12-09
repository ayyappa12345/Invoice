const mongoose=require("mongoose");
const postScheema=new mongoose.Schema({
    title:{type:String},
    content:{type:String},
    imagePath:{type:String},
});

mongoose.model("Post", postScheema);