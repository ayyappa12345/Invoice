const mongoose=require("mongoose");
const User=mongoose.model("User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

module.exports.register=(req, res, next)=>{
    bcrypt.hash(req.body.password, 10).then(hash=>{
        const user=new User({
            username:req.body.username,
            password:hash
        });

        user.save().then(result=>{
            if(!result){
                res.status(400).json({
                    message:'Failed to save Username',
                })
            }
            res.status(200).json({
                message:"Successfully registered the user",
                response:result,
            })
        })
    })
}

module.exports.login=(req,res,next)=>{
    let fetcheduser;
    User.findOne({username:req.body.username}).then(user=>{
        fetcheduser=user;
        if(!user){
            res.status(400).json({
                message:"user not Valid",
            })
        }
    return bcrypt.compare(req.body.password, user.password)
    }).then(result=>{
        if(!result){
            console.log("wrong Password");
        }
        const token=jwt.sign({id:fetcheduser._id, username:fetcheduser.username}, process.env.security_key, {expiresIn:process.env.expires});
        res.status(200).json({
            message:"User logged in Successfully",
            token:token,
            id:fetcheduser._id,
            username:fetcheduser.username,
            expires:3600
        })
    }

    )
}