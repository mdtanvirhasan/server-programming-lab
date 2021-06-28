require('dotenv').config()
const express=require("express")
const app=express()
require('./helpers/init_mongodb')

const AuthRoute=require('./Routes/auth.route')

const p=process.env.PORT

app.listen(p,()=>{
    console.log(`listening at port ${p}`)
})

app.get("/",(req,res)=>{
    res.sendFile("landingpage.html",{root:"./views"});
});

app.use("/",AuthRoute)



//app.get("/register",(req,res)=>{
//    res.sendFile("register.html",{root:"./views"});
//});

//app.get("/login",(req,res)=>{
//    res.sendFile("login.html",{root:"./views"});
//});