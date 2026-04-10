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

exports.getPosts = async (req, res) => {
    try {
        let query;

        // 1. Create a copy of req.query
        const reqQuery = { ...req.query };

        // Fields to exclude from matching (we handle these separately)
        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach(param => delete reqQuery[param]);

        // 2. FILTERING (Advanced: for price ranges like [gt] or [lt])
        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        
        query = Post.find(JSON.parse(queryStr));

        // 3. SORTING
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt'); // Default: Newest first
        }

        // 4. PAGINATION
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5; // Default 5 posts per page
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        // Execute query
        const posts = await query;

        res.status(200).json({
            success: true,
            count: posts.length,
            page,
            data: posts
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};