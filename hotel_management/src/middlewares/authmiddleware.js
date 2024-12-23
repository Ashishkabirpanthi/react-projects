const jwt = require('jsonwebtoken');
const usermodel = require('./src/models/usermodel.js');
exports.authenticateUser= async(req,res,next) =>{
    try {
        const token = req.cookies.token;
    if(!token){
        return res.status(401).json({success: false, message: "Unauthenticated"})
    }
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const user = await usermodel.findById(decoded._id);
    if(!user){
        return res.status(404).json({success: false, message: "User not found"})
    }
    req.user = user;
    next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
    
}