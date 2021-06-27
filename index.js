const express=require("express")
const app=express()
//const app=require(app)

const p=7777

app.listen(p,()=>{
    console.log(`listening at port ${p}`)
})

app.get("/",(req,res)=>{
    res.sendFile("landingpage.html",{root:"./views"});
});

app.get("/register",(req,res)=>{
    res.sendFile("register.html",{root:"./views"});
});

app.get("/login",(req,res)=>{
    res.sendFile("login.html",{root:"./views"});
});