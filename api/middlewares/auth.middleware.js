const {verifyToken}=require("../utils/jwt")

const authMiddleware =(req,res,next)=>{
    const {token}=req.headers;
    const user=verifyToken(token);
    if(!user){
        return res.status(401).json({message:"Unauthorized"})
    }
    req.user=user;
    next();
    }
    
module.exports=authMiddleware