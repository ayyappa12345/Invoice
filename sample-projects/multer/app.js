
const config=require("./config/config");
const db=require("./config/model/db");
const express=require("express");
const ctrlPosts=require("./posts");
const PostRoutes=require("./routes/posts");

const mongoose=require("mongoose");
Posts=mongoose.model("Post")
const bodyparser=require("body-parser");
const cors=require("cors");


const app=express();

app.use(bodyparser.json());
app.use(cors());


app.use(PostRoutes);
app.use("/uploads", express.static("uploads"))

app.listen(process.env.PORT, ()=>{
    console.log("Connect db with the port of"+process.env.PORT);
})