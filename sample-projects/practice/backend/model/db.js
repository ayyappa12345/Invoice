var mongoose=require("mongoose");

mongoose.connect(process.env.mongoose_Url).then(res=>{
    if(res){
        console.log("Mongoose Connected Successfully");
    }
    else{
        console.log("Connection Failed");
    }
})