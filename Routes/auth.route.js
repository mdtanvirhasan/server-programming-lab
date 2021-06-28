const express=require('express')
const isLoggedIn=require('../session.controller')
var LocalStorage=require('node-localstorage').LocalStorage
localStorage=new LocalStorage('../storage')
const UserSchema=require('../Models/User.model')
const router = express.Router()
const bodyParser=require("body-parser")
const alert=require('alert');
const bcrypt=require('bcrypt');
const { response } = require('express');

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json())


router.get('/register',async(req,res,next)=>{
    res.sendFile("register.html",{root:"./views"});
})


router.post('/register',async(req,res)=>{

    

    //res.sendFile("register.html",{root:"./views"});
    const{name,email,password,retyppassword}=req.body

    

    if(password===retyppassword){
        if(String(password).length<6){
            alert("password is too small")
            res.redirect('/register')

        }
        else{
            const hashPassword=bcrypt.hashSync(password,10)

            const newUser={name:name,email:email,password:hashPassword}

            try{
                await new UserSchema(newUser).save()
                localStorage.setItem('name',name)
                alert("new user created")
                res.redirect('/login')
                

            }catch(error){
                res.status(409).json({message: error.message})

                
            }
        }
    }
    else{
        alert('Password and retype pass not match')
        res.redirect('/register')
    }

})

router.get('/login',async(req,res)=>{
    res.sendFile("login.html",{root:"./views"});
})


router.post('/login',async(req,res)=>{
    const{email,password}=req.body

    if(String(email).length>0){

        const user = await UserSchema.findOne({
            email:email
        })
        if(user){
            valid=bcrypt.compareSync(password,user.password)
            if(valid){
                localStorage.setItem('name',user.name)

                alert("login successful")
                
                res.redirect('/dashboard');

            }
            else{
                alert("wrong password")
                res.redirect('/login')
            }
        }
        else{
            alert("could not find the account,please register")
            res.redirect('/register')
        }
    }
    else{
        alert('please input email')
        res.redirect('/login')
    }
    
    
    
})


router.get('/dashboard',(req,res)=>{
    
    const user=localStorage.getItem("name")
    console.log("name1")
    console.log("is logged is running")

    if(user){
        res.clearCookie('user')
        res.cookie("user",user)
        
        res.send(`Welcome ${user}`)
        res.sendFile("logoutButton.html",{root:"./views"})
        
        
    }
    else{
        alert('please log in')
        res.redirect('/login')
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie('user')
    localStorage.removeItem('name')
    res.redirect('/')
})

module.exports=router;