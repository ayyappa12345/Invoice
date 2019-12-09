const mongoose=require("mongoose");

const userScheema=new mongoose.Schema({
    fullname:{type:String, required:'Fullname is mandatory'},
    email:{type:String, unique:true, required:'Fullname is mandatory'},
    password:{type:String, required:'password is mandatory', minlength:[4, 'Password  must be atleast 4 chars']},
});

mongoose.model("User", userScheema);