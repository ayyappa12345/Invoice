const jwt=require("jsonwebtoken");

module.exports=(req, res, next)=>{
    try{
    const token=req.headers.authorisation.split(" ")[1];
    if(token){
        const decodedtoken=jwt.compare(token, process.env.security_key);
        req.userData=({username:decodedtoken.username, id:decodedtoken.id})
    }
    next();
}
catch (err){
    console.log(JSON.stringify(err, undefined, 2))
}
   
}