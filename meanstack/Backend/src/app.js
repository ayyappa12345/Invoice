const express=require("express")
const config=require("./config/config");
const db=require("./model/db");
const bodyparser=require("body-parser");
const cors=require("cors");

const invoiceRoute=require("./routes/invoices.routes")

const app=express();
app.use(bodyparser.json());
app.use(cors());


app.use("/api", invoiceRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`Node working on ${process.env.PORT}`);
    
})