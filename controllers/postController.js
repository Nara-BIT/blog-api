const Post = require('../models/Post');
const Category = require('../models/Category');
exports.createPost= async(req,res)=>{
    try{
        const newPost=await Post.create(req.body)
        res.status(201).json({success:true,data:newPost})
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
};

exports.getPosts=async(req,res)=>{
    try{
        let filter={};
        if(req.query.category){
            filter.category=req.query.category;
        }

        const posts=await Post.find(filter).populate('category','name').sort({createdAt:-1});
        res.status(200).json({success:true, count:posts.length, data:posts})
    }
    catch(err){
        res.status(500).json({error:"could not fetch posts"});
    }
};
exports.getPost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({success:false, message:'Post not found'})
        }
        res.status(200).json({success:true, data:post})
    }
    catch(err){
        res.status(500).json({error:"could not the fetch post"});
    }
};
exports.updatePost = async(req,res)=>{
    try{
        const updatePost=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
        /*if(!updatePost){
            res.status(404).json({success:false, message:'Post not found'});
        }*/
        res.status(200).json(updatePost);
    }
    catch(err){
        res.status(400).json({error:"could not update the post"});
    }
};
exports.deletePost = async(req,res)=>{
    try{
        const deletePost= await Post.findByIdAndDelete(req.params.id);
        if(!deletePost){
            res.status(404).json({success:false, message:'Post not found'});
        }
        res.status(200).json({success:true, message:'Post deleted successfully'});
    }
    catch(err){
        res.status(500).json({error:"could not delete the post"});
    }
};