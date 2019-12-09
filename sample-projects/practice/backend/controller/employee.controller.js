const mongoose=require("mongoose");
const Employee=mongoose.model("Employee");
module.exports.createEmployee=(req, res, next)=>{
    const url=req.protocol+"://"+req.get("host");
    console.log(req.file);
    console.log(req.body);
    const {name, email, phone, gender, dob, contactPref, department, isActive}=req.body;
    const employee=new Employee({
       name, email, phone, gender, dob, contactPref, department, isActive, photoPath:url+"/uploads/"+req.file.filename
    });
    employee.save().then(result=>{
        if(result){
            res.status(200).json({
                message:"Employee Saved Successfully",
                response:{
                    id:result._id,
                    ...result
                }
            })
        }
    })
}

module.exports.getEmployees=(req, res, next)=>{
    Employee.find().then(result=>{
        if(result){
            res.status(200).json({
                message:"Employees Fetched Successfully",
                response:result
            })
        }
        else{
            res.status(400).json({
                message:"Employees Fetched Failed",
            })
        }
    })
}

module.exports.getEmployee=(req, res, next)=>{
    Employee.findOne({_id:req.params.id}).then(result=>{
        if(result){
            res.status(200).json({
                message:"Employee Get Success",
                response:{
                    ...result,
                    id:result._id,
                }
            })
        }
        else{
            res.status(400).json({
                message:'Failed to get Employees',
            })
        }
    })
}

module.exports.UpdateEmployee=(req, res, next)=>{
    const {body:{name, email, phone, gender, dob, contactPref, department, isActive, photoPath}}=req;
    const employee=new Employee({
       _id:req.params.id,
       name, email, phone, gender, dob, contactPref, department, isActive, photoPath
    });

    Employee.updateOne({_id:req.params.id}, employee).then(result=>{
        if(result.n>0){
            res.status(200).json({
                message:'Post Updated Successfully',
                response:result
            })
        }
    })
}

module.exports.DeleteEmployee=(req, res, next)=>{
    Employee.deleteOne({_id:req.params.id}).then(result=>{
        if(result.n > 0){
            res.status(200).json({
                message:"Employee Deleted Successfully",
                response:result
            })
        }
        
    }).catch(err=>{
        res.status(400).json({
            message:"Failed to Delete Employee"
        })
    })
}