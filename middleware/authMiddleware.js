const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async(req,res,next)=>{
    let token;
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }
    }
    catch(err){
        res.status(401).json({error:'Not authorized, token failed'})
    }
    if(!token){
        res.status(401).json({error:'Not authorized, no token'});
    }
}
exports.authorize=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({error:`User role %{req.user.role} is not authorized to access this route`});
        }
        next();
    }
}