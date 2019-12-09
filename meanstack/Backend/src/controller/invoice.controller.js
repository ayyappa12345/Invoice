const mongoose=require("mongoose");
const Invoice=mongoose.model("Invoice");
module.exports.getInvoices=(req, res, next)=>{
    Invoice.find().then(data=>{
        if(data){
            res.status(200).json({
                message:"Get all the invoices",
                responce:data
            })
           
        }
        else{
            res.status(500).json({
                message:"Error Getting data",
               
            })
        }
    })
}

module.exports.createInvoice=(req, res, next)=>{
    const { item, price, tax, qty, rate}=req.body
    const invoice=new Invoice({
     item, price,  tax, qty, rate, dueDate:Date.now()
    });
    invoice.save().then(result=>{
        if(result){
            res.status(200).json({
                message:"Invoice Posted Successfully",
                response:result
            })
        }
    })
}

module.exports.getInvoice=(req, res, next)=>{
    Invoice.findOne({_id:req.params.id}).then(result=>{
        if(result){
            res.status(200).json({
                message:"Invoice get Successfully",
                response:result
            })

        }
        else{
            res.status(500).json({
                message:"Failed to get Invoice"
            })
        }
    })
}

module.exports.updateInvoice=(req,res,next)=>{
    const { item, price, tax, qty, rate}=req.body
    const invoice=new Invoice({
         _id:req.params.id, item, price,  tax, qty, rate, dueDate:Date.now()
    });
   
    Invoice.updateOne({_id:req.params.id}, invoice).then(result=>{
        if(result.n >=1){
            res.status(200).json({
                message:"Updated invoice Successfully",
                response:result
            })
            
        }
        else{
            res.status(500).json({
                message:"Failed to update invoice"
            })
        }
    })
}
module.exports.deleteInvoice=(req, res, next)=>{
    Invoice.deleteOne({_id:req.params.id}).then(result=>{
        if(result.n>=1){
            res.status(200).json({
                message:"Invoice deleted Successfully",
                response:result
            })

        }
        else{
            res.status(500).json({
                message:"Failed to Delete invoice"
            })
        }
    })
}