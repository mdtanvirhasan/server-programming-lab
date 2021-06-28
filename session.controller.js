const express=require("express")

const cookieParser=require("cookie-parser")

const app=express()
app.use(cookieParser)


var LocalStorage=require('node-localstorage').LocalStorage;
const localStorage=new LocalStorage('./storage')
const alert=require('alert')

const isLoggedIn=(req,res,next)=>{
    const user=localStorage.getItem("name")
    console.log("is logged is running")

    if(user){
        res.clearCookie('user')
        res.cookie("user",user)
        
        res.send(`Welcome ${user}`)
        next();
        
    }
    else{
        alert('please log in')
        res.redirect('/login')
    }
    
}


module.exports=isLoggedIn