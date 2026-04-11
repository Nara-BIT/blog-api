const Category = require('../models/Category');
const Post = require('../models/Post');

// @desc    Create new post
// @route   POST /api/posts
exports.createPost = async (req, res) => {
    try {
        // 1. Handle Image (from Multer)
        if (req.file) {
            req.body.image = req.file.filename;
        }

        // 2. Assign Author (from Protect Middleware)
        if (req.user) {
            req.body.author = req.user._id;
        }

        // 3. Create the Post
        const post = await Post.create(req.body);
        
        res.status(201).json({
            success: true,
            data: post
        });
    } catch (err) {
        console.error("Creation Error:", err.message);
        res.status(400).json({ error: err.message });
    }
};

// @desc    Get all posts (with Filtering, Sorting, Pagination)
// @route   GET /api/posts
exports.getPosts = async (req, res) => {
    try {
        let query;
        const reqQuery = { ...req.query };

        // Fields to exclude from direct matching
        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach(param => delete reqQuery[param]);

        // Advanced Filtering (gt, gte, etc.)
        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        
        query = Post.find(JSON.parse(queryStr)).populate('author', 'name');

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

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

// @desc    Get single post
// @route   GET /api/posts/:id
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name');
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (err) {
        res.status(500).json({ error: "Could not fetch post" });
    }
};

// @desc    Update post
// @route   PUT /api/posts/:id
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ success: true, data: post });
    } catch (err) {
        res.status(400).json({ error: "Could not update the post" });
    }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: "Could not delete the post" });
    }
};