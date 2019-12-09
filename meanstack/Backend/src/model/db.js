const mongoose=require("mongoose");
mongoose.connect(process.env.mongoose_URL, (err)=>{
    if(!err){
        console.log("Mongoose connected successfully")
    }
})

require("../model/invoice.model");