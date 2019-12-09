const mongoose=require("mongoose");
const empScheema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    contactPref:{type:String, required:true},
    gender:{type:String, required:true},
    dob:{type:Date, required:true},
    department:{type:Number, required:true},
    isActive:{type:Boolean},
    photoPath:{type:String, required:true}
});

module.exports=mongoose.model("Employee", empScheema)