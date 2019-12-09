const bcrypt=require("bcryptjs");
const mongoose= require("mongoose");
const User=mongoose.model("User");
const jwt=require("jsonwebtoken");

module.exports.register=(req, res, next)=>{
    bcrypt.hash(req.body.password, 10).then(hash=>{
        const user=new User(
            {
                fullname:req.body.fullname,
                email:req.body.email,
                password:hash
            }
        );
        user.save().then(result=>{
            if(!result){
                res.status(422).json({
                    message:"Failed to save user"
                })
            }
            res.status(200).json({
                message:"User saved Successfully",
                response:result
            })
        }).catch(err=>{
            if(err.name==="ValidationError"){
                res.status(422).json({
                    message:err.message,
                })
            }
            if(err.code===11000){
                res.status(422).json({
                    message:'Duplicate email found',
                })
            }
            console.log(JSON.stringify(err, undefined, 2))
        })
    });
    
    
}

module.exports.login= (req, res, next)=>{
    var fetchedUser;
  User.findOne({email:req.body.email}).then((user)=>{
            fetchedUser=user;
            console.log(user)
            if(!user){
                res.status(422).json({
                    message:"Invalid user"
                });
            }
            console.log("bcrypt matching "+ bcrypt.compare(req.body.password, user.password))
            return bcrypt.compare(req.body.password, user.password);
        
        }
    ).then(result=>{
        console.log("reuslut "+result);
        if(!result){
            res.status(422).json({
                message:"Invalid user"
            });
            return false;
        }
        
        const token= jwt.sign({id:fetchedUser._id, email:fetchedUser.email}, process.env.security, {expiresIn:process.env.expires});

        res.status(200).json({
            message:'logged in Successfully',
            username:fetchedUser.fullname,
            userid:fetchedUser._id,
            expires:3600,
            token:token
        })
        
    }).catch(err=>{
        res.status(422).json({
            message:"Wrong Password"
        })
    })
        
        
}