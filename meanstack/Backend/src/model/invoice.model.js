const mongoose=require("mongoose");
const invoiceScheema=new mongoose.Schema({
    item:{type:String, required:true},
    price:{type:Number, required:true},
    qty:{type:Number, required:true},
    dueDate:{type:Date, required:true},
    tax:{type:Number},
    rate:{type:Number}
})
mongoose.model("Invoice", invoiceScheema)