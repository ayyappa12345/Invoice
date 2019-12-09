const config=require("./config/config");
const db=require("./model/db");
const bodyparser=require("body-parser");
const cors=require("cors");

const registerRouter=require("./router/user.routes");
const postsRouter=require("./router/post.router");

const express=require("express");

const app=express();

app.use(bodyparser.json());
app.use(cors());
app.use("/uploads", express.static())

app.use("/api", postsRouter);
app.use("/api", registerRouter);
app.listen(process.env.PORT, ()=>{
    console.log("mongo db connected with the port number "+process.env.PORT);
})