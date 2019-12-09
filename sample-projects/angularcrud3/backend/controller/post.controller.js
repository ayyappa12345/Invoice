const mongoose=require("mongoose");
const Post=mongoose.model("Post");


module.exports.addposts=(req, res, next)=>{
    const url=req.protocol+"://"+req.get("host");
   const post=new Post({
       title:req.body.title,
       content:req.body.content,
       creator:req.userData.id,
       image:url+"/uploads/"+req.file.filename
  
   });
   post.save().then(result=>{
       if(!result){
           res.status(400).json({
               message:'Posts are not saved',
              
           })
       }
       console.log(result);
       res.status(200).json({
        message:'Posts are saved',
        post:{
            ...result,
            id:result._id,
        }
      
    })
   }).catch(err=>{
       console.log(JSON.stringify(err, undefined, 2))
   })
}

module.exports.getPosts=(req, res, next)=>{
    Post.find().then(result=>{
        res.status(200).json({
            message:"Posts get Successfully",
            id:result._id,
            response:result
        })
    }).catch(err=>console.log(JSON.stringify(err, undefined, 2)))
}

module.exports.getPost=(req, res, next)=>{
    Post.findById(req.params.id).then(result=>{

        res.status(200).json({
            message:"Post got",
            response:result
        })
    }).catch(err=>{
        console.log(JSON.stringify(err, undefined, 2));
    })
}

module.exports.deletePost=(req, res, next)=>{
    Post.deleteOne({_id:req.params.id, creator:req.userData.id}).then(result=>{
        if(result.n > 0){
            res.status(200).json({
            message:'Post deleted Successfully',
            response:result
        })
        }
        
    }).catch(err=> console.log(JSON.stringify(err, undefined, 2)));
}

module.exports.updatePost=(req, res, next)=>{
    const post=new Post({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content,
        creator:req.userData.id
    });
    Post.updateOne({_id:req.params.id, creator:req.userData.id}, post).then(result=>{
        if(result.n > 0){
            res.status(200).json({
                message:'Post Updated Successfully',
                response:result
            })
        }
    }).catch(err=>{
        console.log(JSON.stringify(err, undefined, 2));
    })
}