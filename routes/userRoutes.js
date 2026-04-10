const express=require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect ,authorize} = require('../middleware/authMiddleware');

router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/profile',protect,(req,res)=>{
    res.json({
        message:"Welcome to your profile",user:req.user
    })
})
router.get('/admin-only',protect,authorize('admin'),(req,res)=>{
    res.json({
        message: "Welcome, Supreme Leader. You have reached the Admin Dashboard."
    });
})
module.exports=router;
