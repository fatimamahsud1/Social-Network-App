const express = require("express");
const user = require("../models/user");
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const requireLogin = require("../middleware/requireLogin")
const {JWT_SECRET} = require('../valueKeys')


router.get("/", (req,res)=>{
    res.send("heloo")
});

router.post("/signup", (req,res)=>{
    const {name,email,password} = req.body
    if(!email || !password ||!name){
        res.status(442).json("you neeed to give all info")
    }

  

    User.findOne({email:email}).then((savedUser=>{
        if(savedUser){
            return res.status(442).json({error: "you neeed to give all info"})
        }
        bcrypt.hash(password,12).then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name,
            })
    
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            }).catch(err=>{
                console.log(err);
            })
        })

    })).catch(err=>{
        console.log(err);
    })

    res.json({message:"data sent successfully"})
    res.send(req.body.name)
});

router.get("/protected",requireLogin,(req,res)=>{
    res.send("heloo")
    
})

router.post("/signin", (req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(422).json({error:"please add email or password"})
    }

    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                const {_id,name,email} = savedUser
                res.json({token,user:{_id,name,email}})
                res.json({message:"successfully signed in"})
            }
            else{
                return res.status(422).json({error:"Invalid credentials"})
            }
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router;