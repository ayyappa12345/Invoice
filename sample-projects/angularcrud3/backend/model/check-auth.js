const jwt=require("jsonwebtoken");
module.exports=(req, res, next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decodedtoken=jwt.verify(token, "security_CODE");
        req.userData={email:decodedtoken.email, id:decodedtoken.id}
        next();
    }
    catch(error){
        console.log(error);
       res.status(401).json({
           message:'you are not authorized'
       })
    }
}