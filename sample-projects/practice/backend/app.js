const config=require("./config/config");
const db=require("./model/db");
const bodyparser=require("body-parser");
const cors=require("cors");
const express=require("express");
const app=express();

const empRouter=require("./routes/employee.router");
const userRouter=require("./routes/user.routes");

app.use(bodyparser.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use("/api", empRouter);
app.use("/api", userRouter);
app.listen(process.env.Port, ()=>{
  console.log("Node connect with the port:"+process.env.Port);
})