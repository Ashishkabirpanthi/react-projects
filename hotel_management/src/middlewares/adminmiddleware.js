const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel.js');
exports.authenticateAdmin= async(req,res,next) =>{
    try {
        const token = req.cookies.token;
    if(!token){
        return res.status(401).json({success: false, message: "Unauthenticated"})
    }
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const user = await usermodel.findById(decoded._id);
    req.user = user;
    if(!req.user || !req.user?.isAdmin){
        return res.status(403).json({success: false, message: "Only admins can access this page."});
    }
    next();
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
    
}