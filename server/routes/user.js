const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("User");


router.get('/user/:id', requireLogin, (req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedby:req.params.id})
        .populate("postedby","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            else{
                res.json({user,posts})
            }
        })
    }).catch(err=>{
        return res.status(404).json({error:"user not found"})
    })
})



module.exports = router;