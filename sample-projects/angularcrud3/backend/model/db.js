const mongoose=require("mongoose");

mongoose.connect(process.env.mongoose_URL).then(result=>{
    if(!result){
        console.log("connection Failed");
    }
    else{
        console.log("Mongo db connected");
        
    }
}).catch(err=>{
    console.log("Failed to connect mongoosee");
})

require("./user.model");
require("./posts.model");