const mongoose=require("mongoose");
mongoose.connect(process.env.mongoose_URL).then(res=>{
    if(res){
        console.log("mongoose connected");
    }
}).catch(err=>{
    console.log(JSON.stringify(err, undefined, 2));
})

require("./post.model");